import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { useParams } from "react-router-dom"
import { AppDispatch } from "../store/store"
import { QRCodeSVG } from "qrcode.react"

import {
	addToCart,
	addToCartMany,
	createRefund,
	getSingleOrder,
} from "../store/features/order/thunks"
import { formatPhone, formatPrice, getIntlDate } from "../utils/intl"
import { TfiLocationPin } from "react-icons/tfi"
import { BiFace } from "react-icons/bi"
import { FiCreditCard } from "react-icons/fi"
import { TbCopy } from "react-icons/tb"
import { Loading } from "../components/Loading"
import { toast } from "react-toastify"
import { OrderDetailsList } from "../components/OrderDetailsList"
import { OrderDetailsSkeleton } from "../components/pageBlocks/Skeletons/OrderDetailsSkeleton"
import {
	DetailsType,
	OrderStatusType,
} from "../store/features/order/orderSlice"

const statusMap = {
	cart: "оплата идет",
	pending: "оплата идет",
	paid: "оплачен",
	checkout: "ожидает оплаты",
	delivered: "доставлен",
	refunded: "возвращен",
}
export const SingleOrder = () => {
	const [QRcodeShow, setQRcodeShow] = useState(false)
	const { isLoading, singleOrder, order } = useSelector(selectOrder)
	const { orderId } = useParams()
	const dispatch = useDispatch<AppDispatch>()
	console.log({ orderId })
	console.log({ singleOrder })

	useEffect(() => {
		dispatch(getSingleOrder(orderId as string))
	}, [])

	if (singleOrder.isLoading) {
		return (
			<div className="single-order-page">
				<OrderDetailsSkeleton />
			</div>
		)
	}
	const {
		shippingFee,
		total,
		subtotal,
		user,
		items,
		paidAt,
		createdAt,
		status,
	} = singleOrder.order

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(orderId as string)
		toast.success(`Номер ${orderId} скопирован в буфер обмена`, {
			position: "bottom-right",
		})
	}

	const handleRepeatOrder = () => {
		dispatch(
			addToCartMany({
				orderId: order._id,
				items,
			})
		)
	}
	const handleRefundOrder = () => {
		dispatch(createRefund(orderId as string))
	}

	return (
		<div className="single-order-page">
			<header className="heading">
				<h2 className="id">
					Заказ №{orderId}
					<TbCopy onClick={handleCopyToClipboard} className="copy" />
				</h2>
				<div className="date">
					от{" "}
					{getIntlDate(new Date(paidAt || createdAt || Date.now()))}
				</div>
				<div className="status">
					{statusMap[status as OrderStatusType]} от{" "}
					{getIntlDate(new Date(paidAt || createdAt || Date.now()))}
				</div>
			</header>
			<main className="main-info">
				<div className="delivery">
					<TfiLocationPin className="logo" />
					<div className="text">
						<h3>Доставка в пункт выдачи</h3>
						<p>
							{singleOrder?.address?.street ||
								"ул. Ленина, Москва"}
							,
							{singleOrder?.address?.isCustomAddress
								? " - Курьером"
								: " - Пункт выдачи"}
						</p>
					</div>
				</div>
				<div className="recipient">
					<BiFace className="logo" />
					<div className="text">
						<h3>Получатель</h3>
						<p>
							{user?.firstName} {user?.lastName}
						</p>
						<p>{user?.email}</p>
						<p>{user?.phone}</p>
						<p>{formatPhone(user?.phone)}</p>
					</div>
				</div>
				<div className="totals">
					<FiCreditCard className="logo" />
					<div className="text">
						<h3>
							<span>Оплачено</span>
							<span>{formatPrice(total)} ₽</span>
						</h3>
						<p className="payment-method">Картой онлайн **2551</p>
						<p>
							<span>Товары</span>
							<span>{formatPrice(subtotal)} ₽</span>
						</p>
						<p>
							<span>Доставка</span>
							<span>
								{shippingFee > 0 ? shippingFee : "Бесплатно"}
							</span>
						</p>
						<h3>
							<span>Итого</span>
							<span>{formatPrice(total)} ₽</span>
						</h3>
					</div>
				</div>
				<div className="actions">
					{paidAt && (
						<button
							className="btn btn--transparent btn--content btn--light"
							onClick={() => setQRcodeShow(true)}
						>
							Электронный чек
						</button>
					)}
					<button
						className="btn btn--transparent btn--content btn--light"
						onClick={handleRepeatOrder}
					>
						Повторить заказ
					</button>
					<button
						className="btn btn--transparent btn--content btn--light"
						onClick={handleRefundOrder}
					>
						Вернуть товары
					</button>
				</div>
				{QRcodeShow && (
					<QRCodeSVG
						value="https://github.com/Artuchka"
						bgColor="var(--gray-bg-lighter)"
						className="qrcode"
					/>
				)}
			</main>

			<OrderDetailsList />
		</div>
	)
}
