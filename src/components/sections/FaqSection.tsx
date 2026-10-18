import type { QA } from '@/content/types';
import { Section, Heading } from '@/components/ui/primitives';
import { Accordion } from '@/components/ui/Accordion';

/**
 * Two-column FAQ block. Emits exactly one FAQPage JSON-LD node,
 * so use it at most once per page.
 */
export function FaqSection({ title, items, index, label = 'FAQ', city }: { title: string; items: QA[]; index?: string; label?: string; city?: string }) {
  const resolved = city ? items.map((f) => ({ q: f.q.replaceAll('{city}', city), a: f.a.replaceAll('{city}', city) })) : items;
  return (
    <Section labelledBy="faq" className="border-t border-line">
      <div className="grid gap-10 lg:grid-cols-12">
        <Heading index={index} label={label} title={title} id="faq" size="md" className="lg:col-span-4" />
        <div className="lg:col-span-8">
          <Accordion items={resolved} />
        </div>
      </div>
    </Section>
  );
}
