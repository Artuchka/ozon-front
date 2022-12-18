import React, { FC, useState } from "react"
import styles from "./style.module.scss"

type PropTypes = {
	className?: string
	title: string
	name: string
	items: [string]
}
export const SelectList: FC<PropTypes> = ({
	title = "title",
	name = "name",
	items = ["first", "second"],
	className,
}) => {
	const [active, setActive] = useState(items[0])

	return (
		<div className={`${className} ${styles.selectList}`}>
			<h4 className={styles.title}>{title}</h4>
			<ul className={styles.list}>
				{items.map((value) => {
					return (
						<div
							className={`${styles.row} ${
								active === value ? styles.active : ""
							}`}
							key={value}
							onClick={() => setActive(value)}
						>
							<input
								type="radio"
								id={value}
								name={name}
								value={value}
							/>
							<label htmlFor={value}>{value}</label>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
