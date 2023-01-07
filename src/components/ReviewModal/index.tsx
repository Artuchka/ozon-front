import React, { FC, FormEvent, useEffect, useRef } from "react"
import { Modal } from "../Modal"
import { useDispatch, useSelector } from "react-redux"
import { selectReviews } from "../../store/features/review/selectors"
import { AppDispatch } from "../../store/store"
import {
	Review,
	setOpenReviewModal,
	unsetEditReview,
} from "../../store/features/review/reviewSlice"
import style from "./style.module.scss"
import { Loading } from "../Loading"
import {
	createReview,
	getSingleReview,
	updateReview,
} from "../../store/features/review/thunks"

export const ReviewModal: FC<{ productId?: string }> = ({ productId }) => {
	const { isModalOpen, edit } = useSelector(selectReviews)
	const formRef = useRef(document.createElement("form"))
	const dispatch = useDispatch<AppDispatch>()
	const { isEdit, editId } = edit

	useEffect(() => {
		if (!isEdit) return

		if (edit.isLoading) return

		if (!edit.review || edit?.review?._id !== editId) {
			dispatch(getSingleReview(editId))
			return
		}

		console.log("setting custom form ref")
		presetInputs(formRef.current, edit.review)
	}, [editId, isEdit, edit.isLoading])

	useEffect(() => {
		if (isEdit || !isModalOpen) return

		console.log("setting default form ref")

		presetInputs(formRef.current, {
			title: "Хороший отзыв",
			comment: "лучший товар",
			rating: 5,
		} as Review)
	}, [isModalOpen])

	if (productId === "") {
		return <Loading />
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(formRef.current)

		if (isEdit) {
			dispatch(updateReview({ reviewId: editId, formData }))
		} else if (productId) {
			formData.set("productId", productId)
			dispatch(createReview(formData))
		}
	}

	return (
		<Modal
			open={isModalOpen}
			setOpen={(val: boolean) => {
				dispatch(setOpenReviewModal(val))

				if (!val) {
					dispatch(unsetEditReview())
				}
			}}
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
						disabled={edit.isLoading}
					/>
					<input
						className="input input--rounded"
						name="comment"
						type="text"
						placeholder="Введите комментарий"
						required
						defaultValue={"комментик"}
						disabled={edit.isLoading}
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
						disabled={edit.isLoading}
					/>
				</div>
				<button
					type="submit"
					className="btn btn--rounded btn--tall btn--contained"
				>
					{edit.isEdit ? "Изменить" : "Добавить"} своё мнение
				</button>
			</form>
		</Modal>
	)
}

function presetInputs(form: HTMLFormElement, review: Review) {
	let inp = form.title as unknown as HTMLInputElement
	inp.value = review.title

	inp = form.comment as HTMLInputElement
	inp.value = review.comment

	inp = form.rating as HTMLInputElement
	inp.value = review.rating.toString()
}
