// Mock the apiService module
jest.mock('../../../services/api/index', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

import apiService from '../../../services/api/index';
import * as feedApi from '../../../services/api/feedApi';

const mockGet = apiService.get as jest.Mock;
const mockPost = apiService.post as jest.Mock;
const mockPut = apiService.put as jest.Mock;
const mockDelete = apiService.delete as jest.Mock;

describe('feedApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should call post with correct endpoint and data', async () => {
      const postData = { content: 'Test post', images: [] };
      mockPost.mockResolvedValue({ data: { id: 1, ...postData } });

      await feedApi.createPost(postData);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/feeds', postData);
    });
  });

  describe('fetchPosts', () => {
    it('should call get with correct endpoint', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchPosts();

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/new-feeds', { params: undefined });
    });

    it('should pass params to get request', async () => {
      const params = { page: 1, limit: 10 };
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchPosts(params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/new-feeds', { params });
    });
  });

  describe('fetchPostsByUserID', () => {
    it('should call get with user ID in URL', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchPostsByUserID(123);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/user/123', { params: undefined });
    });

    it('should pass params along with user ID', async () => {
      const params = { page: 2 };
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchPostsByUserID(456, params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/user/456', { params });
    });
  });

  describe('getPostById', () => {
    it('should call get with post ID in URL', async () => {
      mockGet.mockResolvedValue({ data: { id: '1' } });

      await feedApi.getPostById('1');

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/1');
    });
  });

  describe('updatePost', () => {
    it('should call put with correct endpoint and data', async () => {
      const postData = { content: 'Updated post' };
      mockPut.mockResolvedValue({ data: { id: '1', ...postData } });

      await feedApi.updatePost('1', postData);

      expect(mockPut).toHaveBeenCalledWith('/api/v1/feeds/1', postData);
    });
  });

  describe('deletePost', () => {
    it('should call delete with correct endpoint', async () => {
      mockDelete.mockResolvedValue({ status: 200 });

      await feedApi.deletePost('1');

      expect(mockDelete).toHaveBeenCalledWith('/api/v1/feeds/1');
    });
  });

  describe('likePost', () => {
    it('should call post with like data', async () => {
      const likeData = { post_id: 1 };
      mockPost.mockResolvedValue({ status: 200 });

      await feedApi.likePost(likeData);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/feeds/likes', likeData);
    });
  });

  describe('unlikePost', () => {
    it('should call delete with unlike data', async () => {
      const likeData = { post_id: 1 };
      mockDelete.mockResolvedValue({ status: 200 });

      await feedApi.unlikePost(likeData);

      expect(mockDelete).toHaveBeenCalledWith('/api/v1/feeds/likes', { data: likeData });
    });
  });

  describe('commentPost', () => {
    it('should call post with comment data', async () => {
      const commentData = { post_id: 1, content: 'Nice post!' };
      mockPost.mockResolvedValue({ data: { id: 1, ...commentData } });

      await feedApi.commentPost(commentData);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/feeds/comments', commentData);
    });
  });

  describe('fetchCommentsByPostId', () => {
    it('should call get with post ID in URL', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchCommentsByPostId('1');

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/comments/post/1', { params: undefined });
    });

    it('should pass params to get request', async () => {
      const params = { page: 1 };
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchCommentsByPostId('1', params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/comments/post/1', { params });
    });
  });

  describe('fetchLikesByPostId', () => {
    it('should call get with post ID in URL', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchLikesByPostId('1');

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/likes/post/1', { params: undefined });
    });
  });

  describe('deleteComment', () => {
    it('should call delete with comment ID in URL', async () => {
      mockDelete.mockResolvedValue({ status: 200 });

      await feedApi.deleteComment('123');

      expect(mockDelete).toHaveBeenCalledWith('/api/v1/feeds/comments/123');
    });
  });

  describe('editComment', () => {
    it('should call put with comment ID and data', async () => {
      const commentData = { post_id: 1, content: 'Edited comment' };
      mockPut.mockResolvedValue({ data: { id: '123', ...commentData } });

      await feedApi.editComment('123', commentData);

      expect(mockPut).toHaveBeenCalledWith('/api/v1/feeds/comments/123', commentData);
    });
  });

  describe('fetchRepliesByCommentId', () => {
    it('should call get with comment ID in URL', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchRepliesByCommentId('123');

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/comments/123/replies', { params: undefined });
    });

    it('should pass params to get request', async () => {
      const params = { page: 1 };
      mockGet.mockResolvedValue({ data: [] });

      await feedApi.fetchRepliesByCommentId('123', params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/feeds/comments/123/replies', { params });
    });
  });
});
