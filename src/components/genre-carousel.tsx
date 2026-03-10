import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Volume2, VolumeX } from "lucide-react"
import { GenreCard } from "./genre-card"
import { Button } from "./ui/button"
import { LineReveal } from "./ui/line-reveal"

const DEFAULT_GENRES = [
  {
    id: "action",
    name: "Action",
    tagline:
      "Explosive sequences and adrenaline-pumping stories that keep you on the edge of your seat from start to finish.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80",
    movieCount: 342,
  },
  {
    id: "scifi",
    name: "Sci-Fi",
    tagline:
      "Journey beyond the stars into worlds of wonder, where technology and imagination collide in breathtaking visions of the future.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    movieCount: 218,
  },
  {
    id: "horror",
    name: "Horror",
    tagline:
      "Dare to enter the darkness. Spine-chilling tales that will haunt your dreams long after the credits roll.",
    image: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80",
    movieCount: 189,
  },
  {
    id: "drama",
    name: "Drama",
    tagline:
      "Deeply moving narratives exploring the full spectrum of human emotion, crafted by the finest storytellers of our time.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
    movieCount: 567,
  },
  {
    id: "thriller",
    name: "Thriller",
    tagline:
      "Heart-pounding suspense and unexpected twists. Nothing is what it seems in these masterfully crafted puzzles.",
    image: "https://images.unsplash.com/photo-1483808161634-29aa1b1dd61d?auto=format&fit=crop&q=80",
    movieCount: 298,
  },
  {
    id: "fantasy",
    name: "Fantasy",
    tagline:
      "Epic worlds of magic and wonder await. Legendary tales of heroes, mythical creatures, and ancient prophecies.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80",
    movieCount: 156,
  },
  {
    id: "romance",
    name: "Romance",
    tagline:
      "Beautiful love stories that capture the heart. From sweeping epics to intimate moments that define us.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    movieCount: 423,
  },
]

const GENRE_ENRICHMENT: Record<string, { tagline: string, image: string, movieCount: number }> = {
  "action": { tagline: "Explosive sequences and adrenaline-pumping stories that keep you on the edge of your seat from start to finish.", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80", movieCount: 342 },
  "adventure": { tagline: "Embark on thrilling journeys across uncharted lands, discovering hidden treasures and facing extraordinary challenges.", image: "https://images.unsplash.com/photo-1506452814811-0e1ce4e22c7a?auto=format&fit=crop&q=80", movieCount: 284 },
  "animation": { tagline: "Boundless creativity comes alive with vibrant visuals and heartwarming stories that appeal to the inner child in everyone.", image: "https://images.unsplash.com/photo-1580477651156-34ca477fe4bf?auto=format&fit=crop&q=80", movieCount: 195 },
  "anime": { tagline: "Experience the unique stylized artistry and deep, complex narratives of Japanese animation.", image: "https://images.unsplash.com/photo-1578632767115-351597fd24ec?auto=format&fit=crop&q=80", movieCount: 412 },
  "comedy": { tagline: "Uproarious laughter and lighthearted moments that provide the perfect escape from the everyday.", image: "https://images.unsplash.com/photo-1543584756-8f43a8a9a239?auto=format&fit=crop&q=80", movieCount: 521 },
  "crime": { tagline: "Delve into the seedy underworld of mobsters, detectives, and masterminds in these gritty tales of law and disorder.", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80", movieCount: 310 },
  "documentary": { tagline: "Fascinating real-world stories that illuminate truth, explore nature, and capture the human experience.", image: "https://images.unsplash.com/photo-1552084117-56a98a414520?auto=format&fit=crop&q=80", movieCount: 154 },
  "donghua": { tagline: "Rich Chinese animation featuring mythical worlds, martial arts epics, and breathtaking visual artistry.", image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80", movieCount: 88 },
  "drama": { tagline: "Deeply moving narratives exploring the full spectrum of human emotion, crafted by the finest storytellers of our time.", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80", movieCount: 567 },
  "family": { tagline: "Wholesome entertainment and magical adventures perfect for sharing with viewers of all ages.", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80", movieCount: 276 },
  "fantasy": { tagline: "Epic worlds of magic and wonder await. Legendary tales of heroes, mythical creatures, and ancient prophecies.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80", movieCount: 156 },
  "history": { tagline: "Journey back in time to witness the monumental events and extraordinary lives that shaped our world.", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80", movieCount: 198 },
  "holiday": { tagline: "Festive cheer and seasonal magic to warm your heart during the most wonderful time of the year.", image: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=80", movieCount: 112 },
  "horror": { tagline: "Dare to enter the darkness. Spine-chilling tales that will haunt your dreams long after the credits roll.", image: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80", movieCount: 189 },
  "music": { tagline: "Symphonies of story and sound that celebrate the transformative power of musicians and their art.", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80", movieCount: 145 },
  "musical": { tagline: "Spectacular song-and-dance numbers that bring theatrical magic directly to the silver screen.", image: "https://images.unsplash.com/photo-1543805908-013898fd17f6?auto=format&fit=crop&q=80", movieCount: 94 },
  "mystery": { tagline: "Cryptic clues, deceptive characters, and shocking revelations that keep you guessing until the very end.", image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&q=80", movieCount: 253 },
  "none": { tagline: "Discover the undiscovered—unique and uncategorized cinematic experiences that defy expectations.", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80", movieCount: 34 },
  "romance": { tagline: "Beautiful love stories that capture the heart. From sweeping epics to intimate moments that define us.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80", movieCount: 423 },
  "science-fiction": { tagline: "Journey beyond the stars into worlds of wonder, where technology and imagination collide in breathtaking visions of the future.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80", movieCount: 218 },
  "short": { tagline: "Bite-sized stories that pack an emotional punch, proving great cinema comes in all lengths.", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80", movieCount: 89 },
  "sporting-event": { tagline: "The thrill of the game and the agony of defeat, capturing authentic rivalries and athletic triumph.", image: "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&q=80", movieCount: 67 },
  "superhero": { tagline: "Extraordinary powers and epic battles between good and evil as legendary icons save the universe.", image: "https://images.unsplash.com/photo-1612036782180-6f0b6ce846ce?auto=format&fit=crop&q=80", movieCount: 156 },
  "suspense": { tagline: "Nerve-wracking tension and looming danger that will hold you captive scene after breathless scene.", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80", movieCount: 187 },
  "thriller": { tagline: "Heart-pounding suspense and unexpected twists. Nothing is what it seems in these masterfully crafted puzzles.", image: "https://images.unsplash.com/photo-1483808161634-29aa1b1dd61d?auto=format&fit=crop&q=80", movieCount: 298 },
  "war": { tagline: "Harrowing battlefield sagas of courage, sacrifice, and the enduring human spirit during our darkest hours.", image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80", movieCount: 214 },
  "western": { tagline: "Dust, grit, and justice on the frontier. The classic tales of outlaws and heroes in the untamed wild west.", image: "https://images.unsplash.com/photo-1521319207038-0387b32c69cb?auto=format&fit=crop&q=80", movieCount: 142 },
};

export function GenreCarousel() {
  const [genres, setGenres] = useState(DEFAULT_GENRES)
  const [activeIndex, setActiveIndex] = useState(0)
  const [stableActiveIndex, setStableActiveIndex] = useState(0)
  const [mountedIndices, setMountedIndices] = useState<Set<number>>(new Set([0]))
  const [isMuted, setIsMuted] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Debounce the active index so left-panel animations only fire when the user settles on a genre
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStableActiveIndex(activeIndex)
    }, 150)
    return () => clearTimeout(timeout)
  }, [activeIndex])

  useEffect(() => {
    setMountedIndices(prev => {
      const next = new Set(prev)
      next.add(activeIndex)
      return next
    })

    const timeout = setTimeout(() => {
      setMountedIndices(prev => {
        const next = new Set(prev)
        for (const idx of next) {
          if (idx !== activeIndex && Math.abs(idx - activeIndex) > 1) {
            next.delete(idx)
          }
        }
        return next
      })
    }, 1500) // 1.5s matches the transition duration

    return () => clearTimeout(timeout)
  }, [activeIndex])
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Simulamos una llamada real que fallará
        const res = await fetch('https://api.trakt.tv/movies/genres', {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error("API call failed");
      } catch (error) {
        // Fallback al JSON proporcionado por la API
        try {
          const fallbackRes = await fetch('/trakt-responses/get-movies-genres.json');
          if (!fallbackRes.ok) throw new Error("Fallback file missing");
          const fallbackData = await fallbackRes.json();
          
          const enrichedGenres = fallbackData.map((g: any) => {
             const enrichment = GENRE_ENRICHMENT[g.slug] || {
               tagline: "Discover amazing movies and shows in this fascinating cinematic genre.",
               image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80", // Default drama photo
               movieCount: Math.floor(Math.random() * 500) + 50
             };
             return {
               id: g.slug,
               name: g.name,
               tagline: enrichment.tagline,
               image: enrichment.image,
               movieCount: enrichment.movieCount
             };
          });
          setGenres(enrichedGenres);
          setActiveIndex(0);
        } catch(fallbackError) {
          console.error("No se pudo cargar la info de géneros:", fallbackError);
        }
      }
    };
    fetchGenres();
  }, [])

  const activeGenre = genres[activeIndex] || DEFAULT_GENRES[0]

  const handleNavigate = useCallback(
    (direction: "up" | "down") => {
      setActiveIndex((prev) => {
        if (direction === "up") return prev > 0 ? prev - 1 : prev
        return prev < genres.length - 1 ? prev + 1 : prev
      })
    },
    [genres.length]
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
                  <p className="text-sm text-muted-foreground mt-3">
                    <LineReveal stagger={40}>
                      {genre.tagline}
                    </LineReveal>
                  </p>
                </div>
              ))}
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
                disabled={activeIndex === genres.length - 1}
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
            className="w-full max-w-3xl h-full mx-auto relative overflow-y-auto py-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {genres.map((genre, index) => (
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
            {/* Contenedor estricto con máscara para ocultar lo que sobra */}
            <div 
              className="relative flex items-center h-4 overflow-hidden w-[200px] mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] z-1" 
            >
              {/* La "Cinta" entera que contiene todos los puntos y se desplaza */}
              <div 
                className="absolute flex items-center gap-4 transform-gpu transition-transform duration-300 ease-in-out h-full transform translate-x-[calc(64px-28px*var(--i))]"
                style={{ ['--i' as any]: activeIndex }}
              >
                {/* Animación de pastilla flotante que SIEMPRE se queda fija en el centro absoluto relativo al activeIndex */}
                <div
                  className="absolute left-0 h-[2px] w-8 bg-primary
                  transform-gpu transition-transform 
                  duration-400 ease-in-out
                  translate-x-[calc(28px*var(--i))]"
                  style={{ ['--i' as any]: activeIndex }}
                />

                {/* Todos los Puntos (Líneas) - Renderizamos todos pero solo se ven ~5 por la máscara del padre */}
                {genres.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`
                      relative z-20 pointer-events-auto transition-all duration-300 ease-in-out shrink-0
                      bg-foreground/20 hover:bg-foreground/60
                      ${i === activeIndex 
                        ? "w-8 h-[2px]" 
                        : "w-3 h-px hover:scale-y-150"}
                    `}
                    aria-label={`Go to genre ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hidden sm:block">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Anamorphic Lens Flare (subtle) */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-px bg-linear-to-r from-transparent via-primary/10 to-transparent z-5 pointer-events-none animate-pulse-glow" /> 
    </div>
  )
}
