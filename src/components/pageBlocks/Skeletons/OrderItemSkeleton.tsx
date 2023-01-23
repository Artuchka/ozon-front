import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const OrderItemSkeleton: FC<any> = (props) => (
	<ContentLoader
		speed={2}
		width={600}
		height={200}
		viewBox="0 0 600 200"
		backgroundColor="#f3f3f3"
		foregroundColor="#e5e0e0"
		{...props}
	>
		<rect x="10" y="11" rx="2" ry="2" width="161" height="17" />
		<rect x="10" y="36" rx="2" ry="2" width="238" height="12" />
		<rect x="10" y="80" rx="2" ry="2" width="190" height="11" />
		<rect x="10" y="60" rx="2" ry="2" width="600" height="1" />
		<rect x="10" y="110" rx="2" ry="2" width="234" height="9" />
		<rect x="10" y="140" rx="10" ry="10" width="95" height="21" />
		<rect x="500" y="10" rx="2" ry="2" width="100" height="17" />
		<rect x="210" y="78" rx="10" ry="10" width="95" height="16" />
		<rect x="300" y="110" rx="2" ry="2" width="80" height="50" />
		<rect x="400" y="110" rx="2" ry="2" width="80" height="50" />
		<rect x="500" y="110" rx="2" ry="2" width="80" height="50" />
		<circle cx="340" cy="160" r="13" />
		<circle cx="440" cy="160" r="13" />
		<circle cx="540" cy="160" r="13" />
	</ContentLoader>
)
