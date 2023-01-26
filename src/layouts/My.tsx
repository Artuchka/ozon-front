import React from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { selectAuth } from "../store/features/auth/selectors"

export const My = () => {
	const links = [
		{ path: "/my/main", name: "Учетная запись" },
		{ path: "/my/reviews", name: "Мои отзывы" },
		{ path: "/my/orders", name: "Мои заказы" },
	]
	const { role } = useSelector(selectAuth)
	if (role === "vendor") {
		links.push({ path: "/my/products", name: "Мои товары" })
		links.push({ path: "/my/stats", name: "Общая cтатистика" })
	}
	return (
		<div className="my-layout">
			<div className="sidebar">
				<ul>
					{links.map((link, index) => (
						<li key={index}>
							<Link to={link.path}>{link.name}</Link>
						</li>
					))}
				</ul>
			</div>
			<Outlet />
		</div>
	)
}
