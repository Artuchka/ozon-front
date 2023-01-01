import React, { FC } from "react"
import style from "./style.module.scss"
import defaultImage from "./../../assets/images/ozon-logo.png"
import { Link } from "react-router-dom"
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

export type ProductItemType = {
	images: string[]
	title: string
	price: number
	averageRating: number
	numOfReviews: number
	_id: string
}
// crossorigin=anonymos should work for images
// or just set up cors correctly u stupid bih

export const ProductItem: FC<ProductItemType> = (props) => {
	const dispatch = useDispatch<AppDispatch>()

	const { images, price, _id, averageRating, title, numOfReviews } = props
	const image = images[0] === "" ? defaultImage : serverURL + images[0]

	const { bookmarks } = useSelector(selectBookmarks)
	const isBookmarked = !!bookmarks.find((item) => item.product._id === _id)

	const handleAddBookmark = () => {
		if (isBookmarked) {
			dispatch(deleteBookmark(_id))
		} else {
			dispatch(addBookmark(_id))
		}
		dispatch(getAllBookmarks())
	}
	return (
		<div className={`${style.product}`}>
			<div className={style.image}>
				<AiFillHeart
					className={`${style.heart} ${
						isBookmarked ? style.bookmarked : ""
					}`}
					onClick={handleAddBookmark}
				/>
				<Link to={`/products/${_id}`}>
					<img src={image} alt="product image" />
				</Link>
			</div>
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
