import { useState, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { fetchMoviesWithPostersInfinite } from "@/services/movieService";
import { MovieCard } from "@/components/home/movie-card";

interface MovieGalleryProps {
	genre: string
}

export function MovieGallery({ genre }: MovieGalleryProps) {
	const { ref, inView } = useInView(); // El "sensor" del final de página
	const galleryRef = useRef<HTMLDivElement>(null);
	const [columnCount, setColumnCount] = useState(1);
	const [showTopMask, setShowTopMask] = useState(false);
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["movies", genre],
			queryFn: fetchMoviesWithPostersInfinite,
			getNextPageParam: (lastPage) => lastPage.nextPage,
			initialPageParam: 1,
		});

	const movies = useMemo(() => {
		if (!data) return [];

		return data.pages
			.flatMap((page) => page.data)
			.filter((movie) => movie.genres.slice(0, 2).includes(genre as string));
	}, [data, genre]);

	const phantomCount = useMemo(() => {
		return columnCount > 0 && movies.length % columnCount !== 0
			? columnCount - (movies.length % columnCount)
			: 0
	}, [movies.length, columnCount])

	const handleVerticalScroll = () => {
		if (galleryRef.current) {
			const { scrollTop } = galleryRef.current
			setShowTopMask(scrollTop > 10)
		}
	}

	const shouldTranslateCard = (index: number) => {
		const columnNumber = (index % columnCount) + 1;

		return columnNumber % 2 !== 0;
	};

	useEffect(() => {
		handleVerticalScroll()
		window.addEventListener("resize", handleVerticalScroll)
		return () => window.removeEventListener("resize", handleVerticalScroll)
	}, [])

	// Cuando el sensor entra en vista, pedimos más películas
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	useEffect(() => {
		// Obtiene la referencia al contenedor principal de la galería
		const gallery = galleryRef.current;
		if (!gallery) return; // Si no existe, no hace nada

		let raf = 0; // ID de requestAnimationFrame

		// Función para agendar la medición de forma optimizada (debonucing visual)
		// Evita que la medición se ejecute múltiples veces en el mismo frame de pintura del navegador
		const schedule = () => {
			if (raf) cancelAnimationFrame(raf);
			raf = requestAnimationFrame(measureColumns);
		};

		// Calcula cuántos elementos caben en la primera fila
		function measureColumns() {
			// Elementos que conforman la galería
			const items = Array.from(
				gallery!.querySelectorAll<HTMLElement>("[data-gallery-item='true']"),
			);

			// Sin elementos, por defecto 1 columna
			if (items.length === 0) {
				setColumnCount(1);
				return;
			}

			// Posición vertical del primer elemento
			const firstRowTop = items[0].offsetTop;

			// Busca el índice del primer elemento que NO comparta esa misma posición vertical.
			const firstWrappedIndex = items.findIndex(
				(item) => item.offsetTop !== firstRowTop,
			);

			// Si 'firstWrappedIndex' es -1, ningún elemento se ha envuelto
			// El índice del primer elemento de la segunda fila == número de columnas
			setColumnCount(
				firstWrappedIndex === -1 ? items.length : firstWrappedIndex,
			);
		}

		// Ejecuta la medición una vez al montar o al cambiar la cantidad de películas
		schedule();

		// Observa el contenedor para recalcular si el usuario redimensiona la galería
		const resizeObserver = new ResizeObserver(schedule);
		resizeObserver.observe(gallery);

		// Cleanup al desmontar o volver a ejecutar
		return () => {
			if (raf) cancelAnimationFrame(raf);
			resizeObserver.disconnect();
		};
	}, [movies.length]);

	if (isLoading) return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
		</div>
	)

	return (
		<div className='flex flex-col items-center gap-8 md:mx-6 lg:mx-12'>
			<div className="relative flex flex-col w-full h-[calc(100vh-20vh)]">

				{/* Máscara superior */}
				<div className={`absolute top-0 inset-x-0 h-20 bg-linear-to-b from-background to-transparent z-10 pointer-events-none transition-opacity duration-500 ease-out transform-gpu ${showTopMask ? 'opacity-100' : 'opacity-0'}`} />

				{/* Máscara inferior */}
				<div className={`absolute bottom-0 inset-x-0 h-30 bg-linear-to-t from-background to-transparent z-10 pointer-events-none transition-opacity duration-500 ease-out transform-gpu ${hasNextPage ? 'opacity-100' : 'opacity-0'}`} />

				<div
					ref={galleryRef}
					onScroll={handleVerticalScroll}
					className='flex flex-wrap justify-center gap-6 overflow-y-auto scrollbar-hide'
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}
				>
					{movies.map((movie, idx) => (
						<div
							key={movie.ids.trakt}
							data-gallery-item='true'
							className={shouldTranslateCard(idx) ? "translate-y-2/12" : ""}
						>
							<MovieCard key={movie.ids.trakt} movie={movie} index={idx} />
						</div>
					))}
					{/* Elemento fantasma para mandar a la izquierda los últimos moviecards */}
					{Array.from({ length: phantomCount }).map((_, i) => (
						<div
							key={`phantom-${i}`}
							className="w-40 sm:w-50 md:w-60 aspect-2/3 shrink-0 invisible animate-fade-up delay-1000"
						/>
					))}
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
			</div>
		</div>
	)
}