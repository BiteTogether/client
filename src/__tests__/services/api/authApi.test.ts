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
import * as authApi from '../../../services/api/authApi';

const mockPost = apiService.post as jest.Mock;
const mockDelete = apiService.delete as jest.Mock;

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call post with login credentials', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      mockPost.mockResolvedValue({
        data: { access_token: 'token', refresh_token: 'refresh' },
      });

      await authApi.login(credentials);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/auth/login', credentials);
    });
  });

  describe('register', () => {
    it('should call post with registration data', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        first_name: 'Test',
        last_name: 'User',
      };
      mockPost.mockResolvedValue({ data: { id: 1 } });

      await authApi.register(userData);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/auth/register', userData);
    });
  });

  describe('logout', () => {
    it('should call delete on logout endpoint', async () => {
      mockDelete.mockResolvedValue({ status: 200 });

      await authApi.logout();

      expect(mockDelete).toHaveBeenCalledWith('/api/v1/auth/logout');
    });
  });

  describe('refreshToken', () => {
    it('should call post with refresh token', async () => {
      const refreshToken = 'test-refresh-token';
      mockPost.mockResolvedValue({
        data: { access_token: 'new-token', refresh_token: 'new-refresh' },
      });

      await authApi.refreshToken(refreshToken);

      expect(mockPost).toHaveBeenCalledWith('/api/v1/auth/tokens/refresh', {
        refresh_token: refreshToken,
      });
    });
  });
});
