import { useEffect, useRef } from "react"

export function usePrevious(value: number | string) {
	const ref = useRef(0 as typeof value)
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}
