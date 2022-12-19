import React from "react"
import { useParams } from "react-router-dom"

export const SingleProduct = () => {
	const { id } = useParams()
	console.log(id)
	const name = "мыло"
	const price = 200

	return (
		<div className="single-product-page">
			<img src="/ " alt="product" />
			<div className="name">{name}</div>
			<div className="price">{price}</div>
		</div>
	)
}
