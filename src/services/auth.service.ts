import { SignInData, SignUpData, AuthResponse } from '@/types'

// Mock API responses - Replace with real API calls
export const authService = {
  signIn: async (data: SignInData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock response - Replace with actual API call
    return {
      user: {
        id: '1',
        email: data.email,
        fullName: data.email.split('@')[0],
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token',
      expiresIn: 3600,
    }
  },

  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock response - Replace with actual API call
    return {
      user: {
        id: '2',
        email: data.email,
        fullName: data.fullName,
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token',
      expiresIn: 3600,
    }
  },

  signOut: async (): Promise<void> => {
    // Clear token on server if needed
    await new Promise(resolve => setTimeout(resolve, 500))
  },

  forgotPassword: async (email: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Mock implementation
  },
}