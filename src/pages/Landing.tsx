import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AppDispatch } from "../store/store"
import { getAds } from "../store/features/ads/thunks"
import { selectAds } from "../store/features/ads/selector"
import { Loading } from "../components/Loading"
import { LongAd } from "../components/Ads/LongAd"
import { ShortAd } from "../components/Ads/ShortAd"
import { ImageSlider } from "../components/ImageSlider"

export const Landing = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { ads, isLoading } = useSelector(selectAds)
	useEffect(() => {
		document.title = "OZON - Интернет-магазин"
		dispatch(getAds())
	}, [])

	if (isLoading) {
		return <Loading />
	}

	const { long, short, half, category, longTall } = ads

	return (
		<div className="landing">
			<ImageSlider images={longTall} />
			<LongAd {...long?.[0]} />
			<div className="short">
				<ShortAd {...short?.[1]} />
				<ShortAd {...short?.[2]} />
				<ShortAd {...short?.[3]} />
			</div>
			<LongAd {...long?.[1]} />
		</div>
	)
}
