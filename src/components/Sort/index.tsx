import React, { ChangeEvent, FC, useState } from "react"
import style from "./style.module.scss"
import {
	pageOptions,
	sortOptions,
	updateFilters,
} from "../../store/features/filter/filterSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { SelectDropdown } from "../pageBlocks/inputs/SelectDropdown"

export const Sort: FC = () => {
	const dispatch = useDispatch<AppDispatch>()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("clicked")

		const { name, value } = e.target
		console.log({ name, value })

		dispatch(updateFilters({ name, value }))
	}

	return (
		<form className="view-config">
			<SelectDropdown
				onChange={handleChange}
				name="sort"
				options={sortOptions}
			/>
			<SelectDropdown
				onChange={handleChange}
				name="limit"
				options={pageOptions}
			/>
		</form>
	)
}
