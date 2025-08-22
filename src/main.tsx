import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Workspace from './Pages/Workspace/Workspace.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App />} />
      <Route path="workspace" element={<Workspace />} />
    </Routes>
  </BrowserRouter>
)
