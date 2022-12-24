import React, { ChangeEvent, FC, useEffect, useState } from "react"
import { GiTriangleTarget } from "react-icons/gi"
import { BsTriangleFill } from "react-icons/bs"
import style from "./style.module.scss"
import {
	sortOptions,
	updateFilters,
} from "../../store/features/filter/filterSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"

// type PropType = {
// 	options: { title: string; value: string }[]
// }

export const Sort: FC = () => {
	const [active, setActive] = useState(sortOptions[0])
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		const func = (e: any) => {
			let isInside = false

			const path = e.path || (e.composedPath && e.composedPath())

			path.forEach((item: any) => {
				const includes = Array.from(item.classList || []).includes(
					"sort"
				)
				if (includes) {
					isInside = true
				}
			})
			if (!isInside) {
				setIsOpen(false)
			}
		}
		window.addEventListener("click", func)
		return () => window.removeEventListener("click", func)
	}, [])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		console.log({ name, value })

		dispatch(updateFilters({ name, value }))
	}

	return (
		<form className={`sort ${style.sort}`}>
			<div
				className={style["shown"]}
				onClick={(e) => setIsOpen((prev) => !prev)}
			>
				{active.title}
				<BsTriangleFill
					className={`${style.trianlge} ${isOpen ? style.open : ""}`}
				/>
			</div>
			<ul className={`${style.list} ${isOpen ? style.open : ""}`}>
				{sortOptions.map((opt) => {
					return (
						<div
							key={opt.value}
							className={`${style.option} + ${
								active.title === opt.title ? style.active : ""
							}`}
						>
							<input
								type="radio"
								name="sort"
								value={opt.value}
								id={`sort${opt.value}`}
								onChange={handleChange}
							/>
							<label
								htmlFor={`sort${opt.value}`}
								onClick={(e) => {
									setIsOpen(false)
									setActive(opt)
								}}
							>
								{opt.title}
							</label>
						</div>
					)
				})}
			</ul>
		</form>
	)
}
