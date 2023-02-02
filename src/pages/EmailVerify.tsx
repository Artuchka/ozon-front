import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { AppDispatch } from "../store/store"
import { verifyPasswordless } from "../store/features/auth/thunks"

export const EmailVerify = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const dispatch = useDispatch<AppDispatch>()
	console.log({ tokn: searchParams.get("token") })

	useEffect(() => {
		document.title = "Подтверждение почты - OZON"
	}, [])

	useEffect(() => {
		dispatch(
			verifyPasswordless({ token: searchParams.get("token") } as {
				token: string
			})
		)
	}, [])
	return (
		<div>
			EmailVerify
			<button
				onClick={() => {
					dispatch(
						verifyPasswordless({
							token: searchParams.get("token"),
						} as { token: string })
					)
				}}
			>
				verify
			</button>
		</div>
	)
}
