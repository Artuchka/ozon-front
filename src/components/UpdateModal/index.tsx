import React, { ChangeEvent, FC } from "react"
import { Modal } from "../Modal"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import style from "./style.module.scss"

export type typeVariants = "names" | "birthday" | "email" | "phone" | "gender"

type proptype = {
	open: boolean
	setOpen: Function
	type: typeVariants
}

export const UpdateModal: FC<proptype> = ({ open, setOpen, type }) => {
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

	const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
		const { name, value } = e.target
		console.log("chaning = ", { name, value })
	}

	if (type === "gender") {
		body = (
			<form onChange={handleChange}>
				<h3>Главное - правильно</h3>
				<SelectRadio
					title="Пол"
					name="gender"
					items={genderOptions}
					className={style.GenderChange}
				/>
			</form>
		)
	}
	return (
		<Modal open={open} setOpen={setOpen}>
			{/* {body} */}
			<h1>hi</h1>
		</Modal>
	)
}
