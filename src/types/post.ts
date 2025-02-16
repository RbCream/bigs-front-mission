export interface Post {
    authorId: number | undefined;
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePostDto {
    title: string;
    content: string;
}

export interface UpdatePostDto {
    title?: string;
    content?: string;
}

export interface PostState {
    posts: Post[];
    currentPost: Post | null;
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    fetchPost: (id: number) => Promise<void>;
    createPost: (title: string, content: string) => Promise<void>;
    updatePost: (id: number, title: string, content: string) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
}