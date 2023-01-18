import React from "react"
import style from "./style.module.scss"
import { CartItem } from "../CartItem"

export const CartItemsList = () => {
	const items = [
		{ name: "first", img: "", price: 230 },
		{ name: "second", img: "", price: 220 },
		{ name: "third", img: "", price: 210 },
	]
	return (
		<div className={style.wrapper}>
			{items?.map((item) => {
				return <CartItem {...item} />
			})}
		</div>
	)
}
