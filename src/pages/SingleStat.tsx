import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStats } from "../store/features/stats/selectors"
import { Loading } from "../components/Loading"
import { AppDispatch } from "../store/store"
import { getSingleStatByProductId } from "../store/features/stats/thunks"
import { useParams } from "react-router-dom"
import { RadarChart } from "../components/RadarChart"

export const SingleStat = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { singleStat } = useSelector(selectStats)
	const { stat, isLoading } = singleStat
	const { product, visits, refunded, bought } = stat
	const { productId } = useParams()

	useEffect(() => {
		dispatch(getSingleStatByProductId(productId as string))
	}, [])

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
			{/* <div className="visits">{JSON.stringify(visits)}</div> */}
			{/* <div className="bought">{bought}</div>
			<div className="refunded">{refunded}</div> */}
			<RadarChart />
		</div>
	)
}
