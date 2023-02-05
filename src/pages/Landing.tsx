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
import { LandingSkeleton } from "../components/pageBlocks/Skeletons/LandingSkeleton"
import { VideoPlayer } from "../components/VideoPlayer"

const greetingVideo =
	"https://res.cloudinary.com/dzy8xh83i/video/upload/v1675458345/OZON_DEFAULT/ad-video-compressed_hrqyq5.mp4"

export const Landing = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { ads, isLoading } = useSelector(selectAds)
	const { suggestedProducts } = useSelector(selectProducts)
	useEffect(() => {
		document.title = "OZON - Интернет-магазин"
		dispatch(getAds())
	}, [])

	if (isLoading) {
		return <LandingSkeleton />
	}

	const { long, short, half, category, longTall } = ads

	return (
		<div className="landing">
			<div className="greeting-wrapper">
				<VideoPlayer
					controls={[
						"volume",
						"volume-range-on-full",
						"play",
						"fullscreen",
						"theater",
						"pip",
						"progress",
					]}
					src={greetingVideo}
					className="video"
					colorTheme="primary"
				/>
				<div className="greeting">
					<h2 className="heading">Приветствую тебя, друг!</h2>
					<div className="text">
						<p>
							Это Fake OZON с открытым кодом:{" "}
							<a href="https://github.com/Artuchka/ozon-front">
								тык
							</a>{" "}
							и{" "}
							<a href="https://github.com/Artuchka/ozon-server">
								такс
							</a>{" "}
						</p>
						<p>
							Нажми на любую `рекламу` - перейдешь к списку
							товаров
						</p>
						<p>
							На этом сайте ты можешь делать покупки, возвраты
							покупок, поиск товаров с фильтрами и сортировками
						</p>
						<p>
							Попробуй залогиниться как `продавец` - посмотри
							статистику товаров, попробуй добавить новых товаров
							:D
						</p>
						<p>Буду рад твоему каждому клику 😘</p>
					</div>
				</div>
			</div>
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
