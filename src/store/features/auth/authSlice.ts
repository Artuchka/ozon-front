import { createSlice } from "@reduxjs/toolkit"
import { login, loginJWT, logout, register, updateUser } from "./thunks"
import { toast } from "react-toastify"

const initialState = {
	token: null,
	_id: null,
	username: null,
	firstName: "",
	lastName: "",
	email: null,
	phone: null,
	createdAt: null,
	gender: null,
	role: null,
	birthday: null,
	avatar: null,
	location: null,
	loading: true,
}
export type AuthType = typeof initialState

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(login.fulfilled, (state, action) => {
			const { msg, user } = action.payload
			toast(msg)
			return { ...user, loading: false }
		})
		builder.addCase(login.rejected, (state, action) => {
			if (typeof action.payload === "string") {
				toast.error(action?.payload)
			}

			state.loading = false
		})
		builder.addCase(loginJWT.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(loginJWT.fulfilled, (state, action) => {
			const { msg, user } = action.payload
			// toast(msg)
			return { ...user, loading: false }
		})
		builder.addCase(loginJWT.rejected, (state, action) => {
			state.loading = false
			// only dev state
			toast.error("couldnt auto login")
		})
		builder.addCase(logout.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(logout.fulfilled, (state, action) => {
			const { msg } = action.payload
			toast(msg)
			return { ...initialState }
		})
		builder.addCase(logout.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(register.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(register.fulfilled, (state, action) => {
			const { msg } = action.payload
			toast(msg)
			return { ...initialState }
		})
		builder.addCase(register.rejected, (state, action: any) => {
			toast.error(action.payload)
			state.loading = false
		})

		builder.addCase(updateUser.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(updateUser.fulfilled, (state, action) => {
			const { msg, user } = action.payload
			toast(msg)
			return { ...state, ...user }
		})
		builder.addCase(updateUser.rejected, (state, action: any) => {
			toast.error(action.payload)
			state.loading = false
		})
	},
})

export const {} = authSlice.actions

export default authSlice.reducer
