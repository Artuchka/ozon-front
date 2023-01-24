import React, { ChangeEvent, FC } from "react"
import style from "./style.module.scss"
import {
	OrderItemType,
	OrderType,
	selectOrderItemById,
	unselectOrderItemById,
} from "../../store/features/order/orderSlice"
import defaultImage from "./../../assets/images/404bg.jpeg"
import { serverURL } from "../../axios/customFetch"
import { SelectDropdown } from "../pageBlocks/inputs/SelectDropdown"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { addToCart, updateOrder } from "../../store/features/order/thunks"
import { selectOrder } from "../../store/features/order/selector"
import { selectBookmarks } from "../../store/features/bookmark/selector"
import {
	addBookmark,
	deleteBookmark,
	getAllBookmarks,
} from "../../store/features/bookmark/thunks"
import { formatPrice } from "../../utils/intl"
import { Link } from "react-router-dom"
import { SingleCheckbox } from "../pageBlocks/inputs/SingleCheckbox"
const selectAmountOptions = [
	{ value: 1, label: "1" },
	{ value: 2, label: "2" },
	{ value: 3, label: "3" },
	{ value: 4, label: "4" },
	{ value: 5, label: "5" },
	{ value: 6, label: "6" },
	{ value: 7, label: "7" },
	{ value: 8, label: "8" },
	{ value: 9, label: "9" },
	{ value: 10, label: "10" },
]

export const CartItem: FC<OrderItemType> = (props) => {
	const { amount, product } = props

	const { title, price, images, _id: productId } = product
	const image = images?.[0]

	const dispatch = useDispatch<AppDispatch>()
	const { order, selectedInCart } = useSelector(selectOrder)
	const { bookmarks } = useSelector(selectBookmarks)
	const isBookmarked = !!bookmarks.find(
		(item) => item.product._id === productId
	)

	const handleAddBookmark = () => {
		if (isBookmarked) {
			dispatch(deleteBookmark(productId))
		} else {
			dispatch(addBookmark(productId))
		}
		dispatch(getAllBookmarks())
	}
	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target

		dispatch(
			addToCart({
				orderId: order._id,
				amount: parseInt(value),
				productId,
			})
		)
	}

	const handleRemoveFromCart = () => {
		dispatch(
			addToCart({
				productId,
				amount: 0,
				orderId: order._id,
			})
		)
	}

	const handleItemSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target

		if (checked) {
			dispatch(selectOrderItemById(value))
		} else {
			dispatch(unselectOrderItemById(value))
		}
	}
	return (
		<div className={style.wrapper}>
			<SingleCheckbox
				itemId={productId}
				onChange={handleItemSelect}
				name="cart"
				selected={selectedInCart}
				className={style.selectInput}
			/>
			<Link to={`/products/${productId}`} className={style.image}>
				<img src={image ? serverURL + image : defaultImage} alt="" />
			</Link>
			<div className={style.title}>
				{title?.slice(0, 30)}
				{title?.length > 30 && "..."}
			</div>
			<div className={style["some-actions"]}>
				<div className={style.credit}>
					Частями по{" "}
					<span>
						{formatPrice(Math.floor((price * amount) / 6))} ₽
					</span>{" "}
					/ мес
				</div>
				<div className={style.actions}>
					<small
						className={`${
							style.bookmark
						} btn btn--light btn--content ${
							isBookmarked ? "btn--warn" : ""
						}`}
						onClick={handleAddBookmark}
					>
						{isBookmarked ? "В избранном" : "В избранное"}
					</small>
					<small
						className={`${style.delete} btn btn--light btn--content`}
						onClick={handleRemoveFromCart}
					>
						Удалить
					</small>
				</div>
			</div>
			<div className={style.price}>
				<div className={style["new-price"]}>
					<div className={style["value"]}>{formatPrice(price)} ₽</div>
					<span>со скидкой</span>
				</div>
				<div className={style["oldprice"]}>
					<div className={style["value"]}>
						{formatPrice(Math.floor(price * 1.1))} ₽
					</div>
					<span>старая цена</span>
				</div>
			</div>
			<div className={style.amount}>
				<SelectDropdown
					onChange={handleAmountChange}
					options={selectAmountOptions}
					name={productId}
					value={amount}
					light
				/>
			</div>
		</div>
	)
}
