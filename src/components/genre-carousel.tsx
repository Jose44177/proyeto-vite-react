import { GenreCard } from "./genre-card"
import { GenreBackground } from "./genre-background"
import { GenreHeader } from "./genre-header"
import { GenreInfoPanel } from "./genre-info-panel"
import { useGenres } from "@/hooks/use-genres"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { GenreScrollbar } from "./genre-scrollbar"

export function GenreCarousel() {
  const { genres } = useGenres()
  const {
    activeIndex,
    stableActiveIndex,
    mountedIndices,
    handleNavigate,
    setActiveIndex,
    scrollContainerRef,
  } = useCarouselNavigation(genres.length)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Full-screen Background Image */}
      <GenreBackground
        genres={genres}
        activeIndex={activeIndex}
        mountedIndices={mountedIndices}
      />

      {/* Top Navigation Bar */}
      <GenreHeader />

      {/* Main Content Area */}
      <div className="relative z-10 flex h-[calc(100vh-88px)]">
        {/* Left Panel: Genre Info */}
        <GenreInfoPanel
          genres={genres}
          activeIndex={activeIndex}
          stableActiveIndex={stableActiveIndex}
          onNavigate={handleNavigate}
        />

        {/* Right Panel: Vertical Carousel */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-12">

          {/* Scrollbar flotante */}
          <div className="flex items-center">
            <GenreScrollbar
              genres={genres}
              activeIndex={activeIndex}
              orientation="vertical"
            />
          </div>

          {/* Contenedor de scroll interno */}
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

      <span className=" absolute bottom-10 right-20 z-50 text-[10px] tracking-[0.3em] uppercase text-muted-foreground hidden sm:block">
        Scroll to explore
      </span>
    </div>
  )
}
