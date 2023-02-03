import React, { ChangeEvent, useCallback } from "react"
import style from "./style.module.scss"

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import { useDispatch, useSelector } from "react-redux"
import { selectOrder } from "../../store/features/order/selector"
import { Switch } from "../pageBlocks/inputs/Switch"
import { AppDispatch } from "../../store/store"
import {
	OrderType,
	PayloadUpdateOrderType,
	deliveryDefault,
	updateDeliveryCoords,
} from "../../store/features/order/orderSlice"
import { debounce } from "lodash"
import { updateOrder } from "../../store/features/order/thunks"
import { isCoordsEqual } from "../../utils/coords"

const imageHomePin =
	"https://res.cloudinary.com/dzy8xh83i/image/upload/v1675458156/OZON_DEFAULT/pin2_gqegto.png"
export const SelectDeliveryMap = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { order, deliveryCoords, isCustomCoord, customCoord } =
		useSelector(selectOrder)

	const defaultState = {
		center: deliveryDefault[0].value,
		zoom: 10,
	}

	const preparedDeliveryCoords = deliveryDefault.map((item) => {
		return { ...item, value: item.value.join(";") }
	})

	const chosenCoord = isCustomCoord
		? customCoord.map((item) => parseFloat(item.toFixed(6)))
		: deliveryCoords

	const chosenCoordsString = `[${chosenCoord.join(", ")}]`

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

	const debouncedCustomChange = useCallback(
		debounce((e: any) => {
			const value =
				e["_sourceEvent"]["originalEvent"]["target"]["geometry"][
					"_coordinates"
				]

			dispatch(
				updateDeliveryCoords({
					name: "customCoord",
					value,
				} as PayloadUpdateOrderType)
			)
		}, 300),
		[]
	)

	const handlePinClick = (coords: [number, number]) => {
		dispatch(
			updateDeliveryCoords({
				name: "deliveryCoords",
				value: coords,
			} as PayloadUpdateOrderType)
		)
	}

	const handlePinSave = () => {
		dispatch(
			updateOrder({
				data: {
					deliveryCoordinates: chosenCoord,
					isCustomCoordinates: isCustomCoord,
				} as OrderType,
				orderId: order._id,
			})
		)
	}

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
				<div className={style.result}>
					<span>Выбрана точка с координатами</span>
					<span>{chosenCoordsString}</span>
				</div>
			</div>
			<div className={style.map}>
				<YMaps>
					<Map
						width={500}
						height={400}
						defaultState={defaultState}
						state={{
							center: deliveryCoords,
							zoom: 12,
						}}
					>
						{deliveryDefault.map((item) => {
							const isActive = isCoordsEqual(
								deliveryCoords,
								item.value
							)
							return (
								<Placemark
									key={item.label}
									geometry={item.value}
									properties={{
										iconCaption: isActive ? item.label : "",
									}}
									instanceRef={(inst) => {
										inst?.events?.add("click", () =>
											handlePinClick(item.value)
										)
									}}
									options={{
										preset: isActive
											? "islands#circleDotIcon"
											: "islands#Icon",
										iconColor: "#005bff",
									}}
								/>
							)
						})}
						{isCustomCoord && (
							<Placemark
								geometry={deliveryCoords}
								options={{
									draggable: true,
									preset: "islands#dotIcon",
									iconColor: "#005bff",
									iconLayout: "default#image",
									iconImageHref: imageHomePin,
									iconImageSize: [60, 60],
								}}
								onDrag={(e: any) => debouncedCustomChange(e)}
							/>
						)}
					</Map>
				</YMaps>
			</div>
			<button
				className={`btn btn--contained ${style.saveButton}`}
				onClick={handlePinSave}
			>
				Сохранить
			</button>
		</div>
	)
}
