import { createSlice } from "@reduxjs/toolkit"
import {
	createProduct,
	fetchEdit,
	getAllProducts,
	getMyProducts,
	getProductDetails,
	getSingleProduct,
	getSuggestedProducts,
	updateProduct,
	uploadImages,
} from "./thunks"
import { toast } from "react-toastify"
import { UserType } from "../auth/authSlice"

const product = {
	description: "",
	title: "",
	price: 0,
}
export type ListItemProductType = typeof product

export type SingleProductType = {
	isLoading: boolean
	activeImage: string
	averageRating: number
	createdAt: string
	description: string
	_id: string
	images: string[]
	numOfReviews: number
	price: number
	reviews: [
		{
			author: {
				avatar: string
				email: string
				username: string
				_id: string
			}
			rating: number
			images: string[]
			videos: string[]
			createdAt: string
			comment: string
			title: string
			_id: string
		}
	]
	specs: []
	tags: string[]
	categories: string[]
	companies: string[]
	title: string
	types: []
	vendor: UserType
	updatedAt: string
}

export type ProductType = {
	images: string[]
	title: string
	price: number
	averageRating: number
	numOfReviews: number
	_id: string
}

type DetailsType = {
	pagesFound: number
	productsFound: number

	maxPrice: number
	minPrice: number
	companies: string[]
	categories: string[]
	tags: string[]
}
type CreatingType = {
	paths: string[]
	isLoading: boolean
	product: SingleProductType
}

type EditType = {
	isLoading: boolean
	isEditing: boolean
	isError: boolean
	editId: string
	product: SingleProductType
}

type InitState = {
	singleProduct: SingleProductType
	products: SingleProductType[]
	suggestedProducts: SingleProductType[]
	isLoading: boolean
	myProducts: ProductType[]
	myIsLoading: boolean
	details: DetailsType
	creating: CreatingType
	edit: EditType
}

const initialState = {
	singleProduct: { isLoading: true },
	isLoading: true,
	details: {
		maxPrice: 0,
		minPrice: 0,
		pagesFound: 0,
		productsFound: 0,

		companies: [""],
		categories: [""],
		tags: [""],
	},
	creating: { isLoading: false },
	edit: { isLoading: false, isEditing: false, editId: "" },
} as InitState

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setActiveImage(state, action) {
			state.singleProduct.activeImage = action.payload
		},
		removeImagePath(state, { payload }) {
			state.creating.paths = state.creating.paths.filter(
				(path) => path !== payload
			)
		},
		setImagePath(state, { payload }) {
			state.creating.paths = payload
		},
		setEdit(state, { payload }) {
			state.edit.isEditing = true
			state.edit.editId = payload.id
		},
		unsetEdit(state) {
			state.creating.paths = []
			state.edit.isEditing = false
			state.edit.isError = false
			state.edit.editId = ""
			state.edit.product = {} as SingleProductType
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createProduct.pending, (state) => {
			state.creating.isLoading = true
		})
		builder.addCase(createProduct.fulfilled, (state, { payload }) => {
			const { msg } = payload
			state.creating.isLoading = false
			toast.success(msg)
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
			state.details = { ...state.details, ...details }
			state.products = products

			state.isLoading = false
		})
		builder.addCase(getAllProducts.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
			state.isLoading = false
		})

		builder.addCase(getSuggestedProducts.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(
			getSuggestedProducts.fulfilled,
			(state, { payload }) => {
				const { products, details } = payload
				state.suggestedProducts = products
				state.isLoading = false
			}
		)
		builder.addCase(getSuggestedProducts.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
			state.isLoading = false
		})

		builder.addCase(getProductDetails.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(getProductDetails.fulfilled, (state, { payload }) => {
			const { details } = payload
			state.details = { ...state.details, ...details }
			state.isLoading = false
		})
		builder.addCase(getProductDetails.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
			state.isLoading = false
		})

		builder.addCase(getMyProducts.pending, (state, action) => {
			state.myIsLoading = true
		})
		builder.addCase(getMyProducts.fulfilled, (state, { payload }) => {
			const { products } = payload
			state.myProducts = products
			state.myIsLoading = false
		})
		builder.addCase(getMyProducts.rejected, (state, action) => {
			if (typeof action.payload === "string") toast.error(action.payload)
			state.myIsLoading = false
		})

		builder.addCase(getSingleProduct.pending, (state, action) => {
			state.singleProduct.isLoading = true
		})
		builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
			const { product } = payload
			state.singleProduct = { ...state.singleProduct, ...product }
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
			state.creating.paths = paths
			state.creating.isLoading = false
			toast.success(msg)
		})
		builder.addCase(uploadImages.rejected, (state, action) => {
			state.creating.isLoading = false
			if (typeof action.payload === "string") toast.error(action.payload)
		})

		builder.addCase(fetchEdit.pending, (state, action) => {
			state.edit.isLoading = true
		})
		builder.addCase(fetchEdit.fulfilled, (state, { payload }) => {
			const { msg, product } = payload
			state.edit.product = product
			state.edit.isError = false
			state.edit.isLoading = false
			toast.success(msg)
		})
		builder.addCase(fetchEdit.rejected, (state, { payload }) => {
			state.edit.isLoading = false
			state.edit.isError = true
			if (typeof payload === "string") toast.error(payload)
		})

		builder.addCase(updateProduct.pending, (state, action) => {
			state.edit.isLoading = true
		})
		builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
			const { msg, product } = payload
			state.edit.isError = false
			state.edit.isLoading = false
			toast.success(msg)
		})
		builder.addCase(updateProduct.rejected, (state, { payload }) => {
			state.edit.isLoading = false
			state.edit.isError = true
			if (typeof payload === "string") toast.error(payload)
		})
	},
})

export const {
	setActiveImage,
	setEdit,
	unsetEdit,
	setImagePath,
	removeImagePath,
} = productSlice.actions

export default productSlice.reducer
