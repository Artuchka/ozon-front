import React, { FC } from "react"
import { useSelector } from "react-redux"
import { selectOrder } from "../../store/features/order/selector"
import { OrderGridItem } from "../OrderGridItem"
import style from "./style.module.scss"

export const OrdersGrid: FC = () => {
	const { allOrders } = useSelector(selectOrder)

	return (
		<div className={style.wrapper}>
			{allOrders?.orders
				?.filter(
					(order) =>
						!(order.status === "cart" || order.subtotal === 0)
				)
				?.map((order) => {
					return <OrderGridItem key={order._id} {...order} />
				})}
		</div>
	)
}
