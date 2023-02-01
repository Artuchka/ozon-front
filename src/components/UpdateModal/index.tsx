import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { Modal } from "../Modal"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import style from "./style.module.scss"
import { toast } from "react-toastify"
import equal from "fast-deep-equal"
import { useDispatch, useSelector } from "react-redux"
import {
	updateDataType,
	updateUser,
	uploadImages,
} from "../../store/features/auth/thunks"
import { AppDispatch } from "../../store/store"
import { selectAuth } from "../../store/features/auth/selectors"

export type typeVariants =
	| "names"
	| "birthday"
	| "email"
	| "phone"
	| "gender"
	| "username"
	| "avatar"

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
	const {
		user: { gender, firstName, lastName },
		imagePath,
		isLoading,
	} = useSelector(selectAuth)

	const imageRef = useRef(document.createElement("input"))
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

	useEffect(() => {
		handleChange({
			target: { name: "avatar", value: imagePath },
		} as ChangeEvent<HTMLInputElement>)
	}, [imagePath])

	// storing actual input values
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setAnswer((prev) => {
			return { ...prev, [name]: value }
		})
	}

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		const files = e.target.files || []

		let formData = new FormData()
		for (let i = 0; i < files.length; i++) {
			formData.append("images", files[i])
		}
		dispatch(uploadImages(formData))
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
	}

	if (type === "gender") {
		body = (
			<SelectRadio
				title="Пол"
				name="gender"
				items={genderOptions}
				className={style.GenderChange}
				selected={answer.gender || gender || "male"}
				onChange={handleChange}
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
					value={
						answer.firstName || defaultAnswer.firstName || "temp"
					}
					onChange={handleChange}
					disabled={isLoading}
				/>
				<input
					type="text"
					className="input input--rounded"
					placeholder="Введите фамилию"
					name="lastName"
					value={answer.lastName || defaultAnswer.lastName || "temp"}
					onChange={handleChange}
					disabled={isLoading}
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
				value={answer["phone"] || defaultAnswer["phone"] || "temp"}
				onChange={handleChange}
				disabled={isLoading}
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
				value={answer.email || defaultAnswer.email || "temp"}
				onChange={handleChange}
				disabled={isLoading}
			/>
		)
	}
	if (type === "avatar") {
		const createdAvatar = `https://avatars.dicebear.com/api/croodles/${gender}/${
			lastName + firstName
		}.svg?mood[]=happy&backgroundColor=%333999`
		body = (
			<>
				<input
					ref={imageRef}
					type="file"
					className="input input--rounded"
					placeholder="Выберите аватарку"
					title="Выберите аватарку"
					name="file"
					accept="image/*"
					onChange={handleFileChange}
					disabled={isLoading}
				/>
				<h2 className={style.separator}>ИЛИ</h2>
				<img
					className={style.createdAvatar}
					src={createdAvatar}
					alt="createdAvatar"
					onClick={() => {
						setAnswer((prev) => {
							return { ...prev, avatar: createdAvatar }
						})
					}}
				/>
				<small>Сгенерированный аватар Вашего профиля</small>
			</>
		)
	}
	if (type === "username") {
		body = (
			<input
				type="text"
				className="input input--rounded"
				placeholder="Введите никнейм"
				name="username"
				value={answer.username || defaultAnswer.username || "temp"}
				onChange={handleChange}
				disabled={isLoading}
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
					defaultAnswer.birthday?.split(".")[0] ||
					"1969-08-21T00:01"
				}
				onChange={handleChange}
				disabled={isLoading}
			/>
		)
	}
	return (
		<Modal open={open} setOpen={setOpen}>
			<form onSubmit={handleSubmit}>
				<h3>Главное - правильно</h3>
				{body}
				<button
					type="submit"
					className={`${style.btn} btn btn--rounded btn--contained btn--tall`}
					disabled={isLoading}
				>
					Сохранить
				</button>
			</form>
		</Modal>
	)
}
