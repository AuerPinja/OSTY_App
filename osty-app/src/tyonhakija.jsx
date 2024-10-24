import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './header.jsx'
import tyonhakijaApp from './tyonhakija-app.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <tyonhakija-app/>
  </StrictMode>,
)