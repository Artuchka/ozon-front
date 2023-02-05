import { createSlice } from "@reduxjs/toolkit"
import {
	addToCart,
	addToCartMany,
	createOrder,
	createPaymentIntent,
	createRefund,
	getAllMyOrders,
	getByOrderId,
	getCart,
	getSingleOrder,
	updateOrder,
} from "./thunks"
import { toast } from "react-toastify"
import { SingleProductType } from "../product/productSlice"
import { UserType } from "../auth/authSlice"

export const deliveryDefault = [
	{
		label: "Измайловский проспект, 24/161, Санкт-Петербург, 190005",
		value: [59.909567, 30.307927],
	},
	{
		label: "1-я Красноармейская улица, 1/21, Санкт-Петербург, 190005",
		value: [59.916365, 30.31576],
	},
	{
		label: "Московский проспект, 4АД, Санкт-Петербург, 190031",
		value: [59.9252, 30.318877],
	},
	{
		label: "Московский проспект, 9В, Санкт-Петербург",
		value: [59.921489, 30.314368],
	},
	{
		label: "Большая Подьяческая улица, 30, Санкт-Петербург, 190068",
		value: [59.920817, 30.305591],
	},
	{
		label: "Садовая улица, 62, Санкт-Петербург, 190068",
		value: [59.921155, 30.302393],
	},
	{
		label: "набережная Адмиралтейского канала, 2Т, Санкт-Петербург, 190000",
		value: [59.929275, 30.2882],
	},
] as { label: string; value: [number, number] }[]

export type OrderItemType = {
	_id: string
	product: SingleProductType
	amount: number
}

type OrderDiscountType = {
	type: "minus" | "percentage"
	value: number
	name: string
}

export type OrderStatusType =
	| "cart"
	| "checkout"
	| "pending"
	| "paid"
	| "delivered"
	| "refunded"

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
	createdAt: Date
	updatedAt: Date
	refundedAt: Date
	paidAt: Date
	deliveryCoordinates: [number, number]
	isCustomCoordinates: boolean
}
type OrdersMap = { [k: string]: OrderType }

export type DetailsType = {
	all: number
	pending: number
	paid: number
	checkout: number
	delivered: number
	refunded: number
}
type AddressType = { street: string; isCustomAddress: boolean }
type OrderInitialStateType = {
	isLoading: boolean
	order: OrderType
	lastOrders: OrdersMap
	haveTried: boolean
	allOrders: {
		isLoading: boolean
		orders: OrderType[]
		details: DetailsType
	}
	singleOrder: {
		isLoading: boolean
		order: OrderType
		address: AddressType
	}
	selectedInCart: string[]

	deliveryCoords: [number, number]
	isCustomCoord: boolean
	customCoord: [number, number]
}

const initialState = {
	haveTried: false,
	isLoading: false,
	order: {} as OrderType,
	lastOrders: {} as OrdersMap,
	allOrders: { isLoading: false, orders: [], details: {} as DetailsType },
	singleOrder: {
		order: {} as OrderType,
		isLoading: false,
		address: { street: "", isCustomAddress: false },
	},
	selectedInCart: [],
	deliveryCoords: deliveryDefault[0].value,
	isCustomCoord: false,
	customCoord: deliveryDefault[0].value,
} as OrderInitialStateType

export type PayloadUpdateOrderType = {
	name: keyof OrderInitialStateType
	value: any
}

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		selectOrderItemById(state, { payload }) {
			if (!state.selectedInCart.includes(payload)) {
				state.selectedInCart.push(payload)
			}
		},
		unselectOrderItemById(state, { payload }) {
			state.selectedInCart = state.selectedInCart.filter(
				(item) => item !== payload
			)
		},
		filterSelectedInCart(state, { payload }) {
			const { itemsToDelete } = payload

			state.selectedInCart = state.selectedInCart.filter((item) =>
				itemsToDelete.includes(item)
			)
		},
		clearSelectedInCart(state) {
			state.selectedInCart = []
		},
		selectManyInCart(state, { payload }) {
			const { itemsToAdd } = payload
			state.selectedInCart = Array.from(
				new Set([...state.selectedInCart, ...itemsToAdd])
			)
		},
		updateDeliveryCoords(
			state,
			{ payload }: { payload: PayloadUpdateOrderType }
		) {
			if (!(state.isCustomCoord && payload.name === "deliveryCoords")) {
				const { name, value } = payload
				state[name] = value
			}
		},
	},
	extraReducers(builder) {
		builder.addCase(updateOrder.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
			const { msg, order }: { msg: string; order: OrderType } = payload

			if (order.status === "paid" || order.status === "delivered") {
				state.lastOrders[order._id] = order
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
		})
		builder.addCase(getCart.rejected, (state, { payload }) => {
			state.haveTried = true
			state.isLoading = false
		})

		builder.addCase(createOrder.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(createOrder.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.isLoading = false
			state.order = order
		})
		builder.addCase(createOrder.rejected, (state, { payload }) => {
			state.isLoading = false
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

		builder.addCase(createRefund.pending, (state, { payload }) => {
			state.singleOrder.isLoading = true
		})
		builder.addCase(createRefund.fulfilled, (state, { payload }) => {
			const { msg, order } = payload
			state.singleOrder.isLoading = false
			state.singleOrder.order = order

			toast.success(msg)
		})
		builder.addCase(createRefund.rejected, (state, { payload }) => {
			state.singleOrder.isLoading = false
			toast.error(payload as string)
		})

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
		})
		builder.addCase(getAllMyOrders.rejected, (state, { payload }) => {
			state.allOrders.isLoading = false
		})

		builder.addCase(getSingleOrder.pending, (state) => {
			state.singleOrder.isLoading = true
		})
		builder.addCase(getSingleOrder.fulfilled, (state, { payload }) => {
			const { msg, order, address } = payload
			state.singleOrder.isLoading = false
			state.singleOrder.order = order
			state.singleOrder.address = address
		})
		builder.addCase(getSingleOrder.rejected, (state, { payload }) => {
			state.singleOrder.isLoading = false
		})
	},
})

export const {
	selectOrderItemById,
	unselectOrderItemById,
	filterSelectedInCart,
	selectManyInCart,
	clearSelectedInCart,
	updateDeliveryCoords,
} = orderSlice.actions

export default orderSlice.reducer
