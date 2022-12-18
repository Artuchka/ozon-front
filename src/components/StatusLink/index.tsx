import React, { FC } from "react"
import style from "./headerlink.module.scss"
import { Link, To } from "react-router-dom"
type PropType = {
	data: String | Number
	icon: any
	link?: To
}

export const StatusLink: FC<PropType> = ({ data, icon, link }) => {
	return (
		<Link to={link || "/"} className={style.statLink}>
			<div className={style.statBody}>
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
			</div>
		</Link>
	)
}
