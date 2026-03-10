import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GenrePage from './pages/GenrePage'
import GenresPage from './pages/GenresPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/genres" element={<GenresPage />} />
      <Route path='/genres/:id' element={<GenrePage />} />
    </Routes>
  )
}

export default App
