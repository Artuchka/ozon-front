import React, { MouseEvent } from "react"
import style from "./style.module.scss"
import { BsArrowUpCircleFill } from "react-icons/bs"

export const MoveToTop = () => {
	const handleMove = (e: MouseEvent<HTMLDivElement>) => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
	}

	return (
		<div className={style.wrapper} onClick={handleMove}>
			<BsArrowUpCircleFill />
		</div>
	)
}
