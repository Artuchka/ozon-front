import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { useParams } from "react-router-dom"
import { AppDispatch } from "../store/store"
import {
	addToCart,
	addToCartMany,
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

export const SingleOrder = () => {
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
	const { shippingFee, total, subtotal, user, items } = singleOrder.order

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
	return (
		<div className="single-order-page">
			<header className="heading">
				<h2 className="id">
					Заказ №{orderId}
					<TbCopy onClick={handleCopyToClipboard} className="copy" />
				</h2>
				<div className="date">от {getIntlDate(Date.now())} </div>
			</header>
			<main className="main-info">
				<div className="delivery">
					<TfiLocationPin className="logo" />
					<div className="text">
						<h3>Доставка в пункт выдачи</h3>
						<p>
							Пункт Ozon, Россия, Санкт-Петербург, Измайловский
							проспект, 16/30
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
					<button className="btn btn--transparent btn--content btn--light">
						Электронный чек
					</button>
					<button
						className="btn btn--transparent btn--content btn--light"
						onClick={handleRepeatOrder}
					>
						Повторить заказ
					</button>
					<button className="btn btn--transparent btn--content btn--light">
						Вернуть товары
					</button>
				</div>
			</main>

			<OrderDetailsList />
		</div>
	)
}
