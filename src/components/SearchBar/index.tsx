import React, { ChangeEvent, useCallback, useState } from "react"
import style from "./style.module.scss"
import { selectFilters } from "../../store/features/filter/selector"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { debounce } from "lodash"
import { AppDispatch } from "../../store/store"
import { updateFilters } from "../../store/features/filter/filterSlice"
import { AiOutlineSearch } from "react-icons/ai"

export const SearchBar = () => {
	const [isSuggesting, setIsSuggesting] = useState(false)
	const [search, setSearch] = useState("")
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { title } = useSelector(selectFilters)
	const dispatch = useDispatch<AppDispatch>()

	const debouncedChange = useCallback(
		debounce((obj) => {
			dispatch(updateFilters(obj))
		}, 1000),
		[]
	)
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { name, value } = e.target
		setSearch((prev) => value)
		debouncedChange({ name, value })
	}

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (pathname == "/products") return

		navigate("/products")
	}

	const handleOnFocus = () => {
		if (!isSuggesting) setIsSuggesting(true)
	}
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className={`${style.searchBarWrapper} ${
					isSuggesting ? style.suggesting : ""
				}`}
			>
				<div className={style.searchBar}>
					<input
						type="text"
						placeholder="Искать на Ozon"
						value={search}
						name="title"
						onChange={handleChange}
						onFocus={handleOnFocus}
					/>
					<AiOutlineSearch />
				</div>
				{/* <div className={style.suggsestionWrapper}>
					{title?.split("")?.map((item, index) => {
						return <p key={index}>{item}</p>
					})}
				</div> */}
			</form>
			{/* <div className={style.suggestionBg}></div> */}
		</>
	)
}
