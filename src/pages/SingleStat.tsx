import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStats } from "../store/features/stats/selectors"
import { Loading } from "../components/Loading"
import { AppDispatch } from "../store/store"
import { getSingleStatByProductId } from "../store/features/stats/thunks"
import { useParams } from "react-router-dom"
import { RadarChart } from "../components/RadarChart"
import { AreaChart } from "../components/AreaChart"
import { setActionsHistory } from "../store/features/stats/statsSlice"
import { toast } from "react-toastify"
import { ProductItem } from "../components/ProductItem"
import { ProductCard } from "../components/ProductCard"
import { StatGraphs } from "../components/StatGraphs"

export const SingleStat = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { singleStat } = useSelector(selectStats)
	const { stat, isLoading, actionsHistory: actionsHistoryReady } = singleStat
	const { product, visits, refunded, bought, bookmarked } = stat
	const { productId } = useParams()

	const oneDay = 1000 * 60 * 60 * 24
	const calculatedDataNow = [visits, bought, bookmarked, refunded]

	const actionsHistory = [calculatedDataNow]

	const daysAmount = 5

	for (let dayNumber = 1; dayNumber < daysAmount; dayNumber++) {
		const prevCalculatedData = actionsHistory[actionsHistory.length - 1]
		const newCalculatedData = prevCalculatedData?.map((actionsArray) => {
			return actionsArray?.filter(
				(item) =>
					Date.now() - new Date(item.date).getTime() >
					dayNumber * oneDay
			)
		})
		actionsHistory.push(newCalculatedData)
	}

	useEffect(() => {
		dispatch(getSingleStatByProductId(productId as string))

		toast("Разные виды чартов дают лучшее представление о успехах продаж!")
	}, [])

	useEffect(() => {
		dispatch(setActionsHistory(actionsHistory))
	}, [singleStat.isLoading])

	if (isLoading) {
		return <Loading />
	}
	if (product?._id !== productId) {
		return (
			<div className="single-stat-page">
				<h1>По этому товару мы еще не собрали статистику =(</h1>
			</div>
		)
	}
	return (
		<div className="single-stat-page">
			<h2>
				Статистика по товару <small>(артикул: {productId})</small>
			</h2>
			<div className="product-card">
				<ProductCard {...product} />
			</div>
			<StatGraphs data={actionsHistoryReady} />
		</div>
	)
}
