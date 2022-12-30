import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { selectProducts } from "../store/features/product/selectors"
import { getMyProducts } from "../store/features/product/thunks"
import { ProductItem } from "../components/ProductItem"
import { ProductsGrid } from "../components/ProductsGrid"
import { getAllBookmarks } from "../store/features/bookmark/thunks"

export const MyProducts = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { myProducts } = useSelector(selectProducts)
	useEffect(() => {
		dispatch(getMyProducts())
		dispatch(getAllBookmarks())
	}, [])
	return (
		<div className="my-products-page">
			{myProducts?.map((product) => {
				return (
					<ProductItem
						key={product._id}
						{...product}
						editable={true}
					/>
				)
			})}
		</div>
	)
}
