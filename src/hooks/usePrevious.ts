import { useEffect, useRef } from "react"

export function usePrevious(value: number | string) {
	const ref = useRef(0 as typeof value)
	useEffect(() => {
		ref.current = value
	}, [value])
	return ref.current
}
