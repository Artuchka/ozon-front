import React, { ChangeEventHandler, FC, useEffect, useState } from "react"
import style from "./style.module.scss"
import { sortOptions } from "../../../../store/features/filter/filterSlice"

import { GiTriangleTarget } from "react-icons/gi"
import { BsTriangleFill } from "react-icons/bs"

type propType = {
	onChange: ChangeEventHandler<HTMLInputElement>
}

export const SelectDropdown: FC<propType> = ({ onChange }) => {
	const [active, setActive] = useState(sortOptions[0])
	const [isOpen, setIsOpen] = useState(false)
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
	return (
		<div className={`sort ${style.sort} `}>
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
								onChange={onChange}
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
		</div>
	)
}
