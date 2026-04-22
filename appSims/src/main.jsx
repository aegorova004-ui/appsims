import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import LanguageProvider from './contexts/LanguageProvider.jsx'
import './styles/reset.css'
import './styles/global.css'
import './styles/app.css'
import './styles/auth.css'
import './styles/landing.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
)
