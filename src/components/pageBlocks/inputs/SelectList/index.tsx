import React, { ChangeEvent, ChangeEventHandler, FC } from "react"
import styles from "./style.module.scss"

type ItemType = {
	label: string
	value: string | number
}

type PropTypes = {
	className?: string
	onChange: ChangeEventHandler<HTMLInputElement>
	title: string
	name: string
	items: string[]
	selected: string[]
}
export const SelectList: FC<PropTypes> = ({
	title = "title",
	name = "name",
	onChange,
	items = ["first"],
	className,
	selected,
}) => {
	return (
		<div className={`${className} ${styles.selectList}`}>
			<h4 className={styles.title}>{title}</h4>
			<ul className={styles.list}>
				{items.map((item) => {
					return (
						<div className={styles.row} key={item}>
							<input
								type="radio"
								id={item}
								name={name}
								value={item}
								onChange={onChange}
								checked={selected.includes(item)}
							/>
							<label htmlFor={item}>{item}</label>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
