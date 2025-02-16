import { create } from 'zustand'
import { AuthState, LoginCredentials, SignupCredentials } from '../types/auth'
import { login, signup, refreshToken, logout } from '../services/auth'
import api from '../services/api'

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),

    // 로그인 관련 스토어
    login: async (credentials: LoginCredentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            set({ 
                isAuthenticated: true, 
                accessToken: response.data.accessToken, 
                refreshToken: response.data.refreshToken 
            });
        } catch (error) {
            console.error('Login failed:', error)
        }
    },

    // 회원가입 관련 스토어
    signup: async (credentials: SignupCredentials) => {
        try {
            const response = await signup(credentials)
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
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
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null })
        } catch (error) {
            console.error('Logout failed:', error)
        }
    },

    // 액세스 토큰 갱신 관련 스토어
    refreshAccessToken: async () => {
        const currentRefreshToken = get().refreshToken;
        if (currentRefreshToken) {
            try {
                const response = await refreshToken(currentRefreshToken)
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                set({ 
                    accessToken: response.accessToken, 
                    refreshToken: response.refreshToken 
                })
            } catch (error) {
                console.error('Token refresh failed:', error)
            }
        }
    },
}));