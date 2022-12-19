import { createSlice } from "@reduxjs/toolkit"
import { login } from "./thunks"

const initialState = {
	token: "",
	_id: "empty",
	username: "username",
	firstName: "firstName",
	lastName: "lastName",
	email: "email@email.email",
	phone: "+79217850937",
	createdAt: "2022-12-17T11:33:00.494Z",
	gender: "male",
	role: "user",
	birthday: "2002-03-27T11:33:00.494Z",
	avatar: "/uploads/defaultAvatar.png",
	location: "Los Angelos",
	__v: 0,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state, action) => {
			console.log("pending")
		})
		builder.addCase(login.fulfilled, (state, action) => {
			console.log("all is ok")
		})
		builder.addCase(login.rejected, (state, action) => {
			console.log("kinda sucks")
		})
	},
})

export const {} = authSlice.actions

export default authSlice.reducer
