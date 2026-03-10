import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TRENDING_MOVIES } from "@/data/movies"
import { Play, Plus } from "lucide-react"

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
  }, [])

  return (
    <div className="space-y-6 group/row py-8">
      <div className="flex items-center justify-between px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-display tracking-widest uppercase text-foreground">
          Top 10 <span className="text-primary truncate">en tu plataforma</span>
        </h2>
        <div className="flex items-center gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            disabled={!showLeft}
            onClick={() => scroll("left")}
            className="w-10 h-10 flex items-center justify-center border border-foreground/10 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all disabled:opacity-30 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            disabled={!showRight}
            onClick={() => scroll("right")}
            className="w-10 h-10 flex items-center justify-center border border-foreground/10 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all disabled:opacity-30 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-12 sm:gap-16 px-6 md:px-12 scrollbar-none pb-8 pt-4"
        >
          {TRENDING_MOVIES.map((movie, index) => (
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
                    <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Play className="w-4 h-4 fill-current text-primary-foreground" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-sm font-display tracking-widest uppercase truncate">{movie.title}</h3>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer for the end */}
          <div className="shrink-0 w-12 md:w-24" />
        </div>
      </div>
    </div>
  )
}
