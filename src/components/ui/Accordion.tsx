import type { QA } from '@/content/types';
import { JsonLd } from './JsonLd';
import { faqLd } from '@/lib/seo';

/** Native <details> accordion: accessible, works without JS, emits FAQPage schema. */
export function Accordion({ items, schema = true }: { items: QA[]; schema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer items-start justify-between gap-6">
              <h3 className="text-[17px] font-medium leading-snug">{f.q}</h3>
              <span aria-hidden="true" className="relative mt-1 h-4 w-4 shrink-0">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink" />
                <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink transition-transform group-open:scale-y-0" />
              </span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">{f.a}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqLd(items)} />}
    </>
  );
}
