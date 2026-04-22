import { useMemo, useState } from 'react'
import useAuth from '../../hooks/useAuth.js'
import useLanguage from '../../hooks/useLanguage.js'
import { translations } from '../../data/translations.js'
import LanguageSwitch from '../LanguageSwitch.jsx'

function AuthScreen({ initialMode = 'signin', onBackToLanding = null }) {
  const {
    signIn,
    signUp,
    resetPassword,
    updatePassword,
    signOut,
    loading,
    authError,
    clearAuthError,
    setAuthError,
    isConfigured,
    isPasswordRecovery,
    setIsPasswordRecovery,
  } = useAuth()
  const { language, toggleLanguage } = useLanguage()
  const authLabels = translations[language].auth
  const [mode, setMode] = useState(initialMode)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const activeMode = isPasswordRecovery ? 'reset-update' : mode
  const showResetBackButton =
    activeMode === 'reset-request' || activeMode === 'reset-update'
  const canReturnToLanding =
    typeof onBackToLanding === 'function' &&
    (activeMode === 'signin' || activeMode === 'signup')

  const screenCopy = useMemo(() => {
    if (activeMode === 'signup') {
      return {
        title: authLabels.signUp,
        description: authLabels.signUpDescription,
        submit: authLabels.createAccount,
      }
    }

    if (activeMode === 'reset-request') {
      return {
        title: authLabels.resetPasswordTitle,
        description: authLabels.resetPasswordDescription,
        submit: authLabels.sendResetLink,
      }
    }

    if (activeMode === 'reset-update') {
      return {
        title: authLabels.resetPasswordTitle,
        description: authLabels.updatePasswordDescription,
        submit: authLabels.saveNewPassword,
      }
    }

    return {
      title: authLabels.signIn,
      description: authLabels.signInDescription,
      submit: authLabels.signIn,
    }
  }, [activeMode, authLabels])

  function getLocalizedAuthError(errorMessage) {
    if (!errorMessage) {
      return ''
    }

    const normalizedError = errorMessage.toLowerCase()

    if (
      errorMessage === 'Supabase is not configured.' ||
      errorMessage.includes('VITE_SUPABASE_')
    ) {
      return authLabels.errors.missingConfig
    }

    if (
      normalizedError.includes('rate limit') ||
      normalizedError.includes('email rate limit exceeded')
    ) {
      return authLabels.errors.emailRateLimit
    }

    if (
      normalizedError.includes('invalid login credentials') ||
      normalizedError.includes('invalid credentials')
    ) {
      return authLabels.errors.invalidCredentials
    }

    if (normalizedError.includes('email not confirmed')) {
      return authLabels.errors.emailNotConfirmed
    }

    if (
      normalizedError.includes('user already registered') ||
      normalizedError.includes('already registered')
    ) {
      return authLabels.errors.userAlreadyExists
    }

    if (
      activeMode === 'reset-request' &&
      (normalizedError.includes('failed to send') ||
        normalizedError.includes('error sending') ||
        normalizedError.includes('email') ||
        normalizedError.includes('smtp'))
    ) {
      return authLabels.errors.resetEmailFailed
    }

    if (activeMode === 'reset-update') {
      return authLabels.errors.passwordUpdateFailed
    }

    return authLabels.errors.default
  }

  function handleChange(event) {
    const field = event.target.dataset.field ?? event.target.name
    const { value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))
  }

  function handleModeChange(nextMode) {
    clearAuthError()
    setMessage('')
    setMode(nextMode)
  }

  function handleBackToLandingClick() {
    clearAuthError()
    setMessage('')
    setMode('signin')
    onBackToLanding?.()
  }

  async function handleBackToSignIn() {
    clearAuthError()
    setMessage('')

    if (isPasswordRecovery) {
      await signOut()
      setIsPasswordRecovery(false)
    }

    setMode('signin')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    clearAuthError()
    setMessage('')
    setSubmitting(true)

    let result

    if (activeMode === 'signup') {
      result = await signUp(formData)
    } else if (activeMode === 'reset-request') {
      result = await resetPassword({ email: formData.email })
    } else if (activeMode === 'reset-update') {
      result = await updatePassword({ password: formData.password })
    } else {
      result = await signIn(formData)
    }

    if (result.error) {
      setAuthError(result.error.message)
      setSubmitting(false)
      return
    }

    if (activeMode === 'signup') {
      setMessage(authLabels.messages.signupSuccess)
    }

    if (activeMode === 'reset-request') {
      setMessage(authLabels.messages.resetEmailSent)
    }

    if (activeMode === 'reset-update') {
      await signOut()
      clearAuthError()
      setIsPasswordRecovery(false)
      setMode('signin')
      setMessage(authLabels.messages.passwordUpdated)
      setFormData((currentData) => ({
        ...currentData,
        password: '',
      }))
    }

    setSubmitting(false)
  }

  const isBusy = loading || submitting
  const showEmailField = activeMode !== 'reset-update'
  const showPasswordField = activeMode !== 'reset-request'
  const showTabs = activeMode === 'signin' || activeMode === 'signup'

  return (
    <main className="auth-screen">
      <section className="auth-card">
        <div className="auth-card__topbar">
          {showResetBackButton || canReturnToLanding ? (
            <button
              className="auth-back-button"
              type="button"
              onClick={
                showResetBackButton
                  ? handleBackToSignIn
                  : handleBackToLandingClick
              }
              aria-label={
                showResetBackButton
                  ? authLabels.backToSignInAria
                  : authLabels.backToLandingAria
              }
              title={
                showResetBackButton
                  ? authLabels.backToSignIn
                  : authLabels.backToLanding
              }
            >
              <span className="auth-back-button__icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.5 4.5L6 10l5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          ) : (
            <div className="auth-card__topbar-spacer" aria-hidden="true" />
          )}
          <LanguageSwitch
            currentLanguage={language}
            onToggle={toggleLanguage}
            labels={authLabels.languageSwitch}
            compact
          />
        </div>

        <div className="auth-card__header">
          <p className="auth-card__eyebrow">{authLabels.eyebrow}</p>
          <h1>{screenCopy.title}</h1>
          <p className="auth-card__copy">{screenCopy.description}</p>
        </div>

        {showTabs ? (
          <div className="auth-card__switch">
            <button
              className={
                activeMode === 'signin' ? 'auth-tab is-active' : 'auth-tab'
              }
              type="button"
              onClick={() => handleModeChange('signin')}
            >
              {authLabels.signIn}
            </button>
            <button
              className={
                activeMode === 'signup' ? 'auth-tab is-active' : 'auth-tab'
              }
              type="button"
              onClick={() => handleModeChange('signup')}
            >
              {authLabels.signUp}
            </button>
          </div>
        ) : null}

        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
          {showEmailField ? (
            <label className="field">
              <span>{authLabels.fields.email}</span>
              <input
                name="auth_email"
                data-field="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={authLabels.placeholders.email}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                required
                disabled={isBusy || !isConfigured}
              />
            </label>
          ) : null}

          {showPasswordField ? (
            <label className="field">
              <span>{authLabels.fields.password}</span>
              <input
                name={
                  activeMode === 'reset-update'
                    ? 'auth_new_password'
                    : 'auth_password'
                }
                data-field="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={authLabels.placeholders.password}
                autoComplete={
                  activeMode === 'signin' ? 'current-password' : 'new-password'
                }
                required
                disabled={isBusy || !isConfigured}
              />
            </label>
          ) : null}

          {activeMode === 'signin' ? (
            <div className="auth-card__link-row auth-card__link-row--inline">
              <button
                className="auth-link-button"
                type="button"
                onClick={() => handleModeChange('reset-request')}
                disabled={isBusy}
              >
                {authLabels.forgotPassword}
              </button>
            </div>
          ) : null}

          <button
            className="primary-button auth-form__submit"
            type="submit"
            disabled={isBusy || !isConfigured}
          >
            {screenCopy.submit}
          </button>
        </form>

        {!isConfigured ? (
          <p className="auth-note">{authLabels.envMessage}</p>
        ) : null}

        {message ? <p className="auth-message">{message}</p> : null}
        {authError ? (
          <p className="auth-error">{getLocalizedAuthError(authError)}</p>
        ) : null}
      </section>
    </main>
  )
}

export default AuthScreen
