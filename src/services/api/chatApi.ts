import apiService from './index';
import { API_ENDPOINTS } from './endpoints';
import { Room, Rooms, SendMessageRequest, GetDirectChatRoomRequest, Messages, Message } from '../../types/chat';
import { GetListParams } from '../../types/';

export const getRoomsList = (params?: GetListParams) => {
  return apiService.get<Rooms>(API_ENDPOINTS.CHAT.ROOMS_LIST, { params });
};

export const sendMessage = (data: SendMessageRequest) => {
  return apiService.post<Message>(API_ENDPOINTS.CHAT.SEND_MESSAGE, data);
};

export const getDirectChatRoom = (params: GetDirectChatRoomRequest) => {
  return apiService.get<Room>(API_ENDPOINTS.CHAT.DIRECT_CHAT_ROOM, { params });
};

export const getMessages = (roomId: string, params?: GetListParams) => {
  const url = API_ENDPOINTS.CHAT.MESSAGES.replace('{roomId}', String(roomId));
  return apiService.get<Messages>(url, { params });
};