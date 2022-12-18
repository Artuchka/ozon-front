import React from "react"
import { SelectList } from "../pageBlocks/inputs/SelectList"
import { SelectRadio } from "../pageBlocks/inputs/SelectRadio"
import { SelectCheckbox } from "../pageBlocks/inputs/SelectCheckbox"
import { Switch } from "../pageBlocks/inputs/Switch"
import { Range } from "../pageBlocks/inputs/Range"

export const Filters = () => {
	return (
		<div className="filters">
			<SelectList />
			<SelectCheckbox />
			<Switch />
			<SelectRadio />
			<Range />
		</div>
	)
}
