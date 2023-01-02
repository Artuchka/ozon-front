import React, {
	ChangeEvent,
	FormEvent,
	FormEventHandler,
	useEffect,
	useRef,
	useState,
} from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { createProduct, uploadImages } from "../store/features/product/thunks"
import axios from "axios"
import { ozonAPI } from "../axios/customFetch"
import { selectProducts } from "../store/features/product/selectors"
import {
	PropertyInput,
	SpecType,
} from "../components/pageBlocks/inputs/PropertyInput"
import { InputMultiple } from "../components/pageBlocks/inputs/InputMultiple"
import { toast } from "react-toastify"

export const CreateNew = () => {
	const formRef = useRef<HTMLFormElement>(null)
	const companyOptions = ["apple", "samsung", "google"]
	const categoryOptions = ["еда", "техника", "развлечение"]
	const tagOptions = ["tag1", "tag2", "tag3", "tag4"]
	const dispatch = useDispatch<AppDispatch>()
	const [specs, setSpecs] = useState<SpecType[]>([])
	const [companies, setCompanies] = useState<string[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [tags, setTags] = useState<string[]>([])

	if (creating.isLoading) {
		return <Loading />
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (
			companies.length === 0 ||
			categories.length === 0 ||
			specs.length === 0 ||
			tags.length === 0
		) {
			toast.error("Please fill companies, categories, specs, tags")
			return
		}
		let formData = new FormData(formRef.current || undefined)
		for (let i = 0; i < filePaths.length; i++) {
			formData.append("images", filePaths[i])
		}
		formData.set("specs", JSON.stringify(specs))
		formData.set("companies", JSON.stringify(companies))
		formData.set("categories", JSON.stringify(categories))
		formData.set("tags", JSON.stringify(tags))
		dispatch(createProduct(formData))
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

	return (
		<div className="create-new">
			<form
				className="inputs-container"
				onSubmit={handleSubmit}
				ref={formRef}
			>
				<input
					className="input input--rounded"
					type="text"
					placeholder="Введите название"
					name="title"
					required
				/>
				<input
					className="input input--rounded"
					type="text"
					placeholder="Введите описание"
					name="description"
					required
				/>
				<input
					type="number"
					className="input input--rounded"
					placeholder="Введите цену"
					name="price"
					required
				/>
				<PropertyInput props={specs} setProps={setSpecs} />
				<InputMultiple
					selected={companies}
					setSelected={setCompanies}
					options={companyOptions}
					placeholder={"Введите компании изготовители"}
				/>
				<InputMultiple
					selected={categories}
					setSelected={setCategories}
					options={categoryOptions}
					placeholder={"Введите категории"}
				/>
				<InputMultiple
					selected={tags}
					setSelected={setTags}
					options={tagOptions}
					placeholder={"Введите теги"}
				/>
				<input
					type="file"
					className="input input--rounded"
					multiple
					name="file"
					accept="image/*"
					onChange={handleFileChange}
					required
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
