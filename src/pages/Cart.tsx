import React, { ChangeEvent, useState } from "react"
import { SelectCheckbox } from "../components/pageBlocks/inputs/SelectCheckbox"
import { CartItemsList } from "../components/CartItemsList"

export const Cart = () => {
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
	return (
		<div className="cart-page">
			<header className="heading">
				<h1>Корзина</h1>
				<span>amount</span>
			</header>
			<main>
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
			</main>
		</div>
	)
}
