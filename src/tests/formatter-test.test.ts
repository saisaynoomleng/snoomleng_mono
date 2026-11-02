import { toTitleCase } from '@/lib/formatter';

describe('toTitleCase', () => {
  it('should capitalize to title case', () => {
    expect(toTitleCase('hi')).toBe('Hi');
  });
});
