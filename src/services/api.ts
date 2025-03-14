import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// axios
const api = axios.create({
    baseURL: 'https://front-mission.bigs.or.kr',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.url !== '/auth/refresh') {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await useAuthStore.getState().refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError: any) {
                console.error('Error refreshing token:', refreshError.response ? refreshError.response.data : refreshError.message);
                useAuthStore.getState().logout();
            }
        }
        return Promise.reject(error);
    }
);

export default api;