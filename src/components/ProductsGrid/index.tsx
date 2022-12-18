import React, { FC } from "react"
import { ProductItem, ProductItemType } from "../ProductItem"
import style from "./style.module.scss"

type PropType = {
	items: ProductItemType[]
}

export const ProductsGrid: FC<PropType> = ({ items = [] }) => {
	return (
		<div className={`${style["products-grid"]}`}>
			{items.map((item) => {
				return <ProductItem key={item.id} {...item} />
			})}
		</div>
	)
}
