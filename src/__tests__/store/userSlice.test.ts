import userReducer, {
  clearError,
  setLoading,
  updateProfileLocally,
  clearProfile,
  setViewingProfile,
} from '../../store/slices/userSlice';

// Mock the API and AsyncStorage
jest.mock('../../services/api/userApi', () => ({
  fetchProfile: jest.fn(),
  updateProfile: jest.fn(),
  deleteAccount: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

describe('userSlice', () => {
  const initialState = {
    profile: null,
    viewingProfile: null,
    loading: false,
    error: null,
  };

  const mockProfile = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    first_name: 'Test',
    last_name: 'User',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'Test bio',
  };

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle clearError', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error',
      };
      expect(userReducer(stateWithError, clearError())).toEqual({
        ...stateWithError,
        error: null,
      });
    });

    it('should handle setLoading to true', () => {
      expect(userReducer(initialState, setLoading(true))).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('should handle setLoading to false', () => {
      const loadingState = {
        ...initialState,
        loading: true,
      };
      expect(userReducer(loadingState, setLoading(false))).toEqual({
        ...loadingState,
        loading: false,
      });
    });

    it('should handle updateProfileLocally', () => {
      const stateWithProfile = {
        ...initialState,
        profile: mockProfile,
      };
      const updatedProfile = userReducer(
        stateWithProfile,
        updateProfileLocally({ bio: 'Updated bio' })
      );
      expect(updatedProfile.profile?.bio).toBe('Updated bio');
      expect(updatedProfile.profile?.username).toBe('testuser');
    });

    it('should not update profile locally if profile is null', () => {
      const result = userReducer(
        initialState,
        updateProfileLocally({ bio: 'Updated bio' })
      );
      expect(result.profile).toBeNull();
    });

    it('should handle clearProfile', () => {
      const stateWithProfile = {
        ...initialState,
        profile: mockProfile,
        error: 'Some error',
      };
      expect(userReducer(stateWithProfile, clearProfile())).toEqual({
        ...stateWithProfile,
        profile: null,
        error: null,
      });
    });

    it('should handle setViewingProfile', () => {
      const viewingProfile = { id: 2, username: 'otheruser' };
      expect(userReducer(initialState, setViewingProfile(viewingProfile))).toEqual({
        ...initialState,
        viewingProfile,
      });
    });
  });

  describe('fetchUserProfile async thunk', () => {
    it('should set loading to true on pending', () => {
      const action = { type: 'user/fetchProfile/pending' };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set profile on fulfilled', () => {
      const action = {
        type: 'user/fetchProfile/fulfilled',
        payload: mockProfile,
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.profile).toEqual(mockProfile);
      expect(state.error).toBeNull();
    });

    it('should set error on rejected', () => {
      const action = {
        type: 'user/fetchProfile/rejected',
        payload: 'Failed to fetch profile',
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch profile');
    });
  });

  describe('updateUserProfile async thunk', () => {
    it('should set loading to true on pending', () => {
      const action = { type: 'user/updateProfile/pending' };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should update profile on fulfilled', () => {
      const updatedProfile = { ...mockProfile, bio: 'New bio' };
      const action = {
        type: 'user/updateProfile/fulfilled',
        payload: updatedProfile,
      };
      const stateWithProfile = { ...initialState, profile: mockProfile };
      const state = userReducer(stateWithProfile, action);
      expect(state.loading).toBe(false);
      expect(state.profile).toEqual(updatedProfile);
      expect(state.error).toBeNull();
    });

    it('should set error on rejected', () => {
      const action = {
        type: 'user/updateProfile/rejected',
        payload: 'Failed to update profile',
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to update profile');
    });
  });

  describe('deleteUserAccount async thunk', () => {
    it('should set loading to true on pending', () => {
      const action = { type: 'user/deleteAccount/pending' };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should clear profile on fulfilled', () => {
      const stateWithProfile = { ...initialState, profile: mockProfile };
      const action = { type: 'user/deleteAccount/fulfilled' };
      const state = userReducer(stateWithProfile, action);
      expect(state.loading).toBe(false);
      expect(state.profile).toBeNull();
      expect(state.error).toBeNull();
    });

    it('should set error on rejected', () => {
      const action = {
        type: 'user/deleteAccount/rejected',
        payload: 'Failed to delete account',
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to delete account');
    });
  });
});
