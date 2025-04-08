import './App.css'
import { Routes, Route } from 'react-router-dom'
import OnePiecePage from './pages/init.page'
import StepPage from './pages/step.page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnePiecePage />} />
      <Route path="/step" element={<StepPage />} />
    </Routes>
  )
}

export default App
