import React, { ChangeEvent, FC, useRef, useState } from "react"
import { Modal } from "../Modal"
import style from "./style.module.scss"
import ozonIDImage from "./../../assets/images/ozon-id-v2.svg"
import { useDispatch } from "react-redux"
import { getOrders, login, register } from "../../store/features/auth/thunks"
import { AppDispatch } from "../../store/store"

type PropType = {
	open: boolean
	setOpen: Function
}
export const LoginModal: FC<PropType> = ({ open, setOpen }) => {
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	type methodType = "login" | "register"
	const [method, setMethod] = useState<methodType>("login")

	const dispatch = useDispatch<AppDispatch>()

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!emailRef.current || !passwordRef.current) return
		const email = emailRef.current.value
		const password = passwordRef.current.value

		if (method === "login") {
			dispatch(login({ email, password }))
			setOpen(false)
		} else {
			dispatch(register({ email, password }))
		}
	}

	return (
		<Modal open={open} setOpen={setOpen}>
			<form className={style.modal} onSubmit={handleSubmit}>
				<img src={ozonIDImage} alt="ozon id" className={style.logo} />
				<h2>Введите ваши данные</h2>
				<main>
					<input
						type="email"
						placeholder="Введите почту"
						className="input input--rounded input--tall"
						required
						ref={emailRef}
					/>
					<input
						type="password"
						placeholder="Введите пароль"
						className="input input--rounded input--tall"
						pattern=".{6,15}"
						required
						title="Длина пароля должна быть от 6 до 15 символов"
						ref={passwordRef}
					/>
					<button
						type="submit"
						className="btn btn--contained btn--rounded btn--tall"
					>
						{method === "login" ? "Sign in" : "Sign up"}
					</button>
				</main>
				<button
					type="button"
					className="btn btn--light"
					onClick={() => {
						setMethod((prev) =>
							prev === "login" ? "register" : "login"
						)
					}}
				>
					{method === "login" ? "Зарегистирироваться" : "Войти"}
				</button>
				<button
					type="button"
					className="btn btn--black btn--contained btn--rounded btn--tall"
					onClick={() => {
						dispatch(getOrders())
					}}
				>
					Sign in with username
				</button>
			</form>
		</Modal>
	)
}
