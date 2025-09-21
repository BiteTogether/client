// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://localhost:8080' : 'https://api.bitetogether.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  USER: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
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

// WebSocket Events
export const WEBSOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_CHAT: 'join_chat',
  LEAVE_CHAT: 'leave_chat',
  NEW_MESSAGE: 'new_message',
  MESSAGE_READ: 'message_read',
  USER_TYPING: 'user_typing',
  USER_STOPPED_TYPING: 'user_stopped_typing',
  MATCH_FOUND: 'match_found',
  SWIPE_BATTLE_CREATED: 'swipe_battle_created',
  SWIPE_BATTLE_VOTE: 'swipe_battle_vote',
  SWIPE_BATTLE_COMPLETED: 'swipe_battle_completed',
};

// App Colors
export const COLORS = {
  PRIMARY: '#FF6B35', // Orange
  SECONDARY: '#F7931E', // Yellow-Orange
  ACCENT: '#FFD23F', // Yellow
  BACKGROUND: '#FFFFFF',
  SURFACE: '#F8F9FA',
  ERROR: '#FF3B30',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  INFO: '#007AFF',
  TEXT: {
    PRIMARY: '#000000',
    SECONDARY: '#6C757D',
    LIGHT: '#ADB5BD',
    INVERSE: '#FFFFFF',
  },
  BORDER: '#E9ECEF',
  SHADOW: '#00000029',
  GRADIENT: {
    PRIMARY: ['#FF6B35', '#F7931E'],
    SECONDARY: ['#F7931E', '#FFD23F'],
  },

  ICON: '#262626',
  HEADER_BG: '#FAFAFA',
};

// Typography
export const FONTS = {
  REGULAR: 'System',
  MEDIUM: 'System',
  BOLD: 'System',
  SIZES: {
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
    XLARGE: 18,
    XXLARGE: 24,
    TITLE: 28,
    HEADER: 32,
  },
  WEIGHTS: {
    REGULAR: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
  },
};

// Spacing
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
};

// Screen Dimensions
export const SCREEN_PADDING = SPACING.MD;

// Animation Durations
export const ANIMATIONS = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  PREFERENCES: 'user_preferences',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  CHAT_DRAFT: 'chat_draft_',
};

// Validation Constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  BIO_MAX_LENGTH: 500,
  POST_CONTENT_MAX_LENGTH: 1000,
  MESSAGE_MAX_LENGTH: 1000,
};

// Map Configuration
export const MAP_CONFIG = {
  DEFAULT_REGION: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  MAX_SEARCH_RADIUS: 50, // kilometers
  MIN_SEARCH_RADIUS: 1, // kilometers
  DEFAULT_SEARCH_RADIUS: 10, // kilometers
};

// Swipe Configuration
export const SWIPE_CONFIG = {
  THRESHOLD: 120, // pixels
  MAX_ROTATION: 15, // degrees
  ANIMATION_DURATION: 250, // milliseconds
  STACK_SIZE: 10, // number of places to show in stack
};

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// Feature Flags
export const FEATURES = {
  AI_RECOMMENDATIONS: true,
  SWIPE_BATTLES: true,
  VIDEO_MESSAGES: false,
  GROUP_SWIPES: false,
  PREMIUM_FEATURES: false,
};
