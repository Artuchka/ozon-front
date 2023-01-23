import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const BookmarkSkeleton: FC<any> = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={250}
			height={270}
			viewBox="0 0 250 270"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="20" y="17" rx="0" ry="0" width="200" height="147" />
			<circle cx="70" cy="180" r="8" />
			<circle cx="100" cy="180" r="8" />
			<circle cx="130" cy="180" r="8" />
			<circle cx="160" cy="180" r="8" />
			<rect x="20" y="196" rx="0" ry="0" width="80" height="16" />
			<rect x="20" y="221" rx="0" ry="0" width="200" height="16" />
			<rect x="180" y="246" rx="0" ry="0" width="40" height="16" />
		</ContentLoader>
	)
}
