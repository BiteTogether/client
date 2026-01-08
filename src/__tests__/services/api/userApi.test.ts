// Mock the apiService module
jest.mock('../../../services/api/index', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

import apiService from '../../../services/api/index';
import * as userApi from '../../../services/api/userApi';

const mockGet = apiService.get as jest.Mock;
const mockPut = apiService.put as jest.Mock;
const mockDelete = apiService.delete as jest.Mock;

describe('userApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchProfile', () => {
    it('should call get with profile endpoint', async () => {
      mockGet.mockResolvedValue({ data: { id: 1, username: 'testuser' } });

      await userApi.fetchProfile();

      expect(mockGet).toHaveBeenCalledWith('/api/v1/users/me');
    });
  });

  describe('updateProfile', () => {
    it('should call put with user ID and data', async () => {
      const profileData = { bio: 'Updated bio', first_name: 'John' };
      mockPut.mockResolvedValue({ data: { id: 1, ...profileData } });

      await userApi.updateProfile(1, profileData);

      expect(mockPut).toHaveBeenCalledWith('/api/v1/users/1', profileData);
    });

    it('should replace user ID in URL', async () => {
      const profileData = { username: 'newusername' };
      mockPut.mockResolvedValue({ data: { id: 123 } });

      await userApi.updateProfile(123, profileData);

      expect(mockPut).toHaveBeenCalledWith('/api/v1/users/123', profileData);
    });
  });

  describe('deleteAccount', () => {
    it('should call delete with user ID in URL', async () => {
      mockDelete.mockResolvedValue({ status: 200 });

      await userApi.deleteAccount(1);

      expect(mockDelete).toHaveBeenCalledWith('/api/v1/users/1');
    });

    it('should replace user ID in URL correctly', async () => {
      mockDelete.mockResolvedValue({ status: 200 });

      await userApi.deleteAccount(456);

      expect(mockDelete).toHaveBeenCalledWith('/api/v1/users/456');
    });
  });
});
