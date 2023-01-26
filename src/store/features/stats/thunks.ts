import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"

export const getSingleStatByProductId = createAsyncThunk(
	"stats/getSingleStatByProductId",
	async (productId: string, thunkAPI) => {
		try {
			const resp = await ozonAPI(`/statistics/${productId}`, {
				method: "GET",
			})

			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const getAllStats = createAsyncThunk(
	"stats/getAllStats",
	async (_, thunkAPI) => {
		try {
			const resp = await ozonAPI(`/statistics`, {
				method: "GET",
			})

			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
