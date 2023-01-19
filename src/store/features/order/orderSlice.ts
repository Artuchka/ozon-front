import { createSlice } from "@reduxjs/toolkit"
import { createOrder, getCart, updateOrder } from "./thunks"
import { toast } from "react-toastify"

export type OrderItemType = {
	_id: string
	product: string
	price: number
	title: string
	image: string
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
	status: OrderStatusType
}

type InitialStateType = {
	isLoading: boolean
	order: OrderType
}

const initialState = {
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
			state.order = order
			toast.success(msg)
		})
		builder.addCase(getCart.rejected, (state, { payload }) => {
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
	},
})

export default orderSlice.reducer
