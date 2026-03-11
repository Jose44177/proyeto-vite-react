import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Search, Bell, User, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsScrollable } from "@/hooks/useIsScrollable"

interface HeaderProps {
  fixed?: boolean
}

const FixedHeader = ['Genres', 'Trending', 'New']

export function Header({ fixed = true }: HeaderProps) {
  const { user, isLoggedIn, login, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const isScrollable = useIsScrollable()

  const shouldShow = isScrollable ? isScrolled : true

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(!fixed && window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`${fixed ? 'fixed top-0' : 'relative'} w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-12 py-4 flex items-center justify-between ${isScrolled ? "bg-background/50 backdrop-blur-md shadow-xl py-3" : "bg-transparent"
        }`}
    >
      <div className="flex items-center gap-8">
        <NavLink
          to="/" end
          className={({ isActive }) => `font-display text-3xl md:text-4xl tracking-[0.15em] ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
          CINEVO
        </NavLink>
        <nav className="hidden lg:flex items-center gap-6 *:text-xs *:tracking-[0.2em] *:uppercase *:transition-colors">
          {
            FixedHeader.map((v, i) => (
              <NavLink
                key={`${v}${i}`}
                to={`/${v}`}
                className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}
              >
                {v}
              </NavLink>
            ))
          }
          {isLoggedIn && (
            <NavLink
              to="/mylist"
              className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}
            >
              My list
            </NavLink>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <Search className="w-5 h-5" />
        </button>
        {isLoggedIn && (
          <button className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
          </button>
        )}

        {isLoggedIn ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <Avatar className="w-8 h-8 cursor-pointer border-2 border-transparent hover:border-primary transition-all">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                    {user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              <DropdownMenuLabel className="font-display text-lg tracking-wider">
                {user?.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:text-black">
                <User className="mr-2 h-4 w-4" /> Account
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:text-black">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive hover:bg-destructive hover:text-white">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-5">
            <Button
              variant="secondary"
              onClick={login}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Login
            </Button>
            <Button
              onClick={login}
              className="text-xs uppercase tracking-widest"
            >
              Join Free
            </Button>
          </div>
        )}
      </div>

      {/* Subtle bottom line reflecting glow */}
      {
        shouldShow && (
          <div
            className={`
            ${isScrolled ? 'opacity-100' : 'opacity-0'} 
            absolute bottom-0 left-0 w-full h-px 
            bg-linear-to-r from-primary/5 via-primary/90 to-primary/5 
            pointer-events-none animate-pulse-glow transform-gpu`
            }
            style={{
              transitionDuration: '300ms'
            }}
          />
        )
      }
    </header >
  )
}
