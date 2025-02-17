import axios from 'axios';
import api from './api';
import { LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';

const API_URL = 'https://front-mission.bigs.or.kr';

// 로그인 API 호출
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/signin', credentials);
  return response.data;
};

// 회원가입 API 호출
export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, credentials);
  return response.data;
};

// 액세스 토큰 갱신 API 호출
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
  return response.data;
};

// 로그아웃 API 호출
export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};