import type { Ui } from './ui-types';
import { localeMeta, type Lang, type Locale } from '@/lib/i18n';
import fr from './ui-fr';
import nl from './ui-nl';
import en from './ui-en';
import ar from './ui-ar';

const uis: Record<Lang, Ui> = { fr, nl, en, ar };

export const getUi = (locale: Locale): Ui => uis[localeMeta[locale].lang];
