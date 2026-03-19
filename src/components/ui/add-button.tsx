import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "./button";

interface AddButonProps {
	text?: string[]
	className?: string
}

export default function AddButton({ text = [], className }: AddButonProps) {
	const [checked, setChecked] = useState(false);
	const withText = text.length > 0;

	return (
		<>
			{
				withText ?
					<Button
						variant="outline"
						onClick={() => setChecked(!checked)}
						className="h-12 px-8 font-display text-xl tracking-widest hover:bg-foreground/5 backdrop-blur-sm"
					>
						<div className="relative self-center h-5 w-5 mt-1.5 mr-2 -ml-2">
							<span
								className={`absolute transition-all duration-300 ease-in-out ${checked ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"}`}
							>
								<Check className="w-4 h-4 md:w-5 md:h-5" />
							</span>
							<span
								className={`absolute transition-all duration-300 ease-in-out ${checked ? "opacity-0 scale-50 rotate-45" : "opacity-100 scale-100 rotate-0"}`}
							>
								<Plus className="w-4 h-4 md:w-5 md:h-5" />
							</span>
						</div>
						{checked ? "In List" : "My List"}
					</Button> : <button
						onClick={() => setChecked(!checked)}
						className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary/80 text-foreground border border-foreground/10 flex items-center justify-center hover:scale-110 transition-all duration-300 ease-in-out hover:bg-secondary ${checked ? "rotate-0" : "hover:rotate-90"}`}
					>
						<span
							className={`absolute transition-all duration-300 ease-in-out ${checked ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"}`}
						>
							<Check className="w-4 h-4 md:w-5 md:h-5" />
						</span>
						<span
							className={`absolute transition-all duration-300 ease-in-out ${checked ? "opacity-0 scale-50 rotate-45" : "opacity-100 scale-100 rotate-0"}`}
						>
							<Plus className="w-4 h-4 md:w-5 md:h-5" />
						</span>
					</button>
			}
		</>
	);
}