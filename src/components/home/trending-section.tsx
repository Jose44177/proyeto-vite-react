import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TRENDING_MOVIES } from "@/data/movies"
import { Button } from "@/components/ui/button"
import { TrendingRow } from "./trending-row"

export function TrendingSection() {
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
    <div className="space-y-6 group/row py-8">
      <div className="flex items-center justify-between px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-display tracking-widest uppercase text-foreground">
          Top 10 <span className="text-primary truncate">en cinevo</span>
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

      <div className={`relative 
        ${showLeft ? "mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          : "mask-[linear-gradient(to_right,black_0%,black_85%,transparent_100%)]"}`}>
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto overflow-y-hidden gap-12 sm:gap-16 px-6 md:px-12 scrollbar-none pb-8 pt-4"
        >
          {TRENDING_MOVIES.map((movie, index) => (
            <TrendingRow
              key={movie.id}
              movie={movie}
              index={index}
            />
          ))}
          {/* Spacer for the end */}
          <div className="shrink-0 w-12 md:w-24" />
        </div>
      </div>
    </div>
  )
}
