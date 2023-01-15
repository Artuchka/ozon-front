import React, { FC, ReactNode, useEffect } from "react"
import style from "./style.module.scss"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { unsetEditReview } from "../../store/features/review/reviewSlice"

type PropType = {
	open: boolean
	setOpen: Function
	children?: ReactNode
	className?: string
	width?: "low" | "medium" | "high"
}

const maxWidthMap = {
	low: "350px",
	medium: "600px",
	high: "900px",
}
export const Modal: FC<PropType> = ({
	open,
	setOpen,
	children,
	className,
	width = "low",
}) => {
	const dispatch = useDispatch<AppDispatch>()

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
			<div
				className={style["modal-inner"]}
				style={{
					maxWidth: maxWidthMap[width],
				}}
			>
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
