import React from "react"
import { Link, Outlet } from "react-router-dom"

export const My = () => {
	const links = [
		{ path: "/my/main", name: "Учетная запись" },
		{ path: "/my/reviews", name: "Мои отзывы" },
	]
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
