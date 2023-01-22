import React, { FC } from "react"
import style from "./style.module.scss"
import { SingleProductType } from "../../store/features/product/productSlice"
import { OrderType } from "../../store/features/order/orderSlice"
import { getIntlDate } from "../../utils/intl"
import { serverURL } from "../../axios/customFetch"
import { Link } from "react-router-dom"

const statusMap = {
	cart: "Корзина",
	checkout: "Оплата",
	pending: "Оплата идет",
	paid: "Оплачено",
	delievered: "Получено",
}

export const OrderGridItem: FC<OrderType> = (props) => {
	const { _id, total, amountTotal, status, items, itemsLength } = props

	return (
		<div className={style.wrapper}>
			<header className={style.heading}>
				<div className={style.dateId}>
					<div className={style.date}>{getIntlDate(Date.now())}</div>
					<Link to={_id} className="btn btn--light btn--transparent">
						{_id}
					</Link>
				</div>
				<div className={style.total}>
					<span>оплачено</span> <strong>{total} ₽</strong>
				</div>
			</header>
			<main className={style.main}>
				<div className={style["left-side"]}>
					<div className={style["delievery-status"]}>
						Доставка в пункт выдачи <span>{statusMap[status]}</span>
					</div>
					<div className={style["delievery-date"]}>
						Дата доставки:
						<span> {getIntlDate(Date.now())}</span>
					</div>
					<div className={style.rate}>
						Оценить товар{amountTotal > 1 ? "ы" : ""}
					</div>
				</div>
				<div className={style["right-side"]}>
					{items?.slice(0, 2)?.map((item) => {
						return (
							<div className={style.item} key={item._id}>
								<Link to={`/products/${item.product._id}`}>
									<img
										src={serverURL + item.product.images[0]}
										alt=""
									/>
									<span>x{item.amount}</span>
								</Link>
							</div>
						)
					})}
					{itemsLength > 2 && (
						<div className={style.more}>
							+ Еще {itemsLength - 2} товара
						</div>
					)}
				</div>
			</main>
			{/* <div className={style.amountTotal}>{amountTotal}</div> */}
		</div>
	)
}
