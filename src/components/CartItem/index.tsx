import React, { ChangeEvent, FC } from "react"
import style from "./style.module.scss"
import { OrderItemType, OrderType } from "../../store/features/order/orderSlice"
import defaultImage from "./../../assets/images/404bg.jpeg"
import { serverURL } from "../../axios/customFetch"
import { SelectDropdown } from "../pageBlocks/inputs/SelectDropdown"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { addToCart, updateOrder } from "../../store/features/order/thunks"
import { selectOrder } from "../../store/features/order/selector"
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
	const { order } = useSelector(selectOrder)

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
	return (
		<div className={style.wrapper}>
			<img
				className={style.image}
				src={image ? serverURL + image : defaultImage}
				alt=""
			/>
			<div className={style.title}>{title}</div>
			<div className={style["some-actions"]}>
				<div className={style.credit}>
					<span>{Math.floor(price / 6)} ₽</span> / мес
				</div>
			</div>
			<div className={style.price}>
				<div className={style["new-price"]}>
					<div className={style["value"]}>{price} ₽</div>
					<span>со скидкой</span>
				</div>
				<div className={style["oldprice"]}>
					<div className={style["value"]}>
						{Math.floor(price * 1.1)} ₽
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
