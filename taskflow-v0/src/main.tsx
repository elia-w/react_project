import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Card } from './components/Card.tsx'
// import { MAX_TITLE } from './type.ts'
import type { Status } from './type.ts'
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
