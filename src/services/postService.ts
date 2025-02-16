import api from './api';
import { Post, CreatePostDto, UpdatePostDto } from '../types/post';

/**
 * 게시글 목록 조회 API 호출
 * @description 게시글 목록 조회 API 호출
 * @returns 게시글 목록
 * @example getPosts().then(posts => console.log(posts));
 */
export const getPosts = async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts');
    return response.data;
};

/** 
 * 게시글 상세 조회 API 호출
 * @description 게시글 상세 조회 API 호출
 * @param id 조회할 게시글 ID
 * @returns 조회된 게시글
*/

export const getPost = async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
};

/**
 *  게시글 생성 API 호출
 * @description 게시글 생성 API 호출
 * @param postData 생성할 게시글 데이터
 * @returns 생성된 게시글
 */

export const createPost = async (postData: CreatePostDto): Promise<Post> => {
    const response = await api.post<Post>('/posts', postData);
    return response.data;
};

/**
 *  게시글 수정 API 호출
 * @description 게시글 수정 API 호출
 * @param id  수정할 게시글 ID
 * @param postData 수정할 게시글 데이터
 * @returns 수정된 게시글
 */

export const updatePost = async (id: number, postData: UpdatePostDto): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}`, postData);
    return response.data;
};

/**
 * 게시글 삭제 API 호출
 * @description 게시글 삭제 API 호출
 * @param id 삭제할 게시글 ID
 */
export const deletePost = async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
};
