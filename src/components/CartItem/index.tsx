import React, { FC } from "react"
import style from "./style.module.scss"

type PropType = {
	name: string
	img: string
	price: number
}
export const CartItem: FC<PropType> = (props) => {
	const { name, img, price } = props
	return (
		<div className={style.wrapper}>
			<img src={img} alt="" />
			<div className={style.name}>{name}</div>
			<div className={style.price}>{price}</div>
		</div>
	)
}
