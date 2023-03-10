import React, { FC, useState } from "react"
import style from "./style.module.scss"
import { RadarChart } from "../RadarChart"
import { AreaChart, ChartPropType } from "../AreaChart"

export const StatGraphs: FC<ChartPropType> = ({ data }) => {
	const [graph, setGraph] = useState("linear")

	const handleGraphToggle = () => {
		setGraph((prev) => {
			return prev === "linear" ? "radar" : "linear"
		})
	}

	if (!data || !data.length) return <h2>bad data input</h2>

	return (
		<div className={style.wrapper}>
			<button
				className="btn btn--contained btn--tall"
				onClick={handleGraphToggle}
			>
				{graph === "radar" && "Показать линейный"}
				{graph === "linear" && "Показать радарный"}
			</button>
			{graph === "radar" && <RadarChart data={data} />}
			{graph === "linear" && <AreaChart data={data} />}
		</div>
	)
}
