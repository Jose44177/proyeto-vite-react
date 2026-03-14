import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/use-auth'
import Home from './pages/Home'
import GenrePage from './pages/GenrePage'
import GenresPage from './pages/GenresPage'
import { CallbackPage } from './pages/CallbackPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path='/genres/:id' element={<GenrePage />} />
        <Route path='/callback' element={<CallbackPage />} />
      </Routes>
    </AuthProvider>
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