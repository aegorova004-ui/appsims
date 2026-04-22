import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './authContext.js'
import { authService } from '../lib/authService.js'

function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function hydrateSession() {
      const { data, error } = await authService.getSession()

      if (!isMounted) {
        return
      }

      if (error) {
        setAuthError(error.message)
      }

      const nextSession = data?.session ?? null
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setLoading(false)
    }

    hydrateSession()

    const { data } = authService.onAuthStateChange((event, nextSession) => {
      setIsPasswordRecovery(event === 'PASSWORD_RECOVERY')
      setSession(nextSession ?? null)
      setUser(nextSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      isMounted = false
      data.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      user,
      loading,
      authError,
      isPasswordRecovery,
      isConfigured: authService.isConfigured(),
      signIn: authService.signIn,
      signUp: authService.signUp,
      resetPassword: authService.resetPassword,
      updatePassword: authService.updatePassword,
      signOut: authService.signOut,
      clearAuthError: () => setAuthError(''),
      setAuthError,
      setIsPasswordRecovery,
    }),
    [authError, isPasswordRecovery, loading, session, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
