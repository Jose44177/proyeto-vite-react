import { ChevronDown, ChevronUp } from "lucide-react"
import { LineReveal } from "../ui/line-reveal"
import type { Genre } from "@/types/genre"
import { GenreScrollbar } from "./genre-scrollbar"
import { Button } from "../ui/button"

interface GenreInfoPanelProps {
  genres: Genre[]
  activeIndex: number
  stableActiveIndex: number
  onNavigate: (direction: "up" | "down") => void
}

export function GenreInfoPanel({ genres, activeIndex, stableActiveIndex, onNavigate }: GenreInfoPanelProps) {
  return (
    <div className="hidden lg:flex flex-col justify-start pt-12 px-12 w-[380px] shrink-0">
      <div className="space-y-6">
        <div className="animate-slide-in-left transform-gpu">
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            Select a Genre
          </span>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-3">
          <span className="font-display text-5xl text-primary">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-1">
            <div className="w-16 h-px bg-foreground/20">
              <div
                className="h-full bg-primary transition-[width] duration-500 ease-in-out transform-gpu"
                style={{ width: `${((activeIndex + 1) / genres.length) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground tracking-widest">
              {String(genres.length).padStart(2, "0")} GENRES
            </span>
          </div>
        </div>

        {/* Active Genre Title - rendered mapping to prevent unmounts */}
        <div className="relative h-40">
          {genres.map((genre, i) => (
            <div
              key={genre.id}
              className={`
                absolute top-0 left-0 w-full transition-all duration-500 ease-in-out transform-gpu
                ${i === stableActiveIndex
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-4 pointer-events-none"
                }
              `}
            >
              <h2 className={`font-display text-6xl tracking-wider text-foreground transform-gpu ${i === stableActiveIndex ? "animate-fade-up" : ""}`}>
                {genre.name}
              </h2>
              <div className="text-sm text-muted-foreground mt-3">
                <LineReveal stagger={40}>
                  {genre.tagline}
                </LineReveal>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Navigation */}
        {/* <div className="flex flex-col m-5 gap-2 pt-4">
          <Button
            variant="navcircle"
            size="nav"
            onClick={() => onNavigate("up")}
            disabled={activeIndex === 0}
            aria-label="Previous genre"
          >
            <ChevronUp className="w-4 h-4 text-foreground" />
          </Button>
          <Button
            variant="navcircle"
            size="nav"
            onClick={() => onNavigate("down")}
            disabled={activeIndex === genres.length - 1}
            aria-label="Next genre"
          >
            <ChevronDown className="w-4 h-4 text-foreground" />
          </Button>
        </div> */}
      </div>
    </div>
  )
}
