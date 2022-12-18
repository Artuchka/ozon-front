import React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header/index"
import Footer from "../components/Footer"

export const Default = () => {
	return (
		<div className="default-layout">
			<Header />
			<main className="main">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
