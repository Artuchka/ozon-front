import React, { FC } from "react"
import styles from "./style.module.scss"
import { ChangeEventHandler } from "react"

type ItemType = { value: string | number; label: string }
type PropTypes = {
	className?: string
	onChange: ChangeEventHandler<HTMLInputElement>
	title: string
	name: string
	selected: number | string
	items: ItemType[]
}

export const SelectRadio: FC<PropTypes> = ({
	title = "title",
	name = "different",
	onChange,
	selected,
	items = [
		{
			label: "First label",
			value: "first",
		},
		{
			label: "Second label",
			value: "second",
		},
	],
	className,
}) => {
	return (
		<div className={`${className} ${styles.selectList}`}>
			<h4 className={styles.title}>{title}</h4>
			<ul className={styles.list}>
				{items.map(({ value, label }) => {
					return (
						<div className={styles.row} key={value}>
							<input
								type="radio"
								id={`${name}${value}`}
								value={value}
								name={name}
								onChange={onChange}
								checked={selected == value}
							/>
							<label htmlFor={`${name}${value}`}>{label}</label>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
