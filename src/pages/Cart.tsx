import React, { ChangeEvent, useEffect, useState } from "react"
import { SelectCheckbox } from "../components/pageBlocks/inputs/SelectCheckbox"
import { CartItemsList } from "../components/CartItemsList"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { createOrder } from "../store/features/order/thunks"
import { AppDispatch } from "../store/store"
import { Loading } from "../components/Loading"
import { selectAuth } from "../store/features/auth/selectors"

export const Cart = () => {
	const dispatch = useDispatch<AppDispatch>()

	const { order, isLoading } = useSelector(selectOrder)
	const { username } = useSelector(selectAuth)

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
		if (!username || Object.keys(order).length > 0) {
			return
		}

		dispatch(createOrder({ status: "cart" }))
		console.log("after creating cart")
	}, [])

	if (isLoading) {
		return <Loading />
	}
	return (
		<div className="cart-page">
			<header className="heading">
				<h1>Корзина</h1>
				<span>{order?.items?.length} различных товаров</span>
			</header>
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
					<div className="cart-list-wrapper">
						<CartItemsList />
					</div>
					<div className="buy-card">
						<button className="btn btn--contained btn--success btn--rounded btn--tall btn--text-small">
							Перейти к оформлению
						</button>
						<small className="checkout-info">
							Доступные способы и время доставки можно выбрать при
							оформлении заказа
						</small>
						<div className="info">
							<div className="buy-card-heading">
								<h3>Ваша корзина</h3>
								<span>{order?.items?.length} товара</span>
							</div>
							<small className="subtotal">
								<span className="title">
									Товары ( {order?.items?.length} )
								</span>
								<span className="value">
									{order.subtotal} ₽
								</span>
							</small>
							{order?.discounts?.length > 0 && (
								<small className="discounts">
									<span>Скидка</span>
									<span className="value">
										{order.total - order.subtotal} ₽
									</span>
								</small>
							)}
						</div>
					</div>
				</>
			) : (
				<>
					<h1>Я пуста</h1>
					<p>Наполни меня, прошу =*</p>
				</>
			)}
		</div>
	)
}
