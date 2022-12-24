import React, { ChangeEvent, FC, useState } from "react"
import style from "./style.module.scss"
import {
	sortOptions,
	updateFilters,
} from "../../store/features/filter/filterSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { SelectDropdown } from "../pageBlocks/inputs/SelectDropdown"

// type PropType = {
// 	options: { title: string; value: string }[]
// }

export const Sort: FC = () => {
	const dispatch = useDispatch<AppDispatch>()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		console.log({ name, value })

		dispatch(updateFilters({ name, value }))
	}

	return (
		<form>
			<SelectDropdown onChange={handleChange} />
		</form>
	)
}
