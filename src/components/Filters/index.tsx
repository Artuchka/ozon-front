import React, { ChangeEvent, FormEvent, FormEventHandler, useMemo } from "react"
import { Range } from "../pageBlocks/inputs/Range"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { getAllProducts } from "../../store/features/product/thunks"
import {
	ratingOptions,
	updateFilters,
} from "../../store/features/filter/filterSlice"
import { selectFilters } from "../../store/features/filter/selector"
import { useEffect } from "react"
import { selectProducts } from "../../store/features/product/selectors"
import { SelectCheckbox } from "../pageBlocks/inputs/SelectCheckbox"

export type RangeType = { name: string; value: number }
export const Filters = () => {
	const dispatch = useDispatch<AppDispatch>()
	const filter = useSelector(selectFilters)
	const { details, isLoading } = useSelector(selectProducts)
	console.log(filter)

	useEffect(() => {
		dispatch(getAllProducts())
	}, [filter])

	if (isLoading) {
		return <h1>loading</h1>
	}
	const {
		minAverageRating,
		minPrice: minPriceSelected,
		maxPrice: maxPriceSelected,
		companies,
		categories,
		tags,
	} = filter
	const { minPrice: minPriceExisting, maxPrice: maxPriceExisting } = details

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let { name } = e.target
		let value = ""
		let checked = null

		if (e.target.matches('input[type="checkbox"]')) {
			value = e.target.value
			checked = e.target.checked
		} else {
			value = e.target.value
		}
		if (checked) {
			console.log({ name, value, checked })
			dispatch(updateFilters({ name, value, checked }))
		} else {
			console.log({ name, value })
			dispatch(updateFilters({ name, value }))
		}
	}
	const handleRangeChange = (e: RangeType) => {
		const { name, value } = e

		console.log("---------")

		console.log("trying to update from")
		console.log({ minPriceSelected, maxPriceSelected })

		console.log("to")
		console.log({ name, value })

		console.log("---------")

		if (
			(name === "minPrice" && value === minPriceSelected) ||
			(name === "maxPrice" && value === maxPriceSelected)
		) {
			return
		}

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
				min={minPriceExisting}
				max={maxPriceExisting}
				selectedFrom={minPriceSelected || minPriceExisting}
				selectedTo={maxPriceSelected || maxPriceExisting}
				onChange={handleRangeChange}
			/>

			<SelectCheckbox
				title="Компания"
				items={[...details?.companies]}
				selected={companies}
				name="companies"
				onChange={handleChange}
			/>
			<SelectCheckbox
				title="Категория"
				items={[...details?.categories]}
				selected={categories}
				name="categories"
				onChange={handleChange}
			/>
			<SelectCheckbox
				title="Теги"
				items={[...details?.tags]}
				selected={tags}
				name="tags"
				onChange={handleChange}
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
