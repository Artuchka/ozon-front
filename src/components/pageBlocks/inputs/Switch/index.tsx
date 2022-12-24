import React, { FC } from "react"
import styles from "./style.module.scss"
import { ChangeEventHandler } from "react"
type PropType = {
	onChange: ChangeEventHandler<HTMLInputElement>
	title: string
	name: string
}
export const Switch: FC<PropType> = ({
	title = "default title",
	name = "default name",
	onChange,
}) => {
	return (
		<div className={styles.switch}>
			<label className={styles.title} htmlFor={name}>
				{title}
			</label>
			<input
				type="checkbox"
				name={name}
				id={name}
				className={styles.toggle}
				onChange={onChange}
			/>
		</div>
	)
}
