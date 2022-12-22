import { createSlice } from "@reduxjs/toolkit"
import { createProduct, getAllProducts, getSingleProduct } from "./thunks"
import { toast } from "react-toastify"

const product = {
	description: "",
	title: "",
	price: 0,
}
export type ListItemProductType = typeof product

const initialState = {
	products: null,
	singleProduct: null,
}
export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createProduct.pending, (state, action) => {
			console.log("pending")
		})
		builder.addCase(createProduct.fulfilled, (state, action) => {
			toast.success("created product")
		})
		builder.addCase(createProduct.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
		})

		builder.addCase(getAllProducts.pending, (state, action) => {
			console.log("pending")
		})
		builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
			const { products } = payload
			state.products = products
		})
		builder.addCase(getAllProducts.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
		})
		builder.addCase(getSingleProduct.pending, (state, action) => {
			console.log("pending")
		})
		builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
			const { product } = payload
			state.singleProduct = product
		})
		builder.addCase(getSingleProduct.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
		})
	},
})

export const {} = productSlice.actions

export default productSlice.reducer
