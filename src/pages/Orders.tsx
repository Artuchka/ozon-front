import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllMyOrders } from "../store/features/order/thunks"
import { AppDispatch } from "../store/store"
import { OrdersGrid } from "../components/OrdersGrid"
import { OrderFilters } from "../components/OrderFilters"

export const Orders = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(getAllMyOrders())
	}, [])

	useEffect(() => {
		document.title = "Заказы - OZON"
	}, [])

	return (
		<div className="orders-page">
			<OrderFilters />
			<OrdersGrid />
		</div>
	)
}
