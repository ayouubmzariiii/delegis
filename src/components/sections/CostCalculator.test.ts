import { describe, expect, it } from 'vitest';
import { compareCost } from './CostCalculator';
import { rates } from '@/lib/pricing';

describe('compareCost', () => {
  it('never prices below the monthly minimum', () => {
    expect(compareCost(50).delegis).toBe(rates.minimum);
  });

  it('never reports a negative saving', () => {
    expect(compareCost(50).yearlySaving).toBe(0);
  });

  it('scales in-house cost linearly with volume', () => {
    expect(compareCost(1400).inhouse).toBeCloseTo(compareCost(700).inhouse * 2);
  });
});
