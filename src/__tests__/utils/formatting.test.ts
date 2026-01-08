import {
  formatDate,
  formatMessageTime,
  capitalizeWords,
  truncateText,
  generateId,
  calculateDistance,
  formatDistance,
  isValidUrl,
  safeJsonParse,
} from '../../utils/helpers/formatting';

describe('Formatting Helpers', () => {
  describe('formatDate', () => {
    it('should return "Just now" for dates less than 1 minute ago', () => {
      const now = new Date().toISOString();
      expect(formatDate(now)).toBe('Just now');
    });

    it('should return minutes for dates less than 60 minutes ago', () => {
      const date = new Date(Date.now() - 30 * 60 * 1000).toISOString(); // 30 minutes ago
      expect(formatDate(date)).toBe('30m');
    });

    it('should return hours for dates less than 24 hours ago', () => {
      const date = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(); // 5 hours ago
      expect(formatDate(date)).toBe('5h');
    });

    it('should return days for dates less than 7 days ago', () => {
      const date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(); // 3 days ago
      expect(formatDate(date)).toBe('3d');
    });

    it('should return formatted date for dates more than 7 days ago', () => {
      const date = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(); // 10 days ago
      const result = formatDate(date);
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}/);
    });
  });

  describe('formatMessageTime', () => {
    it('should return time for messages sent today', () => {
      const now = new Date().toISOString();
      const result = formatMessageTime(now);
      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    it('should return "Yesterday" for messages sent yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(12, 0, 0, 0);
      expect(formatMessageTime(yesterday.toISOString())).toBe('Yesterday');
    });

    it('should return formatted date for older messages', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 5);
      const result = formatMessageTime(oldDate.toISOString());
      expect(result).toBeTruthy();
      expect(result).not.toBe('Yesterday');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize the first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    it('should handle single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
    });

    it('should handle already capitalized text', () => {
      expect(capitalizeWords('HELLO WORLD')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(capitalizeWords('')).toBe('');
    });

    it('should handle mixed case', () => {
      expect(capitalizeWords('hElLo WoRlD')).toBe('Hello World');
    });
  });

  describe('truncateText', () => {
    it('should not truncate text shorter than maxLength', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
    });

    it('should truncate text longer than maxLength with ellipsis', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });

    it('should handle exact length', () => {
      expect(truncateText('Hello', 5)).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(truncateText('', 10)).toBe('');
    });

    it('should trim trailing spaces before adding ellipsis', () => {
      expect(truncateText('Hello World', 6)).toBe('Hello...');
    });
  });

  describe('generateId', () => {
    it('should return a string', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
    });

    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should have reasonable length', () => {
      const id = generateId();
      expect(id.length).toBeGreaterThan(10);
    });
  });

  describe('calculateDistance', () => {
    it('should calculate distance between two points', () => {
      // New York to Los Angeles (approximately 3940 km)
      const distance = calculateDistance(40.7128, -74.006, 34.0522, -118.2437);
      expect(distance).toBeGreaterThan(3900);
      expect(distance).toBeLessThan(4000);
    });

    it('should return 0 for same location', () => {
      const distance = calculateDistance(40.7128, -74.006, 40.7128, -74.006);
      expect(distance).toBe(0);
    });

    it('should handle small distances', () => {
      // Two points close together
      const distance = calculateDistance(40.7128, -74.006, 40.7129, -74.0061);
      expect(distance).toBeLessThan(1);
    });
  });

  describe('formatDistance', () => {
    it('should format distance less than 1km in meters', () => {
      expect(formatDistance(0.5)).toBe('500m');
    });

    it('should format distance between 1-10km with decimal', () => {
      expect(formatDistance(5.5)).toBe('5.5km');
    });

    it('should format distance more than 10km as whole number', () => {
      expect(formatDistance(15.7)).toBe('16km');
    });

    it('should handle zero distance', () => {
      expect(formatDistance(0)).toBe('0m');
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid http URL', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
    });

    it('should return true for valid https URL', () => {
      expect(isValidUrl('https://example.com/path')).toBe(true);
    });

    it('should return false for invalid URL', () => {
      expect(isValidUrl('not a url')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isValidUrl('')).toBe(false);
    });

    it('should return true for URL with query params', () => {
      expect(isValidUrl('https://example.com?param=value')).toBe(true);
    });
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"name":"test"}', {});
      expect(result).toEqual({ name: 'test' });
    });

    it('should return fallback for invalid JSON', () => {
      const fallback = { default: true };
      const result = safeJsonParse('invalid json', fallback);
      expect(result).toEqual(fallback);
    });

    it('should handle array JSON', () => {
      const result = safeJsonParse('[1, 2, 3]', []);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle nested JSON', () => {
      const result = safeJsonParse('{"user":{"name":"test"}}', {});
      expect(result).toEqual({ user: { name: 'test' } });
    });
  });
});
