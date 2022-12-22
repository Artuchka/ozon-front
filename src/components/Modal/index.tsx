import React, { FC, ReactNode, useEffect } from "react"
import style from "./style.module.scss"

type PropType = {
	open: boolean
	setOpen: Function
	children?: ReactNode
}
export const Modal: FC<PropType> = ({ open, setOpen, children }) => {
	useEffect(() => {
		const closeIfOutside = (e: MouseEvent) => {
			let outside = false
			const path = e.composedPath && e.composedPath()

			path.forEach((item: any) => {
				const itemClasses = Array.from(item.classList || [])
				itemClasses.forEach((cls: any) => {
					if (cls && cls.toString().includes("modal-bg")) {
						outside = true
					}
				})
			})

			if (outside) {
				setOpen(false)
			}
		}
		window.addEventListener("click", closeIfOutside)

		return () => window.removeEventListener("click", closeIfOutside)
	}, [])

	return (
		<div className={`${style.modal} ${open ? style.open : ""}`}>
			<div className={style["modal-inner"]}>
				<div className={style.close} onClick={() => setOpen(false)}>
					<span></span>
					<span></span>
				</div>
				<div className={style["body"]}>{children}</div>
			</div>
			<div className={style["modal-bg"]}></div>
		</div>
	)
}
