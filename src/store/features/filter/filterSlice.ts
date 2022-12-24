import { createSlice } from "@reduxjs/toolkit"

export interface FilterType {
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

type PayloadUpdateType = {
	name: string //keyof FilterType
	value: string | number | boolean
}

export const ratingOptions = [
	{ label: "Худшие", value: "1" },
	{ label: "Плохие", value: "2" },
	{ label: "Средние", value: "3" },
	{ label: "Достойны уважения", value: "4" },
	{ label: "Лучшие", value: "5" },
]

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		updateFilters: (
			state: FilterType,
			{ payload }: { payload: PayloadUpdateType }
		): FilterType | void => {
			const { name, value } = payload
			return { ...state, [name]: value }
		},
	},
})

export const { updateFilters } = filterSlice.actions

export default filterSlice.reducer
