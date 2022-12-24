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

export type optionType = {
	value: string | number
	label: string
}

export const ratingOptions = [
	{ label: "Худшие", value: "1" },
	{ label: "Плохие", value: "2" },
	{ label: "Средние", value: "3" },
	{ label: "Достойны уважения", value: "4" },
	{ label: "Лучшие", value: "5" },
] as optionType[]

export const sortOptions = [
	{ label: "Популярные сначала", value: "-averageRating" },
	{ label: "Непопулярные сначала", value: "averageRating" },
	{ label: "Сначала много отзывов", value: "-numOfReviews" },
	{ label: "Сначала мало отзывов", value: "numOfReviews" },
	{ label: "Сначала дешевые", value: "price" },
	{ label: "Сначала дорогие", value: "-price" },
] as optionType[]

export const pageOptions = [
	{ label: "По 1", value: "1" },
	{ label: "По 2", value: "2" },
	{ label: "По 3", value: "3" },
	{ label: "По 4", value: "4" },
	{ label: "По 5", value: "5" },
	{ label: "По 6", value: "6" },
] as optionType[]

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
