import React, { FC } from "react"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { cloneDeep } from "lodash"
import style from "./style.module.scss"
import { ActionHistoryType } from "../../store/features/stats/statsSlice"

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
)

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
			labels: {
				font: {
					size: 18,
					family: "main",
					weight: "500",
				},
			},
		},
		title: {
			display: false,
			text: "Chart.js Line Chart",
		},
	},
	scales: {
		x: {
			grid: {
				color: "rgb(30 30 30 / 0.3)",
			},
		},
		y: {
			min: 0,
			ticks: {
				stepSize: 1,
			},

			grid: {
				color: "rgb(30 30 30 / 0.3)",
			},
		},
	},
}
const optionsViews = cloneDeep(options)
const optionsBought = cloneDeep(options)
const optionsBookmarked = cloneDeep(options)
const optionsRefunded = cloneDeep(options)

optionsViews.plugins.title.text = "Статистика просмотров"
optionsBought.plugins.title.text = "Статистика покупок"
optionsBookmarked.plugins.title.text = "Статистика закладок"
optionsRefunded.plugins.title.text = "Статистика возвратов"

optionsViews.scales.y.grid.color = "rgba(0, 91, 255, 0.25)"
optionsViews.scales.x.grid.color = "rgba(0, 91, 255, 0.25)"

optionsBought.scales.y.grid.color = "rgba(16, 196, 76, 0.25)"
optionsBought.scales.x.grid.color = "rgba(16, 196, 76, 0.25)"

optionsBookmarked.scales.y.grid.color = "rgba(239, 182, 28, 0.25)"
optionsBookmarked.scales.x.grid.color = "rgba(239, 182, 28, 0.25)"

optionsRefunded.scales.y.grid.color = "rgba(255, 0, 0, 0.25)"
optionsRefunded.scales.x.grid.color = "rgba(255, 0, 0, 0.25)"

export type ChartPropType = {
	data: ActionHistoryType
}
export const AreaChart: FC<ChartPropType> = ({ data: actionsHistory }) => {
	const labels = []
	for (let index = 0; index < actionsHistory.length; index++) {
		if (index === 0) {
			labels.push(`Сегодня`)
		} else if (index === 1) {
			labels.push(`Вчера`)
		} else if (index >= 1 && index <= 4) {
			labels.push(`${index} дня назад`)
		} else {
			labels.push(`${index} дней назад`)
		}
	}
	labels.reverse()

	const graphDataViews: number[] = []
	const graphDataBought: number[] = []
	const graphDataBookmarked: number[] = []
	const graphDataRefunded: number[] = []
	actionsHistory.forEach((item) => {
		graphDataViews.push(item?.[0]?.length)
		graphDataBought.push(item?.[1]?.length)
		graphDataBookmarked.push(item?.[2]?.length)
		graphDataRefunded.push(item?.[3]?.length)
	})
	graphDataViews.reverse()
	graphDataBought.reverse()
	graphDataBookmarked.reverse()
	graphDataRefunded.reverse()

	const dataViews = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Количество просмотров",
				data: graphDataViews,
				borderColor: "rgb(0, 91, 255)",
				backgroundColor: "rgba(0, 91, 255, 0.5)",
			},
		],
	}

	const dataBought = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Количество покупок",
				data: graphDataBought,
				borderColor: "rgb(16, 196, 76)",
				backgroundColor: "rgba(16, 196, 76, 0.5)",
			},
		],
	}
	const dataBookmarked = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Добавлен в закладки",
				data: graphDataBookmarked,
				borderColor: "rgb(239, 182, 28)",
				backgroundColor: "rgba(239, 182, 28, 0.5)",
			},
		],
	}
	const dataRefunded = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Количество возвратов",
				data: graphDataRefunded,
				borderColor: "rgb(255, 0, 0)",
				backgroundColor: "rgba(255, 0, 0, 0.5)",
			},
		],
	}
	return (
		<div className={style.wrapper}>
			<Line options={optionsViews} data={dataViews} />
			<Line options={optionsBought} data={dataBought} />
			<Line options={optionsBookmarked} data={dataBookmarked} />
			<Line options={optionsRefunded} data={dataRefunded} />
		</div>
	)
}
