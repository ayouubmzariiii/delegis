export type Hook = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    cta: string;
    ctaNote: string; // under the button
    secondary: string;
  };
  calc: {
    title: string; // "Combien vous coûte l'encodage aujourd'hui ?"
    docsLabel: string;
    unit: string;
    hoursLabel: string; // "heures d'encodage par mois"
    inhouseLabel: string; // "coût interne estimé"
    delegisLabel: string; // "avec Delegis"
    savingLabel: string; // "économie par an"
    note: string;
    cta: string;
  };
  proof: { value: string; label: string }[]; // 4 items
  bento: {
    label: string;
    title: string;
    lead: string;
    encodingStat: string; // "214 pièces encodées · septembre"
    peppolBadge: string; // "Obligatoire depuis le 01/01/2026"
    rescueSeal: string; // "10 jours ou 10 % remboursés par jour de retard"
    toolsLabel: string;
    allServices: string;
  };
  beforeAfter: {
    label: string;
    title: string;
    without: string; // tab label
    with: string; // tab label
    withoutItems: { day: string; text: string }[]; // 4
    withItems: { day: string; text: string }[]; // 4
    withoutSummary: string;
    withSummary: string;
  };
  risk: { title: string; text: string }[]; // 3
  stickyCta: string;
};
