import { useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function GenreHeader() {
  const [isMuted, setIsMuted] = useState(true)

  return (
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
  )
}
