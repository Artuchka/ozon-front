import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const ReviewItemSkeleton: FC<any> = (props) => (
	<ContentLoader
		speed={2}
		width={600}
		height={150}
		viewBox="0 0 600 150"
		backgroundColor="#f3f3f3"
		foregroundColor="#e5e0e0"
		{...props}
	>
		<rect x="8" y="30" rx="0" ry="0" width="112" height="84" />
		<rect x="140" y="30" rx="0" ry="0" width="150" height="12" />
		<rect x="140" y="60" rx="0" ry="0" width="320" height="6" />
		<rect x="140" y="70" rx="0" ry="0" width="320" height="6" />
		<rect x="140" y="80" rx="0" ry="0" width="320" height="6" />
		<rect x="140" y="90" rx="0" ry="0" width="320" height="6" />
		<rect x="140" y="100" rx="0" ry="0" width="320" height="6" />
		<rect x="140" y="110" rx="0" ry="0" width="320" height="6" />
		<rect x="140" y="120" rx="0" ry="0" width="320" height="6" />
		<rect x="140" y="130" rx="0" ry="0" width="320" height="6" />
		<rect x="480" y="30" rx="0" ry="0" width="100" height="12" />
		<rect x="480" y="50" rx="0" ry="0" width="100" height="12" />
		<rect x="480" y="70" rx="0" ry="0" width="100" height="12" />
	</ContentLoader>
)
