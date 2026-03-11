import type { Genre } from "@/types/genre"

interface GenreScrollbarProps {
  genres: Genre[]
  activeIndex: number
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function GenreScrollbar({
  genres,
  activeIndex,
  orientation = "horizontal",
  className,
}: GenreScrollbarProps) {
  const isVertical = orientation === "vertical"

  return (
    <div className={`pointer-events-none ${className}`}>
      {/* Contenedor con máscara para recortar los extremos */}
      <div
        className={`
          relative overflow-hidden z-1
          transform-gpu will-change-transform
          ${isVertical
            ? "w-4 h-[250px] mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
            : "h-4 w-[250px] mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]"
          }
        `}
      >
        {/* La "Cinta" que se desplaza con todos los puntos */}
        <div
          className={`
            absolute flex transform-gpu transition-transform duration-400 ease-in-out
            ${isVertical
              ? "flex-col items-center w-full gap-4 translate-y-[calc(100px-28px*var(--i))]"
              : "flex-row items-center h-full gap-4 translate-x-[calc(100px-28px*var(--i))]"
            }
          `}
          style={{ ["--i" as any]: activeIndex }}
        >
          {/* Pastilla activa flotante — siempre centrada sobre el índice activo */}
          <div
            className={`
              absolute bg-primary transform-gpu transition-transform duration-500 ease-in-out
              ${isVertical
                ? "left-1/2 -translate-x-1/2 top-0 w-0.5 h-8 translate-y-[calc(28px*var(--i))]"
                : "top-1/2 -translate-y-1/2 left-0 h-0.5 w-8 translate-x-[calc(28px*var(--i))]"
              }
            `}
            style={{ ["--i" as any]: activeIndex }}
          />

          {/* Puntos — solo ~5 son visibles gracias a la máscara del padre */}
          {genres.map((_, i) => (
            <div
              key={i}
              className={`
                relative z-20 shrink-0 pointer-events-none
                transition-[width,height] duration-300 ease-in-out
                bg-foreground/20 transform-gpu
                ${i === activeIndex
                  ? isVertical ? "h-8 w-0.5" : "w-8 h-0.5"
                  : isVertical ? "h-3 w-px" : "w-3 h-px"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
