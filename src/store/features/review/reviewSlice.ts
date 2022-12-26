import { createSlice } from "@reduxjs/toolkit"
import { createReview, getMyReviews } from "./thunks"
import { toast } from "react-toastify"

type Review = {
	id: string
	title: string
	comment: string
	rating: number
	product: {
		_id: string
		images: string[]
		imagesCount: number
		numOfReviews: number
		price: number
		tags: string[]
		title: string
		vendor: {
			email: string
			firstName: string
			lastName: string
			username: string
			_id: string
		}
	}
	_id: string
}

type initType = {
	myReviews: Review[]
	isModalOpen: boolean
	isLoading: boolean
}
const initialState = {
	isModalOpen: false,
	isLoading: false,
	myReviews: [],
} as initType

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

		builder.addCase(getMyReviews.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(getMyReviews.fulfilled, (state, { payload }) => {
			state.myReviews = payload.reviews || []
			state.isLoading = false
		})
		builder.addCase(getMyReviews.rejected, (state, { payload }) => {
			state.isLoading = false
			if (typeof payload === "string") {
				toast.error(payload)
			}
		})
	},
})

export const { setOpenReviewModal } = reviewSlice.actions

export default reviewSlice.reducer
