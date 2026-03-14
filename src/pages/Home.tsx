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

  const isLoadingRef = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const [visibleExtraSections, setVisibleExtraSections] = useState(2)
  const observerTarget = useRef<HTMLDivElement>(null)

  // loadMore solo se recrea cuando cambia visibleExtraSections
  const loadMore = useCallback(() => {
    if (isLoadingRef.current || visibleExtraSections >= EXTRA_COLLECTIONS.length) return

    isLoadingRef.current = true
    setIsLoading(true)
    setTimeout(() => {
      setVisibleExtraSections((prev) => Math.min(prev + 2, EXTRA_COLLECTIONS.length))
      isLoadingRef.current = false
      setIsLoading(false)
    }, 800)
  }, [visibleExtraSections])

  // Ref que siempre apunta a la versión más fresca de loadMore
  const loadMoreRef = useRef(loadMore)
  useEffect(() => {
    loadMoreRef.current = loadMore
  }, [loadMore])

  useEffect(() => {
    if (!isLoggedIn) return // usuarios no logueados no necesitan observer

    const target = observerTarget.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreRef.current()
      },
      { threshold: 0, rootMargin: "200px" }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [isLoggedIn]) // ← re-ejecuta cuando el auth resuelve

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />

      <div className="relative flex flex-col gap-12 z-10 mx-6 md:mx-12">

        {isLoggedIn && (
          <>
            <MovieRow title="Continuar Viendo" movies={CONTINUE_WATCHING} />
            <MovieRow title="Mi Lista" movies={MY_LIST} />
          </>
        )}

        <TrendingSection />

        {!isLoggedIn && <CtaBanner />}

        <MovieRow title="Recién Añadidas" movies={NEW_RELEASES} />

        <GenrePreview />

        {/* ── NO LOGUEADO ─────────────────────────────────────────── */}
        {!isLoggedIn && (
          <>
            {/* Divisor + texto → el scroll termina aquí naturalmente */}
            <div className="relative py-12 px-6 md:px-12 pb-20">
              <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent w-full" />
              <p className="text-center font-display text-2xl tracking-[0.2em] text-muted-foreground mt-8 uppercase opacity-50">
                Únete a CINEVO para desbloquear todo el catálogo
              </p>
            </div>

            {/*
              Peek borroso: altura fija para que solo se "asome" al fondo.
              El gradiente inferior lo funde con el fondo, reforzando
              la sensación de contenido oculto.
            */}
            <div className="relative h-[160px] overflow-hidden -mt-8 pointer-events-none select-none">
              {/* Capa de desenfoque + oscurecimiento */}
              <div className="absolute inset-0 bg-linear-to-b from-background/10 via-background/70 to-background backdrop-blur-sm z-10" />
              {/* Gradiente extra que "funde" el peek con el fondo de la página */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent z-20" />
              <MovieRow title={EXTRA_COLLECTIONS[0].title} movies={EXTRA_COLLECTIONS[0].movies} />
            </div>
          </>
        )}

        {/* ── LOGUEADO ────────────────────────────────────────────── */}
        {isLoggedIn && (
          <>
            {EXTRA_COLLECTIONS.slice(0, visibleExtraSections).map((collection, idx) => (
              <MovieRow
                key={`${collection.title}-${idx}`}
                title={collection.title}
                movies={collection.movies}
              />
            ))}

            {/* Sentinel de IntersectionObserver */}
            <div
              ref={observerTarget}
              className="w-full flex justify-center py-10 pointer-events-none"
            >
              {isLoading && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">
                    Cargando más cine...
                  </span>
                </div>
              )}
            </div>

            {/* "Has llegado al final" — solo cuando todo está cargado */}
            {visibleExtraSections >= EXTRA_COLLECTIONS.length && !isLoading && (
              <div className="text-center py-12 px-6 pb-20">
                <div className="inline-flex items-center gap-4 text-muted-foreground/30">
                  <div className="w-12 h-px bg-current" />
                  <span className="font-display text-xl tracking-[0.3em] uppercase">
                    Has llegado al final por ahora
                  </span>
                  <div className="w-12 h-px bg-current" />
                </div>
              </div>
            )}
          </>
        )}

      </div>

      <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vh] bg-primary/3 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </main>
  )
}