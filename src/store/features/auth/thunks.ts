import { createAsyncThunk } from "@reduxjs/toolkit"
import { ozonAPI } from "../../../axios/customFetch"

type dataType = { email: string; password: string }

export const login = createAsyncThunk(
	"auth/login",
	async (data: dataType, thunkAPI) => {
		console.log(data)
		try {
			const res = await ozonAPI.get("/auth/login", {
				data,
			})
			console.log(res)
		} catch (error) {}
	}
)
