import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesWithPosters } from '@/services/movieService';

// const fetchByGenre = async (
// 	type: "movies" | "shows",
// 	genre: string,
// 	page = 1,
// 	limit = 20,
// ) => {
// 	// Construimos la URL con los filtros
// 	// Ejemplo: https://api.trakt.tv/movies/popular?genres=drama&page=1&limit=20
// 	const url = `https://api.trakt.tv/${type}/popular?genres=${genre}&page=${page}&limit=${limit}`;

// 	const res = await fetch(url, {
// 		headers: {
// 			"Content-Type": "application/json",
// 			"trakt-api-key": import.meta.env.VITE_TRAKT_CLIENT_ID,
// 			"trakt-api-version": "2",
// 			// OPTIONAL: Si el usuario está logueado, se puede filtrar aquellas películas que ya ha visto
// 			...(localStorage.getItem("trakt_token") && {
// 				Authorization: `Bearer ${localStorage.getItem("trakt_token")}`,
// 			}),
// 		},
// 	});

// 	if (!res.ok) throw new Error("Error al traer datos de Trakt");

// 	// Trakt devuelve información de paginación en las cabeceras (headers)
// 	const totalPages = res.headers.get("X-Pagination-Page-Count");
// 	const data = await res.json();

// 	return { data, totalPages };
// };

// const searchMovies = async (query: string, genre?: string) => {
//   // Construimos los params
//   const params = new URLSearchParams({
//     query: query,
//     ...(genre && { genres: genre }), // Si hay género, lo añade
//   });

//   const res = await fetch(`https://api.trakt.tv/search/movie?${params}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'trakt-api-key': import.meta.env.VITE_TRAKT_CLIENT_ID,
//       'trakt-api-version': '2'
//     }
//   });

//   const data = await res.json();
//   // Data vendrá como: [{ score: 10, movie: { title: '...', ids: {...} } }, ...]
//   return data.map((item: any) => item.movie);
// };

export default function GenrePage() {
	const { id } = useParams();
	// const [items, setItems] = useState([]);
	const [genre, setGenre] = useState("drama");
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	const loadContent = async () => {
	// 		setLoading(true);
	// 		try {
	// 			const { data } = await fetchByGenre("movies", id || genre);
	// 			// const data = await searchMovies('', id);
	// 			setItems(data);
	// 		} catch (err) {
	// 			console.error(err);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	loadContent();
	// }, [genre]);

	const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['movies', id], // Clave de caché única por género
    queryFn: () => fetchMoviesWithPosters(id || "action"),
    staleTime: 1000 * 60 * 60, // Considera los datos "frescos" por 1 hora
  });

  if (isLoading) return <div className="text-white">Cargando catálogo...</div>;
  if (isError) return <div className="text-red-500">Error al cargar películas</div>;

	return (
		<div className='p-8'>
			<div className='flex justify-between items-center mb-8'>
				<h2 className='text-3xl font-bold capitalize'>Películas de {genre}</h2>

				{/* Selector de género simple */}
				<select
					onChange={(e) => setGenre(e.target.value)}
					className='bg-gray-800 text-white p-2 rounded-lg border border-gray-700'>
					<option value='drama'>Drama</option>
					<option value='action'>Acción</option>
					<option value='comedy'>Comedia</option>
					<option value='science-fiction'>Ciencia Ficción</option>
				</select>
			</div>

			{isLoading ? (
				<p>Cargando...</p>
			) : (
				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
					{movies?.map((item: any) => (
						<div key={item.ids.trakt} className='group cursor-pointer'>
							{/* Nota: Trakt NO da imágenes directamente, necesitas Fanart.tv o TMDB para los posters */}
							<div className='aspect-2/3 bg-gray-800 rounded-xl mb-2 flex items-center justify-center border border-gray-700 group-hover:border-red-500 transition-colors'>
								<span className='text-gray-500 text-center p-4'>
									{item.title}
								</span>
							</div>
							<p className='font-medium truncate'>{item.title}</p>
							<p className='text-sm text-gray-400'>{item.year}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
