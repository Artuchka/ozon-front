import React, { FC } from "react"
import style from "./style.module.scss"
import { OrderItemType } from "../../store/features/order/orderSlice"
import defaultImage from "./../../assets/images/404bg.jpeg"
import { serverURL } from "../../axios/customFetch"

export const CartItem: FC<OrderItemType> = (props) => {
	const { title, image, price, _id, product, amount } = props
	return (
		<div className={style.wrapper}>
			<img src={image ? serverURL + image : defaultImage} alt="" />
			<div className={style.title}>{title}</div>
			<div className={style.price}>{price}</div>
			<div className={style.amount}>{amount}</div>
		</div>
	)
}
