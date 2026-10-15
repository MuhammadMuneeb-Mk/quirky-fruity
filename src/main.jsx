import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CartProvider } from './context/CartProvider'
import theme from './theme'
import App from './App.jsx'
import './index.css'

// needed for GitHub Pages, the site is served from /repo-name/
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
