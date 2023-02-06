import React from "react"

import { Link } from "react-router-dom"

export const Logo = (props: any) => {
	return (
		<Link to="/">
			<img
				src={
					"https://res.cloudinary.com/dzy8xh83i/image/upload/v1675661859/OZON_DEFAULT/zozo-logo_nojlqo.png"
				}
				alt=""
				{...props}
				style={{ objectFit: "contain", height: "60px" }}
			/>
		</Link>
	)
}
