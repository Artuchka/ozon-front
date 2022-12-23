import React from "react"
import { SelectList } from "../pageBlocks/inputs/SelectList"
import { Switch } from "../pageBlocks/inputs/Switch"
import { Range } from "../pageBlocks/inputs/Range"
import { SelectCheckbox } from "../pageBlocks/inputs/SelectCheckbox"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { getAllProducts } from "../../store/features/product/thunks"

export const Filters = () => {
	const data = ["бытовуха", "красота"]
	const dataComplex = [
		{ label: "бытовуха", value: "bit" },
		{ label: "красота", value: "pretty" },
	]
	const dispatch = useDispatch<AppDispatch>()

	const handleChange = () => {
		dispatch(getAllProducts())
	}
	return (
		<form className="filters" onChange={handleChange}>
			<SelectList name="list" title="Категория" items={[...data]} />
			<Switch title="Рассрочка без доплаты" name="credit" />
			<Switch title="Доставка" name="delivery" />
			<SelectRadio
				name="radio"
				title="Срок доставки"
				items={[...dataComplex]}
			/>
			<SelectCheckbox title="бренды" items={[...data]} name="checkbox" />
			<Range name="price" title="Цена" min={20} max={4320} />
		</form>
	)
}
