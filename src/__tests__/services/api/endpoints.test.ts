import { API_ENDPOINTS } from '../../../services/api/endpoints';

describe('API_ENDPOINTS', () => {
  describe('AUTH endpoints', () => {
    it('should have correct login endpoint', () => {
      expect(API_ENDPOINTS.AUTH.LOGIN).toBe('/api/v1/auth/login');
    });

    it('should have correct register endpoint', () => {
      expect(API_ENDPOINTS.AUTH.REGISTER).toBe('/api/v1/auth/register');
    });

    it('should have correct refresh token endpoint', () => {
      expect(API_ENDPOINTS.AUTH.REFRESH).toBe('/api/v1/auth/tokens/refresh');
    });

    it('should have correct logout endpoint', () => {
      expect(API_ENDPOINTS.AUTH.LOGOUT).toBe('/api/v1/auth/logout');
    });
  });

  describe('USER endpoints', () => {
    it('should have correct profile endpoint', () => {
      expect(API_ENDPOINTS.USER.PROFILE).toBe('/api/v1/users/me');
    });

    it('should have correct update profile endpoint', () => {
      expect(API_ENDPOINTS.USER.UPDATE_PROFILE).toBe('/api/v1/users/{id}');
    });
  });

  describe('FRIENDS endpoints', () => {
    it('should have correct friends list endpoint', () => {
      expect(API_ENDPOINTS.FRIENDS.LIST).toBe('/api/v1/friends');
    });

    it('should have correct friend requests endpoint', () => {
      expect(API_ENDPOINTS.FRIENDS.REQUESTS).toBe('/api/v1/friend-requests/received');
    });

    it('should have correct search friends endpoint', () => {
      expect(API_ENDPOINTS.FRIENDS.SEARCH_FRIENDS).toBe('/api/v1/users/search');
    });
  });

  describe('FEED endpoints', () => {
    it('should have correct create post endpoint', () => {
      expect(API_ENDPOINTS.FEED.CREATE_POST).toBe('/api/v1/feeds');
    });

    it('should have correct get posts endpoint', () => {
      expect(API_ENDPOINTS.FEED.POSTS).toBe('/api/v1/feeds/new-feeds');
    });

    it('should have correct like post endpoint', () => {
      expect(API_ENDPOINTS.FEED.LIKE_POST).toBe('/api/v1/feeds/likes');
    });

    it('should have correct comment endpoint', () => {
      expect(API_ENDPOINTS.FEED.COMMENT).toBe('/api/v1/feeds/comments');
    });
  });

  describe('CHAT endpoints', () => {
    it('should have correct rooms list endpoint', () => {
      expect(API_ENDPOINTS.CHAT.ROOMS_LIST).toBe('/api/v1/rooms');
    });

    it('should have correct send message endpoint', () => {
      expect(API_ENDPOINTS.CHAT.SEND_MESSAGE).toBe('/api/v1/messages');
    });
  });
});
