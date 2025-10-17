export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  USER: {
    PROFILE: '/api/v1/users/me',
    UPDATE_PROFILE: '/api/v1/users/{id}',
    PREFERENCES: '/api/users/preferences',
    LOCATION: '/api/users/location',
  },
  PLACES: {
    SWIPE_STACK: '/api/places/swipe-stack',
    SWIPE: '/api/places/swipe',
    SEARCH: '/api/places/search',
    DETAILS: '/api/places',
    FAVORITES: '/api/places/favorites',
  },
  MATCHES: {
    LIST: '/api/matches',
    DETAILS: '/api/matches',
  },
  CHAT: {
    LIST: '/api/chats',
    MESSAGES: '/api/chats',
    SEND_MESSAGE: '/api/chats',
  },
  FEED: {
    POSTS: '/api/feed',
    CREATE_POST: '/api/feed',
    LIKE_POST: '/api/feed',
    COMMENT: '/api/feed',
  },
  SWIPE_BATTLE: {
    CREATE: '/api/battles',
    VOTE: '/api/battles',
    RESULTS: '/api/battles',
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: '/api/notifications',
    SETTINGS: '/api/notifications/settings',
  },
};