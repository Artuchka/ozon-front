import React, { useEffect } from "react"
import { Filters } from "../components/Filters"
import { ProductsGrid } from "../components/ProductsGrid"
import { Sort } from "../components/Sort"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import {
	getAllProducts,
	getProductDetails,
} from "../store/features/product/thunks"
import { selectProducts } from "../store/features/product/selectors"
import { selectFilters } from "../store/features/filter/selector"
import { Pagination } from "../components/Pagination"
import { getAllBookmarks } from "../store/features/bookmark/thunks"
import { Loading } from "../components/Loading"
import { selectAuth } from "../store/features/auth/selectors"

export const Products = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { details } = useSelector(selectProducts)
	const { title } = useSelector(selectFilters)
	const { loading: gettingUser } = useSelector(selectAuth)
	const amount = details.productsFound

	useEffect(() => {
		if (gettingUser) return

		dispatch(getAllProducts())
		dispatch(getAllBookmarks())
	}, [])

	useEffect(() => {
		document.title = "Товары"
		if (amount > 0) {
			document.title = `Нашли ${amount} товаров`
		} else {
			document.title = `Не нашли товаров`
		}
	}, [amount])

	return (
		<div className="products-page">
			<div className="stats">
				{!title
					? `По вашему запросу найдено ${amount} товаров`
					: `По запросу \`${title}\` найдено ${amount} товаров`}
			</div>
			<Filters />
			<Sort />
			<ProductsGrid />
			<Pagination />
		</div>
	)
}
