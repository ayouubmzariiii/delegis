import type { Workspace } from './types';

const ym = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

/** Portal statistics computed from (scoped) workspace data. Pure, so it is unit-tested. */
export function workspaceStats(ws: Workspace, now = new Date()) {
  // Files received per month (by upload date), last 6 months, oldest first.
  const months = Array.from({ length: 6 }, (_, i) => ym(new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)));
  const volume = months.map((m) => ({ month: m, files: ws.dossiers.filter((d) => d.createdAt.startsWith(m)).reduce((n, d) => n + d.files.length, 0) }));

  const mix = { received: 0, processing: 0, done: 0 };
  for (const d of ws.dossiers) mix[d.status]++;

  // Turnaround: received → delivered, in hours, over delivered dossiers.
  const durations = ws.dossiers
    .map((d) => {
      const r = d.timeline?.find((s) => s.step === 'received')?.at;
      const v = d.timeline?.find((s) => s.step === 'delivered')?.at;
      return r && v ? (new Date(v).getTime() - new Date(r).getTime()) / 36e5 : null;
    })
    .filter((x): x is number => x !== null);
  const turnaroundHours = durations.length ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : null;

  const answered = ws.requests.filter((r) => r.status === 'answered').length;
  const answeredRate = ws.requests.length ? Math.round((answered / ws.requests.length) * 100) : null;

  return { volume, mix, total: ws.dossiers.length, turnaroundHours, answered, requests: ws.requests.length, answeredRate };
}
