import React, { FC, useEffect, useState } from "react"
import { GiTriangleTarget } from "react-icons/gi"
import { BsTriangleFill } from "react-icons/bs"
import style from "./style.module.scss"

type PropType = {
	options: { title: string; value: string }[]
}

export const Sort: FC<PropType> = ({ options = [] }) => {
	const [active, setActive] = useState(options[0])
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const func = (e: any) => {
			let isInside = false
			e.path.forEach((item: any) => {
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
				{options.map((opt) => {
					return (
						<li
							className={
								active.title === opt.title ? style.active : ""
							}
							onClick={(e) => {
								setIsOpen(false)
								setActive(opt)
							}}
							key={opt.value}
						>
							{opt.title}
						</li>
					)
				})}
			</ul>
		</form>
	)
}
