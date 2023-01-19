import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"
import { OrderType } from "./orderSlice"

export const createOrder = createAsyncThunk(
	"orders/createOrder",
	async (formData: any, thunkAPI) => {
		try {
			const resp = await ozonAPI(`/orders`, {
				method: "POST",
				data: formData,
			})
			console.log({ data: resp.data })

			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.msg)
		}
	}
)

export const updateOrder = createAsyncThunk(
	"orders/updateOrder",
	async (
		{ data, orderId }: { data: OrderType; orderId: string },
		thunkAPI
	) => {
		try {
			const resp = await ozonAPI(`/orders/${orderId}`, {
				method: "PATCH",
				data: data,
			})
			console.log({ updatedData: resp.data })

			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.msg)
		}
	}
)
export const addToCart = createAsyncThunk(
	"orders/addToCart",
	async (
		{
			productId,
			orderId,
			amount,
		}: { amount: number; productId: string; orderId: string },
		thunkAPI
	) => {
		try {
			const { data } = await ozonAPI(`/orders/${orderId}`, {
				method: "POST",
				data: { productId, amount },
			})

			return thunkAPI.fulfillWithValue(data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.msg)
		}
	}
)

export const getCart = createAsyncThunk(
	"orders/getCart",
	async (_, thunkAPI) => {
		try {
			const resp = await ozonAPI(`/orders`, {
				method: "GET",
			})

			console.log({ data: resp.data })

			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.msg)
		}
	}
)
