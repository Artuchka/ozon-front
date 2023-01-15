import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { VideoPlayer } from "../components/VideoPlayer"
import videoURL from "./../assets/video/попутчик.mp4"
export const Landing = () => {
	useEffect(() => {
		document.title = "OZON - Интернет-магазин"
	}, [])
	return (
		<div className="landing">
			<Link to="/products">go shopping</Link>
			<div className="bold" style={{ fontWeight: "200" }}>
				200
			</div>
			<div className="bold" style={{ fontWeight: "300" }}>
				300
			</div>
			<div className="bold" style={{ fontWeight: "400" }}>
				400
			</div>
			<div className="bold" style={{ fontWeight: "500" }}>
				500
			</div>
			<div className="bold" style={{ fontWeight: "600" }}>
				600
			</div>
			<div className="bold" style={{ fontWeight: "700" }}>
				700
			</div>
		</div>
	)
}
