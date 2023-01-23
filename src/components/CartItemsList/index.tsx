import React, { useEffect } from "react"
import style from "./style.module.scss"
import { CartItem } from "../CartItem"
import { useSelector } from "react-redux"
import { selectOrder } from "../../store/features/order/selector"
import { Loading } from "../Loading"
import { ozonAPI } from "../../axios/customFetch"
import { CartItemSkeleton } from "../pageBlocks/Skeletons/CartItemSkeleton"

export const CartItemsList = () => {
	const { order, isLoading } = useSelector(selectOrder)
	const { items } = order

	if (isLoading) {
		return (
			<div className={style.wrapper}>
				<CartItemSkeleton />
				<CartItemSkeleton />
				<CartItemSkeleton />
				<CartItemSkeleton />
			</div>
		)
	}
	return (
		<div className={style.wrapper}>
			{items?.map((item) => {
				return <CartItem key={item.product._id} {...item} />
			})}
		</div>
	)
}
