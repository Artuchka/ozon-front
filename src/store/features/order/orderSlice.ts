import { createSlice } from "@reduxjs/toolkit"
import {
	addToCart,
	addToCartMany,
	createOrder,
	createPaymentIntent,
	getAllMyOrders,
	getByOrderId,
	getCart,
	getOrderByPaymentSecret,
	getSingleOrder,
	updateOrder,
} from "./thunks"
import { toast } from "react-toastify"
import { SingleProductType } from "../product/productSlice"
import { UserType } from "../auth/authSlice"

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
	user: UserType
}
type OrdersMap = { [k: string]: OrderType }

export type DetailsType = {
	all: number
	pending: number
	paid: number
	checkout: number
	delivered: number
	declined: number
}
type InitialStateType = {
	isLoading: boolean
	order: OrderType
	lastOrders: OrdersMap
	haveTried: boolean
	allOrders: {
		isLoading: boolean
		orders: OrderType[]
		details: DetailsType
	}
	singleOrder: OrderType
}

const initialState = {
	haveTried: false,
	isLoading: false,
	order: {} as OrderType,
	lastOrders: {} as OrdersMap,
	allOrders: { isLoading: false, orders: [], details: {} as DetailsType },
	singleOrder: {} as OrderType,
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
			const { msg, order }: { msg: string; order: OrderType } = payload

			if (order.status === "paid" || order.status === "delievered") {
				state.lastOrders[order._id] = order
				console.log("GETTING", order.status)
			} else {
				state.order = order
			}
			state.isLoading = false
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

		builder.addCase(addToCartMany.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(addToCartMany.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.order = order

			toast.success(msg)
		})
		builder.addCase(addToCartMany.rejected, (state, { payload }) => {
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

		builder.addCase(getOrderByPaymentSecret.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(
			getOrderByPaymentSecret.fulfilled,
			(state, { payload }) => {
				const { msg, order } = payload
				state.isLoading = false
				state.lastOrders[order._id] = order

				toast.success(msg)
			}
		)
		builder.addCase(
			getOrderByPaymentSecret.rejected,
			(state, { payload }) => {
				state.isLoading = false
				toast.error(payload as string)
			}
		)

		builder.addCase(getByOrderId.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getByOrderId.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.lastOrders[order._id] = order

			toast.success(msg)
		})
		builder.addCase(getByOrderId.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})

		builder.addCase(getAllMyOrders.pending, (state) => {
			state.allOrders.isLoading = true
		})
		builder.addCase(getAllMyOrders.fulfilled, (state, { payload }) => {
			const { msg, orders, details } = payload
			state.allOrders.isLoading = false
			state.allOrders.orders = orders
			state.allOrders.details = details

			toast.success(msg)
		})
		builder.addCase(getAllMyOrders.rejected, (state, { payload }) => {
			state.allOrders.isLoading = false
			toast.error(payload as string)
		})

		builder.addCase(getSingleOrder.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getSingleOrder.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.singleOrder = order

			toast.success(msg)
		})
		builder.addCase(getSingleOrder.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})
	},
})

export default orderSlice.reducer
