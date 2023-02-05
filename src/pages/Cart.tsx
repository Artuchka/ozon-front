import React, {
	ChangeEvent,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from "react"
import { CartItemsList } from "../components/CartItemsList"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import {
	addToCartMany,
	createOrder,
	updateOrder,
} from "../store/features/order/thunks"
import { AppDispatch } from "../store/store"
import { selectAuth } from "../store/features/auth/selectors"
import { formatPrice } from "../utils/intl"
import { useNavigate } from "react-router-dom"
import {
	OrderItemType,
	OrderType,
	clearSelectedInCart,
	filterSelectedInCart,
	selectManyInCart,
} from "../store/features/order/orderSlice"
import { SingleCheckbox } from "../components/pageBlocks/inputs/SingleCheckbox"
import { toast } from "react-toastify"

export const Cart = () => {
	const dispatch = useDispatch<AppDispatch>()

	const { order, selectedInCart } = useSelector(selectOrder)
	const {
		user: { username },
	} = useSelector(selectAuth)
	const [promoMessage, setPromoMessage] = useState("")
	const promoInputRef = useRef(document.createElement("input"))

	useEffect(() => {
		toast("Друг, попробуй промокды `ZIMA` и `LETO`", { autoClose: 6000 })
	}, [])
	useEffect(() => {
		document.title = `Корзина (${order?.amountTotal}) - OZON`
	}, [order?.amountTotal])

	const orderIds = order?.items?.map((item) => {
		return item.product._id
	})

	const [allSelected, setAllSelected] = useState(false)
	const handleAllSelectedToggle = (e: ChangeEvent<HTMLInputElement>) => {
		if (!allSelected) {
			dispatch(selectManyInCart({ itemsToAdd: orderIds }))
		} else {
			dispatch(clearSelectedInCart())
		}
		setAllSelected((prev) => !prev)
	}

	const navigate = useNavigate()
	const handleCheckout = () => {
		dispatch(
			updateOrder({
				data: { status: "pending" } as OrderType,
				orderId: order._id,
			})
		)
		navigate("/checkout")
	}

	const handlePromoAdd = () => {
		let newDiscount = { type: "minus", value: 0, name: "" }
		let { value } = promoInputRef.current
		value = value.toLowerCase()
		if (value === "leto") {
			newDiscount = { type: "minus", value: 1000, name: value }
		} else if (value === "zima") {
			newDiscount = { type: "percentage", value: 0.9, name: value }
		} else {
			setPromoMessage("Некорректный промокод")
			return
		}
		dispatch(
			updateOrder({
				data: {
					discounts: [...order.discounts, newDiscount],
				} as OrderType,
				orderId: order._id,
			})
		)
		setPromoMessage(`${value.toUpperCase()} применён`)
	}

	const handleDiscountRemove = (discountName: string) => {
		const updatedDiscounts = order.discounts.filter(
			(item) => item.name !== discountName
		)

		dispatch(
			updateOrder({
				data: {
					discounts: updatedDiscounts,
				} as OrderType,
				orderId: order._id,
			})
		)
	}

	const handlePromoKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code !== "Enter") return

		handlePromoAdd()
		promoInputRef.current.value = ""
		promoInputRef.current.focus()
	}

	const handleRemoveSelected = () => {
		const itemsToDelete = selectedInCart.map((item) => {
			return {
				product: { _id: item },
				amount: 0,
			} as OrderItemType
		})
		dispatch(addToCartMany({ items: itemsToDelete, orderId: order._id }))
		dispatch(filterSelectedInCart({ itemsToDelete }))
	}

	useEffect(() => {
		if (!username || Object.keys(order).length > 0) {
			return
		}

		dispatch(createOrder({ status: "cart" }))
	}, [])

	if (order?.itemsLength === 0) {
		return (
			<div className="cart-page empty">
				<h2>Корзина пуста</h2>
				<p>Воспользуйтесь поиском, чтобы найти всё что нужно.</p>
			</div>
		)
	}

	return (
		<div className="cart-page">
			<header className="heading">
				<h1>Корзина</h1>
				<span>{formatPrice(order?.amountTotal)}</span>
			</header>
			<div className="action-tab">
				<SingleCheckbox
					name="selectAll"
					onChange={handleAllSelectedToggle}
					itemId="selectAll"
					selected={allSelected ? ["selectAll"] : []}
					title="Выбрать все"
				/>
				<button
					className="btn btn--warn btn--content"
					onClick={handleRemoveSelected}
				>
					Удалить выбранные
				</button>
			</div>
			<div className="cart-list-wrapper">
				<CartItemsList />
			</div>
			<div className="buy-card">
				<div className="promocode">
					<div className="oneline">
						<input
							type="text"
							className="input input--rounded input--not-required"
							placeholder="Введите промокод"
							ref={promoInputRef}
							onKeyUp={handlePromoKeyUp}
						/>
						<button
							className="btn btn--contained btn--rounded btn--content"
							onClick={handlePromoAdd}
						>
							ок
						</button>
					</div>
					{promoMessage && (
						<small className="promo-message">{promoMessage}</small>
					)}
				</div>
				<button
					className="btn btn--contained btn--success btn--rounded btn--tall btn--text-small"
					onClick={handleCheckout}
				>
					Перейти к оформлению
				</button>
				<small className="checkout-info">
					Доступные способы и время доставки можно выбрать при
					оформлении заказа
				</small>
				<div className="info">
					<div className="buy-card-heading">
						<h3>Ваша корзина</h3>
						<span>{formatPrice(order?.amountTotal)} товара</span>
					</div>
					<small className="subtotal">
						<span className="title">
							Товары ( {formatPrice(order?.amountTotal)} )
						</span>
						<span className="value">
							{formatPrice(order.subtotal)} ₽
						</span>
					</small>
					{order?.discounts?.length > 0 && (
						<small className="discounts">
							<span>Скидка</span>
							<div className="list">
								{order?.discounts?.map((item) => {
									let discountValue = ""
									if (item.type === "percentage") {
										discountValue = `${
											100 - item.value * 100
										} %`
									} else {
										discountValue = `${item.value} ₽`
									}

									return (
										<div
											className="discount-item"
											key={item.name}
										>
											<span className="discount-name">
												- {discountValue} за `
												{item.name}`
											</span>
											<strong
												onClick={() =>
													handleDiscountRemove(
														item.name
													)
												}
											>
												&times;
											</strong>
										</div>
									)
								})}
								<span className="value">
									{formatPrice(order.total - order.subtotal)}{" "}
									₽
								</span>
							</div>
						</small>
					)}
					<div className="total">
						<h3 className="title">Общая стоимость</h3>
						<div className="value">
							{formatPrice(order.total)} ₽
						</div>
					</div>
					<div className="discount-total">
						<small className="title">Со скидкой</small>
						<div className="value">
							{formatPrice(order.total)} ₽
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
