import React, { useEffect } from "react"
import { Filters } from "../components/Filters"
import { ProductsGrid } from "../components/ProductsGrid"
import { Sort } from "../components/Sort"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getAllProducts } from "../store/features/product/thunks"
import { selectProducts } from "../store/features/product/selectors"

export const Products = () => {
	const dispatch = useDispatch<AppDispatch>()

	const sortOptions = [
		{ title: "Популярные", value: "popular" },
		{ title: "Сначала дешевые", value: "-price" },
		{ title: "Сначала дорогие", value: "price" },
	]
	const search = "мыло"
	const amount = 1_083_585

	useEffect(() => {
		dispatch(getAllProducts())
	}, [])
	return (
		<div className="products-page">
			<div className="stats">
				По запросу {search} найдено {amount} товаров
			</div>
			<Filters />
			<Sort options={sortOptions} />
			<ProductsGrid />
		</div>
	)
}
