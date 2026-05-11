import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Papers from './pages/Papers'
import Questions from './pages/Questions'
import Trends from './pages/Trends'
import Difficulty from './pages/Difficulty'
import Flashcards from './pages/Flashcards'
import Reference from './pages/Reference'
import Predictions from './pages/Predictions'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/difficulty" element={<Difficulty />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/predictions" element={<Predictions />} />
      </Route>
    </Routes>
  )
}
