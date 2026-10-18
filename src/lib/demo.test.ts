import { describe, expect, it } from 'vitest';
import { buildDemoWorkspace } from './demo';
import fr from '@/content/demo-fr';

describe('demo workspace', () => {
  const now = new Date(2026, 9, 18, 12);
  const ws = buildDemoWorkspace(fr, now);
  const t = now.getTime();

  it('is deterministic', () => {
    expect(buildDemoWorkspace(fr, now)).toEqual(ws);
  });

  it('has unique ids in every collection', () => {
    for (const list of Object.values(ws)) expect(new Set(list.map((x: { id: string }) => x.id)).size).toBe(list.length);
  });

  it('covers every dossier status, open and answered requests, paid and due invoices', () => {
    expect(new Set(ws.dossiers.map((d) => d.status))).toEqual(new Set(['received', 'processing', 'done']));
    expect(new Set(ws.requests.map((r) => r.status))).toEqual(new Set(['open', 'answered']));
    expect(new Set(ws.invoices.map((i) => i.status))).toEqual(new Set(['paid', 'due']));
  });

  it('never dates anything in the future', () => {
    const dates = [...ws.dossiers.map((d) => d.createdAt), ...ws.messages.map((m) => m.createdAt), ...ws.deliverables.map((d) => d.createdAt), ...ws.invoices.map((i) => i.issuedAt)];
    for (const d of dates) expect(new Date(d).getTime()).toBeLessThanOrEqual(t);
  });

  it('keeps timelines consistent with status', () => {
    for (const d of ws.dossiers) {
      const last = d.timeline?.at(-1)?.step;
      expect(last).toBe(d.status === 'done' ? 'delivered' : d.status === 'processing' ? 'encoding' : 'received');
    }
  });

  it('orders messages oldest first', () => {
    const dates = ws.messages.map((m) => m.createdAt);
    expect([...dates].sort()).toEqual(dates);
  });

  it('is a multi-client account where every record belongs to one of its clients', () => {
    expect(ws.clients).toHaveLength(3);
    const ids = new Set(ws.clients.map((c) => c.id));
    for (const k of ['dossiers', 'messages', 'requests', 'deliverables', 'invoices', 'notifications'] as const) {
      for (const x of ws[k]) expect(ids.has(x.clientId)).toBe(true);
    }
    for (const c of ws.clients) expect(ws.dossiers.some((d) => d.clientId === c.id)).toBe(true);
  });

  it('keeps cross-references inside the same client', () => {
    const byId = new Map(ws.dossiers.map((d) => [d.id, d.clientId]));
    for (const x of [...ws.messages, ...ws.requests]) if (x.dossierId) expect(byId.get(x.dossierId)).toBe(x.clientId);
  });
});
