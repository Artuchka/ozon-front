import React, { FC } from "react"
import style from "./style.module.scss"

export type ProductItemType = {
	name: string
	price: number
	rating: number
	id: string
	image: string
}

export const ProductItem: FC<ProductItemType> = (props) => {
	const { image, price, id, rating, name } = props
	return (
		<div className={`${style.product}`}>
			<img src={image} alt="product image" />
			<div className={style.price}>{price} ₽</div>
			<div className={style.name}>{name}</div>
			<div className={style.rating}>{rating}</div>
			<button className={"btn btn--rounded btn--contained btn--content"}>
				В корзину
			</button>
		</div>
	)
}
