import React, { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { updateOrder } from "../store/features/order/thunks"
import { OrderType } from "../store/features/order/orderSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { AppDispatch } from "../store/store"
import { AiFillCheckCircle } from "react-icons/ai"
import { SlCreditCard } from "react-icons/sl"
import { Link } from "react-router-dom"
import { formatPrice } from "../utils/intl"
import { PaymentSuccessSkeleton } from "../components/pageBlocks/Skeletons/PaymentSuccessSkeleton"

export const PaymentSuccess = () => {
	const { search } = useLocation()
	const { order, lastOrders } = useSelector(selectOrder)
	const dispatch = useDispatch<AppDispatch>()
	const searchParams = new URLSearchParams(search)
	const orderId = searchParams.get("orderId") as string
	const status = searchParams.get("redirect_status")

	const paidOrder = Object.entries(lastOrders).find(([orderId, order]) => {
		if (order._id === orderId) {
			return true
		}
	})?.[1]
	console.log({ paidOrder })

	useEffect(() => {
		document.title = "Итоги оплаты - OZON"
	}, [])

	useEffect(() => {
		if (status === "succeeded") {
			dispatch(
				updateOrder({
					data: { status: "paid" } as OrderType,
					orderId,
				})
			)
		}
	}, [])

	if (!paidOrder || Object.keys(paidOrder).length === 0) {
		return <PaymentSuccessSkeleton />
	}

	return (
		<div className="payment-success-page">
			<h2 className="heading">
				<AiFillCheckCircle /> <span>Ваш заказ успешно оплачен</span>
			</h2>
			<h3 className="details">
				<SlCreditCard />{" "}
				<span>Оплачено {formatPrice(paidOrder.total)} ₽</span>
			</h3>

			<Link to="/my/orders" className="btn btn--light">
				Перейти к листингу заказов
			</Link>
		</div>
	)
}
