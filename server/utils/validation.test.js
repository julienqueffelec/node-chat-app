const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string', () => {
    const res = isRealString(99);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const res = isRealString('    ');
    expect(res).toBe(false);
  });

  it('should allow string with no space characters', () => {
    const res = isRealString('  Ju  ');
    expect(res).toBe(true);
  });
});
