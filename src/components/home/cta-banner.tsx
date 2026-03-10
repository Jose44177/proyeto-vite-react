import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { Sparkles, ArrowRight } from "lucide-react"

export function CtaBanner() {
  const { login } = useAuth()

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="relative overflow-hidden rounded-none border border-primary/20 bg-linear-to-br from-primary/10 via-background to-background p-8 md:p-12 lg:p-16 flex flex-col items-center text-center space-y-6">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-primary">Prueba CINEVO Premium</span>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>

        <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground max-w-4xl">
          Únete ahora para guardar tus películas y continuar donde lo dejaste
        </h2>

        <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
          Crea tu cuenta gratuita hoy mismo y empieza a construir tu propia biblioteca cinematográfica.
          Acceso instantáneo desde cualquier dispositivo.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Button
            onClick={login}
            size="lg"
            className="rounded-none font-display text-xl tracking-widest px-10 h-14 bg-primary hover:scale-105 transition-transform"
          >
            Empezar Gratis
          </Button>
          <Button
            variant="ghost"
            className="group text-muted-foreground hover:text-foreground h-14 px-8 text-xs tracking-widest uppercase font-bold"
          >
            Más Información
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Bottom subtle glow */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      </div>
    </section>
  )
}
