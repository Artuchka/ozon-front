import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getAllStats } from "../store/features/stats/thunks"
import { selectStats } from "../store/features/stats/selectors"
import {
	ActionHistoryType,
	ActionsDetails,
	StatsType,
} from "../store/features/stats/statsSlice"
import { Loading } from "../components/Loading"
import { StatGraphs } from "../components/StatGraphs"
import { setAllActionsHistory } from "../store/features/stats/statsSlice"

export const AllStats = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { allStats } = useSelector(selectStats)

	useEffect(() => {
		dispatch(getAllStats())
	}, [])

	const actionsHistory = useMemo(
		() => getActionsHistory(allStats?.stats),
		[allStats?.stats]
	)

	useEffect(() => {
		dispatch(setAllActionsHistory(actionsHistory))
	}, [actionsHistory])

	if (allStats.isLoading) {
		return <Loading />
	}
	return (
		<div>
			<StatGraphs data={allStats?.actionsHistory} />
			<h1>12fasd</h1>
		</div>
	)
}

const oneDay = 1000 * 60 * 60 * 24
const daysAmount = 5
function getActionsHistory(stats: StatsType[]) {
	const { visits, bought, bookmarked, refunded } = stats?.reduce(
		(agg, cur) => {
			return {
				visits: [...agg.visits, ...cur.visits],
				bought: [...agg.bought, ...cur.bought],
				bookmarked: [...agg.bookmarked, ...cur.bookmarked],
				refunded: [...agg.refunded, ...cur.refunded],
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
