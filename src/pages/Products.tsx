import React from "react"
import { Filters } from "../components/Filters"
import { ProductsGrid } from "../components/ProductsGrid"
import { Sort } from "../components/Sort"

export const Products = () => {
	const items = [
		{ id: "1", name: "massage", price: 282, rating: 3, image: "/ " },
		{ id: "2", name: "massage", price: 282, rating: 3, image: "/ " },
		{ id: "3", name: "massage", price: 282, rating: 3, image: "/ " },
		{ id: "4", name: "massage", price: 282, rating: 3, image: "/ " },
		{ id: "5", name: "massage", price: 282, rating: 3, image: "/ " },
		{ id: "6", name: "massage", price: 282, rating: 3, image: "/ " },
		{ id: "7", name: "massage", price: 282, rating: 3, image: "/ " },
	]

	const sortOptions = [
		{ title: "Популярные", value: "popular" },
		{ title: "Сначала дешевые", value: "-price" },
		{ title: "Сначала дорогие", value: "price" },
	]
	const search = "мыло"
	const amount = 1_083_585
	return (
		<div className="products-page">
			<div className="stats">
				По запросу {search} найдено {amount} товаров
			</div>
			<Filters />
			<Sort options={sortOptions} />
			<ProductsGrid items={items} />
		</div>
	)
}
