import React, { ChangeEvent, FC, useRef, useState } from "react"
import { Modal } from "../Modal"
import style from "./style.module.scss"
import ozonIDImage from "./../../assets/images/ozon-id-v2.svg"
import { useDispatch, useSelector } from "react-redux"
import {
	getOrders,
	login,
	loginPasswordless,
	register,
	registerPasswordless,
} from "../../store/features/auth/thunks"
import { AppDispatch } from "../../store/store"
import { selectAuth } from "../../store/features/auth/selectors"

type PropType = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const LoginModal: FC<PropType> = ({ open, setOpen }) => {
	const { isLoading } = useSelector(selectAuth)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	type methodType = "login" | "register"
	const [method, setMethod] = useState<methodType>("login")
	const [passwordless, setPaswordless] = useState(false)

	const dispatch = useDispatch<AppDispatch>()

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!emailRef.current || (!passwordRef.current && !passwordless)) return
		const email = emailRef.current.value
		const password = passwordRef.current?.value

		if (method === "login" && !passwordless) {
			dispatch(login({ email, password }))
			setOpen(false)
		} else if (method === "login" && passwordless) {
			dispatch(loginPasswordless({ email, password }))
		} else if (method === "register" && !passwordless) {
			dispatch(register({ email, password }))
		} else if (method === "register" && passwordless) {
			dispatch(registerPasswordless({ email }))
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
						title="Почта"
						required
						ref={emailRef}
						disabled={isLoading}
					/>
					{!passwordless && (
						<input
							type="password"
							placeholder="Введите пароль"
							className="input input--rounded input--tall"
							pattern=".{6,15}"
							required={!passwordless}
							title="Длина пароля должна быть от 6 до 15 символов"
							ref={passwordRef}
							disabled={isLoading}
						/>
					)}
					<button
						type="submit"
						className="btn btn--contained btn--rounded btn--tall"
						disabled={isLoading}
					>
						{method === "login" ? "Войти" : "Зарегаться"}
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
					disabled={isLoading}
				>
					{method === "login"
						? "У меня нет аккаунта"
						: "У меня уже есть аккаунт"}
				</button>
				<button
					type="button"
					className="btn btn--black btn--contained btn--rounded btn--tall"
					onClick={() => {
						setPaswordless((prev) => !prev)
					}}
					disabled={isLoading}
				>
					{passwordless ? "Вход с паролем" : "Вход без пароля"}
				</button>
			</form>
		</Modal>
	)
}
