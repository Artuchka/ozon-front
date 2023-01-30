import { createSlice } from "@reduxjs/toolkit"
import { getAds } from "./thunks"
import { toast } from "react-toastify"

export type AdType = {
	src: string
	url: string
}

type InitType = {
	isLoading: boolean
	ads: {
		long: AdType[]
		short: AdType[]
		category: AdType[]
		half: AdType[]
		longTall: AdType[]
	}
}

const initialState = {
	isLoading: false,
	ads: {
		long: [] as AdType[],
		short: [] as AdType[],
		category: [] as AdType[],
		half: [] as AdType[],
		longTall: [] as AdType[],
	},
} as InitType

const adSlice = createSlice({
	name: "ads",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getAds.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getAds.fulfilled, (state, { payload }) => {
			const { ads } = payload
			state.isLoading = false
			state.ads = ads
		})
		builder.addCase(getAds.rejected, (state, { payload }) => {
			state.isLoading = false
			toast.error(payload as string)
		})
	},
})

export default adSlice.reducer
