import React, { FC } from "react"
import styles from "./style.module.scss"
type PropType = {
	title: string
	name: string
}
export const Switch: FC<PropType> = ({
	title = "default title",
	name = "default name",
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
			/>
		</div>
	)
}
