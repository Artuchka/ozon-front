import React, { FC } from "react"
import styles from "./style.module.scss"

type PropTypes = {
	className?: string
	title: string
	name: string
	items: string[]
}
export const SelectList: FC<PropTypes> = ({
	title = "title",
	name = "name",
	items = ["first", "second"],
	className,
}) => {
	return (
		<div className={`${className} ${styles.selectList}`}>
			<h4 className={styles.title}>{title}</h4>
			<ul className={styles.list}>
				{items.map((value) => {
					return (
						<div className={styles.row} key={value}>
							<input
								type="radio"
								id={`${name}${value}`}
								name={name}
								value={value}
							/>
							<label htmlFor={`${name}${value}`}>{value}</label>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
