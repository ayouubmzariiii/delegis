import type { AppText } from './app-types';
import type { DemoText } from './demo-types';
import { localeMeta, type Lang, type Locale } from '@/lib/i18n';
import fr from './app-fr';
import nl from './app-nl';
import en from './app-en';
import ar from './app-ar';
import dfr from './demo-fr';
import dnl from './demo-nl';
import den from './demo-en';
import dar from './demo-ar';

const apps: Record<Lang, AppText> = { fr, nl, en, ar };
const demos: Record<Lang, DemoText> = { fr: dfr, nl: dnl, en: den, ar: dar };

export const getApp = (locale: Locale): AppText => apps[localeMeta[locale].lang];
export const getDemoText = (lang: Lang): DemoText => demos[lang];

/** Replace {placeholders} in a string. */
export const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
