import { useState } from 'react';
import { Heart } from "lucide-react";

interface HeartButtonProps {
	liked: boolean
	onToggle: () => void
}

export function HeartButton({ liked, onToggle }: HeartButtonProps) {
	const [pop, setPop] = useState(false)

	const handleClick = () => {
		onToggle()
		setPop(true)
		setTimeout(() => setPop(false), 400)
	}

	return (
		<button
			onClick={handleClick}
			className={`
                ml-auto w-8 h-8 md:w-10 md:h-10
                rounded-full bg-secondary/80
                border border-foreground/10
                flex items-center justify-center
                transition-transform hover:scale-110
                ${!liked ? "hover:*:animate-heartbeat-like" : ""}
              `}
		>
			{/* icon solo recibe la animación al hacer hover sobre el botón */}
			<Heart
				className={`
                  w-4 h-4 md:w-5 md:h-5
                  transition-all
                  ${liked ? "fill-red-500 text-red-500" : "text-foreground"}
                  ${pop ? "animate-like-pop" : ""}
                `}
			/>

		</button>
	)
}