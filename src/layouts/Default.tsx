import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/pageBlocks/Header"
import Footer from "../components/pageBlocks/Footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { loginJWT } from "../store/features/auth/thunks"
import { getCart } from "../store/features/order/thunks"
import { selectAuth } from "./../store/features/auth/selectors"

export const Default = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { username } = useSelector(selectAuth)

	useEffect(() => {
		dispatch(loginJWT())
	}, [])

	useEffect(() => {
		if (!username) return

		dispatch(getCart())
	}, [username])

	return (
		<div className="default-layout">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<Header />
			<main className="main">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
