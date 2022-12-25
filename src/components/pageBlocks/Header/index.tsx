import React, { ChangeEvent, useCallback, useState } from "react"
import styles from "./header.module.scss"
import { AiOutlineSearch, AiFillHeart } from "react-icons/ai"
import { BiFace, BiAddToQueue } from "react-icons/bi"
import { BsHandbag, BsBoxSeam } from "react-icons/bs"
import { StatusLink } from "../../StatusLink"
import { Logo } from "../../Logo"
import { LoginModal } from "../../LoginModal"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth } from "../../../store/features/auth/selectors"
import { selectFilters } from "../../../store/features/filter/selector"
import { AppDispatch } from "../../../store/store"
import { updateFilters } from "../../../store/features/filter/filterSlice"
// import debounce from "lodash.debounce"
import { useLocation, useNavigate } from "react-router-dom"
import { debounce } from "lodash"

export const Header = () => {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState("")
	const dispatch = useDispatch<AppDispatch>()
	const auth = useSelector(selectAuth)
	const user = auth.role !== null
	const { role } = auth

	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { title } = useSelector(selectFilters)

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

	return (
		<header className={styles.header}>
			<Logo className={styles.logo} />
			<form onSubmit={handleSubmit} className={styles.searchBarWrapper}>
				<div className={styles.searchBar}>
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
			<nav>
				{user ? (
					<StatusLink
						data={100}
						icon={<BiFace />}
						link="/my/main"
						title={"artemka"}
					/>
				) : (
					<StatusLink
						data={100}
						icon={<BiFace />}
						onClick={(e) => {
							setOpen(true)
						}}
						title="Войти"
					/>
				)}
				{role === "vendor" && (
					<StatusLink
						icon={<BiAddToQueue />}
						link="/create-new"
						title="+Товар"
					/>
				)}
				{!!user && (
					<>
						<StatusLink
							icon={<AiFillHeart />}
							link="/bookmarks"
							title="Избранное"
							color="var(--heart-color)"
						/>

						<StatusLink
							data={3}
							icon={<BsHandbag />}
							link="/cart"
							title="Корзина"
						/>
						<StatusLink
							data={0}
							icon={<BsBoxSeam />}
							link="/orders"
							title="Заказы"
						/>
					</>
				)}
			</nav>
			<LoginModal open={open} setOpen={setOpen} />
		</header>
	)
}
