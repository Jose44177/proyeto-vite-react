import { useState, useEffect, useRef, useCallback } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/home/hero-section"
import { MovieRow } from "@/components/home/movie-row"
import { TrendingSection } from "@/components/home/trending-section"
import { GenrePreview } from "@/components/home/genre-preview"
import { CtaBanner } from "@/components/home/cta-banner"
import { useAuth } from "@/hooks/use-auth"
import {
  NEW_RELEASES,
  CONTINUE_WATCHING,
  MY_LIST,
  EXTRA_COLLECTIONS
} from "@/data/movies"

export default function Home() {
  const { isLoggedIn } = useAuth()

  // States for infinite scroll
  const [visibleExtraSections, setVisibleExtraSections] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    if (visibleExtraSections < EXTRA_COLLECTIONS.length) {
      setIsLoading(true)
      // Simulate network delay for the feel
      setTimeout(() => {
        setVisibleExtraSections((prev) => Math.min(prev + 2, EXTRA_COLLECTIONS.length))
        setIsLoading(false)
      }, 800)
    }
  }, [visibleExtraSections])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loadMore, isLoading])

  return (
    <main className="bg-background text-foreground min-h-screen pb-20 overflow-x-hidden">
      <Header />

      {/* Hero Spotlight */}
      <HeroSection />

      {/* Main Content Area */}
      <div className="relative flex flex-col gap-12 z-10 mx-6 md:mx-12">

        {/* Conditional Rows for Authenticated Users */}
        {isLoggedIn && (
          <>
            <MovieRow title="Continuar Viendo" movies={CONTINUE_WATCHING} />
            <MovieRow title="Mi Lista" movies={MY_LIST} />
          </>
        )}

        {/* Global Sections */}
        <TrendingSection />

        {!isLoggedIn && <CtaBanner />}

        <MovieRow title="Recién Añadidas" movies={NEW_RELEASES} />

        <GenrePreview />

        {!isLoggedIn && (
          <div className="relative py-12 px-6 md:px-12">
            <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent w-full" />
            <p className="text-center font-display text-2xl tracking-[0.2em] text-muted-foreground mt-8 uppercase opacity-50">
              Únete a CINEVO para desbloquear todo el catálogo
            </p>
          </div>
        )}

        {/* Infinite Scroll Sections */}
        {EXTRA_COLLECTIONS.slice(0, visibleExtraSections).map((collection, idx) => (
          <MovieRow
            key={`${collection.title}-${idx}`}
            title={collection.title}
            movies={collection.movies}
          />
        ))}

        {/* Loading Indicator / Sentinel */}
        <div ref={observerTarget} className="w-full flex justify-center py-10 opacity-0 pointer-events-none fade-in">
          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-xs tracking-widest text-muted-foreground uppercase">Cargando más cine...</span>
            </div>
          )}
        </div>

        {/* Bottom indicator for fully loaded state */}
        {visibleExtraSections >= EXTRA_COLLECTIONS.length && (
          <div className="text-center py-12 px-6">
            <div className="inline-flex items-center gap-4 text-muted-foreground/30">
              <div className="w-12 h-px bg-current" />
              <span className="font-display text-xl tracking-[0.3em] uppercase">Has llegado al final por ahora</span>
              <div className="w-12 h-px bg-current" />
            </div>
          </div>
        )}
      </div>

      {/* Global Background Bloom Effects (Subtle) */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vh] bg-primary/3 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </main>
  )
}
