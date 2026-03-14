import { Link } from "react-router-dom"
import { DEFAULT_GENRES } from "@/data/genres"
import { ArrowRight } from "lucide-react"
import { GenrePreviewCard } from "@/components/home/genre-preview-card"

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
          <GenrePreviewCard
            key={genre.id}
            genre={genre}
            i={i}
          />
        ))}
      </div>
    </section>
  )
}
