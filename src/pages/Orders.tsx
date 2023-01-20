import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { getAllMyOrders } from "../store/features/order/thunks"
import { AppDispatch } from "../store/store"
import { OrdersGrid } from "../components/OrdersGrid"

export const Orders = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(getAllMyOrders())
	}, [])
	return (
		<div className="orders-page">
			<OrdersGrid />
		</div>
	)
}
