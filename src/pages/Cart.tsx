import React, { ChangeEvent, useEffect, useState } from "react"
import { SelectCheckbox } from "../components/pageBlocks/inputs/SelectCheckbox"
import { CartItemsList } from "../components/CartItemsList"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { createOrder } from "../store/features/order/thunks"
import { AppDispatch } from "../store/store"

export const Cart = () => {
	const dispatch = useDispatch<AppDispatch>()

	const { order } = useSelector(selectOrder)

	const [selected, setSelected] = useState(["Выбрать все"])
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, checked, value } = e.target
		console.log({ name, checked })
		setSelected((prev) => {
			if (checked) {
				return [...prev, value]
			}
			return prev.filter((v) => v !== value)
		})
	}

	useEffect(() => {
		if (Object.keys(order).length > 0) {
			return
		}

		console.log("before creating cart")

		dispatch(createOrder({ status: "cart" }))
	}, [])
	return (
		<div className="cart-page">
			<header className="heading">
				<h1>Корзина</h1>
				<span>{order?.items?.length} различных товаров</span>
			</header>
			<main>
				{order?.items?.length > 0 ? (
					<>
						<div className="action-tab">
							<SelectCheckbox
								items={["Выбрать все"]}
								onChange={handleChange}
								name="selectAll"
								selected={selected}
							/>
							<button className="btn btn--warn btn--content">
								Удалить выбранные
							</button>
						</div>
						<CartItemsList />
					</>
				) : (
					<>
						<h1>Я пуста</h1>
						<p>Наполни меня, прошу =*</p>
					</>
				)}
			</main>
		</div>
	)
}
