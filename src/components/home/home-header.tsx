import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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

export function HomeHeader() {
  const { user, isLoggedIn, login, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4 flex items-center justify-between ${isScrolled ? "bg-background/70 backdrop-blur-md shadow-xl py-3" : "bg-transparent"
        }`}
    >
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center">
          <h1 className="font-display text-3xl md:text-4xl tracking-[0.15em] text-primary">
            CINEVO
          </h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className="text-xs tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/genres"
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Genres
          </Link>
          <Link
            to="/trending"
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Trending
          </Link>
          {isLoggedIn && (
            <Link
              to="/mylist"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              My List
            </Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          <DropdownMenu>
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
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" /> Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={login}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Login
            </Button>
            <Button
              onClick={login}
              className="text-xs uppercase tracking-widest font-bold px-6 py-2 h-auto rounded-none"
            >
              Join Free
            </Button>
          </div>
        )}
      </div>

      {/* Subtle bottom line reflecting glow */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      )}
    </header>
  )
}
