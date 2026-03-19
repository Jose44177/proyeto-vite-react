import AddButton from '@/components/ui/add-button'
import { Play } from 'lucide-react'

import type { Movie } from '@/types/movie'

interface TrendingRowProps {
	movie: Movie
	index: number
}

export function TrendingRow({ movie, index }: TrendingRowProps) {
	return (
		<div
			key={movie.id}
			className="relative shrink-0 w-[180px] sm:w-[220px] md:w-[260px] group cursor-pointer"
		>
			{/* Number Background */}
			<span className="absolute -left-10 sm:-left-12 -bottom-2 sm:-bottom-4 text-[120px] sm:text-[160px] md:text-[200px] font-display leading-none text-transparent select-none z-10 opacit-80 transition-all duration-700 group-hover:-translate-x-4"
				style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)' }}>
				{index + 1}
			</span>

			{/* Movie Poster */}
			<div className="relative z-20 aspect-2/3 overflow-hidden rounded-xs border border-white/5 group-hover:border-primary/40 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
				<img
					src={movie.poster}
					alt={movie.title}
					className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>

				{/* Overlay on hover */}
				<div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
					<div className="flex gap-2 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
						<button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform hover:rotate-120 duration-300 ease-in-out">
							<Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
						</button>
						<AddButton />
					</div>
					<h3 className="text-sm font-display tracking-widest uppercase truncate">{movie.title}</h3>
				</div>
			</div>
		</div>
	)
}