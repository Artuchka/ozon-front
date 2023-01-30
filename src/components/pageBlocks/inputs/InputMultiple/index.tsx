import React, {
	ChangeEvent,
	Dispatch,
	FC,
	KeyboardEvent,
	SetStateAction,
	useEffect,
} from "react"
import style from "./style.module.scss"

type propType = {
	selected: string[]
	options?: string[]
	placeholder?: string
	setSelected: Dispatch<SetStateAction<string[]>>
	disabled?: boolean
	required?: boolean
}

export const InputMultiple: FC<propType> = ({
	selected,
	setSelected,
	placeholder = "Введите значение",
	options = [],
	disabled,
	required,
}) => {
	const [value, setValue] = React.useState<string>("")
	const [error, setError] = React.useState<{ isError: boolean; msg: string }>(
		{
			isError: false,
			msg: "",
		}
	)
	const datalistID = crypto.randomUUID()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}
	const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return
		e.preventDefault()
		if (value === "") {
			setError({
				isError: true,
				msg: "please enter value",
			})
			return
		}
		setSelected((prev) => {
			if (prev.includes(value)) {
				setError((prev) => {
					return {
						isError: true,
						msg: `\`${value}\` is already selected`,
					}
				})
				return prev
			}
			setError((prev) => {
				return {
					isError: false,
					msg: "",
				}
			})
			return [...prev, value]
		})
		setValue("")
	}

	const handleOptionRemove = (value: string) => {
		setSelected((prev) => {
			return prev.filter((v) => v !== value)
		})
	}

	useEffect(() => {
		let timeoutId = null as unknown as ReturnType<typeof setTimeout>
		if (error.isError) {
			timeoutId = setTimeout(() => {
				setError((prev) => {
					return {
						...prev,
						isError: false,
						msg: "",
					}
				})
			}, 7000)
		}
		return () => {
			clearTimeout(timeoutId)
		}
	}, [error.isError])

	return (
		<div className={style.wrapper}>
			{error.isError && <div className={style.error}>{error.msg}</div>}

			<input
				type="text"
				list={datalistID}
				className={`input input--rounded ${
					required && selected.length === 0
						? ""
						: "input--not-required"
				}`}
				value={value}
				onChange={handleChange}
				onKeyDown={handleEnter}
				placeholder={placeholder}
				title={placeholder}
				disabled={disabled}
				required={required && selected.length === 0}
			/>
			<datalist id={datalistID}>
				{options.map((option) => {
					return <option key={option} value={option} />
				})}
			</datalist>
			<div className={style["selected"]}>
				{selected.map((value) => (
					<div
						key={value}
						className={style.option}
						onClick={() => handleOptionRemove(value)}
					>
						{value}
					</div>
				))}
			</div>
		</div>
	)
}
