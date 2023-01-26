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

export const SingleStat = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { singleStat } = useSelector(selectStats)
	const { stat, isLoading } = singleStat
	const { product, visits, refunded, bought, bookmarked } = stat
	const { productId } = useParams()

	const [graph, setGraph] = useState("linear")

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

	const handleGraphToggle = () => {
		setGraph((prev) => {
			return prev === "linear" ? "radial" : "linear"
		})
	}

	useEffect(() => {
		dispatch(getSingleStatByProductId(productId as string))
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
			Статистика по товару
			<div className="product">product id = {product?._id}</div>
			<button className="btn btn--middle" onClick={handleGraphToggle}>
				{graph === "radial" && "Показать линейный"}
				{graph === "linear" && "Показать радиальнй"}
			</button>
			{graph === "radial" && <RadarChart />}
			{graph === "linear" && <AreaChart />}
		</div>
	)
}
