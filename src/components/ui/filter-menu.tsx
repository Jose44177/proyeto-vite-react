import { useState } from "react"
import { Menu, X, Calendar, Star, Clock, TrendingUp, SortAsc } from "lucide-react"

interface FilterOption {
	id: string
	label: string
	icon: React.ReactNode
	options: string[]
}

const filters: FilterOption[] = [
	{
		id: "year",
		label: "Año de estreno",
		icon: <Calendar className="size-4" />,
		options: ["2024", "2023", "2022", "2021", "2020", "2010-2019", "2000-2009", "Antes de 2000"],
	},
	{
		id: "rating",
		label: "Puntuación",
		icon: <Star className="size-4" />,
		options: ["9+ Excelente", "8+ Muy buena", "7+ Buena", "6+ Aceptable", "Cualquiera"],
	},
	{
		id: "duration",
		label: "Duración",
		icon: <Clock className="size-4" />,
		options: ["Menos de 90 min", "90-120 min", "120-150 min", "Más de 150 min"],
	},
	{
		id: "popularity",
		label: "Popularidad",
		icon: <TrendingUp className="size-4" />,
		options: ["Más populares", "En tendencia", "Clásicos", "Joyas ocultas"],
	},
	{
		id: "sort",
		label: "Ordenar por",
		icon: <SortAsc className="size-4" />,
		options: ["Fecha de estreno", "Puntuación", "Título A-Z", "Título Z-A", "Duración"],
	},
]

export function MovieFiltersMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const [expandedFilter, setExpandedFilter] = useState<string | null>(null)
	const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})

	const toggleFilter = (filterId: string) => {
		setExpandedFilter(expandedFilter === filterId ? null : filterId)
	}

	const selectOption = (filterId: string, option: string) => {
		setSelectedFilters((prev) => ({
			...prev,
			[filterId]: option,
		}))
	}

	const clearFilters = () => {
		setSelectedFilters({})
	}

	const activeFiltersCount = Object.keys(selectedFilters).length

	return (
		<div className="relative">
			{/* Botón Hamburguesa */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="relative flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-white transition-colors hover:bg-zinc-800"
			>
				{isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
				<span className="font-medium">Filtros</span>
				{activeFiltersCount > 0 && (
					<span className="flex size-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-black">
						{activeFiltersCount}
					</span>
				)}
			</button>

			{/* Panel desplegable */}
			<div
				className={`absolute left-0 top-full z-50 mt-2 w-72 origin-top-left transform overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl transition-all duration-200 ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
			>
				{/* Header del menú */}
				<div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
					<h3 className="font-semibold text-white">Filtrar películas</h3>
					{activeFiltersCount > 0 && (
						<button
							onClick={clearFilters}
							className="text-sm text-amber-500 transition-colors hover:text-amber-400"
						>
							Limpiar todo
						</button>
					)}
				</div>

				{/* Lista de filtros */}
				<div className="max-h-96 overflow-y-auto">
					{filters.map((filter) => (
						<div key={filter.id} className="border-b border-zinc-800/50 last:border-0">
							{/* Cabecera del filtro */}
							<button
								onClick={() => toggleFilter(filter.id)}
								className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-zinc-900"
							>
								<div className="flex items-center gap-3">
									<span className="text-zinc-400">{filter.icon}</span>
									<span className="text-sm font-medium text-white">{filter.label}</span>
								</div>
								<div className="flex items-center gap-2">
									{selectedFilters[filter.id] && (
										<span className="max-w-24 truncate rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">
											{selectedFilters[filter.id]}
										</span>
									)}
									<svg
										className={`size-4 text-zinc-500 transition-transform ${expandedFilter === filter.id ? "rotate-180" : ""}`}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</button>

							{/* Opciones del filtro */}
							<div
								className={`overflow-hidden transition-all duration-200 ${expandedFilter === filter.id ? "max-h-60" : "max-h-0"}`}
							>
								<div className="space-y-1 bg-zinc-900/50 px-4 py-2">
									{filter.options.map((option) => (
										<button
											key={option}
											onClick={() => selectOption(filter.id, option)}
											className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedFilters[filter.id] === option
												? "bg-amber-500/20 text-amber-400"
												: "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}
										>
											<span
												className={`flex size-4 items-center justify-center rounded-full border ${selectedFilters[filter.id] === option
													? "border-amber-500 bg-amber-500"
													: "border-zinc-600"}`}
											>
												{selectedFilters[filter.id] === option && (
													<svg className="size-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
														<path
															fillRule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clipRule="evenodd"
														/>
													</svg>
												)}
											</span>
											{option}
										</button>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Footer con botón aplicar */}
				<div className="border-t border-zinc-800 p-3">
					<button
						onClick={() => setIsOpen(false)}
						className="w-full rounded-lg bg-amber-500 py-2.5 font-semibold text-black transition-colors hover:bg-amber-400"
					>
						Aplicar filtros
					</button>
				</div>
			</div>

			{/* Overlay para cerrar */}
			{isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
		</div>
	)
}
