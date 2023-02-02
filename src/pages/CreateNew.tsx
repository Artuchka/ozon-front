import React, {
	ChangeEvent,
	FormEvent,
	MouseEvent,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import {
	createProduct,
	fetchEdit,
	updateProduct,
	uploadImages,
} from "../store/features/product/thunks"
import { selectProducts } from "../store/features/product/selectors"
import {
	PropertyInput,
	SpecType,
} from "../components/pageBlocks/inputs/PropertyInput"
import { InputMultiple } from "../components/pageBlocks/inputs/InputMultiple"
import { toast } from "react-toastify"
import { useLocation } from "react-router-dom"
import qs from "query-string"
import {
	SingleProductType,
	removeImagePath,
	setImagePath,
	unsetEdit,
} from "../store/features/product/productSlice"
import { Loading } from "../components/Loading"

export const CreateNew = () => {
	const formRef = useRef<HTMLFormElement>(null)
	const imagesRef = useRef<HTMLInputElement>(document.createElement("input"))

	const { details } = useSelector(selectProducts)
	const {
		tags: tagOptions,
		categories: categoryOptions,
		companies: companyOptions,
	} = details
	const dispatch = useDispatch<AppDispatch>()
	const [specs, setSpecs] = useState<SpecType[]>([])
	const [companies, setCompanies] = useState<string[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [tags, setTags] = useState<string[]>([])
	const { search } = useLocation()
	const { editingId } = qs.parse(search)

	console.log({ editingId })
	const { creating, edit } = useSelector(selectProducts)
	const { paths: filePaths } = creating

	useEffect(() => {
		if (!editingId) {
			dispatch(unsetEdit())
			return
		}

		if (edit.isError) return
		if (!edit.isLoading && (!edit.product || edit.editId !== editingId)) {
			dispatch(fetchEdit(editingId as string))
		}

		if (
			!edit.isLoading &&
			edit.product &&
			Object.keys(edit.product).length > 0
		) {
			setupInputs(
				formRef,
				edit.product,
				setSpecs,
				setCompanies,
				setCategories,
				setTags,
				(data: string[]) => dispatch(setImagePath(data))
			)
		}
	}, [edit.isLoading, edit.editId, editingId])

	useEffect(() => {
		if (edit.isEditing) {
			document.title = "Изменить товар - OZON"
		} else {
			document.title = "Новый товар - OZON"
		}
	}, [edit.isEditing])

	// if (edit.isLoading || creating.isLoading) {
	// 	return <Loading />
	// }

	if (edit.isError) {
		return (
			<>
				<h1>У нас нет такого товара</h1>
				<p>Сожалеем, что вы попали на эту страницу</p>
			</>
		)
	}
	const handleImageRemove = (e: MouseEvent<HTMLImageElement>) => {
		const img = e.target as HTMLImageElement
		dispatch(removeImagePath(img.alt))
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (
			companies.length === 0 ||
			categories.length === 0 ||
			filePaths.length === 0 ||
			tags.length === 0
		) {
			toast.error(
				`Пожалуйста, заполните поля компаний, категорий, тегов и добавьте фотографий 🥺 👉👈`
			)
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

		if (edit.isEditing) {
			dispatch(updateProduct({ id: editingId, formData }))
		} else {
			dispatch(createProduct(formData))
		}
		imagesRef.current.value = ""
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
					disabled={edit.isLoading || creating.isLoading}
				/>
				<input
					className="input input--rounded"
					type="text"
					placeholder="Введите описание"
					name="description"
					required
					disabled={edit.isLoading || creating.isLoading}
				/>
				<input
					type="number"
					className="input input--rounded"
					placeholder="Введите цену"
					name="price"
					required
					disabled={edit.isLoading || creating.isLoading}
				/>
				<PropertyInput
					props={specs}
					setProps={setSpecs}
					disabled={edit.isLoading || creating.isLoading}
				/>
				<InputMultiple
					selected={companies}
					setSelected={setCompanies}
					options={companyOptions}
					placeholder={"Введите компании изготовители через Enter ⏎"}
					disabled={edit.isLoading || creating.isLoading}
					required={true}
				/>
				<InputMultiple
					selected={categories}
					setSelected={setCategories}
					options={categoryOptions}
					placeholder={"Введите категории через Enter ⏎"}
					disabled={edit.isLoading || creating.isLoading}
					required={true}
				/>
				<InputMultiple
					selected={tags}
					setSelected={setTags}
					options={tagOptions}
					placeholder={"Введите теги через Enter ⏎"}
					disabled={edit.isLoading || creating.isLoading}
					required={true}
				/>
				<input
					ref={imagesRef}
					type="file"
					className="input input--rounded"
					multiple
					name="file"
					accept="image/*"
					onChange={handleFileChange}
					required={filePaths?.length === 0}
					disabled={edit.isLoading || creating.isLoading}
				/>
				<div className="images-container">
					{filePaths?.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={image}
							onClick={handleImageRemove}
						/>
					))}
				</div>
				<button
					className="btn btn--contained btn--rounded btn--tall"
					type="submit"
					disabled={edit.isLoading || creating.isLoading}
				>
					{edit.isEditing ? "Сохранить" : "Создать"}
				</button>
			</form>
		</div>
	)
}

function setupInputs(
	formRef: RefObject<HTMLFormElement>,
	product: SingleProductType,
	setSpecs: Function,
	setCompanies: Function,
	setCategories: Function,
	setTags: Function,
	setPaths: Function
) {
	let inp = formRef.current?.title as unknown as HTMLInputElement
	inp.value = product.title

	inp = formRef.current?.description
	inp.value = product.description

	inp = formRef.current?.price
	inp.value = product.price.toString()

	setSpecs(product.specs)
	setCategories(product.categories)
	setCompanies(product.companies)
	setTags(product.tags)
	setPaths(product.images)
}
