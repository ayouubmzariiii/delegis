import { describe, expect, it } from 'vitest';
import { workspaceStats } from './stats';
import { buildDemoWorkspace } from './demo';
import fr from '@/content/demo-fr';

describe('workspaceStats', () => {
  const now = new Date(2026, 9, 18, 12);
  const s = workspaceStats(buildDemoWorkspace(fr, now), now);

  it('returns six months, oldest first, ending with the current month', () => {
    expect(s.volume).toHaveLength(6);
    expect(s.volume.at(-1)!.month).toBe('2026-10');
  });

  it('status mix adds up to the dossier count', () => {
    expect(s.mix.received + s.mix.processing + s.mix.done).toBe(s.total);
  });

  it('computes a positive turnaround and a rate between 0 and 100', () => {
    expect(s.turnaroundHours).toBeGreaterThan(0);
    expect(s.answeredRate).toBeGreaterThanOrEqual(0);
    expect(s.answeredRate).toBeLessThanOrEqual(100);
  });
});
