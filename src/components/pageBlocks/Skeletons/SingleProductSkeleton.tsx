import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const SingleProductSkeleton: FC = (props: any) => {
	return (
		<ContentLoader
			speed={2}
			width={836}
			height={600}
			viewBox="0 0 836 600"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="80" y="149" rx="2" ry="2" width="242" height="160" />

			<rect x="20" y="130" rx="2" ry="2" width="40" height="40" />
			<rect x="20" y="180" rx="2" ry="2" width="40" height="40" />
			<rect x="20" y="230" rx="2" ry="2" width="40" height="40" />
			<rect x="20" y="280" rx="2" ry="2" width="40" height="40" />

			<rect x="20" y="18" rx="2" ry="2" width="150" height="30" />
			<rect x="20" y="71" rx="2" ry="2" width="150" height="15" />

			<rect x="20" y="360" rx="2" ry="2" width="150" height="15" />
			<rect x="20" y="387" rx="2" ry="2" width="700" height="7" />
			<rect x="20" y="400" rx="2" ry="2" width="700" height="7" />
			<rect x="20" y="414" rx="2" ry="2" width="700" height="7" />
			<rect x="20" y="430" rx="2" ry="2" width="700" height="7" />

			<rect x="20" y="463" rx="2" ry="2" width="150" height="15" />
			<rect x="20" y="490" rx="2" ry="2" width="700" height="7" />
			<rect x="20" y="503" rx="2" ry="2" width="700" height="7" />
			<rect x="20" y="517" rx="2" ry="2" width="700" height="7" />
			<rect x="20" y="533" rx="2" ry="2" width="700" height="7" />

			<rect x="340" y="130" rx="2" ry="2" width="150" height="30" />
			<rect x="510" y="130" rx="2" ry="2" width="180" height="200" />
		</ContentLoader>
	)
}
