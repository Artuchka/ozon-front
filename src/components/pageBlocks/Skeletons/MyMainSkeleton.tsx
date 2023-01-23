import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const MyMainSkeleton: FC = (props: any) => {
	return (
		<ContentLoader
			speed={2}
			width={600}
			height={600}
			viewBox="0 0 600 600"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="160" y="20" rx="2" ry="2" width="314" height="16" />
			<rect x="160" y="60" rx="2" ry="2" width="110" height="13" />
			<rect x="160" y="80" rx="2" ry="2" width="110" height="13" />
			<rect x="20" y="169" rx="2" ry="2" width="160" height="24" />
			<rect x="20" y="230" rx="2" ry="2" width="94" height="10" />
			<circle cx="80" cy="70" r="60" />
			<rect x="20" y="245" rx="2" ry="2" width="149" height="11" />
			<rect x="20" y="260" rx="2" ry="2" width="88" height="11" />
			<rect x="370" y="230" rx="2" ry="2" width="94" height="10" />
			<rect x="370" y="245" rx="2" ry="2" width="149" height="11" />
			<rect x="370" y="260" rx="2" ry="2" width="88" height="11" />
			<rect x="370" y="310" rx="2" ry="2" width="94" height="10" />
			<rect x="370" y="325" rx="2" ry="2" width="149" height="11" />
			<rect x="370" y="340" rx="2" ry="2" width="88" height="11" />
			<rect x="20" y="300" rx="2" ry="2" width="94" height="10" />
			<rect x="20" y="315" rx="2" ry="2" width="149" height="11" />
			<rect x="20" y="330" rx="2" ry="2" width="88" height="11" />
			<rect x="20" y="372" rx="2" ry="2" width="160" height="24" />
			<rect x="20" y="425" rx="2" ry="2" width="110" height="10" />
			<rect x="20" y="440" rx="2" ry="2" width="110" height="10" />
			<rect x="20" y="455" rx="2" ry="2" width="110" height="10" />
		</ContentLoader>
	)
}
