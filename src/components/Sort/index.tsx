import React, { ChangeEvent, FC, useState } from "react"
import {
	PayloadUpdateType,
	limitOptions,
	sortOptions,
	updateFilters,
} from "../../store/features/filter/filterSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { SelectDropdown } from "../pageBlocks/inputs/SelectDropdown"
import { selectFilters } from "../../store/features/filter/selector"

export const Sort: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { limit, sort } = useSelector(selectFilters)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("clicked")

		const { name, value } = e.target
		console.log({ name, value })

		dispatch(updateFilters({ name, value } as PayloadUpdateType))
	}

	return (
		<form className="view-config">
			<SelectDropdown
				onChange={handleChange}
				name="sort"
				options={sortOptions}
				value={sort || sortOptions[0].value}
			/>
			<SelectDropdown
				onChange={handleChange}
				name="limit"
				options={limitOptions}
				value={limit || "3"}
			/>
		</form>
	)
}
