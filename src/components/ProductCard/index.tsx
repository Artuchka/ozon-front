import React, { FC } from "react"
import style from "./style.module.scss"
import defaultImage from "./../../assets/images/ozon-logo.png"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineStar } from "react-icons/ai"
import { serverURL } from "../../axios/customFetch"
import { AiFillHeart } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import {
	addBookmark,
	deleteBookmark,
	getAllBookmarks,
} from "../../store/features/bookmark/thunks"
import { selectBookmarks } from "../../store/features/bookmark/selector"
import {
	SingleProductType,
	setEdit,
} from "../../store/features/product/productSlice"
import { addToCart, updateOrder } from "../../store/features/order/thunks"
import { selectOrder } from "../../store/features/order/selector"
import { OrderItemType, OrderType } from "../../store/features/order/orderSlice"
import { formatPrice, getIntlDate } from "../../utils/intl"
import { SlideImageViewer } from "../SlideImageViewer"
import { MdQueryStats } from "react-icons/md"

export const ProductCard: FC<SingleProductType> = (props) => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
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
	const preparedImages = images.map((item: string) => serverURL + item)

	return (
		<div className={`${style.product}`}>
			<div className={style.image}>
				<Link to={`/products/${_id}`}>
					<SlideImageViewer images={preparedImages} />
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
