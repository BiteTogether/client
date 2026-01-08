// Mock the apiService module
jest.mock('../../../services/api/index', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

import apiService from '../../../services/api/index';
import * as friendsApi from '../../../services/api/friendsApi';

const mockGet = apiService.get as jest.Mock;
const mockPost = apiService.post as jest.Mock;
const mockDelete = apiService.delete as jest.Mock;

describe('friendsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchFriend', () => {
    it('should call post with keyword', async () => {
      mockPost.mockResolvedValue({ data: [] });

      await friendsApi.searchFriend('john');

      expect(mockPost).toHaveBeenCalledWith('/api/v1/users/search', { keyword: 'john' });
    });
  });

  describe('fetchFriendProfile', () => {
    it('should call get with friend ID in URL', async () => {
      mockGet.mockResolvedValue({ data: { id: 1 } });

      await friendsApi.fetchFriendProfile(1);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/users/1');
    });
  });

  describe('addFriend', () => {
    it('should call post with receiver ID in URL', async () => {
      mockPost.mockResolvedValue({ status: 200 });

      await friendsApi.addFriend(123);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/friend-requests/123');
    });
  });

  describe('acceptFriendRequest', () => {
    it('should call post with request ID in URL', async () => {
      mockPost.mockResolvedValue({ status: 200 });

      await friendsApi.acceptFriendRequest(456);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/friend-requests/456/accept');
    });
  });

  describe('rejectFriendRequest', () => {
    it('should call delete with request ID in URL', async () => {
      mockDelete.mockResolvedValue({ status: 200 });

      await friendsApi.rejectFriendRequest(789);

      expect(mockDelete).toHaveBeenCalledWith('/api/v1/friend-requests/789');
    });
  });

  describe('getFriendRequests', () => {
    it('should call get with correct endpoint', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await friendsApi.getFriendRequests();

      expect(mockGet).toHaveBeenCalledWith('/api/v1/friend-requests/received', { params: undefined });
    });

    it('should pass params to get request', async () => {
      const params = { page: 1, limit: 20 };
      mockGet.mockResolvedValue({ data: [] });

      await friendsApi.getFriendRequests(params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/friend-requests/received', { params });
    });
  });

  describe('getFriendsList', () => {
    it('should call get with correct endpoint', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await friendsApi.getFriendsList();

      expect(mockGet).toHaveBeenCalledWith('/api/v1/friends', { params: undefined });
    });

    it('should pass params to get request', async () => {
      const params = { page: 2 };
      mockGet.mockResolvedValue({ data: [] });

      await friendsApi.getFriendsList(params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/friends', { params });
    });
  });

  describe('removeFriend', () => {
    it('should call delete with friend ID in URL', async () => {
      mockDelete.mockResolvedValue({ status: 200 });

      await friendsApi.removeFriend(123);

      expect(mockDelete).toHaveBeenCalledWith('/api/v1/friends/123');
    });
  });
});
