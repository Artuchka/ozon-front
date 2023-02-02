import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getAllStats } from "../store/features/stats/thunks"
import { selectStats } from "../store/features/stats/selectors"
import { ActionsDetails, StatsType } from "../store/features/stats/statsSlice"
import { Loading } from "../components/Loading"
import { StatGraphs } from "../components/StatGraphs"
import { setAllActionsHistory } from "../store/features/stats/statsSlice"
import { getMyProducts } from "../store/features/product/thunks"
import { selectProducts } from "../store/features/product/selectors"
import { ProductType } from "../store/features/product/productSlice"
import { formatPrice } from "../utils/intl"
import { AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom"

export const AllStats = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { allStats } = useSelector(selectStats)
	const { myProducts } = useSelector(selectProducts)
	useEffect(() => {
		dispatch(getMyProducts())
		dispatch(getAllStats())
	}, [])

	useEffect(() => {
		document.title = "Общая статистика - OZON"
	}, [])

	const actionsHistory = useMemo(
		() => getActionsHistory(allStats?.stats),
		[allStats?.stats]
	)

	const {
		totalPrice,
		averagePrice,
		productsAmount,
		averageImagesAmount,
		averageRating,
		averageNumOfReviews,
	} = allStats.productsTotals

	useEffect(() => {
		dispatch(setAllActionsHistory(actionsHistory))
	}, [actionsHistory])

	if (allStats.isLoading) {
		return <Loading />
	}
	return (
		<div className="all-stats-page">
			<h2>Общая статистика по вашим товарам</h2>
			<div className="link">
				<Link to="/my/products" className="btn btn--light">
					Посмотреть детальную статистику для каждого товара
				</Link>
			</div>
			<div className="main-stat">
				<div className="count-amount">
					<span>У вас товаров: </span>
					<strong>{productsAmount || 0} шт.</strong>
				</div>
				<div className="price-total">
					<span>На общую сумму: </span>
					<strong>{formatPrice(totalPrice || 0)} ₽</strong>
				</div>
				<div className="price-average">
					<span>Со средней ценой: </span>
					<strong>{formatPrice(averagePrice || 0)} ₽</strong>
				</div>
				<div className="rating-average">
					<span>Средняя оценка на все товары: </span>
					<strong>
						{averageRating}
						<AiFillStar className="star" />
					</strong>
				</div>
				<div className="rating-average">
					<span>Среднее число отзывов на товаре: </span>
					<strong>{averageNumOfReviews}</strong>
				</div>
				<div className="rating-average">
					<span>Среднее число фото на товаре: </span>
					<strong>{averageImagesAmount}</strong>
				</div>
			</div>
			<StatGraphs data={allStats?.actionsHistory} />
		</div>
	)
}

const oneDay = 1000 * 60 * 60 * 24
const daysAmount = 5
function getActionsHistory(stats: StatsType[]) {
	const { visits, bought, bookmarked, refunded } = stats?.reduce(
		(agg, cur) => {
			return {
				visits: [...agg?.visits, ...(cur?.visits || [])],
				bought: [...agg?.bought, ...(cur?.bought || [])],
				bookmarked: [...agg?.bookmarked, ...(cur?.bookmarked || [])],
				refunded: [...agg?.refunded, ...(cur?.refunded || [])],
			}
		},
		{
			visits: [],
			bought: [],
			bookmarked: [],
			refunded: [],
		} as any
	)

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
