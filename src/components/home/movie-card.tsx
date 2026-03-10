import { Play, Plus, Heart } from "lucide-react"
import type { Movie } from "@/types/movie"

interface MovieCardProps {
  movie: Movie
  isPriority?: boolean
}

export function MovieCard({ movie, isPriority = false }: MovieCardProps) {
  return (
    <div className="group relative w-[160px] sm:w-[200px] md:w-[240px] aspect-2/3 shrink-0 cursor-pointer overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:z-30 rounded-sm">
      {/* Poster Image */}
      <img
        src={movie.poster}
        alt={movie.title}
        loading={isPriority ? "eager" : "lazy"}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 space-y-2">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            </button>
            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary/80 text-foreground border border-foreground/10 flex items-center justify-center hover:scale-110 transition-transform hover:bg-secondary">
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="ml-auto w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary/80 text-foreground border border-foreground/10 flex items-center justify-center hover:scale-110 transition-transform hover:text-primary">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm md:text-base font-display tracking-wider truncate uppercase">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground font-medium">
              <span className="text-primary">{movie.rating}</span>
              <span>{movie.year}</span>
              <span className="border border-muted-foreground/30 px-1 rounded-xs uppercase">
                {movie.genre}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar (Continue Watching) */}
      {movie.progress !== undefined && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-foreground/20 z-10">
          <div
            className="h-full bg-primary"
            style={{ width: `${movie.progress}%` }}
          />
        </div>
      )}

      {/* Borde sutil interactivo */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-primary/30 transition-colors pointer-events-none" />
    </div>
  )
}
