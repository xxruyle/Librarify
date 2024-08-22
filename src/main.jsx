import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Context from "./components/Context.jsx"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context/>
  </StrictMode>,
)
