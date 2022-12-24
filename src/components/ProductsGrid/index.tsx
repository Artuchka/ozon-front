import React, { FC } from "react"
import { ProductItem, ProductItemType } from "../ProductItem"
import style from "./style.module.scss"
import { useSelector } from "react-redux"
import { selectProducts } from "../../store/features/product/selectors"
import { Loading } from "../Loading"

// type PropType = {
// 	items: ProductItemType[]
// }

export const ProductsGrid: FC = () => {
	const { products, isLoading } = useSelector(selectProducts)
	console.log(products)

	if (isLoading) {
		return <Loading />
	}

	if (products.length === 0) {
		return <h1>Не нашлось товаров =/ </h1>
	}

	return (
		<div className={`${style["products-grid"]}`}>
			{products.map((item) => {
				return <ProductItem key={item._id} {...item} />
			})}
		</div>
	)
}
