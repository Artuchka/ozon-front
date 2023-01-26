import React, { FC } from "react"
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
} from "chart.js"
import { Radar } from "react-chartjs-2"
import { useSelector } from "react-redux"
import { selectStats } from "../store/features/stats/selectors"

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
)

const backgrounds = [
	"rgba(87, 117, 144, 0.7)",
	"rgba(232, 185, 171, 0.7)",
	"rgba(224, 152, 145, 0.7)",
	"rgba(203, 118, 158, 0.7)",
	// "rgba(204, 255, 102, 0.7)",
	// "rgba(216, 17, 89, 0.7)",
	// "rgba(251, 177, 60, 0.7)",
	// "rgba(232, 218, 178, 0.7)",
]

const options = {
	// legend: {
	// 	position: "top",
	// },
	// title: {
	// 	display: true,
	// 	text: "Chart.js Radar Chart",
	// },
	scale: {
		// reverse: false,
		gridLines: {},
		// ticks: {
		// 	beginAtZero: true,
		// },
	},
}

interface RadarProps {
	options: ChartOptions<"radar">
	data: ChartData<"radar">
}

type PropType = {}
export const RadarChart: FC<PropType> = (props) => {
	const { singleStat } = useSelector(selectStats)
	const { stat } = singleStat
	const { visits, bookmarked, bought, refunded } = stat

	const oneDay = 1000 * 60 * 60 * 24
	const calculatedDataNow = [visits, bought, bookmarked, refunded]

	const actionsDataForDays = [calculatedDataNow]

	const extraDaysAmount = Math.min(backgrounds.length, 10)

	for (let dayNumber = 1; dayNumber <= extraDaysAmount; dayNumber++) {
		const prevCalculatedData =
			actionsDataForDays[actionsDataForDays.length - 1]
		const newCalculatedData = prevCalculatedData.map((actionsArray) => {
			return actionsArray.filter(
				(item) =>
					Date.now() - new Date(item.date).getTime() >
					dayNumber * oneDay
			)
		})
		actionsDataForDays.push(newCalculatedData)
	}

	const calculatedDataForDays = actionsDataForDays.map((dayData) => {
		return dayData.map((actionArray) => actionArray.length)
	})

	const datasets = calculatedDataForDays.map((item, index) => {
		let label = ""
		if (index === 0) {
			label = `Сегодня`
		} else if (index === 1) {
			label = `Вчера`
		} else if (index >= 1 && index <= 4) {
			label = `${index} дня назад`
		} else {
			label = `${index} дней назад`
		}
		return {
			label,
			data: item,
			backgroundColor: backgrounds?.[index],
			borderColor: "rgba(255, 99, 132, 1)",
			borderWidth: 2,
			hidden: true,
			pointBackgroundColor: "rgb(255, 99, 132)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgb(255, 99, 132)",
		}
	})
	console.log(datasets)
	datasets[0].hidden = false

	const data = {
		labels: ["Просмотров", "Покупок", "В закладках", "Возвратов"],
		datasets: datasets.reverse(),
	}

	return (
		<Radar
			data={data}
			options={
				{
					scales: {
						r: {
							min: 0,
							ticks: {
								stepSize: 1,
							},
							angleLines: {
								color: "rgb(0 0 0 / 0.9)",
							},
							grid: {
								color: ["rgb(30 30 30 / 0.3)"],
							},

							pointLabels: {
								color: "white",
								backdropColor: [
									"#005bff",
									"#10c44c",
									"#efb61c",
									"red",
								],
								padding: 20,
								backdropPadding: 8,
								// nasty case.....
								// borderRadius: {
								// 	topLeft: 10,
								// 	topRight: 10,
								// 	bottomLeft: 10,
								// 	bottomRight: 10,
								// },
								font: {
									size: 18,
									family: "main",
									weight: "500",
								},
							},
						},
					},
				} as unknown as RadarProps["options"]
			}
		/>
	)
}
