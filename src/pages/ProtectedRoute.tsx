import React, { FC, ReactNode } from "react"
import { Link } from "react-router-dom"

export type ProtectedRouteProps = {
	isAuthenticated: boolean
	outlet: JSX.Element
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
	isAuthenticated,
	outlet,
}) => {
	if (!isAuthenticated) {
		return (
			<div>
				<h1>you are not allowed here</h1>
				<Link to="/">back home</Link>
			</div>
		)
	}
	return outlet
}
