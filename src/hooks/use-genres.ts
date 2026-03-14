import { useEffect, useState } from "react"
import type { Genre } from "@/types/genre"
import { DEFAULT_GENRES, GENRE_ENRICHMENT } from "@/data/genres"

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>(DEFAULT_GENRES)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Simulamos una llamada real que fallará
        const res = await fetch('https://api.trakt.tv/movies/genres', {
          headers: { 
            'Content-Type': 'application/json', 
            'User-Agent':'peter/1.0.0',
            // 'trakt-api-key': import.meta.env.VITE_trackt_client_id,
            'trakt-api-version': '2' 
          }
        });
        if (!res.ok) throw new Error("API call failed");
      } catch (error) {
        // Fallback al JSON proporcionado por la API
        try {
          const fallbackRes = await fetch('/trakt-responses/get-movies-genres.json');
          if (!fallbackRes.ok) throw new Error("Fallback file missing");
          const fallbackData = await fallbackRes.json();

          const enrichedGenres: Genre[] = fallbackData.map((g: any) => {
            const enrichment = GENRE_ENRICHMENT[g.slug] || {
              tagline: "Discover amazing movies and shows in this fascinating cinematic genre.",
              image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
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
        } catch (fallbackError) {
          console.error("No se pudo cargar la info de géneros:", fallbackError);
        }
      }
    };
    fetchGenres();
  }, [])

  return { genres }
}
