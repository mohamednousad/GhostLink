import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatRoom from './components/ChatRoom'
import Auth from './components/Auth'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  )
}