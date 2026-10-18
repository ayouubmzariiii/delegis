'use client';

import { useSearchParams } from 'next/navigation';
import type { Dict } from '@/content/types';
import { ContactForm } from '@/components/sections/Forms';

/** Reads the estimator query (?est=…&sales=…) so the page itself stays static. */
export function ContactPrefill({ t, services, locale }: { t: Dict['contact']; services: { id: string; name: string }[]; locale: string }) {
  const q = useSearchParams();
  const est = q.get('est');
  const estimate = est
    ? `≈ €${est}/mo · sales ${q.get('sales')} · purchases ${q.get('purchases')} · employees ${q.get('employees')} · cash ${q.get('cash')} · options ${q.get('opts') || '-'}`
    : undefined;
  return <ContactForm t={t} services={services} locale={locale} estimate={estimate} defaultService={services.find((s) => s.id === q.get('service'))?.name} />;
}
