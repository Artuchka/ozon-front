import React, {
	ChangeEvent,
	FormEvent,
	FormEventHandler,
	useEffect,
	useState,
} from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { createProduct } from "../store/features/product/thunks"

export const CreateNew = () => {
	const [values, setValues] = useState({
		description: "",
		title: "",
		price: 100,
	})
	const dispatch = useDispatch<AppDispatch>()

	const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
		const { name, value } = e.target
		setValues((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		console.log(values)

		dispatch(createProduct(values))
	}
	return (
		<div className="create-new">
			<form
				className="inputs-container"
				onChange={handleChange}
				onSubmit={handleSubmit}
			>
				<input
					className="input input--rounded"
					type="text"
					placeholder="Введите название"
					name="title"
				/>
				<input
					className="input input--rounded"
					type="text"
					placeholder="Введите описание"
					name="description"
				/>
				<input
					type="number"
					className="input input--rounded"
					placeholder="Введите цену"
					name="price"
				/>
				<button
					className="btn btn--contained btn--rounded btn--tall"
					type="submit"
				>
					Создать
				</button>
			</form>
		</div>
	)
}
