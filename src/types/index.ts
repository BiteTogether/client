import { AvatarProps } from '@rneui/themed';
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native';
// Re-export all types for easier imports
export * from './user';
export * from './place';
export * from './chat';
export * from './redux';

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ChatDetail: { chatId: string };
};

export type MainTabParamList = {
  Feed: undefined;
  Swiping: undefined;
  Favorites: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  ChatDetail: { chatId: string };
  SwipeBattle: { battleId: string };
};

// API Response types
export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
  currentPage?: number;
  totalPages?: number;
  totalElements?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IBaseItem {
  imageContent?: string;
  textContent?: React.ReactNode;
  itemStyle?: StyleProp<ViewStyle>;
  imageContentStyle?: StyleProp<ViewStyle> & StyleProp<AvatarProps>;
}
