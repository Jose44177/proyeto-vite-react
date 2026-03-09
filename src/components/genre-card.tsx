import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Play, Plus } from "lucide-react"
import { Button } from "./ui/button"

interface GenreCardProps {
  genre: {
    id: string
    name: string
    tagline: string
    image: string
    movieCount: number
  }
  isActive: boolean
  index: number
  onClick: () => void
}

export function GenreCard({ genre, isActive, index, onClick }: GenreCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      })
    },
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
    })
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [observerCallback])

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Select ${genre.name} genre`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      className={`
        group relative w-full overflow-hidden rounded-lg
        transition-all duration-700 ease-out
        ${isActive ? "h-[420px] lg:h-[400px]" : "h-[110px] lg:h-[130px] cursor-pointer"}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
      }}
    >
      {/* Background Image with Ken Burns */}
      <div
        className={`
          absolute inset-0 transition-transform duration-[1.2s] ease-out
          ${isActive ? "scale-100" : "scale-110"}
        `}
      >
        <img
          src={genre.image}
          // alt={`${genre.name} genre backdrop`}
          className={`
            absolute inset-0 w-full h-full object-cover transition-all duration-[5s] ease-in-out
            ${isActive ? "animate-ken-burns" : ""}
            ${!isActive ? "brightness-[0.3] saturate-50" : "brightness-[0.5]"}
          `}
        />
      </div>

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent z-1" />
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-background/30 z-1" />

      {/* Letterbox bars for cinematic feel */}
      {/* {isActive && (
        <>
          <div className="absolute top-0 left-0 right-0 h-4 bg-background/60 z-2 animate-fade-in" />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-background/60 z-2 animate-fade-in" />
        </>
      )} */}

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 z-2 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-3 flex h-full items-end p-6 md:p-8">
        <div className="flex w-full items-end justify-between gap-4">
          {/* Left: Text Content */}
          <div className="flex-1">
            {/* Genre Number */}
            <span
              className={`
                font-display text-primary/40 leading-none block
                transition-all duration-500
                ${isActive ? "text-7xl md:text-8xl mb-3" : "text-4xl md:text-5xl mb-0"}
              `}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Genre Name */}
            <h2
              className={`
                font-display tracking-wider leading-none text-foreground
                transition-all duration-500
                ${isActive ? "text-5xl md:text-7xl" : "text-2xl md:text-3xl"}
              `}
            >
              {genre.name}
            </h2>

            {/* Tagline - only visible when active */}
            <div
              className={`
                overflow-hidden transition-all duration-500
                ${isActive ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}
              `}
            >
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
                {genre.tagline}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-primary font-medium tracking-widest uppercase">
                  {genre.movieCount} titles
                </span>
                <span className="w-8 h-px bg-primary/40" />
              </div>
            </div>

            {/* Action Buttons - only visible when active */}
            <div
              className={`
                flex items-center gap-3 overflow-hidden transition-all duration-500
                ${isActive ? "max-h-20 opacity-100 mt-5" : "max-h-0 opacity-0 mt-0"}
              `}
            >
              <Link to={`/categoria/${genre.id}`}>
                <Button className="tracking-wide rounded-sm">
                  <Play className="w-4 h-4 fill-current" />
                  Explore
                </Button>
              </Link>
              <Button variant={"outline"} className="tracking-wide rounded-sm">
                <Plus className="w-4 h-4" />
                My List
              </Button>
            </div>
          </div>

          {/* Right: Decorative accent line */}
          {isActive && (
            <div className="hidden md:flex flex-col items-center gap-2 animate-fade-in">
              <div className="w-px h-20 bg-linear-to-b from-transparent via-primary to-transparent" />
              <span className="text-[10px] text-muted-foreground tracking-[0.3em] rotate-90 origin-center whitespace-nowrap">
                {genre.name.toUpperCase()}
              </span>
              <div className="w-px h-20 bg-linear-to-b from-transparent via-primary to-transparent" />
            </div>
          )}
        </div>
      </div>

      {/* Hover Indicator for collapsed items */}
      {!isActive && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center">
            <Play className="w-3 h-3 text-foreground fill-current" />
          </div>
        </div>
      )}

      {/* Active Glow Effect */}
      {/* {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent z-4 animate-pulse-glow" />
      )} */}
    </div>
  )
}
