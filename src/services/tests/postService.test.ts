import axios from 'axios';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../postService';
import { Post, CreatePostDto, UpdatePostDto } from '../../types/post';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// postService 테스트 코드 추가
describe('postService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // getPosts 테스트 코드 추가
  describe('getPosts', () => {
    it('fetches posts successfully', async () => {
      const mockPosts: Post[] = [
        { id: 1, authorId: 1, title: 'Test Post 1', content: 'Content 1', author: 'Author 1', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
        { id: 2, authorId: 2, title: 'Test Post 2', content: 'Content 2', author: 'Author 2', createdAt: '2023-01-02', updatedAt: '2023-01-02' }
      ];
      mockedAxios.get.mockResolvedValue({ data: mockPosts });

      const result = await getPosts();

      expect(result).toEqual(mockPosts);
      expect(mockedAxios.get).toHaveBeenCalledWith('/posts');
    });

    it('handles error when fetching posts fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(getPosts()).rejects.toThrow('Network error');
    });
  });

  // getPost 테스트 코드 추가
  describe('getPost', () => {
    it('fetches a single post successfully', async () => {
      const mockPost: Post = { id: 1, authorId: 1, title: 'Test Post', content: 'Test Content', author: 'Author', createdAt: '2023-01-01', updatedAt: '2023-01-01' };
      mockedAxios.get.mockResolvedValue({ data: mockPost });

      const result = await getPost(1);

      expect(result).toEqual(mockPost);
      expect(mockedAxios.get).toHaveBeenCalledWith('/posts/1');
    });

    it('handles error when fetching a single post fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Post not found'));

      await expect(getPost(999)).rejects.toThrow('Post not found');
    });
  });

  // createPost 테스트 코드 추가
  describe('createPost', () => {
    it('creates a post successfully', async () => {
      const newPost: CreatePostDto = { title: 'New Post', content: 'New Content' };
      const createdPost: Post = { ...newPost, id: 3, authorId: 3, author: 'Author', createdAt: '2023-01-03', updatedAt: '2023-01-03' };
      mockedAxios.post.mockResolvedValue({ data: createdPost });

      const result = await createPost(newPost);

      expect(result).toEqual(createdPost);
      expect(mockedAxios.post).toHaveBeenCalledWith('/posts', newPost);
    });

    it('handles error when creating a post fails', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Failed to create post'));

      await expect(createPost({ title: 'Failed Post', content: 'Failed Content' })).rejects.toThrow('Failed to create post');
    });
  });

  // updatePost 테스트 코드 추가
  describe('updatePost', () => {
    it('updates a post successfully', async () => {
      const updateData: UpdatePostDto = { title: 'Updated Title', content: 'Updated Content' };
      const updatedPost: Post = { ...updateData, id: 1, authorId: 1, author: 'Author', createdAt: '2023-01-01', updatedAt: '2023-01-04', title: updateData.title || '', content: updateData.content || '' };
      mockedAxios.put.mockResolvedValue({ data: updatedPost });

      const result = await updatePost(1, updateData);

      expect(result).toEqual(updatedPost);
      expect(mockedAxios.put).toHaveBeenCalledWith('/posts/1', updateData);
    });

    it('handles error when updating a post fails', async () => {
      mockedAxios.put.mockRejectedValue(new Error('Failed to update post'));

      await expect(updatePost(1, { title: 'Failed Update' })).rejects.toThrow('Failed to update post');
    });
  });

  // deletePost 테스트 코드 추가
  describe('deletePost', () => {
    it('deletes a post successfully', async () => {
      mockedAxios.delete.mockResolvedValue({ data: {} });

      await deletePost(1);

      expect(mockedAxios.delete).toHaveBeenCalledWith('/posts/1');
    });

    it('handles error when deleting a post fails', async () => {
      mockedAxios.delete.mockRejectedValue(new Error('Failed to delete post'));

      await expect(deletePost(999)).rejects.toThrow('Failed to delete post');
    });
  });
});
