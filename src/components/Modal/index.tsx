import React, { FC, ReactChild, ReactNode } from "react"
import style from "./style.module.scss"

type PropType = {
	open: boolean
	setOpen: Function
	children?: ReactNode
}
export const Modal: FC<PropType> = ({ open, setOpen, children }) => {
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
