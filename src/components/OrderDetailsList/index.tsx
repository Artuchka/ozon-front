import React from "react"
import style from "./style.module.scss"
import { useSelector } from "react-redux"
import { selectOrder } from "../../store/features/order/selector"
import { OrderDetailsListItem } from "../OrderDetailsListItem"

export const OrderDetailsList = () => {
	const { singleOrder } = useSelector(selectOrder)

	return (
		<div className={style.wrapper}>
			{singleOrder?.order?.items?.map((item) => {
				return <OrderDetailsListItem key={item._id} {...item} />
			})}
		</div>
	)
}
