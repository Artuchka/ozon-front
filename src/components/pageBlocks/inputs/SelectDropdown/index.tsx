import React, { ChangeEventHandler, FC, useEffect, useState } from "react"
import style from "./style.module.scss"
import { optionType } from "../../../../store/features/filter/filterSlice"

import { BsTriangleFill } from "react-icons/bs"

type propType = {
	onChange: ChangeEventHandler<HTMLInputElement>
	options: optionType[]
	name: string
	value: string | number
	light?: boolean
}

export const SelectDropdown: FC<propType> = ({
	onChange,
	options,
	name,
	value,
	light = false,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const activeLabel = options.find((opt) => opt.value === value)?.label

	useEffect(() => {
		const func = (e: any) => {
			let isInside = false
			const path = e.composedPath && e.composedPath()

			for (const item of path) {
				Array.from(item.classList || [""]).forEach((item: any) => {
					if (item.includes("sort")) {
						isInside = true
					}
				})
				if (isInside) break
			}

			if (!isInside) {
				setIsOpen(false)
			}
		}
		window.addEventListener("click", func)
		return () => window.removeEventListener("click", func)
	}, [])

	return (
		<div className={`${style.sort} ${light ? style.light : ""} `}>
			<div
				className={style["shown"]}
				onClick={(e) => setIsOpen((prev) => !prev)}
			>
				{activeLabel}
				<BsTriangleFill
					className={`${style.trianlge} ${isOpen ? style.open : ""}`}
				/>
			</div>
			<ul className={`${style.list} ${isOpen ? style.open : ""}`}>
				{options.map((opt) => {
					return (
						<div
							key={opt.value}
							className={`${style.option} + ${
								value === opt.value ? style.active : ""
							}`}
						>
							<input
								type="radio"
								name={name}
								value={opt.value}
								id={`${name}${opt.value}`}
								onChange={onChange}
							/>
							<label
								htmlFor={`${name}${opt.value}`}
								onClick={(e) => {
									setIsOpen(false)
									// setActive(opt)
								}}
							>
								{opt.label}
							</label>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
