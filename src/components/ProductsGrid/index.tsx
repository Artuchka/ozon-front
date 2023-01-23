import React, { FC } from "react"
import { ProductItem, ProductItemType } from "../ProductItem"
import style from "./style.module.scss"
import { useSelector } from "react-redux"
import { selectProducts } from "../../store/features/product/selectors"
import { Loading } from "../Loading"
import { selectOrder } from "../../store/features/order/selector"
import { BookmarkSkeleton } from "../pageBlocks/Skeletons/BookmarkSkeleton"

// type PropType = {
// 	items: ProductItemType[]
// }

export const ProductsGrid: FC = () => {
	const { products, isLoading } = useSelector(selectProducts)
	const { order } = useSelector(selectOrder)
	if (isLoading) {
		return (
			<div
				className={`${style["products-grid"]} products ${style.skeletons}`}
			>
				<BookmarkSkeleton />
				<BookmarkSkeleton />
				<BookmarkSkeleton />
			</div>
		)
	}

	if (!products || products.length === 0) {
		return <h1>Не нашлось товаров =/ </h1>
	}

	return (
		<div className={`${style["products-grid"]} products`}>
			{products.map((item) => {
				const amountFound = order?.items?.filter(
					(i) => i?.product?._id === item?._id
				)
				const amount =
					amountFound?.length === 0 ? 0 : amountFound?.[0]?.amount

				return <ProductItem key={item._id} {...item} amount={amount} />
			})}
		</div>
	)
}
