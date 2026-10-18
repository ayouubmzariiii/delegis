import type { PortalContext } from '@/lib/portal';
import { workspaceStats } from '@/lib/stats';
import { localeMeta } from '@/lib/i18n';
import { Card } from './ui';

/** Statistics block: monthly volume chart, status mix, turnaround, request handling. */
export function StatsPanel({ ctx }: { ctx: PortalContext }) {
  const { ws, a, t, locale } = ctx;
  const s = workspaceStats(ws);
  const st = a.stats;
  const max = Math.max(1, ...s.volume.map((v) => v.files));
  const month = new Intl.DateTimeFormat(localeMeta[locale].hreflang, { month: 'short' });
  const mixRows = [
    { key: 'done' as const, n: s.mix.done, color: 'bg-ok-600' },
    { key: 'processing' as const, n: s.mix.processing, color: 'bg-go-600' },
    { key: 'received' as const, n: s.mix.received, color: 'bg-ink-400' },
  ];
  const turnaround = s.turnaroundHours === null ? '—' : s.turnaroundHours < 48 ? `${s.turnaroundHours} ${st.hours}` : `${Math.round(s.turnaroundHours / 24)} ${st.days}`;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card title={st.volume} action={<span className="text-xs text-ink-500">{st.volumeSub}</span>} className="lg:col-span-2">
        <div className="flex h-48 items-end gap-3" role="img" aria-label={`${st.volume}: ${s.volume.map((v) => `${v.month} ${v.files}`).join(', ')}`}>
          {s.volume.map((v, i) => (
            <div key={v.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-xs font-semibold tabular text-ink-700">{v.files}</span>
              <div
                className={`w-full max-w-[3.5rem] rounded-t-lg ${i === s.volume.length - 1 ? 'bg-go-600' : 'bg-go-100'}`}
                style={{ height: `${Math.max(4, (v.files / max) * 100)}%` }}
              />
              <span className="text-xs capitalize text-ink-500">{month.format(new Date(`${v.month}-01T12:00:00`))}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title={st.mix}>
        <div className="flex h-3 overflow-hidden rounded-full bg-paper-200">
          {mixRows.map((r) => r.n > 0 && <span key={r.key} className={r.color} style={{ width: `${(r.n / Math.max(1, s.total)) * 100}%` }} />)}
        </div>
        <ul className="mt-5 space-y-3">
          {mixRows.map((r) => (
            <li key={r.key} className="flex items-center gap-3 text-sm">
              <span className={`h-2.5 w-2.5 rounded-full ${r.color}`} />
              <span className="flex-1 text-ink-700">{t.portal.status[r.key]}</span>
              <span className="font-semibold tabular">{r.n}</span>
              <span className="w-10 text-end text-xs text-ink-500">{s.total ? Math.round((r.n / s.total) * 100) : 0}%</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5">
          <div>
            <p className="text-xs text-ink-500">{st.turnaround}</p>
            <p className="mt-1 font-display text-2xl font-bold">{turnaround}</p>
            <p className="text-[11px] text-ink-400">{st.turnaroundSub}</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">{st.answered}</p>
            <p className="mt-1 font-display text-2xl font-bold">{s.answeredRate === null ? '—' : `${s.answeredRate}%`}</p>
            <p className="text-[11px] text-ink-400">
              {s.answered}/{s.requests} {st.answeredSub}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
