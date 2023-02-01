import React, { FC } from "react"
import { Link } from "react-router-dom"
import { AuthType } from "../store/features/auth/authSlice"
import { NotAllowed } from "./NotAllowed"

export type ProtectedRouteProps = {
	roles?: string[]
	user: AuthType
	outlet: JSX.Element
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
	user,
	outlet,
	roles = [],
}) => {
	const isAuthenticated = !!user.user.email
	let isGoodRole = true
	if (roles.length !== 0) {
		isGoodRole = roles.includes(user.user.role || "")
	}
	if (!isAuthenticated || !isGoodRole) {
		return <NotAllowed />
	}
	return outlet
}
