// Mock react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

describe('Redux Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useAppDispatch', () => {
    it('should return dispatch function from useDispatch', () => {
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

      const dispatch = useAppDispatch();

      expect(useDispatch).toHaveBeenCalled();
      expect(dispatch).toBe(mockDispatch);
    });
  });

  describe('useAppSelector', () => {
    it('should be the same as useSelector', () => {
      expect(useAppSelector).toBe(useSelector);
    });

    it('should work with a selector function', () => {
      const mockState = { auth: { isAuthenticated: true } };
      const selector = (state: typeof mockState) => state.auth.isAuthenticated;
      
      (useSelector as jest.Mock).mockImplementation((fn) => fn(mockState));

      const result = useAppSelector(selector);

      expect(result).toBe(true);
      expect(useSelector).toHaveBeenCalled();
    });
  });
});
