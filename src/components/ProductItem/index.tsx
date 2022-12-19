import React, { FC } from "react"
import style from "./style.module.scss"
import { Link } from "react-router-dom"

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
			<Link to={`/products/${id}`} className={style.image}>
				<img src={image} alt="product image" />
			</Link>
			<div className={style.price}>{price} ₽</div>

			<Link to={`/products/${id}`} className={style.name}>
				<div>{name}</div>
			</Link>
			<div className={style.rating}>{rating}</div>
			<button className={"btn btn--rounded btn--contained btn--content"}>
				В корзину
			</button>
		</div>
	)
}
