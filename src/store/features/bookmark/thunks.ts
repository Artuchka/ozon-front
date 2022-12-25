import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"

export const getAllBookmarks = createAsyncThunk(
	"bookmarks/getAll",
	async (_, thunkAPI) => {
		console.log("getting")
		try {
			const resp = await ozonAPI.get("/bookmarks")
			console.log(resp)

			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const addBookmark = createAsyncThunk(
	"bookmarks/addBookmark",
	async (productId: string, thunkAPI) => {
		console.log("getting")
		try {
			const resp = await ozonAPI.post("/bookmarks", { productId })
			console.log(resp)

			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const deleteBookmark = createAsyncThunk(
	"bookmarks/deleteBookmark",
	async (productId: string, thunkAPI) => {
		console.log("deleting")
		try {
			const resp = await ozonAPI("/bookmarks", {
				method: "delete",
				data: { productId },
			})
			console.log(resp)

			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
