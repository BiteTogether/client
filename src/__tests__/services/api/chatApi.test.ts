// Mock the apiService module
jest.mock('../../../services/api/index', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

import apiService from '../../../services/api/index';
import * as chatApi from '../../../services/api/chatApi';

const mockGet = apiService.get as jest.Mock;
const mockPost = apiService.post as jest.Mock;

describe('chatApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRoomsList', () => {
    it('should call get with correct endpoint', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await chatApi.getRoomsList();

      expect(mockGet).toHaveBeenCalledWith('/api/v1/rooms', { params: undefined });
    });

    it('should pass params to get request', async () => {
      const params = { page: 1, limit: 20 };
      mockGet.mockResolvedValue({ data: [] });

      await chatApi.getRoomsList(params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/rooms', { params });
    });
  });

  describe('sendMessage', () => {
    it('should call post with message data', async () => {
      const messageData = { room_id: 1, content: 'Hello!' };
      mockPost.mockResolvedValue({ data: { id: 1, ...messageData } });

      await chatApi.sendMessage(messageData);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/messages', messageData);
    });
  });

  describe('getDirectChatRoom', () => {
    it('should call get with user ID params', async () => {
      const params = { user_id: 123 };
      mockGet.mockResolvedValue({ data: { id: 1 } });

      await chatApi.getDirectChatRoom(params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/rooms/direct', { params });
    });
  });

  describe('getMessages', () => {
    it('should call get with room ID in URL', async () => {
      mockGet.mockResolvedValue({ data: [] });

      await chatApi.getMessages('123');

      expect(mockGet).toHaveBeenCalledWith('/api/v1/messages/room/123', { params: undefined });
    });

    it('should pass params to get request', async () => {
      const params = { page: 1, limit: 50 };
      mockGet.mockResolvedValue({ data: [] });

      await chatApi.getMessages('456', params);

      expect(mockGet).toHaveBeenCalledWith('/api/v1/messages/room/456', { params });
    });
  });
});
