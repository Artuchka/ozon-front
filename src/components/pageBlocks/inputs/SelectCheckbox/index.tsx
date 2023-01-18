import React, { FC } from "react"
import styles from "./style.module.scss"
import { ChangeEventHandler } from "react"

type PropTypes = {
	className?: string
	title?: string
	onChange: ChangeEventHandler<HTMLInputElement>
	name: string
	items: string[]
	selected: string[]
}

export const SelectCheckbox: FC<PropTypes> = ({
	title = null,
	name = "different",
	items = ["first", "second"],
	onChange,
	className,
	selected,
}) => {
	return (
		<div className={`${className} ${styles.selectList}`}>
			{!!title && <h4 className={styles.title}>{title}</h4>}
			<ul className={styles.list}>
				{items.map((value) => {
					return (
						<div className={styles.row} key={value}>
							<input
								type="checkbox"
								id={`${name}${value}`}
								value={value}
								name={name}
								onChange={onChange}
								checked={selected.includes(value)}
							/>
							<label htmlFor={`${name}${value}`}>{value}</label>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
