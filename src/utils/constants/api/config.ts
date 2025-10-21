// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://10.0.2.2:8082' : 'https://api.bitetogether.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
