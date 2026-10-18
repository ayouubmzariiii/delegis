import type { Hook } from './hook-types';

const nl: Hook = {
  hero: {
    eyebrow: 'Boekhoudkundige back-office voor Belgische bedrijven en kantoren',
    title: 'Uw boekhouding bij,',
    highlight: 'zonder dat het uw avonden kost.',
    text: 'U laadt uw facturen, CODA-uittreksels en loonfiches op. Ons team boekt ze binnen 48 u in uw pakket, controleert alles twee keer, en uw boekhouder moet enkel nog valideren.',
    cta: 'Laat een testmaand inboeken',
    ctaNote: 'Antwoord binnen 24 werkuren · Vrijblijvend',
    secondary: 'Bekijk de tarieven',
  },
  calc: {
    title: 'Wat kost het inboeken u vandaag?',
    docsLabel: 'Stukken in te boeken per maand',
    unit: 'stukken',
    hoursLabel: 'uur inboeken per maand',
    inhouseLabel: 'Geschatte interne kost',
    delegisLabel: 'Met Delegis',
    savingLabel: 'Geschatte besparing per jaar',
    note: 'Basis: 35 stukken/uur en 52 €/uur volledige werkgeverskost. Indicatieve schatting.',
    cta: 'Bereken mijn exacte prijs',
  },
  proof: [
    { value: '48 u', label: 'standaard verwerkingstermijn' },
    { value: '2×', label: 'controle op elk stuk' },
    { value: '1 maand', label: 'opzeg, geen verbintenis' },
    { value: 'EU', label: 'hosting van de gegevens' },
  ],
  bento: {
    label: 'Diensten',
    title: 'Alles wat uw kantoor naar volgende week doorschuift',
    lead: 'Dertien diensten, één aanspreekpunt, in uw eigen pakket.',
    encodingStat: '214 stukken ingeboekt in september voor één klant',
    peppolBadge: 'Verplicht sinds 1 januari 2026',
    rescueSeal: 'Termijn gehaald, of 10 % terug per dag vertraging',
    toolsLabel: 'Werkt met',
    allServices: 'Bekijk de 13 diensten',
  },
  beforeAfter: {
    label: 'Een doorsnee maand',
    title: 'Dezelfde maand, twee manieren om ze te beleven',
    without: 'Zonder Delegis',
    with: 'Met Delegis',
    withoutItems: [
      { day: 'Week 1', text: 'Facturen komen binnen via mail, WhatsApp en een schoenendoos.' },
      { day: 'Week 2', text: 'Iemand boekt ze in tussen twee telefoons door. De CODA’s wachten.' },
      { day: 'Week 3', text: 'De boekhouder belt: er ontbreken stukken voor de btw.' },
      { day: 'Week 4', text: 'Een avond alles inhalen vóór de deadline.' },
    ],
    withItems: [
      { day: 'Dag 1', text: 'U sleept de stukken in het portaal, of ze komen binnen via Peppol.' },
      { day: 'Dag 2', text: 'Alles is ingeboekt en gecontroleerd in uw pakket.' },
      { day: 'Dag 3', text: 'Ontbrekende stukken vragen we u één voor één op, in het portaal.' },
      { day: 'Einde maand', text: 'Uw boekhouder krijgt een net dossier en een voorbereide btw.' },
    ],
    withoutSummary: '≈ 17 u intern werk en een stresserende deadline',
    withSummary: '≈ 20 minuten van uw tijd, de rest is gedaan',
  },
  risk: [
    { title: 'Een testmaand', text: 'We boeken een echte maand in. U vergelijkt met uw eigen werk en beslist dan.' },
    { title: 'Geen verbintenis', text: 'Maandcontract, opzegbaar met een maand opzeg.' },
    { title: 'Gegarandeerde termijn', text: 'Bij Dossier Rescue: 10 werkdagen of gedeeltelijke terugbetaling.' },
  ],
  stickyCta: 'Testmaand',
};

export default nl;
