import { createSlice } from "@reduxjs/toolkit"
import { getSingleStatByProductId } from "./thunks"
import { toast } from "react-toastify"
import { SingleProductType } from "../product/productSlice"

type ActionsDetails = {
	date: Date
	user: string
}

type StatsType = {
	product: SingleProductType
	visits: ActionsDetails[]
	bought: ActionsDetails[]
	refunded: ActionsDetails[]
}

type StatInitialStateType = {
	isLoading: boolean
	stats: StatsType[]
	singleStat: {
		isLoading: boolean
		stat: StatsType
	}
}

const initialState = {
	stats: [],
	isLoading: false,
	singleStat: {
		stat: {} as StatsType,
		isLoading: false,
	},
} as StatInitialStateType

const statsSlice = createSlice({
	name: "stats",
	initialState,
	reducers: {},
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
	},
})

export default statsSlice.reducer
