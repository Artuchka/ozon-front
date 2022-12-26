import { createSlice } from "@reduxjs/toolkit"
import {
	createProduct,
	getAllProducts,
	getSingleProduct,
	uploadImages,
} from "./thunks"
import { toast } from "react-toastify"
import { ProductItemType } from "../../../components/ProductItem"

const product = {
	description: "",
	title: "",
	price: 0,
}
export type ListItemProductType = typeof product

type SingleProductType = {
	isLoading: boolean
	activeImage: string
	averageRating: 5
	createdAt: string
	description: string
	id: string
	images: string[]
	numOfReviews: string
	price: string
	reviews: [
		{
			author: {
				avatar: string
				email: string
				username: string
				_id: string
			}
			rating: string
			createdAt: string
			comment: string
			title: string
			_id: string
		}
	]
	specs: []
	tags: []
	title: string
	types: []
	vendor: { avatar: string; username: string }
	updatedAt: string
}
const initialState = {
	products: [
		{
			images: [],
			title: "",
			price: 0,
			averageRating: 0,
			numOfReviews: 0,
			_id: "",
		},
	],
	details: {
		maxPrice: 0,
		minPrice: 0,
		pagesFound: 0,
		productsFound: 0,
		companies: [],
		categories: [],
		tags: [],
	},
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
		reviews: [
			{
				author: { avatar: "", email: "", username: "", _id: "" },
				rating: "",
				createdAt: "",
				comment: "",
				title: "",
				_id: "",
			},
		],
		specs: [],
		tags: [],
		title: null,
		types: [],
		vendor: { avatar: null, username: null },
		updatedAt: null,
	},
	creating: { paths: [], isLoading: false },
}
export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setActiveImage(state, action) {
			state.singleProduct.activeImage = action.payload
		},
		setEdit(state, { payload }) {
			// state.creating.isEditing = true
			// state.creating.editId = payload.id
		},
		unsetEdit(state) {
			// state.creating.isEditing = false
			// state.creating.editId = ""
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createProduct.pending, (state, action) => {
			console.log("pending")
			state.creating.isLoading = true
		})
		builder.addCase(createProduct.fulfilled, (state, action) => {
			state.creating.isLoading = false
			toast.success("created product")
		})
		builder.addCase(createProduct.rejected, (state, action) => {
			state.creating.isLoading = false
			if (typeof action.payload === "string") toast.error(action.payload)
		})

		builder.addCase(getAllProducts.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
			const { products, details } = payload
			state.details = details
			state.products = products
			state.isLoading = false
		})
		builder.addCase(getAllProducts.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
			state.isLoading = false
		})
		builder.addCase(getSingleProduct.pending, (state, action) => {
			state.singleProduct.isLoading = true
		})
		builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
			const { product } = payload
			state.singleProduct = product
			state.singleProduct.isLoading = false
		})
		builder.addCase(getSingleProduct.rejected, (state, action) => {
			state.singleProduct.isLoading = false
			if (typeof action.payload === "string") toast.error(action.payload)
		})

		builder.addCase(uploadImages.pending, (state, action) => {
			state.creating.isLoading = true
		})
		builder.addCase(uploadImages.fulfilled, (state, { payload }) => {
			const { msg, paths } = payload
			toast.success(msg)
			state.creating.paths = paths
			state.creating.isLoading = false
		})
		builder.addCase(uploadImages.rejected, (state, action) => {
			state.creating.isLoading = false
			if (typeof action.payload === "string") toast.error(action.payload)
		})
	},
})

export const { setActiveImage, setEdit, unsetEdit } = productSlice.actions

export default productSlice.reducer
