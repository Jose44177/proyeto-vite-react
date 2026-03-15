import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { fetchMoviesWithPostersInfinite } from "@/services/movieService";
import { MovieCard } from "@/components/home/movie-card";

export function InfiniteMovieGrid() {
	const { id: genre } = useParams();
	const { ref, inView } = useInView({ rootMargin: '200px' }); // El "sensor" del final de página
	const galleryRef = useRef<HTMLDivElement>(null);
	const [columnCount, setColumnCount] = useState(1);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["movies", genre],
			queryFn: fetchMoviesWithPostersInfinite,
			getNextPageParam: (lastPage) => lastPage.nextPage,
			initialPageParam: 1,
		});

	useEffect(() => {
		if (!genre) window.location.href = "/genres";
	}, [genre]);

	// Cuando el sensor entra en vista, pedimos más películas
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	const movies = useMemo(() => {
		if (!data) return [];

		return data.pages
			.flatMap((page) => page.data)
			.filter((movie) => movie.genres.slice(0, 2).includes(genre as string));
	}, [data, genre]);

	useEffect(() => {
		const gallery = galleryRef.current;
		if (!gallery) return;

		const measureColumns = () => {
			const items = Array.from(
				gallery.querySelectorAll<HTMLElement>("[data-gallery-item='true']")
			);

			if (items.length === 0) {
				setColumnCount(1);
				return;
			}

			const firstRowTop = items[0].offsetTop;
			const firstWrappedIndex = items.findIndex((item) => item.offsetTop !== firstRowTop);

			setColumnCount(firstWrappedIndex === -1 ? items.length : firstWrappedIndex);
		};

		const frameId = requestAnimationFrame(measureColumns);
		const resizeObserver = new ResizeObserver(measureColumns);
		resizeObserver.observe(gallery);

		return () => {
			cancelAnimationFrame(frameId);
			resizeObserver.disconnect();
		};
	}, [movies.length]);

	const shouldTranslateCard = (index: number) => {
		if (columnCount <= 2) return false;

		if (columnCount % 2 === 0) {
			return index % 2 !== 0;
		}

		const rowNumber = Math.floor(index / columnCount) + 1;
		const columnNumber = (index % columnCount) + 1;

		return columnNumber % 2 !== 0;
	};

	if (isLoading) return <p>Cargando...</p>;

	return (
		<div className='flex flex-col gap-8 md:mx-6 lg:mx-12 overflow-x-hidden'>
			<div ref={galleryRef} className='flex flex-wrap justify-center-safe gap-6'>
				{movies.map((movie, idx) => (
					<div
						key={movie.ids.trakt}
						data-gallery-item='true'
						className={shouldTranslateCard(idx) ? "translate-y-1/3" : ""}
					>
						<MovieCard key={movie.ids.trakt} movie={movie} index={idx / 2} />
					</div>
				))}
			</div>

			{/* Este div es el "sensor". Cuando aparece en pantalla, se dispara la carga */}
			<div ref={ref} className='h-10 flex justify-center items-center'>
				{isFetchingNextPage ? (
					<div className='flex flex-col items-center gap-4'>
						<div className='w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin' />
						<span className='text-xs tracking-widest text-muted-foreground uppercase'>
							Cargando más cine...
						</span>
					</div>
				) : hasNextPage ? (
					<span className='text-zinc-500 text-xs'>Desliza para cargar más</span>
				) : (
					<span className='text-zinc-600'>Has llegado al final</span>
				)}
			</div>
		</div>
	);
}
