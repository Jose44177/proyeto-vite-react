import { useCallback, useEffect, useRef, useState } from "react"

import { ChevronDown, ChevronUp, Volume2, VolumeX } from "lucide-react"
import { GenreCard } from "./genre-card"
import { Button } from "./ui/button"

const GENRES = [
  {
    id: "action",
    name: "Action",
    tagline:
      "Explosive sequences and adrenaline-pumping stories that keep you on the edge of your seat from start to finish.",
    image: "/genres/action.jpg",
    movieCount: 342,
  },
  {
    id: "scifi",
    name: "Sci-Fi",
    tagline:
      "Journey beyond the stars into worlds of wonder, where technology and imagination collide in breathtaking visions of the future.",
    image: "/genres/scifi.jpg",
    movieCount: 218,
  },
  {
    id: "horror",
    name: "Horror",
    tagline:
      "Dare to enter the darkness. Spine-chilling tales that will haunt your dreams long after the credits roll.",
    image: "/genres/horror.jpg",
    movieCount: 189,
  },
  {
    id: "drama",
    name: "Drama",
    tagline:
      "Deeply moving narratives exploring the full spectrum of human emotion, crafted by the finest storytellers of our time.",
    image: "/genres/drama.jpg",
    movieCount: 567,
  },
  {
    id: "thriller",
    name: "Thriller",
    tagline:
      "Heart-pounding suspense and unexpected twists. Nothing is what it seems in these masterfully crafted puzzles.",
    image: "/genres/thriller.jpg",
    movieCount: 298,
  },
  {
    id: "fantasy",
    name: "Fantasy",
    tagline:
      "Epic worlds of magic and wonder await. Legendary tales of heroes, mythical creatures, and ancient prophecies.",
    image: "/genres/fantasy.jpg",
    movieCount: 156,
  },
  {
    id: "romance",
    name: "Romance",
    tagline:
      "Beautiful love stories that capture the heart. From sweeping epics to intimate moments that define us.",
    image: "/genres/romance.jpg",
    movieCount: 423,
  },
]

export function GenreCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const activeGenre = GENRES[activeIndex]

  const handleNavigate = useCallback(
    (direction: "up" | "down") => {
      setActiveIndex((prev) => {
        if (direction === "up") return prev > 0 ? prev - 1 : prev
        return prev < GENRES.length - 1 ? prev + 1 : prev
      })
    },
    []
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        handleNavigate("up")
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        handleNavigate("down")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNavigate])

  // Wheel and Touch navigation
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let accumulatedDelta = 0
    let isWheeling = false

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isWheeling) return

      accumulatedDelta += e.deltaY
      if (Math.abs(accumulatedDelta) > 50) {
        handleNavigate(accumulatedDelta > 0 ? "down" : "up")
        accumulatedDelta = 0
        isWheeling = true
        setTimeout(() => {
          isWheeling = false
        }, 400)
      }
    }

    let touchStartY = 0
    let touchStartT = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartT = Date.now()
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      const deltaT = Date.now() - touchStartT
      
      if (Math.abs(deltaY) > 40 && deltaT < 500) {
        handleNavigate(deltaY > 0 ? "down" : "up")
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleNavigate])

  // Smoothly track and center active item
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let frameId: number
    const startTime = performance.now()

    const trackCenter = () => {
      const cards = container.children
      if (cards[activeIndex]) {
        const card = cards[activeIndex] as HTMLElement
        const containerRect = container.getBoundingClientRect()
        const cardRect = card.getBoundingClientRect()
        
        const offset = cardRect.top - containerRect.top - containerRect.height / 2 + cardRect.height / 2
        
        if (Math.abs(offset) > 0.5) {
          container.scrollTop += offset * 0.15
        }
      }

      if (performance.now() - startTime < 1200) {
        frameId = requestAnimationFrame(trackCenter)
      }
    }

    frameId = requestAnimationFrame(trackCenter)

    return () => cancelAnimationFrame(frameId)
  }, [activeIndex])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0">
        {GENRES.map((genre, i) => (
          <div
            key={genre.id}
            className={`
              absolute inset-0 transition-opacity duration-[1.5s] ease-in-out
              ${i === activeIndex ? "opacity-100" : "opacity-0"}
            `}
          >
            <img
              src={genre.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover animate-ken-burns brightness-[0.15]"
            />
          </div>
        ))}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-8">
          <h1 className="font-display text-3xl md:text-4xl tracking-[0.15em] text-foreground">
            CINEVO
          </h1>
          <nav className="hidden md:flex items-center gap-6">
            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              Genres
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Trending
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              New
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              My List
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground/40 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-foreground" />
            ) : (
              <Volume2 className="w-4 h-4 text-foreground" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex h-[calc(100vh-88px)]">
        {/* Left Panel: Genre Info */}
        <div className="hidden lg:flex flex-col justify-center px-12 w-[380px] shrink-0">
          <div className="space-y-6">
            <div className="animate-slide-in-left">
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
                    className="h-full bg-primary transition-all duration-700 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / GENRES.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground tracking-widest">
                  {String(GENRES.length).padStart(2, "0")} GENRES
                </span>
              </div>
            </div>

            {/* Active Genre Title */}
            <div key={activeGenre.id}>
              <h2 className="font-display text-6xl tracking-wider text-foreground animate-fade-up">
                {activeGenre.name}
              </h2>
              <p
                className="text-sm text-muted-foreground leading-relaxed mt-3 animate-fade-up"
                // style={{ animationDelay: "100ms" }}
              >
                {activeGenre.tagline}
              </p>
            </div>

            {/* Vertical Navigation */}
            <div className="flex flex-col gap-2 pt-4">
              <button
                onClick={() => handleNavigate("up")}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous genre"
              >
                <ChevronUp className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={() => handleNavigate("down")}
                disabled={activeIndex === GENRES.length - 1}
                className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next genre"
              >
                <ChevronDown className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Vertical Carousel */}
        <div className="flex-1 flex items-center px-4 md:px-8 lg:px-12">
          <div
            ref={scrollContainerRef}
            className="w-full max-w-3xl h-full mx-auto relative gap-3 overflow-y-auto py-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {GENRES.map((genre, index) => (
              <GenreCard
                key={genre.id}
                genre={genre}
                isActive={index === activeIndex}
                index={index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Cinematic Bars */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-center justify-between px-6 md:px-12 pb-4">
          <div className="flex items-center gap-4">
            {GENRES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  pointer-events-auto transition-all duration-500
                  ${i === activeIndex ? "w-8 h-0.5 bg-primary" : "w-3 h-0.5 bg-foreground/20 hover:bg-foreground/40"}
                `}
                aria-label={`Go to genre ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Anamorphic Lens Flare (subtle) */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-px bg-linear-to-r from-transparent via-primary/10 to-transparent z-5 pointer-events-none animate-pulse-glow" /> 
    </div>
  )
}
