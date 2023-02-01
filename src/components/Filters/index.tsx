import React, { ChangeEvent, FormEvent, FormEventHandler, useMemo } from "react"
import { Range } from "../pageBlocks/inputs/Range"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { getAllProducts } from "../../store/features/product/thunks"
import {
	PayloadUpdateType,
	allowedFilterInQuery,
	ratingOptions,
	updateFilters,
} from "../../store/features/filter/filterSlice"
import { selectFilters } from "../../store/features/filter/selector"
import { useEffect } from "react"
import { selectProducts } from "../../store/features/product/selectors"
import { SelectCheckbox } from "../pageBlocks/inputs/SelectCheckbox"
import { SelectList } from "../pageBlocks/inputs/SelectList"
import { useSearchParams } from "react-router-dom"

function getFilterQueryObject(filter: {}): {} {
	const allowedEntries = Object.entries(filter).filter(([key, value]) => {
		return allowedFilterInQuery.includes(key)
	})

	const allowedObject = Object.fromEntries(allowedEntries)

	return allowedObject
}
export type RangeType = { name: string; value: number }
export const Filters = () => {
	const dispatch = useDispatch<AppDispatch>()
	const filter = useSelector(selectFilters)
	const { details } = useSelector(selectProducts)
	const [search, setSearch] = useSearchParams()

	useEffect(() => {
		const params = Object.fromEntries(search)
		const paramsArray = Object.entries(params)

		paramsArray.forEach(([key, value]) => {
			if (allowedFilterInQuery.includes(key)) {
				console.log({ key, value })

				if (key === "categories") {
					dispatch(
						updateFilters({
							name: key,
							value: value,
							checked: true,
						} as PayloadUpdateType)
					)
				} else {
					dispatch(
						updateFilters({ name: key, value } as PayloadUpdateType)
					)
				}
			}
		})
	}, [])

	useEffect(() => {
		setSearch(getFilterQueryObject(filter))
		dispatch(getAllProducts())
	}, [filter])

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
		const { name, value } = e.target
		let checked = null

		if (
			e.target.matches('input[type="checkbox"]') ||
			e.target.matches('input[type="radio"]')
		) {
			checked = e.target.checked
		}

		if (checked) {
			dispatch(
				updateFilters({ name, value, checked } as PayloadUpdateType)
			)
		} else {
			dispatch(updateFilters({ name, value } as PayloadUpdateType))
		}
	}
	const handleRangeChange = (e: RangeType) => {
		const { name, value } = e

		if (
			(name === "minPrice" && value === minPriceSelected) ||
			(name === "maxPrice" && value === maxPriceSelected)
		) {
			return
		}

		dispatch(updateFilters({ name, value } as PayloadUpdateType))
	}
	return (
		<form className="filters">
			<SelectList
				title="Категория"
				items={["любая", ...details?.categories]}
				selected={categories}
				name="categories"
				onChange={handleChange}
			/>
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
*/
