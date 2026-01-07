import React from 'react'
// Re-export all types for easier imports
export * from './user';
export * from './place';
export * from './chat';
export * from './redux';

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: {
    screen?: keyof MainTabParamList;
    params?: MainTabParamList[keyof MainTabParamList];
  } | undefined;
  Settings: undefined;
  EditProfile: undefined;
  Friends: undefined;
  CreatePost: undefined;
  EditPost: { id: string };
  ChatDetail: { id: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Feed: { id: string } | undefined;
  Swiping: undefined;
  Favorites: undefined;
  Chat: undefined;
  Profile: { id: string } | undefined;
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

export interface GetListParams {
  page: number;
  size: number;
};

export interface IBaseItem {
  imageContent?: string;
  rowTitle?: string;
  rowSubtitle?: string;
  contentInput?: React.ReactNode;
  colorText?: string;
}
