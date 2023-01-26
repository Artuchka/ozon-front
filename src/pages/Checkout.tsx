import React, { useEffect } from "react"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "../components/CheckoutForm"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { AppDispatch } from "../store/store"
import { createPaymentIntent } from "../store/features/order/thunks"
import { CheckoutSkeleton } from "../components/pageBlocks/Skeletons/CheckoutSkeleton"
import { SelectDeliveryMap } from "../components/SelectDeliveryMap"
import { isCoordsEqual } from "../utils/coords"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
	"pk_test_51MAxWLBjYPBxkDu0JU1W29d2Icv8fwmeFmwkuXJxRRFgr9LNRnEYbziOVUp4aP7OknkLOU700urwAjKfMqp4Etet00O8XDc3GM"
)

type appereanceType = {
	theme: "stripe" | "night" | "flat" | "none" | undefined
}

export const Checkout = () => {
	const { order, isLoading } = useSelector(selectOrder)
	const { clientSecret } = order
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		dispatch(createPaymentIntent(order._id))
	}, [])

	const appearance: appereanceType = {
		theme: "stripe",
		// theme: "night",
	}
	const options = {
		clientSecret,
		appearance,
	}
	if (isLoading || clientSecret === "placeholder") {
		return (
			<div className="checkout-page skeletons">
				<CheckoutSkeleton />
			</div>
		)
	}
	return (
		<div className="checkout-page">
			<SelectDeliveryMap />
			<div className="info">
				<h3>
					Снизу тестовые данные карты (я не спишу с вас деняк, у меня
					хватает)
				</h3>
				<p>Номер карты: 4242 4242 4242 4242</p>
				<p>Срок действия: 04/24</p>
				<p>CVC: 424</p>
				<p>email: Любой корректный</p>
			</div>

			<div className="stripe-form">
				{clientSecret &&
					order?.deliveryCoordinates &&
					!isCoordsEqual([0, 0], order?.deliveryCoordinates) && (
						<Elements
							options={options as StripeElementsOptions}
							stripe={stripePromise}
						>
							<CheckoutForm />
						</Elements>
					)}
			</div>
		</div>
	)
}
