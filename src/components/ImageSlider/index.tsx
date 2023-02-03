import React, { FC, useEffect, useRef, useState } from "react"
import style from "./style.module.scss"
import { AdType } from "../../store/features/ads/adsSlice"
import { Link } from "react-router-dom"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"

type PropType = {
	images: AdType[]
}
export const ImageSlider: FC<PropType> = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0)

	const handleNext = () => {
		setActiveIndex((prev) => {
			if (prev + 1 >= images.length) {
				return 0
			}
			return prev + 1
		})
	}
	const handlePrev = () => {
		setActiveIndex((prev) => {
			if (prev - 1 < 0) {
				return images.length - 1
			}
			return prev - 1
		})
	}

	return (
		<div className={style.wrapper}>
			<div
				className={style["images-container"]}
				style={{
					transform: `translateX(calc(-${activeIndex} * var(--image-width)))`,
				}}
			>
				{images?.map((item) => {
					return (
						<Link
							key={item.src}
							to={item.url}
							className={style["image-item"]}
						>
							<img
								// className={style["image-item"]}
								src={item.src}
								alt={`go to ${item.url}`}
							/>
						</Link>
					)
				})}
			</div>
			<div className={style["dots-container"]}>
				{images?.map((item, index) => {
					return (
						<div
							key={item.src}
							className={`${style.dot} ${
								index === activeIndex ? style.active : ""
							}`}
							onClick={() => setActiveIndex(index)}
						></div>
					)
				})}
			</div>

			<button
				className={`${style["nav-btn"]} ${style.prev} btn btn--content btn--middle`}
				onClick={handlePrev}
			>
				<GrLinkPrevious />
			</button>
			<button
				className={`${style["nav-btn"]} ${style.next} btn btn--content btn--middle`}
				onClick={handleNext}
			>
				<GrLinkNext />
			</button>
		</div>
	)
}
