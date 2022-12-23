import React, {
	ChangeEvent,
	FormEvent,
	FormEventHandler,
	useEffect,
	useRef,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch } from "../store/store"
import { getSingleProduct } from "../store/features/product/thunks"
import { selectProducts } from "../store/features/product/selectors"
import { Loading } from "../components/Loading"
import { VerticalScroll, serverURL } from "../components/VerticalScroll"
import defaultImg from "./../assets/images/ozon-logo.png"
import { setActiveImage } from "../store/features/product/productSlice"
import { SelectRadio } from "../components/pageBlocks/inputs/SelectRadio"
import { ozonAPI } from "../axios/customFetch"
import { ReviewModal } from "../components/ReviewModal"
import { setOpenReviewModal } from "../store/features/review/reviewSlice"
import { AiFillStar, AiOutlineHeart } from "react-icons/ai"
import { getIntlDate } from "../utils/intl"

export const SingleProduct = () => {
	const { id } = useParams()
	const { singleProduct } = useSelector(selectProducts)
	const dispatch = useDispatch<AppDispatch>()
	const orderConfigRef = useRef(document.createElement("form"))

	useEffect(() => {
		if (id) {
			dispatch(getSingleProduct(id))
		}
	}, [id])
	useEffect(() => {
		if (!singleProduct.isLoading) {
			dispatch(setActiveImage(images[0]))
		}
	}, [singleProduct.images])

	if (singleProduct.isLoading) {
		return <Loading />
	}
	const {
		title,
		price,
		description,
		images,
		specs,
		tags,
		reviews,
		types,
		averageRating,
		numOfReviews,
		activeImage,
		vendor: { avatar, username },
	} = singleProduct
	console.log(singleProduct)

	const radioTypes = types.map((item: string) => {
		return { label: item, value: item.trim() }
	})

	const handleBuy = async () => {
		const formData = new FormData(orderConfigRef.current)
	}

	return (
		<div className="single-product-page">
			<ReviewModal productId={id || ""} />
			<div className="stats">
				<div className="title">{title}</div>
				<div className="substats">
					<div className="reviews">
						<div className="stars">
							{Array.from(Array(averageRating)).map((item) => {
								console.log(item)
								return <AiFillStar />
							})}
						</div>
						<a href="#reviews" className="numOfReviews">
							{numOfReviews} отзывов
						</a>
					</div>
					<div className="to-favorites">
						<AiOutlineHeart />
						<span>В избранное</span>
					</div>
				</div>
			</div>
			<VerticalScroll images={images} />
			<img
				src={activeImage ? serverURL + activeImage : defaultImg}
				alt=""
				className="active-image"
			/>
			<div className="info">
				<div className="vendor">
					<img
						src={avatar ? serverURL + avatar : defaultImg}
						alt=""
					/>
					<div className="username">{username}</div>
				</div>
				<form className="types" ref={orderConfigRef}>
					<SelectRadio name="type" title="Тип" items={radioTypes} />
				</form>
				<div className="specs-short">
					{specs.slice(0, 2).map(({ title, value, link, id }) => {
						return (
							<div className="spec" id={id}>
								<div className="title">{title}</div>
								<div className="value">{value}</div>
							</div>
						)
					})}
					<a href="#specs-full-wrapper" className="btn btn--light">
						Перейти к характеристикам
					</a>
				</div>
			</div>

			<div className="specs-full-wrapper" id="specs-full-wrapper">
				<h3>Характеристики</h3>
				<div className="specs-full">
					{specs.map(({ title, value, link, id }) => {
						return (
							<div className="spec" id={id}>
								<div className="title">{title}</div>
								<div className="value">{value}</div>
							</div>
						)
					})}
				</div>
			</div>

			<div className="reviews-wrapper" id="reviews">
				<h3>Отзывы</h3>
				<button
					type="button"
					className="btn btn--rounded btn--contained btn--short btn--content"
					onClick={() => dispatch(setOpenReviewModal(true))}
				>
					Добавить отзыв
				</button>
				<div className="reviews">
					{reviews.map(
						({
							title,
							comment,
							rating,
							author: { avatar, username },
							createdAt,
							_id,
						}) => {
							return (
								<article className="review-item" key={_id}>
									<div className="title">
										{title}{" "}
										<span className="username">
											от {username}
										</span>
									</div>
									<div className="comment">{comment}</div>
									<div className="rating">
										<div className="date">
											{getIntlDate(createdAt)}
										</div>
										<div className="stars">
											{Array.from(Array(rating)).map(
												(item) => {
													console.log(item)
													return <AiFillStar />
												}
											)}
										</div>
									</div>
									<img
										className="avatar"
										src={
											avatar
												? serverURL + avatar
												: defaultImg
										}
										alt=""
									/>
								</article>
							)
						}
					)}
				</div>
			</div>
		</div>
	)
}
