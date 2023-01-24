import React, { FC } from "react"
import style from "./style.module.scss"
import { SingleProductType } from "../../store/features/product/productSlice"
import { OrderItemType } from "../../store/features/order/orderSlice"
import { Link } from "react-router-dom"
import { serverURL } from "../../axios/customFetch"
import { formatPrice } from "../../utils/intl"
import { AiFillHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { selectBookmarks } from "../../store/features/bookmark/selector"
import { AppDispatch } from "../../store/store"
import {
	addBookmark,
	deleteBookmark,
	getAllBookmarks,
} from "../../store/features/bookmark/thunks"
import { addToCart } from "../../store/features/order/thunks"
import { selectOrder } from "../../store/features/order/selector"
import { Loading } from "../Loading"

export const OrderDetailsListItem: FC<OrderItemType> = (props) => {
	const { images, title, price, _id: productId, vendor } = props?.product
	const { amount } = props

	const { order, isLoading } = useSelector(selectOrder)
	const { bookmarks } = useSelector(selectBookmarks)
	const isBookmarked = !!bookmarks.find(
		(item) => item.product._id === productId
	)

	const amountFound = order?.items?.filter(
		(i) => i?.product?._id === productId
	)
	const amountInCart =
		amountFound?.length === 0 ? 0 : amountFound?.[0]?.amount

	const dispatch = useDispatch<AppDispatch>()

	const handleAddBookmark = () => {
		if (isBookmarked) {
			dispatch(deleteBookmark(productId))
		} else {
			dispatch(addBookmark(productId))
		}
		dispatch(getAllBookmarks())
	}

	const handleSetAmount = (newAmount: number) => {
		dispatch(
			addToCart({ amount: newAmount, productId, orderId: order._id })
		)
	}
	return (
		<div className={style.wrapper}>
			<div className={style.vendor}>
				{vendor.firstName} {vendor.lastName}
			</div>
			<div className={style.card}>
				<div className={style.image}>
					<Link to={`/products/${productId}`}>
						<img src={serverURL + images?.[0]} alt={images?.[0]} />
					</Link>
				</div>
				<div className={style.title}>
					<Link to={`/products/${productId}`}>{title}</Link>
				</div>
				<div className={style.price}>
					<h3>{formatPrice(price * amount)} ₽</h3>
					{amount > 1 && (
						<span>
							{amount} шт по {formatPrice(price)} ₽
						</span>
					)}
				</div>
				<div className={style.actions}>
					{isLoading ? (
						<Loading />
					) : (
						<>
							{amountInCart === 0 && (
								<button
									className="btn btn--middle btn--content"
									onClick={() => handleSetAmount(amount)}
								>
									В корзину
								</button>
							)}
							{amountInCart > 0 && (
								<div className={style.adder}>
									<button
										className={
											"btn btn--middle btn--content btn--small-padding btn--square"
										}
										onClick={() =>
											handleSetAmount(amountInCart - 1)
										}
									>
										<AiOutlineMinus />
									</button>
									<span>{amountInCart} шт.</span>
									<button
										className={
											"btn btn--middle btn--content btn--square btn--small-padding"
										}
										onClick={() =>
											handleSetAmount(amountInCart + 1)
										}
									>
										<AiOutlinePlus />
									</button>
								</div>
							)}
						</>
					)}
					<button
						onClick={handleAddBookmark}
						className={`btn btn--middle btn--content ${
							style.heart
						} ${isBookmarked ? style.bookmarked : ""}`}
					>
						<AiFillHeart />
					</button>
				</div>
			</div>
		</div>
	)
}
