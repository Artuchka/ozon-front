import React, { useState } from "react"
import styles from "./header.module.scss"
import { AiOutlineSearch } from "react-icons/ai"
import { BiFace } from "react-icons/bi"
import { BsHandbag, BsBoxSeam } from "react-icons/bs"
import { StatusLink } from "../../StatusLink"
import { Logo } from "../../Logo"
import { Modal } from "../../Modal"
import { LoginModal } from "../../LoginModal"
import { useSelector } from "react-redux"
import { selectAuth } from "../../../store/features/auth/selectors"

export const Header = () => {
	const [open, setOpen] = useState(false)
	const auth = useSelector(selectAuth)
	console.log(auth)
	const user = auth.role !== null

	return (
		<header className={styles.header}>
			<Logo className={styles.logo} />
			<div className={styles.searchBar}>
				<input type="text" placeholder="Искать на Ozon" />
				<AiOutlineSearch />
			</div>
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
