import React, { FC, useEffect, useRef, useState } from "react"

import style from "./style.module.scss"
import {
	FiPlay,
	FiPause,
	FiVolumeX,
	FiVolume1,
	FiVolume2,
} from "react-icons/fi"
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs"
import {
	TbViewportWide,
	TbViewportNarrow,
	TbPictureInPictureOn,
	TbPictureInPictureOff,
} from "react-icons/tb"
import { MdOutlineSpeed } from "react-icons/md"
import { BiExitFullscreen } from "react-icons/bi"

type PropType = { className?: string; src: string }
export const VideoPlayer: FC<PropType> = ({ className = "", src = "./" }) => {
	const [isPlaying, setPlaying] = useState(false)
	const [isTheater, setTheater] = useState(false)
	const [isMini, setMini] = useState(false)
	const [isFullscreen, setFullscreen] = useState(false)

	const [volumeLevel, setVolumeLevel] = useState(0)

	const videoRef = useRef(document.createElement("video") as HTMLVideoElement)
	const innerWrapperRef = useRef(
		document.createElement("div") as HTMLDivElement
	)

	const prevVolumeLevel = useRef(0)

	const handlePlayToggle = () => {
		setPlaying((prev) => !prev)
	}
	const pauseVideo = () => {
		setPlaying(false)
	}
	const resumeVideo = () => {
		setPlaying(true)
	}

	const handleFullscreenToggle = () => {
		setFullscreen((prev) => !prev)
	}
	const exitFullscreen = () => {
		setFullscreen(false)
	}
	const enterFullscreen = () => {
		setFullscreen(true)
	}

	const handleMiniToggle = () => {
		setMini((prev) => !prev)
	}
	const exitMini = () => {
		setMini(false)
	}
	const enterMini = () => {
		setMini(true)
	}

	const handleTheaterToggle = () => {
		setTheater((prev) => !prev)
	}
	const exitTheater = () => {
		setTheater(false)
	}
	const enterTheater = () => {
		setTheater(true)
	}

	const handleVolumeToggle = () => {
		volumeLevel > 0
			? setVolumeLevel(0)
			: setVolumeLevel(prevVolumeLevel.current)
	}

	useEffect(() => {
		prevVolumeLevel.current = volumeLevel
	}, [volumeLevel])

	useEffect(() => {
		isPlaying ? videoRef.current.play() : videoRef.current.pause()
	}, [isPlaying])

	useEffect(() => {
		if (!document.fullscreenEnabled) return

		if (
			document.fullscreenElement === innerWrapperRef.current &&
			!isFullscreen
		) {
			document.exitFullscreen()
		} else if (
			document.fullscreenElement !== innerWrapperRef.current &&
			isFullscreen
		) {
			innerWrapperRef.current.requestFullscreen()
			exitMini()
		}
	}, [isFullscreen])

	useEffect(() => {
		if (!document.pictureInPictureEnabled) return

		if (document.pictureInPictureElement === videoRef.current && !isMini) {
			document.exitPictureInPicture()
		} else if (
			document.pictureInPictureElement !== videoRef.current &&
			isMini
		) {
			videoRef.current.requestPictureInPicture()
			exitFullscreen()
		}
	}, [isMini])

	return (
		<div className={`${style.wrapper} ${isTheater ? style.theater : ""}`}>
			<div className={style.innerWrapper} ref={innerWrapperRef}>
				<video
					src={src}
					className={style.video}
					ref={videoRef}
					onClick={handlePlayToggle}
				></video>
				<aside className={style.videoControls}>
					<div
						className={style.playPauseButton}
						onClick={handlePlayToggle}
					>
						{isPlaying ? <FiPlay /> : <FiPause />}
					</div>
					<div
						className={style.volumeButton}
						onClick={handleVolumeToggle}
					>
						{volumeLevel === 0 && <FiVolumeX />}
						{volumeLevel > 0 && volumeLevel <= 50 && <FiVolume1 />}
						{volumeLevel > 50 && <FiVolume2 />}
						{/* <input type="range" className={style.volumeRange} /> */}
						<input type="range" />
					</div>
					<div
						className={style.miniButton}
						onClick={handleMiniToggle}
					>
						{isMini ? (
							<TbPictureInPictureOff />
						) : (
							<TbPictureInPictureOn />
						)}
					</div>
					<div
						className={style.theaterButton}
						onClick={handleTheaterToggle}
					>
						{isTheater ? <TbViewportNarrow /> : <TbViewportWide />}
					</div>
					<div
						className={style.fullscreenButton}
						onClick={handleFullscreenToggle}
					>
						{isFullscreen ? <BiExitFullscreen /> : <BsFullscreen />}
					</div>
				</aside>
			</div>
		</div>
	)
}
