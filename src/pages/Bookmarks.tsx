import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getAllBookmarks } from "../store/features/bookmark/thunks"
import { selectBookmarks } from "../store/features/bookmark/selector"
import { ProductItem } from "../components/ProductItem"
import { Loading } from "../components/Loading"

export const Bookmarks = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { bookmarks, isLoading } = useSelector(selectBookmarks)
	useEffect(() => {
		document.title = "Моё избранное - OZON"
		dispatch(getAllBookmarks())
	}, [])

	if (isLoading) {
		return (
			<div className="bookmarks-page">
				<h1>Избранное</h1>
				<Loading />
			</div>
		)
	}
	if (bookmarks.length === 0) {
		return (
			<div className="bookmarks-page">
				<h1>Избранное</h1>
				<h3>Здесь пока пусто, ждём закладки :D</h3>
			</div>
		)
	}

	return (
		<div className="bookmarks-page">
			<h1>Избранное</h1>
			<div className="bookmars">
				{bookmarks.map((item) => {
					return <ProductItem key={item._id} {...item.product} />
				})}
			</div>
		</div>
	)
}
