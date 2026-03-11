import { useState, useEffect } from "react"

export function useIsScrollable() {
	const [isScrollable, setIsScrollable] = useState(false)

	useEffect(() => {
		const check = () => {
			setIsScrollable(document.documentElement.scrollHeight > window.innerHeight)
		}

		check()

		// Re-chequear si el contenido cambia de tamaño
		const observer = new ResizeObserver(check)
		observer.observe(document.documentElement)

		return () => observer.disconnect()
	}, [])

	return isScrollable
}