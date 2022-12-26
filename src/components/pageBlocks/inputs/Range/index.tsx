import React, {
	ChangeEventHandler,
	FC,
	useCallback,
	useRef,
	useState,
} from "react"

import styles from "./style.module.scss"
import { useEffect } from "react"
import { RangeType } from "../../../Filters"
import { debounce } from "lodash"
// import debounce from "lodash.debounce"

type proptype = {
	title: string
	name: string
	min: number
	max: number
	selectedFrom: number
	selectedTo: number
	onChange: Function
}

export const Range: FC<proptype> = ({
	title = "range default",
	name = "price",
	onChange,
	min = 30,
	max = 100,
	selectedFrom = 50,
	selectedTo = 90,
}) => {
	const [leftValue, setLeftValue] = useState(selectedFrom)
	const [rightValue, setRightValue] = useState(selectedTo)
	const [leftValueInput, setLeftValueInput] = useState(selectedFrom)
	const [rightValueInput, setRightValueInput] = useState(selectedTo)

	const debouncedChange = useCallback(
		debounce((obj: { name: string; value: number }) => {
			onChange(obj)
		}, 1000),
		[]
	)
	useEffect(() => {
		debouncedChange({
			name: "maxPrice",
			value: rightValue,
		})
	}, [rightValue])

	useEffect(() => {
		debouncedChange({
			name: "minPrice",
			value: leftValue,
		})
	}, [leftValue])

	const handleChangeRight = (e: any) => {
		const right = parseInt(e.target.value)
		if (right <= leftValue) return
		setRightValue(right)
		setRightValueInput(right)
	}
	const handleChangeLeft = (e: any) => {
		const left = parseInt(e.target.value)
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
