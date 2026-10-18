import Link from 'next/link';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/ui/JsonLd';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { breadcrumbLd } from '@/lib/seo';
import type { Lang } from '@/lib/i18n';
import type { PhotoKey } from '@/content/images';
import { Photo } from '@/components/ui/Photo';

export type Crumb = { name: string; href: string; url: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">
          {items.map((it, i) => (
            <li key={it.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < items.length - 1 ? (
                <Link href={it.href} className="hover:text-ink">{it.name}</Link>
              ) : (
                <span aria-current="page" className="text-ink">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}

/** Standard inner-page header: breadcrumbs, eyebrow, H1 (+ italic accent), intro, optional aside. */
export function PageHeader({
  crumbs,
  label,
  title,
  intro,
  aside,
  photo,
  children,
}: {
  crumbs: Crumb[];
  label?: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
  /** Optional wide photo band under the title. */
  photo?: { k: PhotoKey; lang: Lang };
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="ruled absolute inset-0" />
      <Container className="relative pb-16 pt-10 sm:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className={aside ? 'lg:col-span-8' : 'lg:col-span-10'}>
            {label && <Eyebrow>{label}</Eyebrow>}
            <h1 className="mt-5 text-display-lg font-semibold">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{intro}</p>}
            {children}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
        {photo && (
          <div className="relative mt-14 aspect-[16/10] overflow-hidden rounded-[2rem] bg-paper-200 sm:aspect-[21/9]">
            <Photo k={photo.k} lang={photo.lang} sizes="(min-width: 1216px) 1216px, 100vw" priority />
          </div>
        )}
      </Container>
    </section>
  );
}
