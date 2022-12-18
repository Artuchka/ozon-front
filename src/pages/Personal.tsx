import React from "react"
import { BiFace } from "react-icons/bi"

export const Personal = () => {
	const avatar = "/"
	return (
		<div className="personal-page">
			<div className="main-info">
				<div className="avatar">
					{avatar == "/" ? (
						<BiFace className="placeholder" />
					) : (
						<img src="/" alt="avatar" />
					)}
				</div>
				<div className="desc">
					<div className="full-name">Горбунов Артем</div>
					<div className="submain">
						<div className="bday">22 Марта 1998</div>
						<div className="gender">Пол не указан</div>
					</div>
					<button type="button" className="change">
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
						<div className="value">+79210681264</div>
						<button className="change">Изменить</button>
					</div>
					<div className="grid-item">
						<small className="title">телефон</small>
						<div className="value">+79210681264</div>
						<button className="change">Изменить</button>
					</div>
					<div className="grid-item">
						<small className="title">дата рождения</small>
						<div className="value">22 марта 1998</div>
						<button className="change">Изменить</button>
					</div>
					<div className="grid-item">
						<small className="title">почта</small>
						<div className="value">yandex949@gmail.com</div>
						<button className="change">Изменить</button>
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
						<div className="value">Артём Г.</div>
					</div>
					<div className="list-item">
						<small className="title">страна, город</small>
						<div className="value">22 марта 1998</div>
					</div>
					<div className="list-item">
						<small className="title">Возраст</small>
						<div className="value">24</div>
					</div>
				</div>
				<button className="change">Изменить публичные данные</button>
			</div>

			<div className="actions">
				<button className="change">Выйти из аккаунта</button>
				<button className="change">Удалить аккаунт</button>
			</div>
		</div>
	)
}
