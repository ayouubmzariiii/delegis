/** Strings introduced by the v2 layout. Everything else is reused from the existing dictionaries. */
export type Ui = {
  receipt: {
    title: string; // "Dossier · septembre 2026"
    client: string; // "Brico Pro SRL"
    steps: { label: string; time: string }[]; // 4: received, encoded, checked, delivered
    footer: string; // "214 pièces · 0 en attente"
  };
  index: { label: string; title: string; lead: string; colService: string; colFrom: string; all: string };
  process: { label: string };
  pricing: { label: string; title: string; lead: string; modelsTitle: string };
  audience: {
    label: string;
    title: string;
    sme: { tag: string; title: string; text: string; points: string[]; cta: string };
    firms: { tag: string; title: string; text: string; points: string[]; cta: string };
  };
  security: { label: string; title: string; lead: string; cta: string };
  guides: { label: string; title: string };
  faq: { label: string; more: string };
  footerCta: { title: string; text: string };
  common: { section: string; menu: string; close: string };
  demo: { or: string; cta: string; note: string; banner: string; staffCta: string };
};
