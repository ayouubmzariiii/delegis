import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { alternatesTable, href, paths } from '@/lib/routes';
import { getDict } from '@/content';
import { getExtra } from '@/content/extra';
import { getHook } from '@/content/hook';
import { getUi } from '@/content/ui';
import { Container, ButtonLink } from '@/components/ui/primitives';
import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import { LangSwitcher } from './LangSwitcher';

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const x = getExtra(locale);
  const k = getHook(locale);
  const ui = getUi(locale);
  const nav = [
    { href: href(locale, paths.services()), label: t.nav.services },
    { href: href(locale, paths.pricing()), label: t.nav.pricing },
    { href: href(locale, paths.firms()), label: x.nav.firms },
    { href: href(locale, paths.method()), label: x.nav.method },
    { href: href(locale, paths.guides()), label: x.nav.guides },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-8">
        <Link href={href(locale, paths.home())} aria-label="Delegis">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-paper hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <LangSwitcher locale={locale} table={alternatesTable()} label={t.nav.language} />
          <Link href={href(locale, paths.login())} className="hidden rounded-full px-3 py-2 text-sm text-ink-600 hover:text-ink sm:block">
            {t.nav.login}
          </Link>
          <ButtonLink href={href(locale, paths.contact())} className="hidden md:inline-flex" arrow>
            {k.stickyCta}
          </ButtonLink>
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-ink/5" aria-label={ui.common.menu}>
              <Icon name="menu" />
            </summary>
            <nav aria-label={ui.common.menu} className="absolute end-0 mt-2 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-white p-2 shadow-lift">
              {[...nav, { href: href(locale, paths.contact()), label: t.nav.contact }, { href: href(locale, paths.login()), label: t.nav.login }].map((n) => (
                <Link key={n.href} href={n.href} className="block rounded-xl px-3 py-3 text-[15px] hover:bg-paper">
                  {n.label}
                </Link>
              ))}
              <ButtonLink href={href(locale, paths.contact())} className="mt-2 w-full" arrow>
                {k.hero.cta}
              </ButtonLink>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
