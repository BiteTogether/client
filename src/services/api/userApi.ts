import apiService from './index';
import { API_ENDPOINTS } from './endpoints';
import { ProfileRequest, ProfileResponse } from '../../types/user';

export const fetchProfile = () => {
  return apiService.get<ProfileResponse>(API_ENDPOINTS.USER.PROFILE);
};

export const updateProfile = (id: number, data: ProfileRequest) => {
  const url = API_ENDPOINTS.USER.UPDATE_PROFILE.replace('{id}', id.toString());
  return apiService.put<ProfileResponse>(url, data);
}

export const deleteAccount = (id: number) => {
  const url = API_ENDPOINTS.USER.DELETE_ACCOUNT.replace('{id}', id.toString());
  return apiService.delete(url);
}