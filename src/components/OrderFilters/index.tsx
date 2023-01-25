import React, { ChangeEvent, MouseEvent } from "react"
import style from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { selectFilters } from "../../store/features/filter/selector"
import {
	FilterType,
	updateOrderFilter,
} from "../../store/features/filter/filterSlice"
import { selectOrder } from "../../store/features/order/selector"
import { DetailsType } from "../../store/features/order/orderSlice"

const FilterOptions = [
	{ value: "all", label: "Все" },
	{ value: "checkout", label: "Ожидают оплаты" },
	{ value: "pending", label: "В работе" },
	{ value: "paid", label: "Оплаченные" },
	{ value: "delivered", label: "Доставленные" },
	{ value: "refunded", label: "Возвращены" },
] as { value: keyof DetailsType; label: string }[]

export const OrderFilters = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { orderFilters } = useSelector(selectFilters)
	const { allOrders } = useSelector(selectOrder)

	const handleStatusChange = (value: string) => {
		dispatch(
			updateOrderFilter({ name: "status" as keyof FilterType, value })
		)
	}

	return (
		<div className={style.wrapper}>
			<div className={style.options}>
				{FilterOptions.map((option) => {
					return (
						<div
							className={`${style.option} ${
								orderFilters.status === option.value
									? style.active
									: ""
							}`}
							onClick={() => handleStatusChange(option.value)}
							// data-value={option.value}
							key={option.value}
						>
							<h2>{option.label}</h2>
							<data>
								{allOrders?.details?.[option.value] || 0}
							</data>
						</div>
					)
				})}
			</div>
		</div>
	)
}
