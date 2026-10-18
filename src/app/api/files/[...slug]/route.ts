import { currentUser } from '@/lib/auth';
import { q } from '@/lib/sql';
import { readFile } from '@/lib/storage';
import type { StoredFile } from '@/lib/types';

export const dynamic = 'force-dynamic';

const TYPES: Record<string, string> = { pdf: 'application/pdf', csv: 'text/csv; charset=utf-8', xml: 'application/xml', cod: 'text/plain; charset=latin1', txt: 'text/plain' };

function download(body: Buffer, name: string) {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return new Response(new Blob([new Uint8Array(body)]), {
    headers: {
      'Content-Type': TYPES[ext] ?? 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${name.replace(/[^\w.\-]/g, '_')}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

const notFound = () => new Response('Not found', { status: 404 });

/**
 * Authenticated downloads. Clients can only read their own files; Delegis staff can read any.
 *   /api/files/dossier/<dossierId>/<index>
 *   /api/files/request/<requestId>/<index>
 *   /api/files/message/<messageId>/<index>
 *   /api/files/deliverable/<id>
 *   /api/files/invoice/<id>
 */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const user = await currentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  const [kind, id, idx] = (await params).slug;
  const owner = user.role === 'staff' ? '' : ' AND user_id = $2';
  const args = user.role === 'staff' ? [id] : [id, user.id];

  let file: { name: string; stored: string } | undefined;
  if (kind === 'dossier' || kind === 'message') {
    const [r] = await q<{ files: StoredFile[] | string }>(`SELECT files FROM ${kind === 'dossier' ? 'dossiers' : 'messages'} WHERE id = $1${owner}`, args);
    const files = r ? (typeof r.files === 'string' ? (JSON.parse(r.files) as StoredFile[]) : r.files) : [];
    file = files[Number(idx)];
  } else if (kind === 'request') {
    const [r] = await q<{ answer: { files: StoredFile[] } | string | null }>(`SELECT answer FROM requests WHERE id = $1${owner}`, args);
    const answer = r?.answer ? (typeof r.answer === 'string' ? JSON.parse(r.answer) : r.answer) : null;
    file = answer?.files?.[Number(idx)];
  } else if (kind === 'deliverable') {
    const [r] = await q<{ file_name: string; stored: string }>(`SELECT file_name, stored FROM deliverables WHERE id = $1${owner}`, args);
    if (r) file = { name: r.file_name, stored: r.stored };
  } else if (kind === 'invoice') {
    const [r] = await q<{ number: string; stored: string | null }>(`SELECT number, stored FROM invoices WHERE id = $1${owner}`, args);
    if (r?.stored) file = { name: `${r.number}.pdf`, stored: r.stored };
  }
  if (!file) return notFound();
  const body = await readFile(file.stored);
  return body ? download(body, file.name) : notFound();
}
