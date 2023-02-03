import React, { FC } from "react"
import style from "./style.module.scss"
import { AdType } from "../../store/features/ads/adsSlice"
import { Link } from "react-router-dom"

export const HalfAd: FC<AdType> = ({ url, src }) => {
	if (!src) return <br />

	return (
		<Link to={url} className={`${style.wrapper} ${style.half}`}>
			<img className={style.img} src={src} alt={src} />
		</Link>
	)
}
