import React, { MouseEvent, MouseEventHandler } from "react"
import style from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { selectProducts } from "../../store/features/product/selectors"
import { AppDispatch } from "../../store/store"
import { updateFilters } from "../../store/features/filter/filterSlice"

export const Pagination = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { details } = useSelector(selectProducts)
	const { pagesFound } = details

	const handleChange = (e: MouseEvent<HTMLButtonElement>) => {
		const { value } = e.target
		dispatch(updateFilters({ name: "page", value }))
	}

	return (
		<div className={`${style.paginator} pagination`}>
			<div className={style.pages}>
				{Array.from(Array(pagesFound)).map((_, ind) => {
					console.log()
					return (
						<button
							key={ind}
							className={`${style.page} btn btn--contained btn--rounded btn--square btn--no-padding `}
							onClick={handleChange}
							value={ind + 1}
						>
							{ind + 1}
						</button>
					)
				})}
			</div>
		</div>
	)
}
