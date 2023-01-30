import React, { FC } from "react"
import style from "./style.module.scss"
import { Link } from "react-router-dom"
import { AiOutlineStar } from "react-icons/ai"

import { SingleProductType } from "../../store/features/product/productSlice"
import { formatPrice, getIntlDate } from "../../utils/intl"
import { SlideImageViewer } from "../SlideImageViewer"

export const ProductCard: FC<SingleProductType> = (props) => {
	const {
		images,
		price,
		_id,
		averageRating,
		title,
		numOfReviews,
		createdAt,
		updatedAt,
	} = props

	return (
		<div className={`${style.product}`}>
			<div className={style.image}>
				<Link to={`/products/${_id}`}>
					<SlideImageViewer images={images} />
				</Link>
			</div>

			<Link to={`/products/${_id}`} className={style.name}>
				<div>{title}</div>
			</Link>

			<div className={style.price}>
				<span>Стоимость: </span>
				<strong>{formatPrice(price)} ₽</strong>
			</div>

			<div className={style.rating}>
				<div className={style.average}>
					<span>Средняя оценка: </span>
					<strong>
						{averageRating || 0}
						<AiOutlineStar className={style["star"]} />
					</strong>
				</div>
				<div className={style.amount}>
					<span>Кол-во отзывов: </span>
					<strong>{numOfReviews}</strong>
				</div>
			</div>
			<div className={style.createdAt}>
				<span>Добавлен: </span>
				<strong>{getIntlDate(new Date(createdAt))}</strong>
			</div>
			<div className={style.updatedAt}>
				<span>Обновлялся последний раз: </span>
				<strong>{getIntlDate(new Date(updatedAt))}</strong>
			</div>
		</div>
	)
}
