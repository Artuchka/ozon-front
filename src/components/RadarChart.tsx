import React, { FC, useEffect } from "react"
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
import { useDispatch, useSelector } from "react-redux"
import { selectStats } from "../store/features/stats/selectors"
import { AppDispatch } from "../store/store"
import { Loading } from "./Loading"
import { ChartPropType } from "./AreaChart"

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
	"rgba(204, 255, 102, 0.7)",
	"rgba(216, 17, 89, 0.7)",
	"rgba(251, 177, 60, 0.7)",
	"rgba(232, 218, 178, 0.7)",
]

interface RadarProps {
	options: ChartOptions<"radar">
	data: ChartData<"radar">
}

export const RadarChart: FC<ChartPropType> = ({ data: actionsHistory }) => {
	const dispatch = useDispatch<AppDispatch>()
	const { singleStat } = useSelector(selectStats)

	if (singleStat.isLoading) {
		return <Loading />
	}

	const calculatedDataForDays = actionsHistory?.map((dayData) => {
		return dayData.map((actionArray) => actionArray?.length)
	})

	const datasets = calculatedDataForDays?.map((item, index) => {
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
	datasets[0].hidden = false

	const radarData = {
		labels: ["Просмотров", "Покупок", "В закладках", "Возвратов"],
		datasets: datasets.reverse(),
	}

	return (
		<Radar
			data={radarData}
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
