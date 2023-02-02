import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const AllStatsSkeleton: FC = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={600}
			height={800}
			viewBox="0 0 600 800"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="10" y="155" rx="2" ry="2" width="590" height="30" />
			<rect x="10" y="39" rx="0" ry="0" width="355" height="13" />
			<rect x="10" y="70" rx="0" ry="0" width="200" height="6" />
			<rect x="10" y="90" rx="0" ry="0" width="200" height="6" />
			<rect x="10" y="110" rx="0" ry="0" width="200" height="6" />
			<rect x="270" y="70" rx="0" ry="0" width="200" height="6" />
			<rect x="270" y="90" rx="0" ry="0" width="200" height="6" />
			<rect x="270" y="110" rx="0" ry="0" width="200" height="6" />
			<rect x="10" y="202" rx="2" ry="2" width="600" height="220" />
			<rect x="10" y="430" rx="2" ry="2" width="600" height="220" />
			<rect x="10" y="660" rx="2" ry="2" width="600" height="220" />
		</ContentLoader>
	)
}
