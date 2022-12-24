import React, { ChangeEvent, useState } from "react"
import styles from "./header.module.scss"
import { AiOutlineSearch } from "react-icons/ai"
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

export const Header = () => {
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch<AppDispatch>()
	const auth = useSelector(selectAuth)
	const user = auth.role !== null
	const { role } = auth

	const { title } = useSelector(selectFilters)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		dispatch(updateFilters({ name, value }))
	}

	return (
		<header className={styles.header}>
			<Logo className={styles.logo} />
			<form>
				<div className={styles.searchBar}>
					<input
						type="text"
						placeholder="Искать на Ozon"
						value={title}
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
			</nav>
			<LoginModal open={open} setOpen={setOpen} />
		</header>
	)
}
