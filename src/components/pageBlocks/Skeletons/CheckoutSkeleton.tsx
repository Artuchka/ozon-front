import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const CheckoutSkeleton: FC = (props: any) => {
	return (
		<ContentLoader
			speed={2}
			width={350}
			height={350}
			viewBox="0 0 350 350"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="10" y="23" rx="2" ry="2" width="800" height="31" />
			<rect x="10" y="10" rx="2" ry="2" width="150" height="8" />
			<rect x="10" y="83" rx="2" ry="2" width="800" height="31" />
			<rect x="10" y="72" rx="2" ry="2" width="150" height="8" />
			<rect x="10" y="140" rx="2" ry="2" width="150" height="31" />
			<rect x="10" y="130" rx="2" ry="2" width="52" height="7" />
			<rect x="190" y="140" rx="2" ry="2" width="150" height="31" />
			<rect x="190" y="130" rx="2" ry="2" width="52" height="7" />
			<rect x="10" y="200" rx="2" ry="2" width="800" height="31" />
			<rect x="10" y="210" rx="2" ry="2" width="150" height="8" />
			<rect x="10" y="270" rx="2" ry="2" width="800" height="46" />
		</ContentLoader>
	)
}
