import React, { useState } from "react"
import { BiFace } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth } from "../store/features/auth/selectors"
import { getIntlDate } from "../utils/intl"
import { AppDispatch } from "../store/store"
import { logout } from "../store/features/auth/thunks"
import { UpdateModal, typeVariants } from "../components/UpdateModal"

export const Personal = () => {
	// const avatar = "/"
	const dispatch = useDispatch<AppDispatch>()
	const [open, setOpen] = useState(false)
	const [type, setType] = useState<typeVariants>("phone")
	const [defaultAns, setDefaultAns] = useState<{}>({})

	const handleUpdateOpen = (type: typeVariants, def: {}) => {
		setDefaultAns(def)
		setType(type)
		setOpen(true)
	}

	const { lastName, firstName, email, birthday, phone, location, gender } =
		useSelector(selectAuth)

	const avatar = `https://avatars.dicebear.com/api/croodles/${gender}/${
		lastName + firstName
	}.svg?mood[]=happy&backgroundColor=%333999`

	return (
		<div className="personal-page">
			<UpdateModal
				open={open}
				setOpen={setOpen}
				type={type}
				defaultAnswer={defaultAns}
				setDefaultAnswer={setDefaultAns}
			/>
			<div className="main-info">
				<div className="avatar">
					{!avatar || avatar == "/" ? (
						<BiFace className="placeholder" />
					) : (
						<img src={avatar || "/"} alt="avatar" />
					)}
				</div>
				<div className="desc">
					<div className="full-name">
						{lastName} {firstName}
					</div>
					<div className="submain">
						<div className="bday">{getIntlDate(birthday)}</div>
						<div className="gender">{gender}</div>
					</div>
					<button
						type="button"
						className="change"
						onClick={() => handleUpdateOpen("gender", { gender })}
					>
						Изменить
					</button>
				</div>
			</div>

			<div className="all-info">
				<h2>Учётные данные</h2>
				<small className="tip">
					Здесь вы можете отредактировать информацию о себе и добавить
					недостающую
				</small>
				<div className="grid">
					<div className="grid-item">
						<small className="title">ФИО</small>
						<div className="value">
							{lastName} {firstName}{" "}
						</div>
						<button
							className="change"
							onClick={() =>
								handleUpdateOpen("names", {
									firstName,
									lastName,
								})
							}
						>
							Изменить
						</button>
					</div>
					<div className="grid-item">
						<small className="title">телефон</small>
						<div className="value">{phone}</div>
						<button
							className="change"
							onClick={() => handleUpdateOpen("phone", { phone })}
						>
							Изменить
						</button>
					</div>
					<div className="grid-item">
						<small className="title">дата рождения</small>
						<div className="value">{getIntlDate(birthday)}</div>
						<button
							className="change"
							onClick={() =>
								handleUpdateOpen("birthday", { birthday })
							}
						>
							Изменить
						</button>
					</div>
					<div className="grid-item">
						<small className="title">почта</small>
						<div className="value">{email}</div>
						<button
							className="change"
							onClick={() => handleUpdateOpen("email", { email })}
						>
							Изменить
						</button>
					</div>
				</div>
			</div>

			<div className="public-info">
				<h2>Публичные данные</h2>
				<small className="tip">
					Информация, которую вы укажете в этом разделе, публичная.
					Она указывается рядом с отзывами и видна другим
					пользователям сети Интернет. Размещая свои персональные
					данные в данном разделе, вы раскрываете их неопределенному
					кругу лиц.
				</small>
				<div className="list">
					<div className="list-item">
						<small className="title">имя</small>
						<div className="value">
							{firstName} {lastName?.[0]}.
						</div>
					</div>
					<div className="list-item">
						<small className="title">страна, город</small>
						<div className="value">{location}</div>
					</div>
					<div className="list-item">
						<small className="title">Возраст</small>
						<div className="value">24</div>
					</div>
				</div>
				<button className="change">Изменить публичные данные</button>
			</div>

			<div className="actions">
				<button
					className="change"
					onClick={() => {
						dispatch(logout())
					}}
				>
					Выйти из аккаунта
				</button>
				<button className="change">Удалить аккаунт</button>
			</div>
		</div>
	)
}
