import { VALIDATION } from '../constants';

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email.trim());
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns object with validation result and message
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long`,
    };
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }

  if (!/(?=.*\d)/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }

  return { isValid: true };
};

/**
 * Validates username
 * @param username - Username string to validate
 * @returns object with validation result and message
 */
export const validateUsername = (username: string): { isValid: boolean; message?: string } => {
  const trimmed = username.trim();

  if (trimmed.length < VALIDATION.USERNAME_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Username must be at least ${VALIDATION.USERNAME_MIN_LENGTH} characters long`,
    };
  }

  if (trimmed.length > VALIDATION.USERNAME_MAX_LENGTH) {
    return {
      isValid: false,
      message: `Username must be no more than ${VALIDATION.USERNAME_MAX_LENGTH} characters long`,
    };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return {
      isValid: false,
      message: 'Username can only contain letters, numbers, and underscores',
    };
  }

  return { isValid: true };
};

/**
 * Validates required field
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns object with validation result and message
 */
export const validateRequired = (value: any, fieldName: string): { isValid: boolean; message?: string } => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }
  return { isValid: true };
};
