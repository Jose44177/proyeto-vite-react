import type { Genre } from "@/types/genre"

interface GenrePaginationProps {
  genres: Genre[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function GenrePagination({ genres, activeIndex, onSelect }: GenrePaginationProps) {
  return (
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
                  onClick={() => onSelect(i)}
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
  )
}
