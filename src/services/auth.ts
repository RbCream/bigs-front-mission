import axios from 'axios';
import api from './api';
import { LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';
import { handleAxiosError } from '../utils/errorHandler';

const API_URL = 'https://front-mission.bigs.or.kr';

// 로그인 API 호출
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>('/auth/signin', credentials);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'Login failed');
        return Promise.reject(error);  
    }
};

// 회원가입 API 호출
export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, credentials);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'Signup failed');
        return Promise.reject(error);  
    }
};

// 액세스 토큰 갱신 API 호출
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'Token refresh failed');
        return Promise.reject(error);  
    }
};

// 로그아웃 API 호출
export const logout = async (): Promise<void> => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        handleAxiosError(error, 'Logout failed');
        return Promise.reject(error);  
    }
};