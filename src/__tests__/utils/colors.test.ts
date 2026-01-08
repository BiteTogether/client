import { COLORS } from '../../utils/constants/ui/colors';

describe('COLORS', () => {
  it('should have correct primary color', () => {
    expect(COLORS.PRIMARY).toBe('#FF6B35');
  });

  it('should have correct secondary color', () => {
    expect(COLORS.SECONDARY).toBe('#F7931E');
  });

  it('should have correct accent color', () => {
    expect(COLORS.ACCENT).toBe('#FFC526');
  });

  it('should have correct background color', () => {
    expect(COLORS.BACKGROUND).toBe('#FFFFFF');
  });

  it('should have correct error color', () => {
    expect(COLORS.ERROR).toBe('#FF3B30');
  });

  it('should have correct success color', () => {
    expect(COLORS.SUCCESS).toBe('#34C759');
  });

  it('should have TEXT object with correct colors', () => {
    expect(COLORS.TEXT).toBeDefined();
    expect(COLORS.TEXT.PRIMARY).toBe('#000000');
    expect(COLORS.TEXT.SECONDARY).toBe('#6C757D');
    expect(COLORS.TEXT.INVERSE).toBe('#FFFFFF');
  });

  it('should have GRADIENT object with correct values', () => {
    expect(COLORS.GRADIENT).toBeDefined();
    expect(COLORS.GRADIENT.PRIMARY).toEqual(['#FF6B35', '#F7931E']);
    expect(COLORS.GRADIENT.SECONDARY).toEqual(['#F7931E', '#FFD23F']);
  });
});
