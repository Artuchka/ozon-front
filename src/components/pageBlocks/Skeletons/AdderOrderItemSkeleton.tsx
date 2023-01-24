import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const AdderOrderItemSkeleton: FC = (props: any) => {
	return (
		<ContentLoader
			speed={2}
			width={133}
			height={33}
			viewBox="0 0 133 33"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="0" y="0" rx="2" ry="2" width="33" height="33" />
			<rect x="100" y="0" rx="2" ry="2" width="33" height="33" />
			<rect x="50" y="9" rx="2" ry="2" width="35" height="15" />
		</ContentLoader>
	)
}
