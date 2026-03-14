import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface User {
  name: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: () => void
  logout: () => void
  handleLoginSuccess: (token: string) => Promise<void> // Para usar desde /callback
}

const AuthContext = createContext<AuthContextType | null>(null)

const TRAKT_CLIENT_ID = import.meta.env.VITE_TRAKT_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_TRAKT_REDIRECT_URI;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Función reutilizable para traer los datos del usuario real
  const fetchUserData = useCallback(async (token: string) => {
    try {
      const response = await fetch('https://api.trakt.tv/users/settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'trakt-api-key': TRAKT_CLIENT_ID,
          'trakt-api-version': '2',
          'Authorization': `Bearer ${token}`
        },
      })

      if (!response.ok) throw new Error('Token inválido o expirado')

      const data = await response.json()
      
      setUser({
        name: data.user.username,
        avatar: data.user.images?.avatar.full || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
      })
    } catch (error) {
      console.error('Error al recuperar el usuario:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 1. Al cargar la app por primera vez
  useEffect(() => {
    const token = localStorage.getItem('trakt_token')
    if (token) {
      fetchUserData(token)
    } else {
      setIsLoading(false)
    }
  }, [fetchUserData])

  // 2. Función que llamarás desde tu página de /callback
  const handleLoginSuccess = async (token: string) => {
    localStorage.setItem('trakt_token', token)
    await fetchUserData(token) // Esto actualizará el estado 'user'
  }

  const login = useCallback(() => {
    sessionStorage.setItem('return_to', window.location.pathname)
    const authUrl = `https://trakt.tv/oauth/authorize?response_type=code&client_id=${TRAKT_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
    window.location.assign(authUrl)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('trakt_token')
    setUser(null)
    // Opcional: window.location.href = '/' para mandarlo a home
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      isLoading, 
      login, 
      logout, 
      handleLoginSuccess 
    }}>
      {/* No renderiza la app hasta saber si el usuario es válido */}
      {!isLoading ? children : (
        <div className="flex h-screen items-center justify-center">
           <p>Cargando sesión...</p>
        </div>
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}