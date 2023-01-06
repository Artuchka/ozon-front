import React, {
	ChangeEvent,
	FormEvent,
	FormEventHandler,
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
import axios from "axios"
import { ozonAPI } from "../axios/customFetch"
import { selectProducts } from "../store/features/product/selectors"
import {
	PropertyInput,
	SpecType,
} from "../components/pageBlocks/inputs/PropertyInput"
import { InputMultiple } from "../components/pageBlocks/inputs/InputMultiple"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"
import qs from "query-string"
import {
	SingleProductType,
	unsetEdit,
} from "../store/features/product/productSlice"
import { Loading } from "../components/Loading"

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
	const { search } = useLocation()
	const { editingId } = qs.parse(search)

	console.log({ editingId })
	const { creating, singleProduct } = useSelector(selectProducts)
	const { paths: filePaths, isEditing } = creating

	useEffect(() => {
		return () => {
			if (creating.editId) {
				dispatch(unsetEdit())
			}
		}
	}, [])

	useEffect(() => {
		if (!editingId) {
			dispatch(unsetEdit())
			return
		}

		// console.log({ here: editingId })

		if (
			!creating.isLoading &&
			(!creating.product || creating.editId !== editingId)
		) {
			dispatch(fetchEdit(editingId as string))
		}

		if (
			!creating.isLoading &&
			creating.product &&
			Object.keys(creating.product).length > 0
		) {
			setupInputs(
				formRef,
				creating.product,
				setSpecs,
				setCompanies,
				setCategories,
				setTags
			)
		}
	}, [creating.isLoading, creating.editId, editingId])

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

		if (isEditing) {
			dispatch(updateProduct({ id: editingId, formData }))
		} else {
			dispatch(createProduct(formData))
		}
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
					{isEditing ? "Сохранить" : "Создать"}
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
	setTags: Function
) {
	let inp = formRef.current?.title as unknown as HTMLInputElement
	inp.value = product.title

	inp = formRef.current?.description
	inp.value = product.description

	inp = formRef.current?.price
	inp.value = product.price

	setSpecs(product.specs)
	setCategories(product.categories)
	setCompanies(product.companies)
	setTags(product.tags)
}
