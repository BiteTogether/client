// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://localhost:8081' : 'https://api.bitetogether.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
