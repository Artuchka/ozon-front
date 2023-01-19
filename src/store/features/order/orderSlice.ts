import { createSlice } from "@reduxjs/toolkit"
import {
	addToCart,
	createOrder,
	createPaymentIntent,
	getCart,
	updateOrder,
} from "./thunks"
import { toast } from "react-toastify"
import { SingleProductType } from "../product/productSlice"

export type OrderItemType = {
	_id: string
	product: SingleProductType
	// price: number
	// title: string
	// image: string
	amount: number
}

type OrderDiscountType = {
	type: "minus" | "percentage"
	value: number
}

type OrderStatusType = "cart" | "checkout" | "pending" | "paid" | "delievered"

export type OrderType = {
	_id: string
	items: OrderItemType[]
	discounts: OrderDiscountType[]
	shippingFee: number
	subtotal: number
	total: number
	amountTotal: number
	itemsLength: number
	status: OrderStatusType
	clientSecret: string
}

type InitialStateType = {
	isLoading: boolean
	order: OrderType
	haveTried: boolean
}

const initialState = {
	haveTried: false,
	isLoading: false,
	order: {} as OrderType,
} as InitialStateType

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(updateOrder.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.order = order
			toast.success(msg)
		})
		builder.addCase(updateOrder.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})

		builder.addCase(getCart.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(getCart.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.haveTried = true
			state.order = order
			toast.success(msg)
		})
		builder.addCase(getCart.rejected, (state, { payload }) => {
			state.haveTried = true
			state.isLoading = false
			toast.error(payload as string)
		})

		builder.addCase(createOrder.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(createOrder.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.order = order
			toast.success(msg)
		})
		builder.addCase(createOrder.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})

		builder.addCase(addToCart.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(addToCart.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.order = order

			toast.success(msg)
		})
		builder.addCase(addToCart.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})

		builder.addCase(createPaymentIntent.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(createPaymentIntent.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.order = order

			toast.success(msg)
		})
		builder.addCase(createPaymentIntent.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})
	},
})

export default orderSlice.reducer
