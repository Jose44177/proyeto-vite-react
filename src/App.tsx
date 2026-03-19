import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from './hooks/use-auth'

import Home from './pages/Home'
import { InfiniteMovieGrid } from './pages/GenrePagePag'
import GenresPage from './pages/GenresPage'
import { CallbackPage } from './pages/CallbackPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path='/genres/:id' element={<InfiniteMovieGrid />} />
          <Route path='/callback' element={<CallbackPage />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App


// IMPLEMENTACIÓN DEL THEME PROVIDER
// import { ThemeProvider } from "@/components/theme-provider"

// function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       {children}
//     </ThemeProvider>
//   )
// }

// export default App