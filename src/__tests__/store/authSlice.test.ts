import authReducer, {
  clearError,
  setLoading,
} from '../../store/slices/authSlice';

// Mock the API and AsyncStorage
jest.mock('../../services/api/authApi', () => ({
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
  };

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle clearError', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error',
      };
      expect(authReducer(stateWithError, clearError())).toEqual({
        ...stateWithError,
        error: null,
      });
    });

    it('should handle setLoading to true', () => {
      expect(authReducer(initialState, setLoading(true))).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('should handle setLoading to false', () => {
      const loadingState = {
        ...initialState,
        loading: true,
      };
      expect(authReducer(loadingState, setLoading(false))).toEqual({
        ...loadingState,
        loading: false,
      });
    });
  });

  describe('loginUser async thunk', () => {
    it('should set loading to true on pending', () => {
      const action = { type: 'auth/login/pending' };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set authenticated state on fulfilled', () => {
      const action = {
        type: 'auth/login/fulfilled',
        payload: {
          access_token: 'test-token',
          refresh_token: 'test-refresh-token',
        },
      };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('test-token');
      expect(state.refreshToken).toBe('test-refresh-token');
      expect(state.error).toBeNull();
    });

    it('should set error on rejected', () => {
      const action = {
        type: 'auth/login/rejected',
        payload: 'Invalid credentials',
      };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
      expect(state.error).toBe('Invalid credentials');
    });
  });

  describe('registerUser async thunk', () => {
    it('should set loading to true on pending', () => {
      const action = { type: 'auth/register/pending' };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set loading to false on fulfilled', () => {
      const loadingState = { ...initialState, loading: true };
      const action = {
        type: 'auth/register/fulfilled',
        payload: { message: 'Success' },
      };
      const state = authReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set error on rejected', () => {
      const action = {
        type: 'auth/register/rejected',
        payload: 'Email already exists',
      };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Email already exists');
    });
  });

  describe('logoutUser async thunk', () => {
    it('should set loading to true on pending', () => {
      const authenticatedState = {
        ...initialState,
        isAuthenticated: true,
        token: 'test-token',
        refreshToken: 'test-refresh-token',
      };
      const action = { type: 'auth/logout/pending' };
      const state = authReducer(authenticatedState, action);
      expect(state.loading).toBe(true);
    });

    it('should clear auth state on fulfilled', () => {
      const authenticatedState = {
        ...initialState,
        isAuthenticated: true,
        token: 'test-token',
        refreshToken: 'test-refresh-token',
        loading: true,
      };
      const action = { type: 'auth/logout/fulfilled' };
      const state = authReducer(authenticatedState, action);
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
      expect(state.refreshToken).toBeNull();
    });

    it('should clear auth state on rejected (without error)', () => {
      const authenticatedState = {
        ...initialState,
        isAuthenticated: true,
        token: 'test-token',
      };
      const action = { type: 'auth/logout/rejected' };
      const state = authReducer(authenticatedState, action);
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
      expect(state.error).toBeNull();
    });
  });

  describe('checkAuthToken async thunk', () => {
    it('should set loading to true on pending', () => {
      const action = { type: 'auth/checkToken/pending' };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('should set authenticated state on fulfilled', () => {
      const action = {
        type: 'auth/checkToken/fulfilled',
        payload: {
          token: 'stored-token',
          refreshToken: 'stored-refresh-token',
        },
      };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('stored-token');
      expect(state.refreshToken).toBe('stored-refresh-token');
    });

    it('should clear state on rejected', () => {
      const action = { type: 'auth/checkToken/rejected' };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
      expect(state.error).toBeNull();
    });
  });
});
