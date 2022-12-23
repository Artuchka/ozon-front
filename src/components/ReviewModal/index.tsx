import React, { FC, FormEvent, useRef } from "react"
import { Modal } from "../Modal"
import { useDispatch, useSelector } from "react-redux"
import { selectReviews } from "../../store/features/review/selectors"
import { AppDispatch } from "../../store/store"
import { setOpenReviewModal } from "../../store/features/review/reviewSlice"
import style from "./style.module.scss"
import { Loading } from "../Loading"
import { createReview } from "../../store/features/review/thunks"

export const ReviewModal: FC<{ productId: string }> = ({ productId }) => {
	const { isModalOpen } = useSelector(selectReviews)
	const formRef = useRef(document.createElement("form"))
	const dispatch = useDispatch<AppDispatch>()
	if (productId === "") {
		return <Loading />
	}
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(formRef.current)
		formData.set("productId", productId)
		dispatch(createReview(formData))
	}

	return (
		<Modal
			open={isModalOpen}
			setOpen={(val: boolean) => dispatch(setOpenReviewModal(val))}
		>
			<h3>Вставьте и свои 5 копеек</h3>
			<form onSubmit={handleSubmit} className={style.modal} ref={formRef}>
				<div className={style["input-container"]}>
					<input
						className="input input--rounded"
						type="text"
						placeholder="Введите заголовок"
						required
						defaultValue={"заговоочек"}
						name="title"
					/>
					<input
						className="input input--rounded"
						name="comment"
						type="text"
						placeholder="Введите комментарий"
						required
						defaultValue={"комментик"}
					/>
					<input
						className="input input--rounded"
						type="number"
						name="rating"
						placeholder="Оцените товар"
						min={1}
						max={5}
						required
						defaultValue={5}
					/>
				</div>
				<button
					type="submit"
					className="btn btn--rounded btn--tall btn--contained"
				>
					Добавить своё мнение
				</button>
			</form>
		</Modal>
	)
}
