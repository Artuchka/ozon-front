import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"

export const createProduct = createAsyncThunk(
	"product/create",
	async (info: any, thunkAPI) => {
		try {
			const resp = await ozonAPI("/products", {
				data: info,
				method: "post",
			})
			console.log("RESP = ", resp)
			return resp
		} catch (error: any) {
			console.log("error caight = ", error)
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const getAllProducts = createAsyncThunk(
	"product/getAllProducts",
	async (_, thunkAPI) => {
		try {
			const { data } = await ozonAPI("/products")
			return data
		} catch (error: any) {
			console.log("error caight = ", error)
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
export const getSingleProduct = createAsyncThunk(
	"product/getSingleProduct",
	async (id: string, thunkAPI) => {
		try {
			const { data } = await ozonAPI(`/products/${id}`)
			return data
		} catch (error: any) {
			console.log("error caight = ", error)
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)
