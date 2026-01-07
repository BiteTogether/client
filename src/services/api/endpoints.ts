export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    REFRESH: '/api/v1/auth/tokens/refresh',
    LOGOUT: '/api/v1/auth/logout',
    FORGOT_PASSWORD: '',
    RESET_PASSWORD: '',
  },
  USER: {
    PROFILE: '/api/v1/users/me',
    UPDATE_PROFILE: '/api/v1/users/{id}',
    DELETE_ACCOUNT: '/api/v1/users/{id}',
    PREFERENCES: '',
    LOCATION: '',
  },
  FRIENDS: {
    PROFILE: '/api/v1/users/{id}',
    SEARCH_FRIENDS: '/api/v1/users/search',
    LIST: '/api/v1/friends',
    REQUESTS: '/api/v1/friend-requests/received',
    ADD_FRIENDS: '/api/v1/friend-requests/{receiverId}',
    ACCEPT_REQUEST: '/api/v1/friend-requests/{id}/accept',
    REJECT_REQUEST: '/api/v1/friend-requests/{id}',
    REMOVE_FRIEND: '/api/v1/friends/{id}',
  },
  FEED: {
    CREATE_POST: '/api/v1/feeds',
    POSTS: '/api/v1/feeds/new-feeds',
    POSTS_BY_USER_ID: '/api/v1/feeds/user/{userId}',
    GET_POST_BY_ID: '/api/v1/feeds/{id}',
    UPDATE_POST: '/api/v1/feeds/{id}',
    DELETE_POST: '/api/v1/feeds/{id}',
    LIKE_POST: '/api/v1/feeds/likes',
    UNLIKE_POST: '/api/v1/feeds/likes',
    COMMENT: '/api/v1/feeds/comments',
    GET_COMMENTS_BY_POST_ID: '/api/v1/feeds/comments/post/{postId}',
    GET_LIKES_BY_POST_ID: '/api/v1/feeds/likes/post/{postId}',
    DELETE_COMMENT: '/api/v1/feeds/comments/{commentId}',
    EDIT_COMMENT: '/api/v1/feeds/comments/{commentId}',
    GET_REPLIES_BY_COMMENT_ID: '/api/v1/feeds/comments/{commentId}/replies',
  },

  CHAT: {
    ROOMS_LIST: '/api/v1/rooms',
    SEND_MESSAGE: '/api/v1/messages',
    DIRECT_CHAT_ROOM: '/api/v1/rooms/direct',
    MESSAGES: '/api/v1/messages/room/{roomId}',
  },
  
  // PLACES: {
  //   SWIPE_STACK: '/api/places/swipe-stack',
  //   SWIPE: '/api/places/swipe',
  //   SEARCH: '/api/places/search',
  //   DETAILS: '/api/places',
  //   FAVORITES: '/api/places/favorites',
  // },
  // MATCHES: {
  //   LIST: '/api/matches',
  //   DETAILS: '/api/matches',
  // },
  
  // SWIPE_BATTLE: {
  //   CREATE: '/api/battles',
  //   VOTE: '/api/battles',
  //   RESULTS: '/api/battles',
  // },
  // NOTIFICATIONS: {
  //   LIST: '/api/notifications',
  //   MARK_READ: '/api/notifications',
  //   SETTINGS: '/api/notifications/settings',
  // },
};