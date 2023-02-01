import React, { FC } from "react"
import style from "./style.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineStar } from "react-icons/ai"
import { AiFillHeart } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import {
	addBookmark,
	deleteBookmark,
	getAllBookmarks,
} from "../../store/features/bookmark/thunks"
import { selectBookmarks } from "../../store/features/bookmark/selector"
import { addToCart } from "../../store/features/order/thunks"
import { selectOrder } from "../../store/features/order/selector"
import { formatPrice } from "../../utils/intl"
import { SlideImageViewer } from "../SlideImageViewer"
import { MdQueryStats } from "react-icons/md"

export type ProductItemType = {
	_id: string
	images: string[]
	title: string
	price: number
	averageRating: number
	numOfReviews: number
	editable?: boolean
	stats?: boolean
	amount?: number
}
// crossorigin=anonymos should work for images
// or just set up cors correctly u stupid bih

export const ProductItem: FC<ProductItemType> = (props) => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const {
		images,
		price,
		_id,
		averageRating,
		title,
		numOfReviews,
		editable = null,
		amount,
		stats = null,
	} = props

	const { order } = useSelector(selectOrder)

	const { bookmarks } = useSelector(selectBookmarks)
	const isBookmarked = !!bookmarks.find((item) => item?.product?._id === _id)

	const handleAddBookmark = () => {
		if (isBookmarked) {
			dispatch(deleteBookmark(_id))
		} else {
			dispatch(addBookmark(_id))
		}
		dispatch(getAllBookmarks())
	}

	const handleEdit = () => {
		navigate(`/create-new?editingId=${_id}`)
	}

	const handleAddToCart = () => {
		dispatch(
			addToCart({
				productId: _id,
				amount: 1,
				orderId: order._id,
			})
		)
	}
	const handleRemoveFromCart = () => {
		dispatch(
			addToCart({
				productId: _id,
				amount: 0,
				orderId: order._id,
			})
		)
	}
	return (
		<div className={`${style.product}`}>
			<div className={style.actions}>
				{editable && (
					<div
						className={`${style.edit} btn btn--light btn--transparent btn--content`}
						onClick={handleEdit}
					>
						Edit
					</div>
				)}
				{stats && (
					<div className={`${style.stats} `}>
						<Link to={`/my/stats/${_id}`}>
							<MdQueryStats />
						</Link>
					</div>
				)}
			</div>
			<div className={style.image}>
				<AiFillHeart
					className={`${style.heart} ${
						isBookmarked ? style.bookmarked : ""
					}`}
					onClick={handleAddBookmark}
				/>
				<Link to={`/products/${_id}`}>
					{/* <img src={image} alt="product image" /> */}
					<SlideImageViewer images={images?.slice(0, 5)} />
				</Link>
			</div>
			<div className={style.price}>{formatPrice(price)} ₽</div>

			<Link to={`/products/${_id}`} className={style.name}>
				<div>
					{title?.slice(0, 40)}
					{title.length > 40 && "..."}
				</div>
			</Link>
			<div className={style.rating}>
				{averageRating || 0} <AiOutlineStar className={style["star"]} />
				{numOfReviews}
			</div>

			{amount === 0 && (
				<button
					className={"btn btn--rounded btn--contained btn--content"}
					onClick={handleAddToCart}
				>
					В корзину
				</button>
			)}
			{(amount as number) > 0 && (
				<button
					className={
						"btn btn--rounded btn--contained btn--content btn--warn"
					}
					onClick={handleRemoveFromCart}
				>
					Убрать из корзины
				</button>
			)}
		</div>
	)
}
