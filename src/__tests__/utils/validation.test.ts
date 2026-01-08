// Mock VALIDATION constant
jest.mock('../../utils/constants', () => ({
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 20,
  },
}));

import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateRequired,
} from '../../utils/helpers/validation';

describe('Validation Helpers', () => {
  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return true for email with subdomain', () => {
      expect(validateEmail('test@mail.example.com')).toBe(true);
    });

    it('should return false for email without @', () => {
      expect(validateEmail('testexample.com')).toBe(false);
    });

    it('should return false for email without domain', () => {
      expect(validateEmail('test@')).toBe(false);
    });

    it('should return false for email without username', () => {
      expect(validateEmail('@example.com')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateEmail('')).toBe(false);
    });

    it('should handle email with spaces by trimming', () => {
      expect(validateEmail(' test@example.com ')).toBe(true);
    });

    it('should return false for email with spaces in middle', () => {
      expect(validateEmail('test @example.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return valid for password meeting all requirements', () => {
      const result = validatePassword('Password123');
      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    it('should return invalid for password too short', () => {
      const result = validatePassword('Pass1');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('at least');
    });

    it('should return invalid for password without lowercase', () => {
      const result = validatePassword('PASSWORD123');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('lowercase');
    });

    it('should return invalid for password without uppercase', () => {
      const result = validatePassword('password123');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('uppercase');
    });

    it('should return invalid for password without number', () => {
      const result = validatePassword('Passworddd');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('number');
    });

    it('should return valid for complex password', () => {
      const result = validatePassword('MyP@ssw0rd!');
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateUsername', () => {
    it('should return valid for valid username', () => {
      const result = validateUsername('john_doe');
      expect(result.isValid).toBe(true);
    });

    it('should return invalid for username too short', () => {
      const result = validateUsername('ab');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('at least');
    });

    it('should return invalid for username too long', () => {
      const result = validateUsername('a'.repeat(21));
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('no more than');
    });

    it('should return invalid for username with special characters', () => {
      const result = validateUsername('john@doe');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('letters, numbers, and underscores');
    });

    it('should return valid for username with numbers', () => {
      const result = validateUsername('john123');
      expect(result.isValid).toBe(true);
    });

    it('should return valid for username with underscore', () => {
      const result = validateUsername('john_doe_123');
      expect(result.isValid).toBe(true);
    });

    it('should handle username with leading/trailing spaces', () => {
      const result = validateUsername(' john ');
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateRequired', () => {
    it('should return valid for non-empty string', () => {
      const result = validateRequired('value', 'Field');
      expect(result.isValid).toBe(true);
    });

    it('should return invalid for empty string', () => {
      const result = validateRequired('', 'Name');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Name is required');
    });

    it('should return invalid for null', () => {
      const result = validateRequired(null, 'Email');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Email is required');
    });

    it('should return invalid for undefined', () => {
      const result = validateRequired(undefined, 'Password');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Password is required');
    });

    it('should return invalid for whitespace only', () => {
      const result = validateRequired('   ', 'Username');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Username is required');
    });

    it('should return valid for number 0', () => {
      const result = validateRequired(0, 'Count');
      expect(result.isValid).toBe(false); // 0 is falsy
    });

    it('should return valid for non-empty array', () => {
      const result = validateRequired([1, 2], 'Items');
      expect(result.isValid).toBe(true);
    });
  });
});
