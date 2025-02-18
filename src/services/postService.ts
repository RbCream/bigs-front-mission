import api from './api';
import { Post, CreatePostDto, UpdatePostDto, PostDetail } from '../types/post';
import { handleAxiosError } from '../utils/errorHandler';

// 게시글 목록 조회 API 호출
export const getPosts = async (page: number, size: number): Promise<{ content: Post[], totalPages: number }> => {
    try {
        const response = await api.get(`/boards?page=${page}&size=${size}`);
        return {
            content: response.data.content,
            totalPages: response.data.totalPages
        };
    } catch (error) {
        handleAxiosError(error, 'Failed to fetch posts');
        return Promise.reject(error); 
    }
};

// 게시글 상세 조회 API 호출
export const getPost = async (id: number): Promise<PostDetail> => {
    try {
        const response = await api.get<PostDetail>(`/boards/${id}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'Failed to fetch post');
        return Promise.reject(error); 
    }
};

// 게시글 생성 API 호출
export const createPost = async (postData: CreatePostDto): Promise<Post> => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(postData)], { type: 'application/json' }));

    try {
        const response = await api.post<Post>('/boards', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 'boundary': '----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'Failed to create post');
        return Promise.reject(error); 
    }
};

// 게시글 수정 API 호출
export const updatePost = async (id: number, postData: UpdatePostDto): Promise<Post> => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(postData)], { type: 'application/json' }));

    try {
        const response = await api.patch<Post>(`/boards/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'Failed to update post');
        return Promise.reject(error); 
    }
};

// 게시글 삭제 API 호출
export const deletePost = async (id: number): Promise<void> => {
    try {
        await api.delete(`/boards/${id}`);
    } catch (error) {
        handleAxiosError(error, 'Failed to delete post');
        return Promise.reject(error); 
    }
};

// 게시판 카테고리 조회 API 호출
export const getCategories = async (): Promise<{ [key: string]: string }> => {
    try {
        const response = await api.get('/boards/categories');
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'Failed to fetch categories');
        return Promise.reject(error); 
    }
};
