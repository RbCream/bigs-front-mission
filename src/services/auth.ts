import api from './api';
import { LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';

// 로그인 API 호출
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

// 회원가입 API 호출
export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/signup', credentials);
  return response.data;
};

// 액세스 토큰 갱신 API 호출
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
  return response.data;
};

// 로그아웃 API 호출
export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};
