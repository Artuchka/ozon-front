import React, { ChangeEvent, FormEvent, FormEventHandler } from "react"
import { SelectList } from "../pageBlocks/inputs/SelectList"
import { Switch } from "../pageBlocks/inputs/Switch"
import { Range } from "../pageBlocks/inputs/Range"
import { SelectCheckbox } from "../pageBlocks/inputs/SelectCheckbox"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { getAllProducts } from "../../store/features/product/thunks"
import {
	FilterType,
	ratingOptions,
	updateFilters,
} from "../../store/features/filter/filterSlice"
import { selectFilters } from "../../store/features/filter/selector"
import { useEffect } from "react"
import { selectProducts } from "../../store/features/product/selectors"

export type RangeType = { name: string; value: number }
export const Filters = () => {
	const dispatch = useDispatch<AppDispatch>()
	const filter = useSelector(selectFilters)
	const { minAverageRating } = filter
	const { details } = useSelector(selectProducts)
	const { minPrice, maxPrice } = details
	useEffect(() => {
		dispatch(getAllProducts())
	}, [filter])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let { name } = e.target
		let value

		if (e.target.matches('input[type="checkbox"]')) {
			value = e.target.checked
		} else {
			value = e.target.value
		}
		console.log({ name, value })

		dispatch(updateFilters({ name, value }))
	}
	const handleRangeChange = (e: RangeType) => {
		const { name, value } = e
		console.log({ name, value })

		dispatch(updateFilters({ name, value }))
	}
	return (
		<form className="filters">
			<SelectRadio
				name="minAverageRating"
				title="Оценка"
				items={[...ratingOptions]}
				onChange={handleChange}
				selected={minAverageRating || 1}
			/>

			<Range
				name="price"
				title="Цена"
				min={minPrice}
				max={maxPrice}
				onChange={handleRangeChange}
			/>
		</form>
	)
}

/*
<Switch
title="Рассрочка без доплаты"
name="credit"
onChange={handleChange}
/>
<Switch title="Доставка" name="delivery" onChange={handleChange} />

			<SelectList
				name="list"
				title="Категория"
				items={[...dataComplex]}
				onChange={handleChange}
			/>
<SelectCheckbox
	title="бренды"
	items={[...data]}
	name="checkbox"
	onChange={handleChange}
/>
<SelectRadio
	name="radio"
	title="Срок доставки"
	items={[...dataComplex]}
	onChange={handleChange}
/>
*/
