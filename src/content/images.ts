import type { Lang } from '@/lib/i18n';

/**
 * Photography — Unsplash License (free for commercial use, no attribution required).
 * Every source is at least 3200 px wide; next/image serves resized AVIF/WebP at quality 90.
 * `focus` is the CSS object-position used when a landscape photo is cropped (e.g. portrait on mobile),
 * so the subject stays in frame.
 */
type Photo = { src: string; focus: string; alt: Record<Lang, string> };

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  heroTeam: {
    src: u('1758518726741-6451f7f71348'),
    focus: '28% 40%',
    alt: {
      fr: 'Responsable de compte souriante en réunion avec deux collègues',
      nl: 'Glimlachende accountmanager in overleg met twee collega’s',
      en: 'Smiling account manager meeting with two colleagues',
      ar: 'مسؤولة حسابات مبتسمة في اجتماع مع زميلين',
    },
  },
  teamLaptop: {
    src: u('1758518729841-308509f69a7f'),
    focus: '45% 45%',
    alt: {
      fr: 'Gestionnaires qui analysent ensemble des graphiques financiers',
      nl: 'Dossierbeheerders die samen financiële grafieken bekijken',
      en: 'Case managers reviewing financial charts together',
      ar: 'مسيرو ملفات يراجعون رسومًا بيانية مالية معًا',
    },
  },
  teamWork: {
    src: u('1758518727613-00192aed759b'),
    focus: '50% 40%',
    alt: {
      fr: 'Trois professionnels qui examinent des documents autour d’une table',
      nl: 'Drie professionals die documenten bespreken aan tafel',
      en: 'Three professionals discussing documents at a table',
      ar: 'ثلاثة مهنيين يناقشون وثائق حول طاولة',
    },
  },
  focus: {
    src: u('1762341116897-921e2a52f7ff'),
    focus: '62% 45%',
    alt: {
      fr: 'Gestionnaire de dossiers concentrée à son bureau',
      nl: 'Geconcentreerde dossierbeheerder aan haar bureau',
      en: 'Case manager focused at her desk',
      ar: 'مسيرة ملفات منكبّة على عملها في مكتبها',
    },
  },
  desk: {
    src: u('1772588627327-1eeddcf73c11'),
    focus: '50% 50%',
    alt: {
      fr: 'Vérification de factures avec calculatrice et ordinateur portable',
      nl: 'Facturen controleren met rekenmachine en laptop',
      en: 'Checking invoices with a calculator and laptop',
      ar: 'مراجعة فواتير بآلة حاسبة وحاسوب محمول',
    },
  },
  flatlay: {
    src: u('1554224155-6726b3ff858f'),
    focus: '50% 50%',
    alt: {
      fr: 'Pièces comptables, stylo et calculatrice sur un bureau',
      nl: 'Boekhoudstukken, pen en rekenmachine op een bureau',
      en: 'Accounting documents, pen and calculator on a desk',
      ar: 'مستندات محاسبية وقلم وآلة حاسبة على مكتب',
    },
  },
  brussels: {
    src: u('1626013969117-8c13864fdb2d'),
    focus: '50% 55%',
    alt: { fr: 'Le Mont des Arts à Bruxelles au coucher du soleil', nl: 'De Kunstberg in Brussel bij zonsondergang', en: 'Mont des Arts, Brussels, at sunset', ar: 'جبل الفنون في بروكسل عند الغروب' },
  },
  casablanca: {
    src: u('1758100407916-724c0197a532'),
    focus: '45% 50%',
    alt: { fr: 'La mosquée Hassan II à Casablanca au coucher du soleil', nl: 'De Hassan II-moskee in Casablanca bij zonsondergang', en: 'Hassan II Mosque, Casablanca, at sunset', ar: 'مسجد الحسن الثاني بالدار البيضاء عند الغروب' },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
