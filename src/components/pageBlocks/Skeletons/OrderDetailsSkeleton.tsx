import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const OrderDetailsSkeleton: FC<any> = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={600}
			height={460}
			viewBox="0 0 600 460"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="4" y="12" rx="2" ry="2" width="314" height="16" />
			<rect x="4" y="40" rx="2" ry="2" width="110" height="13" />
			<rect x="6" y="75" rx="2" ry="2" width="550" height="162" />
			<rect x="3" y="269" rx="2" ry="2" width="550" height="65" />
			<rect x="4" y="345" rx="2" ry="2" width="550" height="65" />
		</ContentLoader>
	)
}
