import React, { ChangeEvent, ChangeEventHandler, FC } from "react"
import styles from "./style.module.scss"

type ItemType = {
	label: string
	value: string
}

type PropTypes = {
	className?: string
	onChange: ChangeEventHandler<HTMLInputElement>
	title: string
	name: string
	items: ItemType[]
}
export const SelectList: FC<PropTypes> = ({
	title = "title",
	name = "name",
	onChange,
	items = [{ label: "первый", value: "first" }],
	className,
}) => {
	return (
		<div className={`${className} ${styles.selectList}`}>
			<h4 className={styles.title}>{title}</h4>
			<ul className={styles.list}>
				{items.map(({ label, value }) => {
					return (
						<div className={styles.row} key={value}>
							<input
								type="radio"
								id={`${name}${value}`}
								name={name}
								value={value}
								onChange={onChange}
							/>
							<label htmlFor={`${name}${value}`}>{label}</label>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
