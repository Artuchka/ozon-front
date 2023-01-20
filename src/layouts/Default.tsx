import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/pageBlocks/Header"
import Footer from "../components/pageBlocks/Footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { loginJWT } from "../store/features/auth/thunks"
import { createOrder, getCart } from "../store/features/order/thunks"
import { selectAuth } from "./../store/features/auth/selectors"
import { getAllBookmarks } from "../store/features/bookmark/thunks"
import { selectOrder } from "../store/features/order/selector"

export const Default = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { username } = useSelector(selectAuth)
	const { haveTried, order } = useSelector(selectOrder)

	useEffect(() => {
		dispatch(loginJWT())
	}, [])

	useEffect(() => {
		if (!username) return

		dispatch(getCart())
	}, [username])

	useEffect(() => {
		if (
			!username ||
			Object.keys(order).length > 0 ||
			order.status === "cart" ||
			order.status === "pending" ||
			order.status === "checkout"
		)
			return

		console.log("CREATING CART")
		console.log(username)
		console.log(order)

		dispatch(createOrder({ status: "cart" }))
	}, [haveTried])

	useEffect(() => {
		if (!username) return

		dispatch(getAllBookmarks())
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
