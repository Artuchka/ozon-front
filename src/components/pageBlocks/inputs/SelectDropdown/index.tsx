import React, {
	ChangeEvent,
	ChangeEventHandler,
	FC,
	MouseEventHandler,
	useEffect,
	useState,
} from "react"
import style from "./style.module.scss"
import { optionType } from "../../../../store/features/filter/filterSlice"

import { GiTriangleTarget } from "react-icons/gi"
import { BsTriangleFill } from "react-icons/bs"

type propType = {
	onChange: ChangeEventHandler<HTMLInputElement>
	options: optionType[]
	name: string
	value: string | number
}

export const SelectDropdown: FC<propType> = ({
	onChange,
	options,
	name,
	value,
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
		<div className={`${style.sort} `}>
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
