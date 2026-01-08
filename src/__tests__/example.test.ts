describe('Example Test Suite', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const greeting = 'Hello BiteTogether';
    expect(greeting).toContain('BiteTogether');
  });

  it('should handle array operations', () => {
    const items = [1, 2, 3, 4, 5];
    expect(items).toHaveLength(5);
    expect(items).toContain(3);
  });

  it('should handle object operations', () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
    };
    expect(user).toHaveProperty('name');
    expect(user.email).toMatch(/@/);
  });
});
