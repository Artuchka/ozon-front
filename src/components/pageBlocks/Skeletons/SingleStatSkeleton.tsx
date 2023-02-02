import React, { FC } from "react"
import ContentLoader from "react-content-loader"

export const SingleStatSkeleton: FC = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={700}
			height={800}
			viewBox="0 0 700 800"
			backgroundColor="#f3f3f3"
			foregroundColor="#e5e0e0"
			{...props}
		>
			<rect x="6" y="9" rx="2" ry="2" width="290" height="16" />
			<rect x="7" y="52" rx="2" ry="2" width="583" height="205" />
			<rect x="566" y="32" rx="0" ry="0" width="4" height="8" />

			<rect x="10" y="265" rx="0" ry="0" width="355" height="13" />
			<rect x="10" y="298" rx="0" ry="0" width="195" height="6" />
			<rect x="10" y="318" rx="0" ry="0" width="195" height="6" />
			<rect x="10" y="340" rx="0" ry="0" width="195" height="6" />
			<rect x="270" y="311" rx="0" ry="0" width="195" height="6" />
			<rect x="270" y="296" rx="0" ry="0" width="195" height="6" />
			<rect x="270" y="335" rx="0" ry="0" width="195" height="6" />

			<rect x="10" y="414" rx="2" ry="2" width="583" height="205" />
			<rect x="10" y="644" rx="2" ry="2" width="583" height="205" />
			<rect x="10" y="380" rx="0" ry="0" width="579" height="23" />
		</ContentLoader>
	)
}
