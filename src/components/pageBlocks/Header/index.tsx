import React, { ChangeEvent, useCallback, useState } from "react"
import styles from "./header.module.scss"
import { AiOutlineSearch, AiFillHeart } from "react-icons/ai"
import { BiFace, BiAddToQueue } from "react-icons/bi"
import { BsHandbag, BsBoxSeam } from "react-icons/bs"
import { StatusLink } from "../../StatusLink"
import { Logo } from "../../Logo"
import { LoginModal } from "../../LoginModal"
import { useSelector } from "react-redux"
import { selectAuth } from "../../../store/features/auth/selectors"
import { selectOrder } from "../../../store/features/order/selector"
import { selectBookmarks } from "../../../store/features/bookmark/selector"
import { SearchBar } from "../../SearchBar"
import { Link } from "react-router-dom"

export const Header = () => {
	const [open, setOpen] = useState(false)
	const { order, allOrders } = useSelector(selectOrder)
	const { bookmarks } = useSelector(selectBookmarks)
	const auth = useSelector(selectAuth)
	const user = auth.role !== null
	const { role } = auth

	return (
		<div className={styles["header-wrapper"]}>
			<div className={styles["action-tab"]}>
				<Link className="link" to="/not-found">
					<button className="btn btn--low-active btn--bubble btn--content ">
						Стать продавцом
					</button>
				</Link>
				<Link className="link" to="/not-found">
					<button className="btn btn--low-active btn--content">
						Покупать как компания
					</button>
				</Link>
				<Link className="link" to="/not-found">
					<button className="btn btn--low-active btn--content">
						Мобильное приложение
					</button>
				</Link>
				<Link className="link" to="/not-found">
					<button className="btn btn--low-active btn--content">
						Реферальная программа
					</button>
				</Link>
			</div>
			<div className={styles["header-bg"]}></div>
			<div className={styles["separator"]}></div>

			<header className={styles.header}>
				<LoginModal open={open} setOpen={setOpen} />
				<Logo className={styles.logo} />
				<SearchBar />
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
								data={bookmarks?.length || 0}
							/>

							<StatusLink
								data={order?.amountTotal || 0}
								icon={<BsHandbag />}
								link="/cart"
								title="Корзина"
							/>
							<StatusLink
								data={allOrders?.details?.["all"] || 0}
								icon={<BsBoxSeam />}
								link="/my/orders"
								title="Заказы"
							/>
						</>
					)}
				</nav>
			</header>
		</div>
	)
}
