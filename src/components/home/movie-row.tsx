import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MovieCard } from "./movie-card"
import type { MovieARWithPoster } from "@/types/movie"
import { Button } from "@/components/ui/button"

interface MovieRowProps {
  title: string
  movies: MovieARWithPoster[]
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
          <Button
            variant={"navcircle"}
            disabled={!showLeft}
            onClick={() => scroll("left")}
            className="w-5 h-auto"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant={"navcircle"}
            disabled={!showRight}
            onClick={() => scroll("right")}
            className="w-5 h-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        className={`relative 
        ${showLeft ? "mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
            : "mask-[linear-gradient(to_right,black_0%,black_85%,transparent_100%)]"}`}>
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto overflow-y-hidden gap-4 mx-6 md:mx-12 scrollbar-none snap-x snap-mandatory"
        >
          {movies.map((movie, i) => (
            <div key={movie.ids.slug} className="snap-start">
              <MovieCard movie={movie} index={i} />
            </div>
          ))}
          {/* Spacer for the end */}
          <div className="shrink-0 w-6 md:w-12" />
        </div>
      </div>
    </div>
  )
}
