import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	token: "",
}

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
})

export const {} = productSlice.actions

export default productSlice.reducer
