import type { Genre } from "@/types/genre"

interface GenreBackgroundProps {
  genres: Genre[]
  activeIndex: number
  mountedIndices: Set<number>
}

export function GenreBackground({ genres, activeIndex, mountedIndices }: GenreBackgroundProps) {
  return (
    <div className="absolute inset-0 bg-background">
      {genres.map((genre, i) => {
        const isVisible = Math.abs(i - activeIndex) <= 1 || mountedIndices.has(i);

        return (
          <div
            key={genre.id}
            className={`
              absolute inset-0 transition-opacity duration-[1.5s] ease-in-out
              ${i === activeIndex ? "opacity-100 z-5" : "opacity-0 z-0"}
            `}
          >
            {isVisible && (
              <img
                src={genre.image}
                alt=""
                loading={i === activeIndex ? "eager" : "lazy"}
                decoding="async"
                className={`
                  absolute inset-0 w-full h-full object-cover brightness-[0.10] will-change-transform
                  ${i === activeIndex ? "animate-ken-burns" : ""}
                `}
              />
            )}
          </div>
        )
      })}
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/60" />
    </div>
  )
}
