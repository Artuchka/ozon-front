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
import { HalfAd } from "../components/Ads/HalfAd"
import { selectProducts } from "../store/features/product/selectors"
import { ProductItem } from "../components/ProductItem"

export const Landing = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { ads, isLoading } = useSelector(selectAds)
	const { suggestedProducts } = useSelector(selectProducts)
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
				<ShortAd {...short?.[0]} />
				<ShortAd {...short?.[1]} />
				<ShortAd {...short?.[2]} />
			</div>
			<div className="products">
				{suggestedProducts?.slice(0, 6)?.map((item) => {
					return <ProductItem key={item._id} {...item} />
				})}
			</div>
			<LongAd {...long?.[1]} />
			<div className="short">
				<ShortAd {...short?.[3]} />
				<ShortAd {...short?.[4]} />
				<ShortAd {...short?.[5]} />
			</div>
			<div className="half">
				<HalfAd {...half?.[0]} />
				<HalfAd {...half?.[1]} />
			</div>
		</div>
	)
}
