import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const CartItemSkeleton: FC<any> = (props) => (
	<ContentLoader
		speed={2}
		width={480}
		height={120}
		viewBox="0 0 480 120"
		backgroundColor="#f3f3f3"
		foregroundColor="#e5e0e0"
		{...props}
	>
		<rect x="8" y="30" rx="0" ry="0" width="112" height="84" />
		<rect x="140" y="30" rx="0" ry="0" width="150" height="6" />
		<rect x="140" y="71" rx="0" ry="0" width="150" height="12" />
		<rect x="140" y="40" rx="0" ry="0" width="150" height="6" />
		<rect x="140" y="50" rx="0" ry="0" width="150" height="6" />
		<rect x="140" y="94" rx="0" ry="0" width="50" height="4" />
		<rect x="240" y="94" rx="0" ry="0" width="50" height="4" />
		<rect x="307" y="30" rx="0" ry="0" width="39" height="16" />
		<rect x="307" y="53" rx="0" ry="0" width="39" height="10" />
		<rect x="406" y="30" rx="0" ry="0" width="47" height="19" />
		<rect x="306" y="70" rx="0" ry="0" width="53" height="4" />
	</ContentLoader>
)
