import { create } from 'zustand'
import { AuthState, LoginCredentials, SignupCredentials } from '../types/auth'
import { login, signup, refreshToken, logout } from '../services/auth'

export const useAuthStore = create<AuthState>((set) => ({
user: null,
isAuthenticated: false,
accessToken: null,
refreshToken: null,

// 로그인 관련 스토어어
login: async (credentials: LoginCredentials) => {
    try {
    const response = await login(credentials)
    set({ 
        isAuthenticated: true, 
        accessToken: response.accessToken, 
        refreshToken: response.refreshToken 
    })
    } catch (error) {
    console.error('Login failed:', error)
    }
},

// 회원가입 관련 스토어
signup: async (credentials: SignupCredentials) => {
    try {
    const response = await signup(credentials)
    set({ 
        isAuthenticated: true, 
        accessToken: response.accessToken, 
        refreshToken: response.refreshToken 
    })
    } catch (error) {
    console.error('Signup failed:', error)
    }
},

// 로그아웃 관련 스토어
logout: async () => {
    try {
    await logout()
    set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null })
    } catch (error) {
    console.error('Logout failed:', error)
    }
},

  // 액세스 토큰 갱신 관련 스토어
refreshAccessToken: async () => {
    const currentRefreshToken = useAuthStore.getState().refreshToken
    if (currentRefreshToken) {
    try {
        const response = await refreshToken(currentRefreshToken)
        set({ 
        accessToken: response.accessToken, 
        refreshToken: response.refreshToken 
        })
    } catch (error) {
        console.error('Token refresh failed:', error)
    }
    }
},
}))
