import type { Faqs } from './faq-types';
import { localeMeta, type Lang, type Locale } from '@/lib/i18n';
import fr from './faq-fr';
import nl from './faq-nl';
import en from './faq-en';
import ar from './faq-ar';

const all: Record<Lang, Faqs> = { fr, nl, en, ar };

export const getFaqs = (locale: Locale): Faqs => all[localeMeta[locale].lang];
