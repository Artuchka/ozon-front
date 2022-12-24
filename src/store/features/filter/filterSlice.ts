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
const initialState = {
	sort: "-averageRating",
	minAverageRating: 5,
	minPrice: 0,
	maxPrice: 1000,
} as FilterType

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

export const sortOptions = [
	{ title: "Популярные сначала", value: "-averageRating" },
	{ title: "Непопулярные сначала", value: "averageRating" },
	{ title: "Сначала много отзывов", value: "-numOfReviews" },
	{ title: "Сначала мало отзывов", value: "numOfReviews" },
	{ title: "Сначала дешевые", value: "price" },
	{ title: "Сначала дорогие", value: "-price" },
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
			if (name === "page") {
				return { ...state, [`${name}`]: value }
			}
			return { ...state, [name]: value, page: 1 }
		},
	},
})

export const { updateFilters } = filterSlice.actions

export default filterSlice.reducer
