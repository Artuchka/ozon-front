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
