import { createSlice } from "@reduxjs/toolkit"
import { getAllStats, getSingleStatByProductId } from "./thunks"
import { toast } from "react-toastify"
import { SingleProductType } from "../product/productSlice"

export type ActionsDetails = {
	date: Date
	user: string
}

export type StatsType = {
	product: SingleProductType
	visits: ActionsDetails[]
	bought: ActionsDetails[]
	refunded: ActionsDetails[]
	bookmarked: ActionsDetails[]
	productDetails?: SingleProductType[]
}

export type ActionHistoryType = [
	ActionsDetails[],
	ActionsDetails[],
	ActionsDetails[],
	ActionsDetails[]
][]

type ProductsTotalsType = {
	totalPrice: number
	averagePrice: number
	productsAmount: number
	averageImagesAmount: number
	averageRating: number
	averageNumOfReviews: number
}
type StatInitialStateType = {
	allStats: {
		isLoading: boolean
		stats: StatsType[]
		actionsHistory: ActionHistoryType
		productsTotals: ProductsTotalsType
	}
	singleStat: {
		isLoading: boolean
		stat: StatsType
		actionsHistory: ActionHistoryType
	}
}

const initialState = {
	allStats: {
		stats: [],
		isLoading: false,
		actionsHistory: [],
		productsTotals: {} as ProductsTotalsType,
	},
	singleStat: {
		stat: {} as StatsType,
		isLoading: false,
		actionsHistory: [],
	},
} as StatInitialStateType

const statsSlice = createSlice({
	name: "stats",
	initialState,
	reducers: {
		setActionsHistory(state, { payload }) {
			state.singleStat.actionsHistory = payload
		},
		setAllActionsHistory(state, { payload }) {
			state.allStats.actionsHistory = payload
		},
	},
	extraReducers(builder) {
		builder.addCase(
			getSingleStatByProductId.pending,
			(state, { payload }) => {
				state.singleStat.isLoading = true
			}
		)
		builder.addCase(
			getSingleStatByProductId.fulfilled,
			(state, { payload }) => {
				const { msg, stat } = payload
				state.singleStat.stat = stat
				state.singleStat.isLoading = false
			}
		)
		builder.addCase(
			getSingleStatByProductId.rejected,
			(state, { payload }) => {
				state.singleStat.isLoading = false

				toast.error(payload as string)
			}
		)

		builder.addCase(getAllStats.pending, (state, { payload }) => {
			state.allStats.isLoading = true
		})
		builder.addCase(getAllStats.fulfilled, (state, { payload }) => {
			const { msg, stats, productsTotals } = payload
			state.allStats.stats = stats
			state.allStats.productsTotals = productsTotals
			state.allStats.isLoading = false
		})
		builder.addCase(getAllStats.rejected, (state, { payload }) => {
			state.allStats.isLoading = false

			toast.error(payload as string)
		})
	},
})

export const { setActionsHistory, setAllActionsHistory } = statsSlice.actions

export default statsSlice.reducer
