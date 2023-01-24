import React, {
	ChangeEvent,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from "react"
import { SelectCheckbox } from "../components/pageBlocks/inputs/SelectCheckbox"
import { CartItemsList } from "../components/CartItemsList"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { createOrder, updateOrder } from "../store/features/order/thunks"
import { AppDispatch } from "../store/store"
import { Loading } from "../components/Loading"
import { selectAuth } from "../store/features/auth/selectors"
import { formatPrice } from "../utils/intl"
import { useNavigate } from "react-router-dom"
import { OrderType } from "../store/features/order/orderSlice"

export const Cart = () => {
	const dispatch = useDispatch<AppDispatch>()

	const { order, isLoading } = useSelector(selectOrder)
	const { username } = useSelector(selectAuth)
	const [promoMessage, setPromoMessage] = useState("")
	const promoInputRef = useRef(document.createElement("input"))

	const [selected, setSelected] = useState(["Выбрать все"])
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, checked, value } = e.target
		console.log({ name, checked })
		setSelected((prev) => {
			if (checked) {
				return [...prev, value]
			}
			return prev.filter((v) => v !== value)
		})
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
		let newDiscount = { type: "minus", value: 100 }
		let { value } = promoInputRef.current
		value = value.toLowerCase()
		if (value === "leto") {
			newDiscount = { type: "minus", value: 1000 }
		} else if (value === "zima") {
			newDiscount = { type: "percentage", value: 0.9 }
		} else {
			setPromoMessage("Некорректный промокод")
			return
		}
		dispatch(
			updateOrder({
				data: { discounts: [newDiscount] } as OrderType,
				orderId: order._id,
			})
		)
		setPromoMessage("Скидки подключены")
	}

	const handlePromoKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		console.log(e)

		if (e.code !== "Enter") return

		handlePromoAdd()
		promoInputRef.current.value = ""
		promoInputRef.current.focus()
	}

	useEffect(() => {
		if (!username || Object.keys(order).length > 0) {
			return
		}

		dispatch(createOrder({ status: "cart" }))
		console.log("after creating cart")
	}, [])

	return (
		<div className="cart-page">
			<header className="heading">
				<h1>Корзина</h1>
				<span>{formatPrice(order?.amountTotal)}</span>
			</header>
			{order?.itemsLength > 0 ? (
				<>
					<div className="action-tab">
						<SelectCheckbox
							items={["Выбрать все"]}
							onChange={handleChange}
							name="selectAll"
							selected={selected}
						/>
						<button className="btn btn--warn btn--content">
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
								<small className="promo-message">
									{promoMessage}
								</small>
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
								<span>
									{formatPrice(order?.amountTotal)} товара
								</span>
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
									<span className="value">
										{formatPrice(
											order.total - order.subtotal
										)}{" "}
										₽
									</span>
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
				</>
			) : (
				<>
					<h1>Я пуста</h1>
					<p>Наполни меня, прошу =*</p>
				</>
			)}
		</div>
	)
}
