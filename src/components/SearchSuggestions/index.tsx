import React, { Dispatch, FC, useEffect } from "react"
import style from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { selectProducts } from "../../store/features/product/selectors"
import { AppDispatch } from "../../store/store"
import {
	getAllProducts,
	getSuggestedProducts,
} from "../../store/features/product/thunks"
import { Link } from "react-router-dom"
import {
	updateFilters,
	PayloadUpdateType,
} from "../../store/features/filter/filterSlice"
import { ProductItem } from "../ProductItem"
import { selectFilters } from "../../store/features/filter/selector"
import { Loading } from "../Loading"
import { SingleProductSkeleton } from "../pageBlocks/Skeletons/SingleProductSkeleton"
import { ReviewItemSkeleton } from "../pageBlocks/Skeletons/ReviewItemSkeleton"
import { BookmarkSkeleton } from "../pageBlocks/Skeletons/BookmarkSkeleton"

type PropType = {
	search: string
	setIsSuggesting: Dispatch<React.SetStateAction<boolean>>
}

export const SearchSuggestions: FC<PropType> = ({
	search,
	setIsSuggesting,
}) => {
	const { suggestedProducts, details, isLoading } =
		useSelector(selectProducts)
	const { title } = useSelector(selectFilters)

	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(getSuggestedProducts())
	}, [title])

	const handleClick = ({ name, value }: { name: string; value: string }) => {
		dispatch(
			updateFilters({ name, value, checked: true } as PayloadUpdateType)
		)
		setIsSuggesting(false)
	}

	const filteredCompanies = details?.companies?.filter((item) =>
		item.includes(search)
	)

	const filteredTags = details?.tags?.filter((item) => item.includes(search))

	const filteredCategories = details?.categories?.filter((item) =>
		item.includes(search)
	)

	const filteredProducts = suggestedProducts?.filter((item) =>
		item.title.includes(search)
	)

	return (
		<div className={style.wrapper}>
			<div className={style.details}>
				{filteredCategories.length > 0 && (
					<div className={style.categories}>
						<h5 className={style.title}>Категории</h5>
						<div className={style.list}>
							{filteredCategories?.map((item) => {
								return (
									<Link
										onClick={() =>
											handleClick({
												name: "categories",
												value: item,
											})
										}
										to={`/products/?category=${item}`}
									>
										{item}
									</Link>
								)
							})}
						</div>
					</div>
				)}
				{filteredTags.length > 0 && (
					<div className={style.tags}>
						<h5 className={style.title}>Теги</h5>
						<div className={style.list}>
							{filteredTags?.map((item) => {
								return (
									<Link
										onClick={() =>
											handleClick({
												name: "tags",
												value: item,
											})
										}
										to={`/products/?tags=${item}`}
									>
										#{item}
									</Link>
								)
							})}
						</div>
					</div>
				)}
				{filteredCompanies.length > 0 && (
					<div className={style.companies}>
						<h5 className={style.title}>Компания</h5>
						<div className={style.list}>
							{filteredCompanies?.map((item) => {
								return (
									<Link
										onClick={() =>
											handleClick({
												name: "companies",
												value: item,
											})
										}
										to={`/products/?companies=${item}`}
									>
										{item}
									</Link>
								)
							})}
						</div>
					</div>
				)}
			</div>

			<div className={style.products}>
				{isLoading ? (
					<>
						<BookmarkSkeleton />
						<BookmarkSkeleton />
						<BookmarkSkeleton />
						<BookmarkSkeleton />
						<BookmarkSkeleton />
						<BookmarkSkeleton />
					</>
				) : (
					filteredProducts?.map((item) => {
						return <ProductItem {...item} />
					})
				)}
			</div>
		</div>
	)
}
