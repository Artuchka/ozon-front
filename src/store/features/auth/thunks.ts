import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"
import axios, { AxiosError } from "axios"
import { method } from "lodash"

type dataType = { email: string; password?: string }
export type updateDataType = {
	lastName?: string
	firstName?: string
	phone?: string
	username?: string
	gender?: string
	birthday?: string
	location?: string
	email?: string
}

export const updateUser = createAsyncThunk(
	"users/updateUser",
	async (updateData: updateDataType, thunkAPI) => {
		try {
			const resp = await ozonAPI.patch("/users", updateData)
			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const register = createAsyncThunk(
	"auth/register",
	async (credentials: dataType, thunkAPI) => {
		try {
			const resp = await ozonAPI("/auth/register", {
				method: "post",
				data: credentials,
			})
			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const registerPasswordless = createAsyncThunk(
	"auth/registerPasswordless",
	async (credentials: dataType, thunkAPI) => {
		console.log("registerPasswordless")
		try {
			const resp = await ozonAPI("/auth/register-passwordless", {
				method: "post",
				data: credentials,
			})
			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const login = createAsyncThunk(
	"auth/login",
	async (credentials: dataType, thunkAPI) => {
		try {
			const resp = await ozonAPI("/auth/login", {
				method: "post",
				data: credentials,
			})
			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const loginPasswordless = createAsyncThunk(
	"auth/loginPasswordless",
	async (credentials: dataType, thunkAPI) => {
		console.log("loginPasswordless")
		try {
			const resp = await ozonAPI("/auth/login-passwordless", {
				method: "post",
				data: credentials,
			})
			return resp.data
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const loginJWT = createAsyncThunk(
	"auth/loginJWT",
	async (_, thunkAPI) => {
		try {
			const resp = await ozonAPI("/auth/loginJWT")
			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const verifyPasswordless = createAsyncThunk(
	"auth/verifyPasswordless",
	async ({ token }: { token: string }, thunkAPI) => {
		try {
			const resp = await ozonAPI("/auth/verify-passwordless", {
				method: "POST",
				data: { token },
			})
			return thunkAPI.fulfillWithValue(resp.data)
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		const resp = await ozonAPI("/auth/logout")
		return resp.data
	} catch (error: any) {
		console.log(error.response.data.msg)
	}
})

export const getOrders = createAsyncThunk("auth/login", async (_, thunkAPI) => {
	try {
		const resp = await ozonAPI.get("/orders/allOrders")
		console.log(resp)
	} catch (error: any) {
		console.log(error.response.data.msg)
	}
})
