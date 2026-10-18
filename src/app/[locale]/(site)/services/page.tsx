import { resolveLocale, type LocaleParams } from '@/lib/params';
import { getFaqs } from '@/content/faq';
import { FaqSection } from '@/components/sections/FaqSection';
import { absUrl, buildMetadata, itemListLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { getDict, serviceCategory } from '@/content';
import { getUi } from '@/content/ui';
import type { ServiceCategory } from '@/content/types';
import { PageHeader } from '@/components/sections/PageHeader';
import { ServiceIndex } from '@/components/sections/ServiceIndex';
import { Section, Eyebrow } from '@/components/ui/primitives';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDict(locale).servicesPage;
  return buildMetadata({ locale, pathFor: paths.services, title: t.metaTitle, description: t.metaDescription });
}

const order: ServiceCategory[] = ['accounting', 'payroll', 'data', 'customer', 'special'];

export default async function ServicesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const faqs = getFaqs(locale);
  const t = getDict(locale);
  const ui = getUi(locale);
  return (
    <>
      <JsonLd data={itemListLd(t.servicesPage.h1, t.services.map((s) => ({ name: s.name, url: absUrl(locale, paths.service(locale, s.id)) })))} />
      <PageHeader crumbs={crumbs(locale, [t.nav.services, paths.services()])} label={ui.index.label} title={t.servicesPage.h1} intro={t.servicesPage.intro} />
      <Section>
        <div className="space-y-20">
          {order.map((cat, i) => (
            <div key={cat} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow index={String(i + 1).padStart(2, '0')}>{t.servicesPage.categories[cat]}</Eyebrow>
              </div>
              <div className="lg:col-span-8">
                <ServiceIndex locale={locale} services={t.services.filter((s) => serviceCategory[s.id] === cat)} colService={ui.index.colService} colFrom={ui.index.colFrom} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <FaqSection title={faqs.title} items={faqs.services} />
    </>
  );
}
