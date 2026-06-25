import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import * as Sentry from '@sentry/react'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { initMonitoring } from './lib/analytics.js'
import ErrorFallback from './components/ErrorFallback/ErrorFallback.jsx'
import './styles/globals.css'

// Sentry (errors) + Microsoft Clarity (behaviour) — before the app renders.
initMonitoring()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Sentry.ErrorBoundary fallback={({ resetError }) => <ErrorFallback onReset={resetError} />}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <App />
              <Analytics />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)
