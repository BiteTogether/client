import apiService from './index';
import { API_ENDPOINTS } from './endpoints';
import { LoginRequest, LoginResponse, RegisterRequest, AuthResponse } from '../../types/user';

export const login = (data: LoginRequest) => {
  return apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
};

export const register = (data: RegisterRequest) => {
  return apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
};

export const logout = () => {
  return apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
};