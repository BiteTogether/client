import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProfile, updateProfile, deleteAccount } from '../../services/api/userApi';
import { UserState, ProfileResponse } from '../../types';
import { STORAGE_KEYS } from '../../utils/constants';

// Initial state
const initialState: UserState = {
  profile: null,
  viewingProfile: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProfile();
      
      if (response.data) {
        // Cache profile in AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(response.data));
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ id, profileData }: { id: number; profileData: any }, { rejectWithValue }) => {
    try {
      const response = await updateProfile(id, profileData);
      
      if (response.data) {
        // Cache profile in AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(response.data));
        return { ...response.data, message: response.message };
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'user/deleteAccount',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteAccount(id);
      if (response.status === 200) {
        // Remove profile from AsyncStorage
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.USER_PROFILE,
          STORAGE_KEYS.ACCESS_TOKEN,
          STORAGE_KEYS.REFRESH_TOKEN,
        ]);
        return { message: response.message };
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


// export const updateUserLocation = createAsyncThunk(
//   'user/updateLocation',
//   async (locationData: { latitude: number; longitude: number; address: string }, { rejectWithValue }) => {
//     try {
//       const response = await apiService.post<User>(API_ENDPOINTS.USER.LOCATION, locationData);
      
//       if (response.success && response.data) {
//         // Update cached profile
//         await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(response.data));
//         return response.data;
//       } else {
//         return rejectWithValue(response.message || 'Failed to update location');
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to update location');
//     }
//   }
// );

// export const loadCachedProfile = createAsyncThunk(
//   'user/loadCachedProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const cachedProfile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
//       if (cachedProfile) {
//         return JSON.parse(cachedProfile);
//       } else {
//         return rejectWithValue('No cached profile found');
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to load cached profile');
//     }
//   }
// );

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateProfileLocally: (state, action: PayloadAction<Partial<ProfileResponse>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
    setViewingProfile: (state, action: PayloadAction<any>) => {
      state.viewingProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete account
    builder
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.error = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // // Update location
    // builder
    //   .addCase(updateUserLocation.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateUserLocation.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.profile = action.payload;
    //     state.error = null;
    //   })
    //   .addCase(updateUserLocation.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });

    // // Load cached profile
    // builder
    //   .addCase(loadCachedProfile.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(loadCachedProfile.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.profile = action.payload;
    //     state.error = null;
    //   })
    //   .addCase(loadCachedProfile.rejected, (state) => {
    //     state.loading = false;
    //     // Don't set error for failed cache load
    //   });
  },
});

export const { clearError, setLoading, updateProfileLocally, clearProfile, setViewingProfile } = userSlice.actions;
export default userSlice.reducer;
