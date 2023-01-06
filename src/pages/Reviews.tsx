import React, { useEffect } from "react"
import { AiFillStar } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { selectReviews } from "../store/features/review/selectors"
import { AppDispatch } from "../store/store"
import { getMyReviews } from "../store/features/review/thunks"
import { serverURL } from "../axios/customFetch"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

export const Reviews = () => {
	const { myReviews } = useSelector(selectReviews)
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		document.title = `Мои отзывы - OZON`

		dispatch(getMyReviews())
	}, [])
	console.log(myReviews)

	return (
		<div className="my-reviews-page">
			<div className="reviews">
				{myReviews.map((review) => {
					const image = serverURL + review.product?.images[0]
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
							<HashLink
								to={`/products/${review?.product?._id}#review-${review._id}`}
								className="btn btn--light link-to-review"
							>
								Перейти к отзыву
							</HashLink>
						</article>
					)
				})}
			</div>
		</div>
	)
}
