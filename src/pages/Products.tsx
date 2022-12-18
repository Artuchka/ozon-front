import React from "react"
import { Filters } from "../components/Filters"
import { ProductsGrid } from "../components/ProductsGrid"

export const Products = () => {
	const search = "мыло"
	const amount = 1_083_585
	return (
		<div className="products-page">
			<div className="stats">
				По запросу {search} найдено {amount} товаров
			</div>
			<Filters />
			<ProductsGrid />
		</div>
	)
}
