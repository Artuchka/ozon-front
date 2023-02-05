import React, { FC, useEffect, useState } from "react"
import style from "./style.module.scss"
import { Modal } from "../Modal"

import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io"
import { VideoPlayer } from "../VideoPlayer"

type ImageVideo = "image" | "video"
type ItemType = { type: ImageVideo; src: string }

type PropType = {
	images: string[]
	videos: string[]
}
export const ImageVideoViewer: FC<PropType> = ({
	images = [],
	videos = [],
}) => {
	const items: ItemType[] = videos
		.map((v) => {
			return { type: "video" as ImageVideo, src: v }
		})
		.concat(
			images.map((v) => {
				return { type: "image" as ImageVideo, src: v }
			})
		)
	const [isBigScreen, setIsBigScreen] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)

	const handleClick = (index: number) => {
		setActiveIndex(index)
		setIsBigScreen(true)
	}

	const handleMove = (offset: number) => {
		setActiveIndex((prev) => {
			const newIndex = prev + offset
			if (newIndex < 0) {
				return items.length - 1
			}
			if (newIndex >= items.length) {
				return 0
			}
			return newIndex
		})
	}

	useEffect(() => {
		const func = (e: any) => {
			switch (e.code) {
				case "ArrowLeft":
					handleMove(-1)
					break
				case "ArrowRight":
					handleMove(1)
					break
			}
		}
		window.addEventListener("keydown", func)
		return () => {
			window.removeEventListener("keydown", func)
		}
	}, [])
	return (
		<div className={style.wrapper}>
			<div className={style.items}>
				{items?.map(({ type, src }: ItemType, index) => {
					if (type === "video") {
						return (
							<VideoPlayer
								src={src}
								controls={[]}
								colorTheme="primary"
								className="videos-item"
								onClick={() => handleClick(index)}
								key={src}
								shouldPlay={false}
							/>
						)
					}
					return (
						<img
							key={src}
							src={src}
							alt={src}
							className="image-item"
							onClick={() => handleClick(index)}
						/>
					)
				})}
			</div>
			<Modal
				open={isBigScreen}
				setOpen={setIsBigScreen}
				width={items[activeIndex].type === "video" ? "high" : "medium"}
			>
				<div className={style["modal-wrapper"]}>
					<IoMdArrowRoundBack
						className={style.leftArrow}
						onClick={() => handleMove(-1)}
					/>
					{items[activeIndex].type === "video" && (
						<VideoPlayer
							src={items[activeIndex].src}
							controls={[
								"play",
								"fullscreen",
								"theater",
								"pip",
								"progress",
								"volume",
							]}
							colorTheme="primary"
							className={style.activeItem}
							shouldPlay={isBigScreen}
						/>
					)}
					{items[activeIndex].type === "image" && (
						<img
							src={items[activeIndex].src}
							alt=""
							className={style.activeItem}
						/>
					)}
					<div className={style.stats}>
						{activeIndex + 1} из {items.length}
					</div>
					<IoMdArrowRoundForward
						className={style.rightArrow}
						onClick={() => handleMove(1)}
					/>
				</div>
			</Modal>
		</div>
	)
}
