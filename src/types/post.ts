export interface Post {
    authorId: number | undefined;
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    category: string; // 카테고리 타입을 문자열로 변경
}

export interface CreatePostDto {
    title: string;
    content: string;
    category: string; // 카테고리 타입을 문자열로 변경
}

export interface UpdatePostDto {
    title?: string;
    content?: string;
    category?: string; // 카테고리 타입을 문자열로 변경
}

export interface PostState {
    posts: Post[];
    currentPost: Post | null;
    loading: boolean;
    error: string | null;
    fetchPosts: (page: number, size: number) => Promise<number>;
    fetchPost: (id: number) => Promise<void>;
    createPost: (title: string, content: string, category: string) => Promise<void>;
    updatePost: (id: number, title: string, content: string, category: string) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
}