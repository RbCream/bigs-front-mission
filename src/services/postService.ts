import api from './api';
import { Post, CreatePostDto, UpdatePostDto } from '../types/post';
import axios from 'axios';

/**
 * 게시글 목록 조회 API 호출
 * @description 게시글 목록 조회 API 호출
 * @param page 조회할 페이지 번호
 * @param size 페이지당 게시글 수
 * @returns 게시글 목록
 * @example getPosts(0, 10).then(posts => console.log(posts));
 */
export const getPosts = async (page: number, size: number): Promise<{ content: Post[], totalPages: number }> => {
    try {
        const response = await api.get(`/boards?page=${page}&size=${size}`);
        return {
            content: response.data.content,
            totalPages: response.data.totalPages
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to fetch posts:', error.message, error.response?.data);
        } else {
            console.error('Failed to fetch posts:', error);
        }
        throw new Error('Failed to fetch posts. Please try again later.');
    }
};

/** 
 * 게시글 상세 조회 API 호출
 * @description 게시글 상세 조회 API 호출
 * @param id 조회할 게시글 ID
 * @returns 조회된 게시글
 */
export const getPost = async (id: number): Promise<Post> => {
    try {
        const response = await api.get<Post>(`/boards/${id}`); 
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to fetch post:', error.message, error.response?.data);
        } else {
            console.error('Failed to fetch post:', error);
        }
        throw new Error('Failed to fetch post. Please try again later.');
    }
};

/**
 *  게시글 생성 API 호출
 * @description 게시글 생성 API 호출
 * @param postData 생성할 게시글 데이터
 * @returns 생성된 게시글
 */
export const createPost = async (postData: CreatePostDto): Promise<Post> => {
    try {
        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(postData)], { type: 'application/json' }));

        const response = await api.post<Post>('/boards', formData, {
            headers: {
                // multipart/form-data; boundary=<calculated when request is sent> 형식으로 전송
                'Content-Type': 'multipart/form-data', 'boundary': '----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to create post:', error.message, error.response?.data);
        } else {
            console.error('Failed to create post:', error);
        }
        throw new Error('Failed to create post. Please try again later.');
    }
};

/**
 *  게시글 수정 API 호출
 * @description 게시글 수정 API 호출
 * @param id  수정할 게시글 ID
 * @param postData 수정할 게시글 데이터
 * @returns 수정된 게시글
 */
export const updatePost = async (id: number, postData: UpdatePostDto): Promise<Post> => {
    try {
        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(postData)], { type: 'application/json' }));

        const response = await api.patch<Post>(`/boards/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to update post:', error.message, error.response?.data);
        } else {
            console.error('Failed to update post:', error);
        }
        throw new Error('Failed to update post. Please try again later.');
    }
};

/**
 * 게시글 삭제 API 호출
 * @description 게시글 삭제 API 호출
 * @param id 삭제할 게시글 ID
 */
export const deletePost = async (id: number): Promise<void> => {
    try {
        await api.delete(`/boards/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to delete post:', error.message, error.response?.data);
        } else {
            console.error('Failed to delete post:', error);
        }
        throw new Error('Failed to delete post. Please try again later.');
    }
};

/**
 * 게시판 카테고리 조회 API 호출
 * @description 게시판 카테고리 조회 API 호출
 * @returns 게시판 카테고리 목록
 */
export const getCategories = async (): Promise<{ [key: string]: string }> => {
    try {
        const response = await api.get('/boards/categories');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to fetch categories:', error.message, error.response?.data);
        } else {
            console.error('Failed to fetch categories:', error);
        }
        throw new Error('Failed to fetch categories. Please try again later.');
    }
};
