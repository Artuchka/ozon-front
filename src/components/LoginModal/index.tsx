import React, { ChangeEvent, FC, useRef, useState } from "react"
import { Modal } from "../Modal"
import style from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux"
import {
	login,
	loginPasswordless,
	register,
	registerPasswordless,
} from "../../store/features/auth/thunks"
import { AppDispatch } from "../../store/store"
import { selectAuth } from "../../store/features/auth/selectors"
import { BiHide, BiShow } from "react-icons/bi"

type PropType = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ozonIDImage =
	"https://res.cloudinary.com/dzy8xh83i/image/upload/v1675661859/OZON_DEFAULT/zozo-id_y17jf6.png"
export const LoginModal: FC<PropType> = ({ open, setOpen }) => {
	const { isLoading } = useSelector(selectAuth)
	const emailRef = useRef<HTMLInputElement>(document.createElement("input"))
	const passwordRef = useRef<HTMLInputElement>(
		document.createElement("input")
	)
	type methodType = "login" | "register"
	const [method, setMethod] = useState<methodType>("login")
	const [passwordless, setPaswordless] = useState(false)
	const [passwordShown, setPasswordShown] = useState(false)
	const togglePassword = () => {
		setPasswordShown((prev) => !prev)
	}

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

	const handleVendorLogin = () => {
		emailRef.current.value = "vendor@gmail.com"
		passwordRef.current.value = "123456"
		// yes, that's not secret information...
	}
	const handleOrdinaryUserLogin = () => {
		emailRef.current.value = "user@gmail.com"
		passwordRef.current.value = "123456"
	}
	return (
		<Modal open={open} setOpen={setOpen} width="medium">
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
						<div className={style["password-input-wrapper"]}>
							<input
								type={passwordShown ? "text" : "password"}
								placeholder="Введите пароль"
								className="input input--rounded input--tall"
								pattern=".{6,15}"
								required={!passwordless}
								title="Длина пароля должна быть от 6 до 15 символов"
								ref={passwordRef}
								disabled={isLoading}
							/>
							<button
								type="button"
								className="btn btn--content btn--transparent btn--square btn--no-padding"
								onClick={togglePassword}
							>
								{passwordShown ? <BiShow /> : <BiHide />}
							</button>
						</div>
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
				<div className={style["default-logins"]}>
					<div className={style.heading}>Зайти как:</div>
					<div className={style.options}>
						<button
							type="button"
							className="btn btn--black btn--contained btn--rounded btn--tooltip btn--tooltip-left"
							onClick={handleVendorLogin}
						>
							Продавец
							<data>
								У продавца ЕСТЬ функции добавления\изменения
								товара, просмотра его статистики
							</data>
						</button>
						<button
							type="button"
							className="btn btn--black btn--contained btn--rounded btn--tooltip btn--tooltip-right"
							onClick={handleOrdinaryUserLogin}
						>
							Обычный пользователь
							<data>
								У обычного юзера НЕТ функций
								добавления\изменения товара, просмотра его
								статистики
							</data>
						</button>
					</div>
				</div>
				<button
					type="button"
					className="btn btn--black btn--contained btn--rounded btn--tall btn--tooltip  btn--tooltip-right"
					onClick={() => {
						setPaswordless((prev) => !prev)
					}}
					disabled={true}
				>
					{passwordless ? "Вход с паролем" : "Вход без пароля"}
					<data>
						сервисы рассылки Email запрещают своё использование на
						этом сайте, ведь он 'фишинговый'{" "}
					</data>
				</button>
			</form>
		</Modal>
	)
}
