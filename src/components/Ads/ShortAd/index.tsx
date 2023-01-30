import React, { FC } from "react"
import style from "./../style.module.scss"
import { serverURL } from "../../../axios/customFetch"
import { AdType } from "../../../store/features/ads/adsSlice"
import { Link } from "react-router-dom"

export const ShortAd: FC<AdType> = ({ url, src }) => {
	if (!src) return <br />

	return (
		<Link to={url} className={`${style.wrapper} ${style.short}`}>
			<img className={style.img} src={serverURL + src} alt={src} />
		</Link>
	)
}
