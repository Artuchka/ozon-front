import React, { FC, useEffect, useRef, useState } from "react"
import style from "./style.module.scss"
import { SlArrowUp, SlArrowDown } from "react-icons/sl"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { setActiveImage } from "../../store/features/product/productSlice"
import { selectProducts } from "../../store/features/product/selectors"
export const serverURL = "http://localhost:3000"

export const VerticalScroll: FC<{ images: string[] }> = ({ images }) => {
	const {
		singleProduct: { activeImage },
	} = useSelector(selectProducts)

	const containerRef = useRef<HTMLDivElement>(document.createElement("div"))
	const dispatch = useDispatch<AppDispatch>()
	const handleUp = () => {
		const curTop = containerRef.current.scrollTop
		scrollTo(containerRef.current, curTop - 60, 200)
	}
	const handleDown = () => {
		const curTop = containerRef.current.scrollTop
		scrollTo(containerRef.current, curTop + 60, 200)
	}

	return (
		<div className={`${style["wrapper"]} scroll`}>
			<SlArrowUp className={style.action} onClick={handleUp} />
			<div className={style["images-container"]} ref={containerRef}>
				{images.map((img) => {
					return (
						<img
							key={img}
							src={serverURL + img}
							alt="product"
							onClick={() => dispatch(setActiveImage(img))}
							className={activeImage === img ? style.active : ""}
						/>
					)
				})}
			</div>
			<SlArrowDown onClick={handleDown} className={style.action} />
		</div>
	)
}

function scrollTo(element: HTMLDivElement, to: number, duration: number) {
	var start = element.scrollTop,
		change = to - start,
		currentTime = 0,
		increment = 20

	var animateScroll = function () {
		currentTime += increment
		var val = easeInOutQuad(currentTime, start, change, duration)
		element.scrollTop = val
		if (currentTime < duration) {
			setTimeout(animateScroll, increment)
		}
	}
	animateScroll()
}

//t = current time
//b = start value
//c = change in value
//d = duration
const easeInOutQuad = function (t: number, b: number, c: number, d: number) {
	t /= d / 2
	if (t < 1) return (c / 2) * t * t + b
	t--
	return (-c / 2) * (t * (t - 2) - 1) + b
}
