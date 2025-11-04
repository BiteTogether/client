import apiService from './index';
import { API_ENDPOINTS } from './endpoints';
import { ProfileRequest, ProfileResponse } from '../../types/user';

export const fetchProfile = () => {
  return apiService.get<ProfileResponse>(API_ENDPOINTS.USER.PROFILE);
};

export const updateProfile = (id: number, data: Partial<ProfileRequest>) => {
  const url = API_ENDPOINTS.USER.UPDATE_PROFILE.replace('{id}', String(id));
  return apiService.put<ProfileResponse>(url, data);
}

export const deleteAccount = (id: number) => {
  const url = API_ENDPOINTS.USER.DELETE_ACCOUNT.replace('{id}', String(id));
  return apiService.delete(url);
}