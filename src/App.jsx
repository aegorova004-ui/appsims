import { useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import AuthScreen from './components/auth/AuthScreen.jsx'
import AuthStatusBar from './components/auth/AuthStatusBar.jsx'
import useAuth from './hooks/useAuth.js'
import useLanguage from './hooks/useLanguage.js'
import { translations } from './data/translations.js'

function App() {
  const { user, loading, isPasswordRecovery } = useAuth()
  const { language } = useLanguage()
  const authLabels = translations[language].auth
  const [publicView, setPublicView] = useState('landing')

  if (loading) {
    return (
      <main className="auth-screen">
        <section className="auth-card auth-card--loading">
          <p className="auth-card__eyebrow">{authLabels.eyebrow}</p>
          <h1>{authLabels.loadingTitle}</h1>
          <p className="auth-card__copy">{authLabels.loadingDescription}</p>
        </section>
      </main>
    )
  }

  if (isPasswordRecovery) {
    return <AuthScreen onBackToLanding={() => setPublicView('landing')} />
  }

  if (!user) {
    if (publicView === 'signin' || publicView === 'signup') {
      return (
        <AuthScreen
          key={publicView}
          initialMode={publicView}
          onBackToLanding={() => setPublicView('landing')}
        />
      )
    }

    return (
      <LandingPage
        onSignIn={() => setPublicView('signin')}
        onSignUp={() => setPublicView('signup')}
      />
    )
  }

  return (
    <HomePage
      accountSlot={
        <AuthStatusBar onSignedOut={() => setPublicView('landing')} />
      }
    />
  )
}

export default App
