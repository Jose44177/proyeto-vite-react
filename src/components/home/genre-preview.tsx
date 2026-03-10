import { Link } from "react-router-dom"
import { DEFAULT_GENRES } from "@/data/genres"
import { ArrowRight } from "lucide-react"

export function GenrePreview() {
  // Show only 6 genres for the preview grid
  const previewGenres = DEFAULT_GENRES.slice(0, 6)

  return (
    <section className="px-6 md:px-12 py-12 space-y-8">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase">Explora</span>
          <h2 className="text-4xl md:text-5xl font-display tracking-wider uppercase">Por Categorías</h2>
        </div>
        <Link
          to="/genres"
          className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors pb-2 group"
        >
          Ver todos los géneros
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {previewGenres.map((genre, i) => (
          <Link
            key={genre.id}
            to={`/genres/${genre.id}`}
            className="group relative aspect-video overflow-hidden rounded-sm bg-secondary animate-fade-up"
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
            <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 transition-colors pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  )
}
