import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/use-auth'
import Home from './pages/Home'
import GenrePage from './pages/GenrePage'
import GenresPage from './pages/GenresPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path='/genres/:id' element={<GenrePage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
