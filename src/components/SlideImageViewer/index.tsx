import React, { FC, MouseEvent, useEffect, useRef, useState } from "react"
import style from "./style.module.scss"

type PropType = { images: string[]; scroll?: boolean }
export const SlideImageViewer: FC<PropType> = ({ images, scroll }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const wrapperRef = useRef(document.createElement("div"))
	const wrapperWidthRef = useRef(0)

	useEffect(() => {
		wrapperWidthRef.current =
			wrapperRef.current.getBoundingClientRect().width
	}, [])

	const handleMouseMove = (e: MouseEvent) => {
		const { offsetX } = e.nativeEvent

		const part = Math.min(
			Math.max(0, Math.floor((offsetX / wrapperWidthRef.current) * 100)),
			100
		)
		const index = Math.floor((images.length * part) / 100)
		setActiveIndex(index)
	}

	const handleMouseLeave = (e: MouseEvent) => {
		setActiveIndex(0)
	}

	return (
		<div
			className={style.wrapper}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			ref={wrapperRef}
		>
			<img src={images[activeIndex]} alt="" />
			<div className={style.dots}>
				{images.map((item, index) => {
					return (
						<div
							key={item}
							className={`${style.dot} ${
								activeIndex === index ? style.active : ""
							}`}
						></div>
					)
				})}
			</div>
		</div>
	)
}
