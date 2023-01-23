import React, { FC } from "react"
import { useSelector } from "react-redux"
import { selectOrder } from "../../store/features/order/selector"
import { OrderGridItem } from "../OrderGridItem"
import style from "./style.module.scss"
import { selectFilters } from "../../store/features/filter/selector"
import { OrderItemSkeleton } from "../pageBlocks/Skeletons/OrderItemSkeleton"

export const OrdersGrid: FC = () => {
	const { allOrders } = useSelector(selectOrder)
	const { orderFilters } = useSelector(selectFilters)
	if (allOrders.isLoading) {
		return (
			<div className={style.wrapper}>
				<OrderItemSkeleton />
				<OrderItemSkeleton />
				<OrderItemSkeleton />
				<OrderItemSkeleton />
				<OrderItemSkeleton />
				<OrderItemSkeleton />
				<OrderItemSkeleton />
			</div>
		)
	}
	return (
		<div className={style.wrapper}>
			{allOrders?.orders
				?.filter(
					(order) =>
						!(order.subtotal === 0) &&
						(orderFilters.status === "all" ||
							orderFilters.status === order.status)
				)
				// ?.slice(0, 3)
				?.map((order) => {
					return <OrderGridItem key={order._id} {...order} />
				})}
		</div>
	)
}
