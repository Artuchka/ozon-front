import React, { ChangeEvent } from "react"
import style from "./style.module.scss"

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../../store/features/order/selector"
import { Switch } from "../pageBlocks/inputs/Switch"
import { AppDispatch } from "../../store/store"
import {
	PayloadUpdateOrderType,
	deliveryDefault,
	updateDeliveryCoords,
} from "../../store/features/order/orderSlice"
import { PayloadUpdateType } from "../../store/features/filter/filterSlice"

export const SelectDeliveryMap = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { deliveryCoords, isCustomCoord } = useSelector(selectOrder)
	const defaultState = {
		center: [59.909599542115195, 30.307893688003148],
		zoom: 11,
	}
	const handleCoordSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target
		console.log({ name, value })

		let prepValue = null
		if (name === "deliveryCoords") {
			prepValue = value.split(";").map((item) => parseFloat(item))
		} else {
			prepValue = checked
		}

		dispatch(
			updateDeliveryCoords({
				name,
				value: prepValue,
			} as PayloadUpdateOrderType)
		)
	}
	console.log(deliveryCoords)
	console.log({ isCustomCoord })
	const preparedDeliveryCoords = deliveryDefault.map((item) => {
		return { ...item, value: item.value.join(";") }
	})
	return (
		<div className={style.wrapper}>
			<div className={style.coords}>
				<SelectRadio
					title="Доступные пункты доставки:"
					name="deliveryCoords"
					onChange={handleCoordSelect}
					selected={deliveryCoords.join(";")}
					items={preparedDeliveryCoords}
					isBlurred={isCustomCoord}
					className={style.prepared}
				/>
				<Switch
					title="Своя точка"
					name="isCustomCoord"
					onChange={handleCoordSelect}
					selected={isCustomCoord}
					className={style.customSwitch}
				/>
			</div>
			<div className={style.map}>
				<YMaps>
					<Map
						width={500}
						height={350}
						defaultState={defaultState}
						onLoad={(e) => {
							console.log(e)
						}}
					>
						<Placemark
							geometry={[59.909599542115195, 30.307893688003148]}
							properties={{ iconCaption: "fad" }}
							options={{ preset: "islands#circleDotIcon" }}
						/>
						{isCustomCoord && (
							<Placemark
								geometry={[
									59.909599542115195, 30.407893688003148,
								]}
								options={{ draggable: true }}
								onDrag={(e: any) => {
									const res =
										e["_sourceEvent"]["originalEvent"][
											"target"
										]["geometry"]["_coordinates"]
									console.log(res)
								}}
							/>
						)}
					</Map>
				</YMaps>
			</div>
		</div>
	)
}
