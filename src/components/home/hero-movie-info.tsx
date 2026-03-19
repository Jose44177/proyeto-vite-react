import { useState } from "react"
import { Button } from "../ui/button"
import { Check, Info, Play, Plus } from "lucide-react"

import type { Movie } from "@/types/movie"
import AddButton from "../ui/add-button"

interface MovieInfoProps {
	movie: Movie,
	index: number,
	activeIndex: number,
	isLoggedIn: boolean,
	login: () => void,
}

export function HeroMovieInfo({ movie, index, activeIndex, isLoggedIn, login }: MovieInfoProps) {
	const [inList, setInList] = useState<boolean>(false)

	return (
		<div
			key={movie.id}
			className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
				}`}
		>
			{/* Backdrop with Ken Burns */}
			<div className="absolute inset-0">
				<img
					src={movie.backdrop}
					alt={movie.title}
					className={`w-full h-full object-cover brightness-[0.6] ${index === activeIndex ? "animate-ken-burns" : ""}`}
				/>
				{/* Cinematic Overlays */}
				<div className="absolute inset-0 bg-linear-to-r from-background via-background/20 to-transparent" />
				<div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/20" />
				<div className="absolute inset-0 bg-linear-to-b from-background/40 via-transparent to-transparent" />
			</div>

			{/* Content */}
			<div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-4xl">
				<div className="flex flex-col items-start justify-start gap-6 animate-fade-up">
					<div className="flex items-center gap-3 -mb-3">
						<span className="text-xs font-bold tracking-[0.3em] uppercase text-primary bg-primary/10 px-3 py-1 border-l-2 border-primary">
							Featured Title
						</span>
						<span className="w-12 h-px bg-primary/30" />
					</div>

					<h2 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] tracking-tight text-foreground drop-shadow-2xl">
						{movie.title}
					</h2>

					<div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
						<span className="text-primary">{movie.rating} Rating</span>
						<span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
						<span>{movie.year}</span>
						<span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
						<span>{movie.duration}</span>
						<span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
						<span className="bg-secondary/50 px-2 py-0.5 rounded text-[10px] tracking-widest uppercase">
							{movie.genre}
						</span>
					</div>

					<p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed line-clamp-3 md:line-clamp-none">
						{movie.overview}
					</p>

					<div className="flex flex-wrap items-center gap-4">
						<Button className="h-12 px-8 font-display text-xl tracking-widest hover:scale-105">
							<Play className="w-5 h-5 fill-current" />
							Watch Now
						</Button>

						{isLoggedIn ? (
							<AddButton text={['In List', 'My List']} />
						) : (
							<Button
								variant="outline"
								onClick={login}
								className="h-12 px-8 font-display text-xl tracking-widest  border-primary/40 hover:bg-primary/5 hover:border-primary/80 hover:scale-105 text-primary backdrop-blur-sm"
							>
								<Plus className="w-5 h-5" />
								Join to Save
							</Button>
						)}

						<Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-transparent flex items-center">
							<Info className="w-5 h-5" />
							Details
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}