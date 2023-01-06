import React, { useEffect } from "react"

export const NotFound = () => {
	useEffect(() => {
		document.title = "404 - Страница не найдена"
	}, [])
	return (
		<div className="not-found-page">
			<h1>404</h1>
			<h2>Такой страницы, не существует</h2>
			<p>
				Будьте счастливы пользоваться остальными страницами клона Ozon
				:D
			</p>
		</div>
	)
}
