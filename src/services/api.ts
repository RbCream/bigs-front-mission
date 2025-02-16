import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// axios 인스턴스를 생성합니다.
const api = axios.create({
    baseURL: 'https://front-mission.bigs.or.kr',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터를 추가합니다.
api.interceptors.request.use( (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터를 추가합니다.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await useAuthStore.getState().refreshAccessToken();
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                useAuthStore.getState().logout();
                // 로그인 페이지로 리다이렉트 또는 인증 실패 처리
            }
        }
        return Promise.reject(error);
    }
);

export default api;