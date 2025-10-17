import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, register, logout } from '../../services/api/authApi';
import { AuthState } from '../../types';
import { STORAGE_KEYS } from '../../utils/constants';

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      
      if (response.data && response.data.access_token && response.data.refresh_token) {
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.access_token);
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refresh_token);
        return { ...response.data, message: response.message };
      }
      
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      
      if (response.data) {
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.token);
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(response.data.user));
        
        return response.data;
      } else {
        return rejectWithValue(response.message || 'Registration failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      
      if (response.status === 200) {
        // Clear AsyncStorage
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.ACCESS_TOKEN,
          STORAGE_KEYS.REFRESH_TOKEN,
          STORAGE_KEYS.USER_PROFILE,
        ]);
        return { message: response.message };
      }
      
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthToken = createAsyncThunk(
  'auth/checkToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      const userProfile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      
      if (token && refreshToken && userProfile) {
        return {
          token,
          refreshToken,
          user: JSON.parse(userProfile),
        };
      } else {
        return rejectWithValue('No valid tokens found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to check authentication');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.refreshToken = null;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.refreshToken = null;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.refreshToken = null;
        state.error = null; // Don't show error for logout
      });

    // Check auth token
    builder
      .addCase(checkAuthToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(checkAuthToken.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.refreshToken = null;
        state.error = null;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
