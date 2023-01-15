import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react"

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
import { SingleRange } from "../pageBlocks/inputs/SingleRange"
import { usePrevious } from "../../hooks/usePrevious"

export type colorThemeType = "default" | "primary" | "dark" | "light"
type PropType = {
	className?: string
	src: string
	colorTheme?: colorThemeType
	controls: "light" | "full"
}

export const VideoPlayer: FC<PropType> = ({
	className = "",
	src = "./",
	colorTheme = "default",
	controls = "light",
}) => {
	const [isPlaying, setPlaying] = useState(false)
	const [isTheater, setTheater] = useState(false)
	const [isMini, setMini] = useState(false)
	const [isFullscreen, setFullscreen] = useState(false)

	const [videoLength, setVideoLength] = useState(0)
	const [volumeLevel, setVolumeLevel] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)
	const prevVolumeLevel = usePrevious(volumeLevel)

	const videoRef = useRef(document.createElement("video") as HTMLVideoElement)
	const innerWrapperRef = useRef(
		document.createElement("div") as HTMLDivElement
	)

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
			: setVolumeLevel(prevVolumeLevel as number)
	}

	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVolumeLevel(parseFloat(e.target.value))
	}

	const handleTimeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const time = parseFloat(e.target.value)
		videoRef.current.currentTime = time
	}

	const handleTimeUpdate = (e: any) => {
		setCurrentTime(videoRef.current.currentTime)
	}

	const handleOnLoadMetadata = () => {
		setVideoLength(videoRef.current.duration)
	}

	useEffect(() => {
		videoRef.current.volume = volumeLevel / 100
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

	useEffect(() => {
		const onKeyUp = (e: any) => {
			console.log(e)
			const tagName = e.target.tagName.toLowerCase()
			if (tagName === "input" || tagName === "textarea") {
				return false
			}
			e.preventDefault()
			switch (e.code) {
				case "KeyF":
					handleFullscreenToggle()
					break
				case "KeyT":
					handleTheaterToggle()
					break
				case "KeyI":
					handleMiniToggle()
					break
				case "KeyM":
					handleVolumeToggle()
					break
			}
		}
		window.addEventListener("keyup", onKeyUp)

		return () => {
			window.removeEventListener("keyup", onKeyUp)
		}
	})

	return (
		<div
			className={`${style.wrapper}
				${isTheater ? style.theater : ""}
				${colorTheme === "primary" ? style.primary : ""}
				${colorTheme === "dark" ? style.dark : ""}
				${colorTheme === "light" ? style.light : ""}
				`}
		>
			<div className={style.innerWrapper} ref={innerWrapperRef}>
				<video
					src={src}
					className={style.video}
					ref={videoRef}
					onClick={handlePlayToggle}
					onLoadedMetadata={handleOnLoadMetadata}
					onTimeUpdate={handleTimeUpdate}
				></video>
				<aside className={style.videoControls}>
					{controls === "full" && (
						<SingleRange
							name="currentTime"
							className={style["progressBar"]}
							colorTheme="primary"
							min={0}
							max={videoLength}
							onChange={handleTimeInput}
							value={currentTime}
						/>
					)}
					<div
						className={style.playPauseButton}
						onClick={handlePlayToggle}
					>
						{isPlaying ? <FiPause /> : <FiPlay />}
					</div>
					<div className={style.volumeButton}>
						<div onClick={handleVolumeToggle}>
							{volumeLevel === 0 && <FiVolumeX />}
							{volumeLevel > 0 && volumeLevel <= 50 && (
								<FiVolume1 />
							)}
							{volumeLevel > 50 && <FiVolume2 />}
						</div>
						<SingleRange
							colorTheme={colorTheme}
							name="volumeLevel"
							min={0}
							max={100}
							value={volumeLevel}
							onChange={handleVolumeChange}
						/>
					</div>
					{controls === "full" && (
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
					)}
					{controls === "full" && (
						<div
							className={style.theaterButton}
							onClick={handleTheaterToggle}
						>
							{isTheater ? (
								<TbViewportNarrow />
							) : (
								<TbViewportWide />
							)}
						</div>
					)}
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
