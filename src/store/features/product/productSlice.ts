import { createSlice } from "@reduxjs/toolkit"
import {
	createProduct,
	getAllProducts,
	getSingleProduct,
	uploadImages,
} from "./thunks"
import { toast } from "react-toastify"

const product = {
	description: "",
	title: "",
	price: 0,
}
export type ListItemProductType = typeof product

const initialState = {
	products: [],
	isLoading: true,
	singleProduct: {
		isLoading: true,
		activeImage: null,
		averageRating: 5,
		createdAt: null,
		description: null,
		id: null,
		images: [],
		numOfReviews: null,
		price: null,
		reviews: [],
		specs: [],
		tags: [],
		title: null,
		types: [],
		vendor: { avatar: null, username: null },
		updatedAt: null,
	},
	creating: { paths: [] },
}
export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setActiveImage(state, action) {
			state.singleProduct.activeImage = action.payload
		},
	},
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
			state.isLoading = false
		})
		builder.addCase(getAllProducts.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
			state.isLoading = false
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

		builder.addCase(uploadImages.pending, (state, action) => {
			console.log("pending")
		})
		builder.addCase(uploadImages.fulfilled, (state, { payload }) => {
			const { msg, paths } = payload
			toast.success(msg)
			state.creating.paths = paths
		})
		builder.addCase(uploadImages.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
		})
	},
})

export const { setActiveImage } = productSlice.actions

export default productSlice.reducer
