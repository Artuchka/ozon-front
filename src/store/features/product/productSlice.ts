import { createSlice } from "@reduxjs/toolkit"
import { createProduct } from "./thunks"
import { toast } from "react-toastify"

const initialState = {
	description: "lorem ipsum description",
	title: "11111",
	price: 200,
}
export type ProductType = typeof initialState

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
	},
})

export const {} = productSlice.actions

export default productSlice.reducer
