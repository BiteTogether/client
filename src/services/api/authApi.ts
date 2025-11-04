import apiService from './index';
import { API_ENDPOINTS } from './endpoints';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../types/user';

export const login = (data: LoginRequest) => {
  return apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
};

export const register = (data: RegisterRequest) => {
  return apiService.post(API_ENDPOINTS.AUTH.REGISTER, data);
};

export const logout = () => {
  return apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
};