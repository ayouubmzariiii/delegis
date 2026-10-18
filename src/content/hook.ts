import type { Hook } from './hook-types';
import { localeMeta, type Lang, type Locale } from '@/lib/i18n';
import fr from './hook-fr';
import nl from './hook-nl';
import en from './hook-en';
import ar from './hook-ar';

const hooks: Record<Lang, Hook> = { fr, nl, en, ar };

export const getHook = (locale: Locale): Hook => hooks[localeMeta[locale].lang];
