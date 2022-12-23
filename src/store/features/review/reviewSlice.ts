import { createSlice } from "@reduxjs/toolkit"
import { createReview } from "./thunks"
import { toast } from "react-toastify"

const initialState = {
	isModalOpen: false,
	isLoading: false,
}

const reviewSlice = createSlice({
	name: "reviews",
	initialState,
	reducers: {
		setOpenReviewModal(state, { payload }) {
			state.isModalOpen = payload
		},
	},
	extraReducers(builder) {
		builder.addCase(createReview.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(createReview.fulfilled, (state, { payload }) => {
			toast.success(payload.msg)
			state.isLoading = false
		})
		builder.addCase(createReview.rejected, (state, { payload }) => {
			state.isLoading = false
			if (typeof payload === "string") {
				toast.error(payload)
			}
		})
	},
})

export const { setOpenReviewModal } = reviewSlice.actions

export default reviewSlice.reducer
