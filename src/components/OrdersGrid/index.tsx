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
	const filteredOrders = allOrders?.orders?.filter(
		(order) =>
			!(order.subtotal === 0) &&
			(orderFilters.status === "all" ||
				orderFilters.status === order.status)
	)
	return (
		<div className={style.wrapper}>
			{filteredOrders?.length === 0 ? (
				<div className={style.placeholder}>
					<h2>Покамест пусто</h2>
					<p>Ждём пополнения?</p>
				</div>
			) : (
				filteredOrders?.map((order) => {
					return <OrderGridItem key={order._id} {...order} />
				})
			)}
		</div>
	)
}
