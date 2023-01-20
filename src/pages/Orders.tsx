import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { getAllMyOrders } from "../store/features/order/thunks"
import { AppDispatch } from "../store/store"

export const Orders = () => {
	const { allOrders } = useSelector(selectOrder)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(getAllMyOrders())
	}, [])
	return <div>length is {allOrders?.orders?.length}</div>
}
