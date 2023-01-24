import React, { ChangeEventHandler, FC } from "react"
import style from "./style.module.scss"
type PropType = {
	onChange: ChangeEventHandler<HTMLInputElement>
	name: string
	itemId: string
	selected: string[]
	className?: string
}

export const SingleCheckbox: FC<PropType> = (props) => {
	const { name = "different", itemId, onChange, selected, className } = props
	return (
		<div className={`${style.wrapper} ${className || ""}`}>
			<input
				type="checkbox"
				id={itemId}
				value={itemId}
				name={name}
				onChange={onChange}
				checked={selected.includes(itemId)}
			/>
		</div>
	)
}
