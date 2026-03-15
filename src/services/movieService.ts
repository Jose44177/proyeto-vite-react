import type { MovieApiResponse } from "@/types/movie";
import type { MovieARWithPoster } from "@/types/movie";

const TRAKT_HEADERS = {
	"Content-Type": "application/json",
	"trakt-api-key": import.meta.env.VITE_TRAKT_CLIENT_ID,
	"trakt-api-version": "2",
};

const TMDB_HEADERS = {
	accept: "application/json",
	Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
};

const BASE_URL = 'https://api.trakt.tv/movies/popular?'

const getMoviesFromTrakt = async (genre: string, page = 1) => {
	const traktRes = await fetch(
		`${BASE_URL}genres=${genre}&page=${page}&limit=12&extended=full`,
		{ headers: TRAKT_HEADERS },
	);
	return await traktRes.json() as MovieApiResponse[];
}

const getPosterFromTMDB = async (tmdbId?: number): Promise<string | null> => {
  if (!tmdbId) return null;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}`,
      { headers: TMDB_HEADERS }
    );

    const data = await res.json();

    return data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : null;

  } catch {
    return null;
  }
};

const addPosters = async (movies: MovieApiResponse[]) => {
  return Promise.all(
    movies.map(async movie => ({
      ...movie,
      poster_url: await getPosterFromTMDB(movie.ids.tmdb)
    } as MovieARWithPoster))
  );
};


export const fetchMoviesWithPosters = async (genre: string, page = 1) => {
	// 1. Traemos las películas de Trakt
	const traktRes = await fetch(
		`https://api.trakt.tv/movies/popular?genres=${genre}&page=${page}&limit=12&extended=full`,
		{ headers: TRAKT_HEADERS },
	);
	const movies: MovieApiResponse[] = await getMoviesFromTrakt(genre, page)
	console.log('Películas de trakt del servicio: ', movies)

	// 2. Por cada película, buscamos su póster en TMDB
	const moviesWithPosters = await addPosters(movies)

	console.log("películas con posters: ", moviesWithPosters)

	return moviesWithPosters;
};

export const fetchMoviesWithPostersInfinite = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, genre] = queryKey; // Extraemos el género de la llave
  
  const movies = await getMoviesFromTrakt(genre, pageParam)

  // Obtenemos los posters en paralelo como antes
  const moviesWithPosters: MovieARWithPoster[] = await addPosters(movies);

  return {
    data: moviesWithPosters,
    nextPage: movies.length > 0 ? pageParam + 1 : undefined,
  };
};