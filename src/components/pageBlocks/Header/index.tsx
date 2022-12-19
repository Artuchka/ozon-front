import React, { useState } from "react"
import styles from "./header.module.scss"
import { AiOutlineSearch } from "react-icons/ai"
import { BiFace } from "react-icons/bi"
import { BsHandbag, BsBoxSeam } from "react-icons/bs"
import { StatusLink } from "../../StatusLink"
import { Logo } from "../../Logo"
import { Modal } from "../../Modal"
import { LoginModal } from "../../LoginModal"

export const Header = () => {
	const [open, setOpen] = useState(false)
	const user = false
	return (
		<header className={styles.header}>
			<Logo className={styles.logo} />
			<div className={styles.searchBar}>
				<input type="text" placeholder="Искать на Ozon" />
				<AiOutlineSearch />
			</div>
			<nav>
				{user ? (
					<StatusLink data={100} icon={<BiFace />} link="/my/main" />
				) : (
					<StatusLink
						data={100}
						icon={<BiFace />}
						onClick={(e) => {
							setOpen(true)
						}}
					/>
				)}
				<StatusLink data={3} icon={<BsHandbag />} link="/cart" />
				<StatusLink data={0} icon={<BsBoxSeam />} link="/orders" />
			</nav>
			<LoginModal open={open} setOpen={setOpen} />
		</header>
	)
}
