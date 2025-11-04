// User related types
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  cuisineTypes: string[];
  priceRange: {
    min: number;
    max: number;
  };
  dietaryRestrictions: string[];
  maxDistance: number; // in kilometers
  notifications: {
    matches: boolean;
    messages: boolean;
    feed: boolean;
  };
}

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

export interface ProfileRequest {
  username?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  avatar?: string;
  role?: string;
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
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}