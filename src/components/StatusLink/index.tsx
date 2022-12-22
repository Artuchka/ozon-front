import React, { FC, MouseEventHandler } from "react"
import style from "./headerlink.module.scss"
import { Link, To } from "react-router-dom"
type PropType = {
	data?: String | Number
	title?: String | Number
	icon: any
	link?: To
	onClick?: MouseEventHandler
}

export const StatusLink: FC<PropType> = ({
	data = 0,
	icon,
	link,
	title,
	onClick = () => {},
}) => {
	const body = (
		<div className={style.statBody} onClick={onClick}>
			{data != 0 && (
				<div className={style.data}>
					{typeof data === "string"
						? data
						: data > 99
						? "99+"
						: data.toString()}
				</div>
			)}
			<div className={style.icon}>{icon}</div>
			<div className={style.title}>{title?.toString()}</div>
		</div>
	)
	if (link) {
		return (
			<Link to={link || "/"} className={style.statLink}>
				{body}
			</Link>
		)
	}
	return body
}
