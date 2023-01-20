import React, { FC } from "react"
import style from "./style.module.scss"
import { SingleProductType } from "../../store/features/product/productSlice"
import { OrderType } from "../../store/features/order/orderSlice"

export const OrderGridItem: FC<OrderType> = (props) => {
	const { _id, total, amountTotal } = props
	return (
		<div className={style.wrapper}>
			<div className={style.total}>{total}</div>
			<div className={style.amountTotal}>{amountTotal}</div>
		</div>
	)
}
