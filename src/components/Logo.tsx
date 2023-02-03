import React from "react"
import logo from "../assets/images/ozon-logo.png"
import { Link } from "react-router-dom"

export const Logo = (props: any) => {
	return (
		<Link to="/">
			<img
				src={
					"https://res.cloudinary.com/dzy8xh83i/image/upload/v1675457950/OZON_DEFAULT/ozon-logo_xtpjwq.webp"
				}
				alt=""
				{...props}
				style={{ objectFit: "contain", height: "60px" }}
			/>
		</Link>
	)
}
