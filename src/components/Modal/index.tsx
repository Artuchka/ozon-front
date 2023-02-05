import React, {
	FC,
	MouseEvent,
	MouseEventHandler,
	ReactNode,
	useEffect,
	useRef,
} from "react"
import style from "./style.module.scss"
import { toast, ToastContent } from "react-toastify"

type PropType = {
	open: boolean
	setOpen: Function
	children?: ReactNode
	className?: string
	width?: "low" | "medium" | "high"
	tryPreventClosing?: boolean
}

const maxWidthMap = {
	low: "350px",
	medium: "600px",
	high: "900px",
}

interface ConfirmAlertType {
	onConfirm: MouseEventHandler<HTMLButtonElement>
	onReject: MouseEventHandler<HTMLButtonElement>
}

const ConfirmAlert: FC<ConfirmAlertType> = ({ onConfirm, onReject }) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			gap: ".5rem",
		}}
	>
		Изменения не сохранены. Всё равно закрыть?
		<button
			className="btn btn--middle btn--middle-warn"
			onClick={onConfirm}
		>
			Закрыть
		</button>
		<button
			className="btn btn--middle btn--middle-success"
			onClick={onReject}
		>
			Подождать
		</button>
	</div>
)

export const Modal: FC<PropType> = ({
	open,
	setOpen,
	children,
	className,
	width = "low",
	tryPreventClosing = false,
}) => {
	const modalBgRef = useRef(document.createElement("div"))
	const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
		if (modalBgRef.current === e.target) {
			handleClose()
		}
	}

	const handleClose = () => {
		console.log({ tryPreventClosing })
		if (!tryPreventClosing) {
			return setOpen(false)
		}
		toast(
			<ConfirmAlert
				onConfirm={() => setOpen(false)}
				onReject={() => {}}
			/>,
			{
				autoClose: 10000,
				position: "bottom-center",
			}
		)
	}
	return (
		<div
			className={`${style.modal} ${open ? style.open : ""}`}
			onClick={handleClickOutside}
		>
			<div
				className={style["modal-inner"]}
				style={{
					maxWidth: maxWidthMap[width],
				}}
			>
				<div
					className={style.close}
					onClick={function () {
						handleClose()
					}}
				>
					<span></span>
					<span></span>
				</div>
				<div className={style["body"]}>{children}</div>
			</div>
			<div className={style["modal-bg"]} ref={modalBgRef}></div>
		</div>
	)
}
