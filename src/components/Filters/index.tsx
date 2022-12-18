import React from "react"
import { SelectList } from "../pageBlocks/inputs/SelectList"
import { Switch } from "../pageBlocks/inputs/Switch"
import { Range } from "../pageBlocks/inputs/Range"
import { SelectCheckbox } from "../pageBlocks/inputs/SelectCheckbox"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"

export const Filters = () => {
	const data = ["бытовуха", "красота"]
	return (
		<form className="filters">
			<SelectList name="list" title="Категория" items={[...data]} />
			<Switch title="Рассрочка без доплаты" name="credit" />
			<Switch title="Доставка" name="delivery" />
			<SelectRadio name="radio" title="Срок доставки" items={[...data]} />
			<SelectCheckbox title="бренды" items={[...data]} name="checkbox" />
			<Range name="price" title="Цена" min={20} max={4320} />
		</form>
	)
}
