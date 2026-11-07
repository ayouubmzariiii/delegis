import 'server-only';

const FIELDS: [string, string][] = [
  ['name', 'Nom'],
  ['company', 'Société'],
  ['email', 'E-mail'],
  ['phone', 'Téléphone'],
  ['service', 'Service'],
  ['estimate', 'Estimation'],
  ['message', 'Message'],
];

/**
 * E-mails each contact request to the team through Resend, when RESEND_API_KEY and LEAD_NOTIFY_EMAIL
 * are set. Requests are always stored first (admin → Demandes), so a failed e-mail never loses a lead.
 */
export async function notifyLead(locale: string, data: Record<string, string>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!key || !to) return;
  const lines = FIELDS.filter(([k]) => data[k]).map(([k, label]) => `${label} : ${data[k]}`);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Resend's shared sender works without a verified domain, for mail to your own account address.
        from: process.env.LEAD_FROM_EMAIL || 'Delegis <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()),
        reply_to: data.email || undefined,
        subject: `Nouvelle demande : ${data.company || data.name} (${locale})`,
        text: [...lines, '', `Langue du site : ${locale}`].join('\n'),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error('Lead e-mail failed', res.status, await res.text());
  } catch (e) {
    console.error('Lead e-mail failed', e);
  }
}
