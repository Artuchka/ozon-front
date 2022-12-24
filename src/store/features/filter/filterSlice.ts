import { createSlice } from "@reduxjs/toolkit"

export type FilterType = {
	title?: string
	imagesAmount?: number
	minPrice?: number
	maxPrice?: number
	minAverageRating?: number
	maxAverageRating?: number
	numOfReviews?: number
	limit?: number
	page?: number
	sort?: string
}
const initialState = {} as FilterType
console.log(initialState)

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {},
})

export const {} = filterSlice.actions

export default filterSlice.reducer
