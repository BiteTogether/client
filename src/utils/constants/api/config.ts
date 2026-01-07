import { API_BASE_URL, API_TIMEOUT, API_RETRY_ATTEMPTS } from '@env';

// API Configuration
export const API_CONFIG = {
  BASE_URL: API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: Number(API_TIMEOUT) || 10000,
  RETRY_ATTEMPTS: Number(API_RETRY_ATTEMPTS) || 3,
};
