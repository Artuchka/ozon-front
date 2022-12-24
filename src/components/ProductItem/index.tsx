import React, { FC } from "react"
import style from "./style.module.scss"
import defaultImage from "./../../assets/images/ozon-logo.png"
import { Link } from "react-router-dom"
import { AiOutlineStar } from "react-icons/ai"
import { serverURL } from "../../axios/customFetch"

export type ProductItemType = {
	images: string[]
	title: string
	price: number
	averageRating: number
	numOfReviews: number
	_id: string
}
// crossorigin=anonymos should work for images

export const ProductItem: FC<ProductItemType> = (props) => {
	const { images, price, _id, averageRating, title, numOfReviews } = props

	const image = images[0] === "" ? defaultImage : serverURL + images[0]
	return (
		<div className={`${style.product}`}>
			<Link to={`/products/${_id}`} className={style.image}>
				<img src={image} alt="product image" />
			</Link>
			<div className={style.price}>{price} ₽</div>

			<Link to={`/products/${_id}`} className={style.name}>
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
