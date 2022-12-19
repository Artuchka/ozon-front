import React, { FC } from "react"
import styles from "./style.module.scss"

type ItemType = { value: string; label: string }
type PropTypes = {
	className?: string
	title: string
	name: string
	items: ItemType[]
}

export const SelectRadio: FC<PropTypes> = ({
	title = "title",
	name = "different",
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
							/>
							<label htmlFor={`${name}${value}`}>{label}</label>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
