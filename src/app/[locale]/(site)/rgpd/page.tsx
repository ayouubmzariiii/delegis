import { resolveLocale, type LocaleParams } from '@/lib/params';
import { buildMetadata } from '@/lib/seo';
import { paths } from '@/lib/routes';
import { crumbs } from '@/lib/crumbs';
import { getDict } from '@/content';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/primitives';

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).privacy;
  return buildMetadata({ locale, pathFor: paths.privacy, title: p.metaTitle, description: p.metaDescription });
}

export default async function PrivacyPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  return (
    <>
      <PageHeader crumbs={crumbs(locale, [t.privacy.h1, paths.privacy()])} label="RGPD · GDPR" title={t.privacy.h1} intro={t.privacy.intro} />
      <Section>
        <ol className="border-t-2 border-go-600">
          {t.privacy.sections.map((s, i) => (
            <li key={s.title} className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-6">
              <span className="font-mono text-xs text-go-700 md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="text-xl font-semibold tracking-tight md:col-span-4">{s.title}</h2>
              <p className="leading-relaxed text-ink-600 md:col-span-7">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
