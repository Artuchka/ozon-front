import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"

export const createReview = createAsyncThunk(
	"review/createNew",
	async (formData: any, thunkAPI) => {
		console.log("sending = ", formData)

		try {
			const resp = await ozonAPI.post("/reviews", formData)
			console.log(resp)
			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const getMyReviews = createAsyncThunk(
	"review/getMyReviews",
	async (_, thunkAPI) => {
		try {
			const resp = await ozonAPI.get("/reviews/my")
			console.log(resp)
			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const getSingleReview = createAsyncThunk(
	"review/getSingleReview",
	async (reviewId: string, thunkAPI) => {
		try {
			const resp = await ozonAPI.get(`/reviews/${reviewId}`)
			console.log(resp)
			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const deleteReview = createAsyncThunk(
	"review/deleteReview",
	async (reviewId: string, thunkAPI) => {
		try {
			const resp = await ozonAPI.delete(`/reviews/${reviewId}`)
			console.log(resp)
			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const updateReview = createAsyncThunk(
	"review/updateReview",
	async (data: { reviewId: string; formData: any }, thunkAPI) => {
		const { reviewId, formData } = data
		try {
			const resp = await ozonAPI(`/reviews/${reviewId}`, {
				method: "PATCH",
				data: formData,
			})
			console.log(resp)
			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
