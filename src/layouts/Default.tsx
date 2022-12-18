import React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header/index"
import Footer from "../components/Footer"

export const Default = () => {
	return (
		<main className="default-layout">
			<Header />
			<Outlet />
			<Footer />
		</main>
	)
}
