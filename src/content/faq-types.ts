import type { QA } from './types';

/** Page-level FAQs for pages that had none. `city` strings contain the {city} placeholder. */
export type Faqs = {
  title: string; // section heading, e.g. "Questions fréquentes"
  services: QA[];
  city: QA[];
  about: QA[];
  contact: QA[];
  careers: QA[];
  guides: QA[];
};
