import { create } from 'zustand';
import { AuthState, LoginCredentials, SignupCredentials, User } from '../types/auth';
import { login, signup, refreshToken } from '../services/auth';

const getUserFromLocalStorage = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    user: getUserFromLocalStorage(),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isRefreshing: false,

    login: async (credentials: LoginCredentials) => {
        try {
            const response = await login(credentials);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            const user = { id: 1, username: credentials.username, email: credentials.username };
            localStorage.setItem('user', JSON.stringify(user));
            set({ 
                isAuthenticated: true, 
                accessToken: response.accessToken, 
                refreshToken: response.refreshToken,
                user
            });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    signup: async (credentials: SignupCredentials) => {
        try {
            const response = await signup(credentials);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            const user = { id: 1, username: credentials.username, email: credentials.email };
            localStorage.setItem('user', JSON.stringify(user));
            set({ 
                isAuthenticated: true, 
                accessToken: response.accessToken, 
                refreshToken: response.refreshToken,
                user
            });
        } catch (error: any) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    logout: async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null, isRefreshing: false });
    },

    refreshAccessToken: async () => {
        const currentRefreshToken = get().refreshToken;
        if (currentRefreshToken && !get().isRefreshing) {
            set({ isRefreshing: true });
            try {
                console.log('Refreshing access token...');
                const response = await refreshToken(currentRefreshToken);
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                const user = get().user;
                set({ 
                    accessToken: response.accessToken, 
                    refreshToken: response.refreshToken,
                    user,
                    isRefreshing: false
                });
                console.log('Access token refreshed successfully');
            } catch (error) {
                const err = error as any;
                console.error('Token refresh failed:', err.response ? err.response.data : err.message);
                set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null, isRefreshing: false });
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
            }
        } else {
            console.log('No refresh token available or already refreshing');
        }
    },

    setTokens: (accessToken: string, refreshToken: string) => {
        set({
            accessToken,
            refreshToken,
        });
    },
}));