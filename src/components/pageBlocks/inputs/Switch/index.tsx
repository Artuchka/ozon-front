import React, { FC } from "react"
import styles from "./style.module.scss"
import { ChangeEventHandler } from "react"
type PropType = {
	onChange: ChangeEventHandler<HTMLInputElement>
	title: string
	name: string
	className?: string
	selected: boolean
}
export const Switch: FC<PropType> = ({
	title = "default title",
	name = "default name",
	onChange,
	selected,
	className,
}) => {
	return (
		<div className={`${styles.switch} ${className ? className : ""}`}>
			<label className={styles.title} htmlFor={name}>
				{title}
			</label>
			<input
				type="checkbox"
				name={name}
				id={name}
				className={styles.toggle}
				onChange={onChange}
				checked={selected}
			/>
		</div>
	)
}
