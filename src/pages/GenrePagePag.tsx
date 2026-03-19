import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { MovieGallery } from "@/components/genreIndivdual/movie-gallery";
import { Header } from "@/components/header";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionTrigger } from "@/components/ui/accordion";

export function InfiniteMovieGrid() {
	const { id: genre } = useParams();

	useEffect(() => {
		if (!genre) window.location.href = "/genres";
	}, [genre]);

	return (
		<>
			<Header fixed={false} />
			<main className="flex flex-col items-center justify-start">
				<header className="w-[80%] flex justify-between items-center">
					<h2 className="w-[80%] font-display text-6xl tracking-wider text-foreground transform-gpu animate-fade-up">
						{genre!.slice(0, 1).toUpperCase() + genre!.slice(1)}
					</h2>
					<AccordionTrigger>

					</AccordionTrigger>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="outline">Ordenar por</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Mas populares</DropdownMenuItem>
							<DropdownMenuItem>Menos populares</DropdownMenuItem>
							<DropdownMenuItem>Mas recientes</DropdownMenuItem>
							<DropdownMenuItem>Menos recientes</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<MovieGallery genre={genre as string} />
			</main>
		</>
	);
}
