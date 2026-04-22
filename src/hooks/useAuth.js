import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext.js'

function useAuth() {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return authContext
}

export default useAuth
