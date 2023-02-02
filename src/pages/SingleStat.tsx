import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStats } from "../store/features/stats/selectors"
import { Loading } from "../components/Loading"
import { AppDispatch } from "../store/store"
import { getSingleStatByProductId } from "../store/features/stats/thunks"
import { useParams } from "react-router-dom"
import {
	ActionsDetails,
	setActionsHistory,
} from "../store/features/stats/statsSlice"
import { toast } from "react-toastify"
import { ProductItem } from "../components/ProductItem"
import { ProductCard } from "../components/ProductCard"
import { StatGraphs } from "../components/StatGraphs"
import { SingleStatSkeleton } from "../components/pageBlocks/Skeletons/SingleStatSkeleton"

export const SingleStat = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { singleStat } = useSelector(selectStats)
	const { stat, isLoading, actionsHistory: actionsHistoryReady } = singleStat
	const { product, visits, refunded, bought, bookmarked } = stat
	const { productId } = useParams()

	useEffect(() => {
		const productTitle = singleStat?.stat?.product?.title
		document.title = `Статистика (${productTitle?.slice(0, 10)}${
			productTitle?.length > 10 && "..."
		}) - OZON`
	}, [])

	useEffect(() => {
		dispatch(getSingleStatByProductId(productId as string))

		toast("Разные виды чартов дают лучшее представление о успехах продаж!")
	}, [])

	const actionsHistory = useMemo(() => getActionsHistory(stat), [stat])
	useEffect(() => {
		dispatch(setActionsHistory(actionsHistory))
	}, [actionsHistory])

	if (isLoading) {
		return <SingleStatSkeleton />
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
const oneDay = 1000 * 60 * 60 * 24
const daysAmount = 5
function getActionsHistory(stat: any) {
	const { visits, bought, bookmarked, refunded } = stat

	const calculatedDataNow = [visits, bought, bookmarked, refunded]

	const actionsHistory = [calculatedDataNow]

	for (let dayNumber = 1; dayNumber < daysAmount; dayNumber++) {
		const prevCalculatedData = actionsHistory[actionsHistory.length - 1]
		const newCalculatedData = prevCalculatedData?.map((actionsArray) => {
			return actionsArray?.filter(
				(item: ActionsDetails) =>
					Date.now() - new Date(item.date).getTime() >
					dayNumber * oneDay
			)
		})
		actionsHistory.push(newCalculatedData)
	}
	return actionsHistory
}
