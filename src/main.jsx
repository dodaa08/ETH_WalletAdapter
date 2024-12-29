import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Connect from './Wagmi/Connect'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Connect />
  </StrictMode>,
)
