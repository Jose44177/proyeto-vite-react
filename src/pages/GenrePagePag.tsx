import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { fetchMoviesWithPostersInfinite } from "@/services/movieService";
import { MovieCard } from "@/components/home/movie-card";

export function InfiniteMovieGrid() {
	const { id: genre } = useParams();
	const { ref, inView } = useInView(); // El "sensor" del final de página

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["movies", genre],
			queryFn: fetchMoviesWithPostersInfinite,
			getNextPageParam: (lastPage) => lastPage.nextPage, // Indica cuál es la siguiente página
			initialPageParam: 1,
		});

	// Cuando el sensor entra en vista, pedimos más películas
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	if (isLoading) return <p>Cargando...</p>;

	return (
		<div className='flex flex-col gap-8'>
			<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
				{/* 'data.pages' es un array de páginas, hay que aplanarlo */}
				{data?.pages
					.flatMap((page) => page.data).filter((movie) => movie.genres[0] == genre)
					.map((movie) => (
							<MovieCard key={movie.ids.trakt} movie={movie} />
					))}
			</div>

			{/* Este div es el "sensor". Cuando aparece en pantalla, se dispara la carga */}
			<div ref={ref} className='h-10 flex justify-center items-center'>
				{isFetchingNextPage ? (
					<span className='text-red-500 animate-pulse'>Cargando más...</span>
				) : hasNextPage ? (
					<span className='text-zinc-500 text-xs'>Desliza para cargar más</span>
				) : (
					<span className='text-zinc-600'>Has llegado al final</span>
				)}
			</div>
		</div>
	);
}
