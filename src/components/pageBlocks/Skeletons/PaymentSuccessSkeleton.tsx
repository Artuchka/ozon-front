import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const PaymentSuccessSkeleton: FC = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={500}
			height={100}
			viewBox="0 0 500 100"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="6" y="10" rx="2" ry="2" width="181" height="17" />
			<rect x="5" y="50" rx="2" ry="2" width="358" height="27" />
		</ContentLoader>
	)
}
