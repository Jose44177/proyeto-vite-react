import { GenreCard } from "./genre-card"
import { GenreBackground } from "./genre-background"
import { GenreHeader } from "./genre-header"
import { GenreInfoPanel } from "./genre-info-panel"
import { GenrePagination } from "./genre-pagination"
import { useGenres } from "@/hooks/use-genres"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"

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
      <GenrePagination
        genres={genres}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      {/* Anamorphic Lens Flare (subtle) */}
      <div className="absolute top-[87px] w-full h-px bg-linear-to-r from-primary/5 via-primary/90 to-primary/5 z-50 pointer-events-none animate-pulse-glow transform-gpu" />
    </div>
  )
}
