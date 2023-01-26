import React, { ChangeEventHandler, FC } from "react"

import styles from "./style.module.scss"
import { useEffect } from "react"
import { RangeType } from "../../../Filters"
import { debounce } from "lodash"
import { colorThemeType } from "../../../VideoPlayer"
// import debounce from "lodash.debounce"

type proptype = {
	name: string
	min: number
	max: number
	value: number
	onChange: ChangeEventHandler<HTMLInputElement>
	colorTheme?: colorThemeType
	className?: string
}

export const SingleRange: FC<proptype> = ({
	name = "price",
	onChange,
	value,
	min = 0,
	max = 100,
	colorTheme = null,
	className,
}) => {
	return (
		<div
			className={`${styles.range}
			${colorTheme === "primary" ? styles.primary : ""}
			${colorTheme === "dark" ? styles.dark : ""}
			${colorTheme === "light" ? styles.light : ""}
			${className || ""}
			`}
		>
			<input
				type="range"
				value={value}
				onChange={onChange}
				name={name}
				min={min}
				max={max}
				className={styles.rangeInput}
			/>
		</div>
	)
}
