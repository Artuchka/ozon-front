import React, { useEffect } from "react"
import { AiFillStar } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { selectReviews } from "../store/features/review/selectors"
import { AppDispatch } from "../store/store"
import { deleteReview, getMyReviews } from "../store/features/review/thunks"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import {
	setEditReview,
	setOpenReviewModal,
} from "../store/features/review/reviewSlice"
import { ReviewModal } from "../components/ReviewModal"
import { ReviewItemSkeleton } from "../components/pageBlocks/Skeletons/ReviewItemSkeleton"

export const Reviews = () => {
	const { myReviews, isLoading } = useSelector(selectReviews)
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		document.title = `Мои отзывы - OZON`

		dispatch(getMyReviews())
	}, [])
	console.log(myReviews)

	const handleChangeReview = (reviewId: string) => {
		dispatch(setEditReview(reviewId))
		dispatch(setOpenReviewModal(true))
	}
	const handleDeleteReview = (reviewId: string) => {
		dispatch(deleteReview(reviewId))
	}

	if (isLoading) {
		return (
			<div className="my-reviews-page">
				<ReviewModal />
				<div className="reviews">
					<ReviewItemSkeleton />
					<ReviewItemSkeleton />
					<ReviewItemSkeleton />
					<ReviewItemSkeleton />
					<ReviewItemSkeleton />
				</div>
			</div>
		)
	}

	if (myReviews.length === 0) {
		return (
			<div className="my-reviews-page">
				<h1>Вы пока не оставили отзывы на товарах</h1>
				<p>
					Расскажите Ваш опыт пользования продуктом на странице
					определенного товара!
				</p>
			</div>
		)
	}

	return (
		<div className="my-reviews-page">
			<ReviewModal />
			<div className="reviews">
				{myReviews.map((review) => {
					const image = review.product?.images[0]
					return (
						<article key={review._id} className="review">
							<div className="title">
								<div className="text">{review.title}</div>
								<div className="stars">
									{Array.from(Array(review.rating)).map(
										(_, ind) => {
											return <AiFillStar key={ind} />
										}
									)}
								</div>
							</div>
							<div className="comment">{review.comment}</div>
							<div className="product">
								<Link
									to={`/products/${
										review?.product?._id || ""
									}`}
								>
									<img src={image} />
								</Link>
							</div>
							<div className="actions">
								<HashLink
									to={`/products/${review?.product?._id}#review-${review._id}`}
									className="btn btn--light link-to-review"
								>
									Перейти к отзыву
								</HashLink>
								<button
									className="btn btn--light change-review-btn"
									onClick={() =>
										handleChangeReview(review._id)
									}
								>
									Изменить
								</button>
								<button
									className="btn btn--light btn--warn delete-review-btn"
									onClick={() =>
										handleDeleteReview(review._id)
									}
								>
									Удалить
								</button>
							</div>
						</article>
					)
				})}
			</div>
		</div>
	)
}
