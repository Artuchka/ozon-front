import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const LandingSkeleton: FC = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={900}
			height={460}
			viewBox="0 0 600 460"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="9" y="12" rx="0" ry="0" width="350" height="205" />
			<rect x="6" y="230" rx="0" ry="0" width="600" height="205" />
			<rect x="374" y="17" rx="0" ry="0" width="230" height="23" />
			<rect x="400" y="52" rx="0" ry="0" width="205" height="6" />
			<rect x="400" y="62" rx="0" ry="0" width="205" height="6" />
			<rect x="400" y="72" rx="0" ry="0" width="205" height="6" />
			<rect x="400" y="81" rx="0" ry="0" width="205" height="6" />
			<rect x="400" y="94" rx="0" ry="0" width="205" height="6" />
		</ContentLoader>
	)
}
