import { createSlice } from "@reduxjs/toolkit"
import {
	login,
	loginJWT,
	loginPasswordless,
	logout,
	register,
	registerPasswordless,
	updateUser,
	uploadImages,
	verifyPasswordless,
} from "./thunks"
import { toast } from "react-toastify"

export type UserType = {
	_id: string
	username: string
	firstName: string
	lastName: string
	email: string
	phone: string
	createdAt: string
	gender: string
	role: string
	birthday: string
	avatar: string
	location: string
}

export type AuthType = {
	token: string
	user: UserType
	isLoading: boolean
	imagePath: string
}

const userPlaceholder = {
	_id: "",
	username: "",
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	createdAt: "",
	gender: "",
	role: "",
	birthday: "",
	avatar: "",
	location: "",
}
const initialState = {
	token: "",
	user: userPlaceholder,
	isLoading: false,
	imagePath: "",
} as AuthType

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state, action) => {
			const { msg, user } = action.payload
			toast(msg)
			state.isLoading = false
			state.user = user
		})
		builder.addCase(login.rejected, (state, action) => {
			if (typeof action.payload === "string") {
				toast.error(action?.payload)
			}

			state.isLoading = false
		})

		builder.addCase(loginJWT.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(loginJWT.fulfilled, (state, action) => {
			const { msg, user } = action.payload
			// toast(msg)
			state.isLoading = false
			state.user = user
		})
		builder.addCase(loginJWT.rejected, (state, action) => {
			state.isLoading = false
			// only dev state
			toast.error("couldnt auto login")
		})

		builder.addCase(verifyPasswordless.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(verifyPasswordless.fulfilled, (state, action) => {
			const { msg, user } = action.payload

			state.isLoading = false
			state.user = user
		})
		builder.addCase(verifyPasswordless.rejected, (state, { payload }) => {
			state.isLoading = false
			// only dev state
			toast.error(payload as string)
		})

		builder.addCase(logout.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(logout.fulfilled, (state, action) => {
			const { msg } = action.payload
			state.isLoading = false
			state.user = userPlaceholder
			toast(msg)
		})
		builder.addCase(logout.rejected, (state) => {
			state.isLoading = false
		})

		builder.addCase(register.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(register.fulfilled, (state, action) => {
			const { msg } = action.payload
			state.isLoading = false
			toast(msg)
		})
		builder.addCase(register.rejected, (state, action: any) => {
			toast.error(action.payload)
			state.isLoading = false
		})

		builder.addCase(registerPasswordless.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(registerPasswordless.fulfilled, (state, action) => {
			const { msg } = action.payload
			toast(msg)
			state.isLoading = false
		})
		builder.addCase(registerPasswordless.rejected, (state, action: any) => {
			toast.error(action.payload)
			state.isLoading = false
		})

		builder.addCase(loginPasswordless.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(loginPasswordless.fulfilled, (state, action) => {
			const { msg } = action.payload
			toast(msg)
			state.isLoading = false
		})
		builder.addCase(loginPasswordless.rejected, (state, action: any) => {
			toast.error(action.payload)
			state.isLoading = false
		})

		builder.addCase(updateUser.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(updateUser.fulfilled, (state, action) => {
			const { msg, user } = action.payload
			toast(msg)
			state.isLoading = false
			state.user = user
		})
		builder.addCase(updateUser.rejected, (state, action: any) => {
			toast.error(action.payload)
			state.isLoading = false
		})

		builder.addCase(uploadImages.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(uploadImages.fulfilled, (state, action) => {
			const { msg, paths } = action.payload
			toast(msg)
			state.isLoading = false
			state.imagePath = paths?.[0]
		})
		builder.addCase(uploadImages.rejected, (state, action: any) => {
			toast.error(action.payload)
			state.isLoading = false
		})
	},
})

export const {} = authSlice.actions

export default authSlice.reducer
