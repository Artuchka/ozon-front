import React, { useState, useEffect } from "react"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "../components/CheckoutForm"
import { ozonAPI } from "../axios/customFetch"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../store/features/order/selector"
import { Loading } from "../components/Loading"
import { AppDispatch } from "../store/store"
import { createPaymentIntent } from "../store/features/order/thunks"

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
		return <Loading />
	}
	return (
		<div className="checkout-page">
			<h3>
				Снизу тестовые данные карты (я не спишу с вас деняк, у меня
				хватает)
			</h3>
			<p>4242</p>
			<p>4242 4242 4242 4242</p>
			{clientSecret && (
				<Elements
					options={options as StripeElementsOptions}
					stripe={stripePromise}
				>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	)
}
