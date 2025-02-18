import { create } from 'zustand';
import { PostState, Post, PostDetail } from '../types/post';
import * as postService from '../services/postService';

export const usePostStore = create<PostState>((set) => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,

    // 게시글 목록 조회
    fetchPosts: async (page: number, size: number): Promise<number> => {
        set({ loading: true });
        try {
            const { content, totalPages } = await postService.getPosts(page, size);
            set({ posts: Array.isArray(content) ? content : [], loading: false, error: null });
            return totalPages;
        } catch (error) {
            set({ error: 'Failed to fetch posts', loading: false });
            return 0;
        }
    },

    // 게시글 상세 조회
    fetchPost: async (id: number) => {
        set({ loading: true });
        try {
            const post: PostDetail = await postService.getPost(id);
            set({ currentPost: post, loading: false, error: null });
        } catch (error) {
            set({ error: 'Failed to fetch post', loading: false });
        }
    },

    // 게시글 생성
    createPost: async (title: string, content: string, category: string) => {
        set({ loading: true });
        try {
            const newPost = await postService.createPost({ title, content, category });
            set((state) => ({ 
                posts: [...state.posts, newPost],
                loading: false,
                error: null
            }));
        } catch (error) {
            set({ error: 'Failed to create post', loading: false });
        }
    },

    // 게시글 수정
    updatePost: async (id: number, title: string, content: string, category: string) => {
        set({ loading: true });
        try {
            const updatedPost = await postService.updatePost(id, { title, content, category });
            set((state) => ({
                posts: state.posts.map(post => post.id === id ? updatedPost : post),
                currentPost: updatedPost,
                loading: false,
                error: null
            }));
        } catch (error) {
            set({ error: 'Failed to update post', loading: false });
        }
    },

    // 게시글 삭제
    deletePost: async (id: number) => {
        set({ loading: true });
        try {
            await postService.deletePost(id);
            set((state) => ({
                posts: state.posts.filter(post => post.id !== id),
                loading: false,
                error: null
            }));
        } catch (error) {
            set({ error: 'Failed to delete post', loading: false });
        }
    }
}));