import React, { FC } from "react"
import style from "./style.module.scss"
import { Link } from "react-router-dom"
import { AiOutlineStar } from "react-icons/ai"

export type ProductItemType = {
	title: string
	price: number
	averageRating: number
	numOfReviews: number
	id: string
	image: string
}

export const ProductItem: FC<ProductItemType> = (props) => {
	const { image, price, id, averageRating, title, numOfReviews } = props
	return (
		<div className={`${style.product}`}>
			<Link to={`/products/${id}`} className={style.image}>
				<img src={image} alt="product image" />
			</Link>
			<div className={style.price}>{price} ₽</div>

			<Link to={`/products/${id}`} className={style.name}>
				<div>{title}</div>
			</Link>
			<div className={style.rating}>
				{averageRating || 0} <AiOutlineStar className={style["star"]} />
				{numOfReviews}
			</div>
			<button className={"btn btn--rounded btn--contained btn--content"}>
				В корзину
			</button>
		</div>
	)
}
