import React, { ChangeEventHandler, FC, useState } from "react"

import styles from "./style.module.scss"
import { useEffect } from "react"
import { RangeType } from "../../../Filters"

type proptype = {
	title: string
	name: string
	min: number
	max: number
	onChange: Function
}

export const Range: FC<proptype> = ({
	title = "range default",
	name = "price",
	onChange,
	min = 30,
	max = 100,
}) => {
	const [leftValue, setLeftValue] = useState(min + max / 10)
	const [rightValue, setRightValue] = useState(max * 0.8)
	const [leftValueInput, setLeftValueInput] = useState(min + max / 10)
	const [rightValueInput, setRightValueInput] = useState(max * 0.8)

	useEffect(() => {
		onChange({
			name: "maxPrice",
			value: rightValue,
		})
	}, [rightValue])
	useEffect(() => {
		onChange({
			name: "minPrice",
			value: leftValue,
		})
	}, [leftValue])

	const handleChangeRight = (e: any) => {
		const right = Number(e.target.value)
		if (right <= leftValue) return
		setRightValue(right)
		setRightValueInput(right)
	}
	const handleChangeLeft = (e: any) => {
		const left = Number(e.target.value)
		if (left >= rightValue) return
		setLeftValue(left)
		setLeftValueInput(left)
	}

	const handleInputEnterLeft = (e: any) => {
		if (e.key === "Enter" || e.keyCode === 13) {
			const value = Math.max(
				min,
				Math.min(leftValueInput, rightValue - 1)
			)
			setLeftValue(value)
			setLeftValueInput(value)
		}
	}
	const handleInputEnterRight = (e: any) => {
		if (e.key === "Enter" || e.keyCode === 13) {
			const value = Math.min(
				max,
				Math.max(rightValueInput, leftValue + 1)
			)
			setRightValue(value)
			setRightValueInput(value)
		}
	}
	return (
		<div className={styles.range}>
			<h3 className={styles.title}>{title}</h3>
			<div className={styles.sliders}>
				<input
					type="range"
					value={leftValue}
					onChange={handleChangeLeft}
					name={name}
					min={min}
					max={max}
				/>
				<input
					type="range"
					value={rightValue}
					onChange={handleChangeRight}
					name={name}
					min={min}
					max={max}
				/>
			</div>
			<div className={styles["numbers"]}>
				<div className={styles["number-wrapper"]}>
					<label htmlFor="from">от</label>
					<input
						type="text"
						id="from"
						value={leftValueInput}
						onChange={(e) => {
							const right = Number(
								e.target.value.replace(/\D/g, "")
							)
							setLeftValueInput(right)
						}}
						onKeyUp={handleInputEnterLeft}
					/>
				</div>
				<div className={styles["number-wrapper"]}>
					<label htmlFor="to">до</label>
					<input
						type="text"
						id="to"
						value={rightValueInput}
						onChange={(e) => {
							const right = Number(
								e.target.value.replace(/\D/g, "")
							)
							setRightValueInput(right)
						}}
						onKeyUp={handleInputEnterRight}
					/>
				</div>
			</div>
		</div>
	)
}
