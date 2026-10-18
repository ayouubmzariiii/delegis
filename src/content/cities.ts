import type { Lang, Market } from '@/lib/i18n';

export type City = { id: string; country: Market; slug: Record<Lang, string>; name: Record<Lang, string>; region: string };

export const cities: City[] = [
  { id: 'brussels', country: 'BE', region: 'Bruxelles-Capitale', slug: { fr: 'bruxelles', nl: 'brussel', en: 'brussels', ar: 'brussels' }, name: { fr: 'Bruxelles', nl: 'Brussel', en: 'Brussels', ar: 'بروكسل' } },
  { id: 'antwerp', country: 'BE', region: 'Antwerpen', slug: { fr: 'anvers', nl: 'antwerpen', en: 'antwerp', ar: 'antwerp' }, name: { fr: 'Anvers', nl: 'Antwerpen', en: 'Antwerp', ar: 'أنتويرب' } },
  { id: 'ghent', country: 'BE', region: 'Oost-Vlaanderen', slug: { fr: 'gand', nl: 'gent', en: 'ghent', ar: 'ghent' }, name: { fr: 'Gand', nl: 'Gent', en: 'Ghent', ar: 'غنت' } },
  { id: 'liege', country: 'BE', region: 'Liège', slug: { fr: 'liege', nl: 'luik', en: 'liege', ar: 'liege' }, name: { fr: 'Liège', nl: 'Luik', en: 'Liège', ar: 'لييج' } },
  { id: 'charleroi', country: 'BE', region: 'Hainaut', slug: { fr: 'charleroi', nl: 'charleroi', en: 'charleroi', ar: 'charleroi' }, name: { fr: 'Charleroi', nl: 'Charleroi', en: 'Charleroi', ar: 'شارلروا' } },
  { id: 'namur', country: 'BE', region: 'Namur', slug: { fr: 'namur', nl: 'namen', en: 'namur', ar: 'namur' }, name: { fr: 'Namur', nl: 'Namen', en: 'Namur', ar: 'نامور' } },
  { id: 'leuven', country: 'BE', region: 'Vlaams-Brabant', slug: { fr: 'louvain', nl: 'leuven', en: 'leuven', ar: 'leuven' }, name: { fr: 'Louvain', nl: 'Leuven', en: 'Leuven', ar: 'لوفن' } },
  { id: 'casablanca', country: 'MA', region: 'Casablanca-Settat', slug: { fr: 'casablanca', nl: 'casablanca', en: 'casablanca', ar: 'casablanca' }, name: { fr: 'Casablanca', nl: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء' } },
  { id: 'rabat', country: 'MA', region: 'Rabat-Salé-Kénitra', slug: { fr: 'rabat', nl: 'rabat', en: 'rabat', ar: 'rabat' }, name: { fr: 'Rabat', nl: 'Rabat', en: 'Rabat', ar: 'الرباط' } },
  { id: 'tangier', country: 'MA', region: 'Tanger-Tétouan-Al Hoceïma', slug: { fr: 'tanger', nl: 'tanger', en: 'tangier', ar: 'tangier' }, name: { fr: 'Tanger', nl: 'Tanger', en: 'Tangier', ar: 'طنجة' } },
  { id: 'marrakech', country: 'MA', region: 'Marrakech-Safi', slug: { fr: 'marrakech', nl: 'marrakesh', en: 'marrakech', ar: 'marrakech' }, name: { fr: 'Marrakech', nl: 'Marrakesh', en: 'Marrakech', ar: 'مراكش' } },
];

export function citiesForMarket(market: Market) {
  return [...cities].sort((a, b) => (a.country === market ? 0 : 1) - (b.country === market ? 0 : 1));
}
