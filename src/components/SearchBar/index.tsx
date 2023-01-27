import React, {
	ChangeEvent,
	MouseEvent,
	useCallback,
	useRef,
	useState,
} from "react"
import style from "./style.module.scss"
import { selectFilters } from "../../store/features/filter/selector"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { debounce } from "lodash"
import { AppDispatch } from "../../store/store"
import { updateFilters } from "../../store/features/filter/filterSlice"
import { AiOutlineSearch } from "react-icons/ai"
import { SearchSuggestions } from "../SearchSuggestions"

export const SearchBar = () => {
	const [isSuggesting, setIsSuggesting] = useState(false)
	const [search, setSearch] = useState("")
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { title } = useSelector(selectFilters)
	const dispatch = useDispatch<AppDispatch>()
	const suggestionBgRef = useRef(document.createElement("div"))

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

	const handleOnFocusIn = () => {
		setIsSuggesting(true)
	}

	const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
		if (suggestionBgRef.current === e.target) {
			setIsSuggesting(false)
		}
	}

	return (
		<div
			className={`${style["wrapper"]} ${
				isSuggesting ? style.suggesting : ""
			}`}
			onFocus={handleOnFocusIn}
			// onBlur={handleOnFocusOut}
			onClick={handleClickOutside}
		>
			<form onSubmit={handleSubmit} className={style["form"]}>
				<div className={style["search-bar"]}>
					<input
						type="text"
						placeholder="Искать на Ozon"
						value={search}
						name="title"
						onChange={handleChange}
					/>
					<AiOutlineSearch />
				</div>
			</form>
			<div className={style.suggestion}>
				<SearchSuggestions />
			</div>
			<div className={style["suggestion-bg"]} ref={suggestionBgRef}></div>
		</div>
	)
}
