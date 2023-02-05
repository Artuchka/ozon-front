import React, { ChangeEvent, FC, FormEvent, useEffect, useRef } from "react"
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
	uploadImagesReview,
	uploadVideosReview,
} from "../../store/features/review/thunks"

export const ReviewModal: FC<{ productId?: string }> = ({ productId }) => {
	const { isModalOpen, edit, isLoading } = useSelector(selectReviews)
	const formRef = useRef(document.createElement("form"))
	const dispatch = useDispatch<AppDispatch>()
	const { isEdit, editId, imagePaths, videoPaths } = edit

	useEffect(() => {
		if (!isEdit) return

		if (edit.isLoading) return

		if (!edit.review || edit?.review?._id !== editId) {
			dispatch(getSingleReview(editId))
			return
		}

		presetInputs(formRef.current, edit.review)
	}, [editId, isEdit, edit.isLoading])

	useEffect(() => {
		if (isEdit || !isModalOpen) return

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
		for (let i = 0; i < imagePaths.length; i++) {
			formData.append("images", imagePaths[i])
		}
		for (let i = 0; i < videoPaths.length; i++) {
			formData.append("videos", videoPaths[i])
		}

		if (isEdit) {
			dispatch(updateReview({ reviewId: editId, formData }))
		} else if (productId) {
			formData.set("productId", productId)
			dispatch(createReview(formData))
		}
	}

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		const files = e.target.files || []

		let formData = new FormData()

		if (e.target.name === "image") {
			for (let i = 0; i < files.length; i++) {
				formData.append("images", files[i])
			}
			dispatch(uploadImagesReview(formData))
			return
		}

		for (let i = 0; i < files.length; i++) {
			formData.append("videos", files[i])
		}
		dispatch(uploadVideosReview(formData))
	}

	const showingImages =
		imagePaths.length > 0 ? imagePaths : edit.review.images
	const showingVideos =
		videoPaths.length > 0 ? videoPaths : edit.review.videos
	return (
		<Modal
			open={isModalOpen}
			setOpen={(val: boolean) => {
				dispatch(setOpenReviewModal(val))

				if (!val) {
					dispatch(unsetEditReview())
				}
			}}
			width="medium"
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
						disabled={edit.isLoading || isLoading}
					/>
					<input
						className="input input--rounded"
						name="comment"
						type="text"
						placeholder="Введите комментарий"
						required
						defaultValue={"комментик"}
						disabled={edit.isLoading || isLoading}
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
						disabled={edit.isLoading || isLoading}
					/>

					<input
						type="file"
						className="input input--rounded"
						multiple
						name="image"
						accept="image/*"
						onChange={handleFileChange}
						disabled={edit.isLoading || isLoading}
						// required={imagePaths?.length === 0}
					/>
					<div className={style["preview-images"]}>
						{showingImages?.map((item) => {
							return <img src={item} alt="" />
						})}
					</div>
					<input
						type="file"
						className="input input--rounded"
						multiple
						name="video"
						accept="video/*"
						onChange={handleFileChange}
						disabled={edit.isLoading || isLoading}
						// required={imagePaths?.length === 0}
					/>

					<div className={style["preview-videos"]}>
						{showingVideos?.map((item) => {
							return <video src={item} autoPlay={false} />
						})}
					</div>
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
