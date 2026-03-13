import { useState, useEffect } from "react"
import { Play, Plus, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FEATURED_MOVIES } from "@/data/movies"
import { useAuth } from "@/hooks/use-auth"
import { HeroMovieInfo } from "./hero-movie-info"

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { isLoggedIn, login } = useAuth()

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_MOVIES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % FEATURED_MOVIES.length)
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + FEATURED_MOVIES.length) % FEATURED_MOVIES.length)

  return (
    <section className="relative w-full h-[90vh] lg:h-screen overflow-hidden">
      {FEATURED_MOVIES.map((movie, index) => (
        <HeroMovieInfo
          key={movie.id}
          movie={movie}
          index={index}
          activeIndex={activeIndex}
          isLoggedIn={isLoggedIn}
          login={login}
        />
      ))}

      {/* Navigation Arrows */}
      <div className="absolute right-12 bottom-12 z-30 flex gap-4">
        <Button
          variant={"navcircle"}
          onClick={prevSlide}
          className="w-11 h-11"
        >
          <ChevronLeft className="" />
        </Button>
        <Button
          variant={"navcircle"}
          onClick={nextSlide}
          className="w-11 h-11"
        >
          <ChevronRight className="" />
        </Button>
      </div>

      {/* Slot Progress Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-12 z-30 flex gap-3">
        {FEATURED_MOVIES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === activeIndex ? "w-12 bg-primary" : "w-4 bg-foreground/20 hover:bg-foreground/40 cursor-pointer"
              }`}
          />
        ))}
      </div>

      {/* Film Grain Rendering */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />
    </section>
  )
}
