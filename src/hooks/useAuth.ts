import { useAuthStore } from '@/stores/auth.store'
import { authService } from '@/services/auth.service'
import { SignInData, SignUpData } from '@/types'

export const useAuth = () => {
  const { 
    user, 
    token, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    setLoading 
  } = useAuthStore()

  const signIn = async (data: SignInData) => {
    setLoading(true)
    try {
      const response = await authService.signIn(data)
      login(response.user, response.token)
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign in failed' 
      }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (data: SignUpData) => {
    setLoading(true)
    try {
      const response = await authService.signUp(data)
      login(response.user, response.token)
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign up failed' 
      }
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    logout()
    // Clear any additional storage if needed
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
  }
}