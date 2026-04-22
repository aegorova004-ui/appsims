import useAuth from '../../hooks/useAuth.js'
import useLanguage from '../../hooks/useLanguage.js'
import { translations } from '../../data/translations.js'

function AuthStatusBar({ onSignedOut = null }) {
  const { user, signOut } = useAuth()
  const { language } = useLanguage()
  const authLabels = translations[language].auth

  async function handleSignOut() {
    await signOut()
    onSignedOut?.()
  }

  return (
    <div className="auth-status-bar">
      <p className="auth-status-bar__email">{user?.email}</p>
      <button
        className="secondary-button auth-status-bar__button"
        type="button"
        onClick={handleSignOut}
      >
        {authLabels.signOut}
      </button>
    </div>
  )
}

export default AuthStatusBar
