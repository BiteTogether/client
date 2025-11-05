// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  session_state: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  username: string;
  fullName: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  session_state: string;
}

// User types
export interface ProfileRequest {
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  role: string;
}

export interface ProfileResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  foodPreferences: string;
  friendsCount: number;
  pushNotificationsEnabled: boolean;
  inAppNotificationsEnabled: boolean;
}