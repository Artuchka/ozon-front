import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch } from "../store/store"
import { getSingleProduct } from "../store/features/product/thunks"
import { selectProducts } from "../store/features/product/selectors"
import { Loading } from "../components/Loading"

export const SingleProduct = () => {
	const { id } = useParams()
	const { singleProduct } = useSelector(selectProducts)
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		if (id) {
			dispatch(getSingleProduct(id))
		}
	}, [])
	if (!singleProduct) {
		return <Loading />
	}
	const {
		title,
		price,
		description,
		images,
		specs,
		tags,
		reviews,
		types,
		averageRating,
		numOfReviews,
	} = singleProduct
	console.log(singleProduct)

	return (
		<div className="single-product-page">
			<img src={images[0]} alt="product" />
			<div className="name">{title}</div>
			<div className="price">{price}</div>
		</div>
	)
}
