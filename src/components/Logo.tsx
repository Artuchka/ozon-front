import React from "react"
import logo from "../assets/images/ozon-logo.png"
import { Link } from "react-router-dom"

export const Logo = (props: any) => {
	return (
		<Link to="/">
			<img src={logo} alt="" {...props} />
		</Link>
	)
}
