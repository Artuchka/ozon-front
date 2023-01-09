import React, { FC, useState } from "react"
import style from "./style.module.scss"
import { serverURL } from "../../axios/customFetch"
import { Modal } from "../Modal"

import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io"

type PropType = {
	images: string[]
}
export const ImageViewer: FC<PropType> = ({ images = [] }) => {
	const [isBigScreen, setIsBigScreen] = useState(false)
	const [activeImage, setActiveImage] = useState(images[0])

	const activeImageIndex = images.indexOf(activeImage)
	const handleClick = (image: string) => {
		setActiveImage(image)
		setIsBigScreen(true)
	}

	const handleMove = (offset: number) => {
		const newIndex = activeImageIndex + offset
		setActiveImage((prev) => {
			if (newIndex < 0) {
				return images[images.length - 1]
			}
			if (newIndex >= images.length) {
				return images[0]
			}
			return images[newIndex]
		})
	}
	return (
		<div className={style.wrapper}>
			{images?.map((image: string) => {
				return (
					<img
						key={image}
						src={image}
						alt={image}
						className="image-item"
						onClick={() => handleClick(image)}
					/>
				)
			})}

			<Modal open={isBigScreen} setOpen={setIsBigScreen} isWide={true}>
				<div className={style["modal-wrapper"]}>
					<IoMdArrowRoundBack
						className={style.leftArrow}
						onClick={() => handleMove(-1)}
					/>
					<img
						src={activeImage}
						alt=""
						className={style.activeImage}
					/>
					<div className={style.stats}>
						{activeImageIndex + 1} из {images.length}
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
