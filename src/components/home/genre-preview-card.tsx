import { Genre } from "@/types/genre";
import { Link } from "react-router-dom";

interface GenrePreviewCardProps {
	genre: Genre
	i: number
}

export function GenrePreviewCard({ genre, i }: GenrePreviewCardProps) {
	return (
		<Link
			key={genre.id}
			to={`/genres/${genre.id}`}
			className="group relative aspect-video overflow-hidden rounded-lg bg-secondary animate-fade-up"
			style={{ animationDelay: `${i * 100}ms` }}
		>
			{/* Image backdrop */}
			<img
				src={genre.image}
				alt={genre.name}
				className="w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.7] group-hover:scale-105 transition-all duration-700 ease-out"
			/>

			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-linear-to-tr from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

			{/* Content */}
			<div className="absolute inset-0 p-6 flex flex-col justify-end">
				<h3 className="text-2xl md:text-3xl font-display tracking-widest uppercase text-foreground leading-none">
					{genre.name}
				</h3>
				<p className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase mt-2 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
					{genre.movieCount} Títulos
				</p>
			</div>

			{/* Glow on hover */}
			<div className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 transition-colors pointer-events-none animate-pulse-glow" />
		</Link>
	)
}