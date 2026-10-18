export const locales = ['fr-be', 'nl-be', 'en', 'fr-ma', 'ar-ma'] as const;
export type Locale = (typeof locales)[number];
export type Lang = 'fr' | 'nl' | 'en' | 'ar';
export type Market = 'BE' | 'MA';

export const defaultLocale: Locale = 'fr-be';

export const localeMeta: Record<
  Locale,
  { lang: Lang; hreflang: string; ogLocale: string; market: Market; dir: 'ltr' | 'rtl'; label: string; short: string }
> = {
  'fr-be': { lang: 'fr', hreflang: 'fr-BE', ogLocale: 'fr_BE', market: 'BE', dir: 'ltr', label: 'Français (Belgique)', short: 'FR · BE' },
  'nl-be': { lang: 'nl', hreflang: 'nl-BE', ogLocale: 'nl_BE', market: 'BE', dir: 'ltr', label: 'Nederlands (België)', short: 'NL · BE' },
  en: { lang: 'en', hreflang: 'en', ogLocale: 'en_GB', market: 'BE', dir: 'ltr', label: 'English', short: 'EN' },
  'fr-ma': { lang: 'fr', hreflang: 'fr-MA', ogLocale: 'fr_MA', market: 'MA', dir: 'ltr', label: 'Français (Maroc)', short: 'FR · MA' },
  'ar-ma': { lang: 'ar', hreflang: 'ar-MA', ogLocale: 'ar_MA', market: 'MA', dir: 'rtl', label: 'العربية (المغرب)', short: 'AR · MA' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
