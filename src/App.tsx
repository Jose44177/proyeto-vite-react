import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GenrePage from './pages/GenrePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/genre/:id" element={<GenrePage />} />
    </Routes>
  )
}

export default App
