import apiService from './index';
import { API_ENDPOINTS } from './endpoints';
import { SearchFriendResponse, FriendProfileResponse, FriendsListResponse, FriendRequestsResponse, GetListParams } from '../../types/friends';

export const searchFriend = (keyword: string) => {
  return apiService.post<SearchFriendResponse>(API_ENDPOINTS.FRIENDS.SEARCH_FRIENDS, { keyword });
};

export const fetchFriendProfile = (id: number) => {
  const url = API_ENDPOINTS.FRIENDS.PROFILE.replace('{id}', String(id));
  return apiService.get<FriendProfileResponse>(url);
};

export const addFriend = (receiverId: number) => {
  const url = API_ENDPOINTS.FRIENDS.ADD_FRIENDS.replace('{receiverId}', String(receiverId));
  return apiService.post(url);
};

export const acceptFriendRequest = (id: number) => {
  const url = API_ENDPOINTS.FRIENDS.ACCEPT_REQUEST.replace('{id}', String(id));
  return apiService.post(url);
};

export const rejectFriendRequest = (id: number) => {
  const url = API_ENDPOINTS.FRIENDS.REJECT_REQUEST.replace('{id}', String(id));
  return apiService.delete(url);
};

export const getFriendRequests = (params?: GetListParams) => {
  return apiService.get<FriendRequestsResponse>(API_ENDPOINTS.FRIENDS.REQUESTS, { params });
};

export const getFriendsList = (params?: GetListParams) => {
  return apiService.get<FriendsListResponse>(API_ENDPOINTS.FRIENDS.LIST, { params });
};

export const removeFriend = (id: number) => {
  const url = API_ENDPOINTS.FRIENDS.REMOVE_FRIEND.replace('{id}', String(id));
  return apiService.delete(url);
}