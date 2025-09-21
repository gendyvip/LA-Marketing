import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { preloadCriticalImages } from './utils/performance'

// Preload critical resources
preloadCriticalImages();

// Use StrictMode for better development experience and performance warnings
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)
