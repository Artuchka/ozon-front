import React, {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	useState,
} from "react"
import { v4 as uuidv4 } from "uuid"

export type SpecType = {
	title: string
	value: string
	link: string
	id: string
	_id?: string
}

type propsType = {
	props: SpecType[]
	setProps: Dispatch<SetStateAction<SpecType[]>>
}
export const PropertyInput: FC<propsType> = ({ props, setProps }) => {
	const handleAddSpec = () => {
		setProps((prev) => [
			...prev,
			{
				value: "значение",
				title: "название",
				link: "/ссылка",
				id: uuidv4(),
			},
		])
	}

	const handleRemoveSpec = (id: string) => {
		setProps((prev) => prev.filter((prop) => prop.id !== id))
	}
	const handleChangeSpec = (e: ChangeEvent<HTMLInputElement>, id: string) => {
		const { value } = e.target
		const { name } = e.target.dataset
		if (!name) return
		console.log({ name, value })

		setProps((prev) => {
			const newSpecs = prev.map((spec) => {
				if (spec.id === id || spec._id === id) {
					return { ...spec, [name]: value }
				}
				return spec
			})

			return newSpecs
		})
	}
	return (
		<>
			<div className="specs">
				{props.map((prop, index) => {
					const keys = Object.keys(prop).filter(
						(key) => key !== "id" && key !== "_id"
					)
					const id = prop.id ? prop.id : (prop._id as string)

					return (
						<div className="spec" key={id} id={id}>
							{keys.map((key) => {
								return (
									<input
										key={`${id}-${key}`}
										type="text"
										className="input input--rounded "
										placeholder="Введите название"
										required
										value={prop[key as keyof SpecType]}
										data-name={key}
										onChange={(e) =>
											handleChangeSpec(e, id)
										}
									/>
								)
							})}
							<div
								className="close"
								onClick={() => handleRemoveSpec(id)}
							>
								&times;
							</div>
						</div>
					)
				})}
			</div>
			<button
				className="btn btn--contained btn--rounded btn--content"
				onClick={handleAddSpec}
				type="button"
			>
				Добавить характеристику
			</button>
		</>
	)
}
