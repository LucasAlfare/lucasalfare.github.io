import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FLDesk from './pages/fldesk/FLDesk'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fldesk/*" element={<FLDesk />} />
    </Routes>
  )
}

export default App
