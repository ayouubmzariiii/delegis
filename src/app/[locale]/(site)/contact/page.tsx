import { Suspense } from 'react';
import { getFaqs } from '@/content/faq';
import { FaqSection } from '@/components/sections/FaqSection';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { buildMetadata } from '@/lib/seo';
import { paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { site } from '@/lib/site';
import { getDict } from '@/content';
import { getHook } from '@/content/hook';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/primitives';
import { Icon } from '@/components/ui/Icon';
import { ContactPrefill } from './prefill';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const c = getDict(locale).contact;
  return buildMetadata({ locale, pathFor: paths.contact, title: c.metaTitle, description: c.metaDescription });
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const faqs = getFaqs(locale);
  const t = getDict(locale);
  const k = getHook(locale);
  return (
    <>
      <PageHeader crumbs={crumbs(locale, [t.nav.contact, paths.contact()])} label={t.nav.contact} title={t.contact.h1} intro={t.contact.intro} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense>
              <ContactPrefill t={t.contact} services={t.services.map((s) => ({ id: s.id, name: s.name }))} locale={locale} />
            </Suspense>
          </div>
          <aside className="space-y-8 lg:col-span-4 lg:col-start-9">
            <ul className="space-y-4 border-t-2 border-go-600 pt-6">
              {k.risk.map((r) => (
                <li key={r.title} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-go-600" />
                  <span>
                    <span className="block font-medium">{r.title}</span>
                    <span className="text-sm text-ink-600">{r.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{t.contact.officesTitle}</p>
              {site.offices.map((o) => (
                <address key={o.id} className="mt-4 not-italic">
                  <span className="font-medium">{o.city}</span>
                  <br />
                  <span className="text-sm text-ink-600">{o.street}, {o.postalCode}</span>
                  <br />
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="text-sm underline-offset-4 hover:underline" dir="ltr">{o.phone}</a>
                </address>
              ))}
              <a href={`mailto:${site.email}`} className="mt-4 block text-sm font-medium underline underline-offset-4">{site.email}</a>
            </div>
          </aside>
        </div>
      </Section>
      <FaqSection title={faqs.title} items={faqs.contact} />
    </>
  );
}
