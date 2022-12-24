import React, { ChangeEvent, FC, useEffect, useState } from "react"
import { Modal } from "../Modal"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import style from "./style.module.scss"
import { toast } from "react-toastify"
import equal from "fast-deep-equal"
import { useDispatch, useSelector } from "react-redux"
import { updateDataType, updateUser } from "../../store/features/auth/thunks"
import { AppDispatch } from "../../store/store"
import { selectAuth } from "../../store/features/auth/selectors"

export type typeVariants = "names" | "birthday" | "email" | "phone" | "gender"

type proptype = {
	open: boolean
	setOpen: Function
	setDefaultAnswer: Function
	type: typeVariants
	defaultAnswer: updateDataType
}

export const UpdateModal: FC<proptype> = ({
	open,
	setOpen,
	type,
	defaultAnswer,
	setDefaultAnswer,
}) => {
	const [answer, setAnswer] = useState<updateDataType>(defaultAnswer)
	const dispatch = useDispatch<AppDispatch>()
	const { gender } = useSelector(selectAuth)
	let body = (
		<>
			<h1>update</h1>
		</>
	)

	const genderOptions = [
		{
			label: "Мужской",
			value: "male",
		},
		{
			label: "Женский",
			value: "female",
		},
		{
			label: "Attack Helicopter",
			value: "Attack Helicopter",
		},
	]

	// clearing input values when modal is closing
	useEffect(() => {
		if (!open) {
			console.log("clearing")
			setDefaultAnswer({})
			setAnswer({})
		}
	}, [open])

	// storing actual input values
	const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
		const { name, value } = e.target

		setAnswer((prev) => {
			return { ...prev, [name]: value }
		})
	}

	// sending redux thunk to update user
	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log("trying = ", answer)
		if (Object.keys(answer).length === 0 || equal(defaultAnswer, answer)) {
			toast.warn("Ничего не поменялось")
			return
		}
		console.log("saving = ", answer)
		dispatch(updateUser(answer))
		setDefaultAnswer(answer)
		setOpen(false)
		// toast.success("Сохранено!")
	}

	if (type === "gender") {
		body = (
			<SelectRadio
				title="Пол"
				name="gender"
				items={genderOptions}
				className={style.GenderChange}
				selected={gender || "male"}
				onChange={() => {}}
			/>
		)
	}
	if (type === "names") {
		body = (
			<>
				<input
					type="text"
					className="input input--rounded"
					placeholder="Введите имя"
					name="firstName"
					value={answer.firstName || defaultAnswer.firstName}
				/>
				<input
					type="text"
					className="input input--rounded"
					placeholder="Введите фамилию"
					name="lastName"
					value={answer.lastName || defaultAnswer.lastName}
				/>
			</>
		)
	}
	if (type === "phone") {
		body = (
			<input
				type="text"
				className="input input--rounded"
				placeholder="Введите телефон"
				name="phone"
				value={answer["phone"] || defaultAnswer["phone"]}
			/>
		)
	}
	if (type === "email") {
		body = (
			<input
				type="email"
				className="input input--rounded"
				placeholder="Введите почту"
				name="email"
				value={answer.email || defaultAnswer.email}
			/>
		)
	}
	if (type === "birthday") {
		body = (
			<input
				type="datetime-local"
				className="input input--rounded"
				name="birthday"
				value={
					answer.birthday?.split(".")[0] ||
					defaultAnswer.birthday?.split(".")[0]
				}
			/>
		)
	}
	return (
		<Modal open={open} setOpen={setOpen}>
			<form onChange={handleChange} onSubmit={handleSubmit}>
				<h3>Главное - правильно</h3>
				{body}
				<button
					type="submit"
					className={`${style.btn} btn btn--rounded btn--contained btn--tall`}
				>
					Сохранить
				</button>
			</form>
		</Modal>
	)
}
