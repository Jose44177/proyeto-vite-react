import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MovieCard } from "./movie-card"
import type { Movie } from "@/types/movie"

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setShowLeft(scrollLeft > 10)
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current
      const scrollTo = direction === "left"
        ? rowRef.current.scrollLeft - clientWidth * 0.8
        : rowRef.current.scrollLeft + clientWidth * 0.8

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener("resize", handleScroll)
    return () => window.removeEventListener("resize", handleScroll)
  }, [])

  return (
    <div className="space-y-4 group/row py-4">
      <div className="flex items-center justify-between px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-display tracking-widest uppercase text-foreground">
          {title}
        </h2>
        <div className="flex items-center gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            disabled={!showLeft}
            onClick={() => scroll("left")}
            className="w-8 h-8 flex items-center justify-center border border-foreground/10 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            disabled={!showRight}
            onClick={() => scroll("right")}
            className="w-8 h-8 flex items-center justify-center border border-foreground/10 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 px-6 md:px-12 scrollbar-none snap-x snap-mandatory pb-4"
        >
          {movies.map((movie, i) => (
            <div key={movie.id} className="snap-start translate-y-8 opacity-0 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <MovieCard movie={movie} />
            </div>
          ))}
          {/* Spacer for the end */}
          <div className="shrink-0 w-6 md:w-12" />
        </div>
      </div>
    </div>
  )
}
