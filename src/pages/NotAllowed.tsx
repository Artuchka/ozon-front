import React, { useEffect } from "react"
import { Link } from "react-router-dom"

export const NotAllowed = () => {
	useEffect(() => {
		document.title = "Доступ запрещен - OZON"
	}, [])

	return (
		<div className="not-allowed-page">
			<h1>Вход только для авторизированных пользователей</h1>
			<Link to="/">Вернуться на Главную</Link>
			<img
				src={
					"https://res.cloudinary.com/dzy8xh83i/image/upload/v1675457950/OZON_DEFAULT/notAllowed_icios1.jpg"
				}
				alt=""
			/>
		</div>
	)
}
