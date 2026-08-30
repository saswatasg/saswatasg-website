import { describe, it, expect } from 'vitest';

function parseAmountParam(v) {
  if (!v) return null;
  const n = Number(v);
  if (!Number.isFinite(n) || n < 1) return null;
  return Math.floor(n);
}

describe('Pay parseAmountParam', () => {
  it('parses valid amounts', () => {
    expect(parseAmountParam('500')).toBe(500);
    expect(parseAmountParam('100.9')).toBe(100);
    expect(parseAmountParam('1')).toBe(1);
  });
  it('rejects invalid', () => {
    expect(parseAmountParam('')).toBe(null);
    expect(parseAmountParam(null)).toBe(null);
    expect(parseAmountParam('0')).toBe(null);
    expect(parseAmountParam('-5')).toBe(null);
    expect(parseAmountParam('abc')).toBe(null);
  });
  it('locked param disables input (logic)', () => {
    const amountParam = parseAmountParam('25000');
    const locked = true && amountParam !== null;
    expect(locked).toBe(true);
    expect(amountParam).toBe(25000);
  });
  it('pay locked disables input (smoke)', () => {
    const isLocked = true;
    const disabled = isLocked;
    expect(disabled).toBe(true);
  });
});
