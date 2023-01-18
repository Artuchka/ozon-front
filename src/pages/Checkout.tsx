import React, { useState, useEffect } from "react"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "../components/CheckoutForm"
import { ozonAPI } from "../axios/customFetch"

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
	const [clientSecret, setClientSecret] = useState("")

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		ozonAPI("/orders/63c7742c255715ae5260b837", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			data: JSON.stringify({ status: "pending" }),
		}).then(({ data }) => setClientSecret(data.clientSecret))
	}, [])

	const appearance: appereanceType = {
		theme: "stripe",
		// theme: "night",
	}
	const options = {
		clientSecret,
		appearance,
	}

	return (
		<div className="checkout-page">
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
