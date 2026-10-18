import Link from 'next/link';
import { localeMeta, type Locale } from '@/lib/i18n';
import { href, paths } from '@/lib/routes';
import { site } from '@/lib/site';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';
import { getHook } from '@/content/hook';
import { getUi } from '@/content/ui';
import { citiesForMarket } from '@/content/cities';
import { Container, ButtonLink } from '@/components/ui/primitives';
import { Logo } from '@/components/ui/Logo';

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const x = getExtra(locale);
  const k = getHook(locale);
  const ui = getUi(locale);
  const { market } = localeMeta[locale];

  const columns: { title: string; links: { href: string; label: string }[] }[] = [
    { title: t.footer.servicesTitle, links: t.services.slice(0, 7).map((s) => ({ href: href(locale, paths.service(locale, s.id)), label: s.name })) },
    {
      title: t.footer.companyTitle,
      links: [
        { href: href(locale, paths.pricing()), label: t.nav.pricing },
        { href: href(locale, paths.firms()), label: x.nav.firms },
        { href: href(locale, paths.method()), label: x.nav.method },
        { href: href(locale, paths.guides()), label: x.nav.guides },
        { href: href(locale, paths.careers()), label: x.nav.careers },
        { href: href(locale, paths.about()), label: t.nav.about },
        { href: href(locale, paths.contact()), label: t.nav.contact },
      ],
    },
    { title: t.footer.citiesTitle, links: citiesForMarket(market).slice(0, 7).map((c) => ({ href: href(locale, paths.city(locale, c.id)), label: c.name[localeMeta[locale].lang] })) },
  ];

  return (
    <footer className="surface-blue text-white">
      <Container>
        {/* Closing CTA lives in the footer so every page ends on it. */}
        <div className="grid gap-8 border-b border-white/10 py-20 lg:grid-cols-12 lg:items-end">
          <h2 className="text-display-lg font-semibold lg:col-span-8">{ui.footerCta.title}</h2>
          <div className="lg:col-span-4">
            <p className="text-white/70">{ui.footerCta.text}</p>
            <ButtonLink href={href(locale, paths.contact())} variant="inverse" size="lg" className="mt-6" arrow>
              {k.hero.cta}
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo inverse />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.tagline}</p>
            <div className="mt-8 space-y-4 text-sm text-white/60">
              {site.offices.map((o) => (
                <address key={o.id} className="not-italic">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-mark">{o.city}</span>
                  <br />
                  {o.street}, {o.postalCode} {o.city}
                  <br />
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="hover:text-white" dir="ltr">
                    {o.phone}
                  </a>
                </address>
              ))}
            </div>
          </div>
          {columns.map((c, i) => (
            <div key={c.title} className={i === 0 ? 'lg:col-span-3' : i === 1 ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">{c.title}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/80 transition-colors hover:text-mark">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Delegis · {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href={href(locale, paths.privacy())} className="hover:text-white">{t.privacy.h1}</Link>
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            <span dir="ltr">{site.vat}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
