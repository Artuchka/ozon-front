import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"

export const getAds = createAsyncThunk("stats/getAds", async (_, thunkAPI) => {
	try {
		const resp = await ozonAPI(`/ads`, {
			method: "POST",
			data: {
				adsConfig: {
					long: 4,
					half: 2,
					short: 6,
					category: 5,
					longTall: 5,
				},
			},
		})

		return thunkAPI.fulfillWithValue(resp.data)
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})
