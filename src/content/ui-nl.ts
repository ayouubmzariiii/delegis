import type { Ui } from './ui-types';

const nl: Ui = {
  receipt: {
    title: 'Dossier · september 2026',
    client: 'Brico Pro SRL',
    steps: [
      { label: 'Stukken ontvangen', time: 'ma. 08:12' },
      { label: 'Ingeboekt in Exact Online', time: 'di. 15:40' },
      { label: 'Nagekeken door een tweede boekhouder', time: 'wo. 10:05' },
      { label: 'Bezorgd aan uw boekhouder', time: 'wo. 11:30' },
    ],
    footer: '214 stukken · 0 in behandeling',
  },
  index: {
    label: 'Diensten',
    title: 'Wat wij van uw bureau overnemen',
    lead: 'Dertien diensten, aangerekend per stuk of per dossier. Kies er één, of laat alles aan ons over.',
    colService: 'Dienst',
    colFrom: 'Vanaf',
    all: 'Alle diensten',
  },
  process: { label: 'Werkwijze' },
  pricing: {
    label: 'Tarieven',
    title: 'De prijs, nog voor u ons spreekt',
    lead: 'Verschuif de slider: u ziet wat het inboeken u vandaag kost, en wat het bij ons zou kosten.',
    modelsTitle: 'Twee manieren om te betalen',
  },
  audience: {
    label: 'Voor wie',
    title: 'Twee soorten klanten, dezelfde lat',
    sme: {
      tag: 'Kmo’s en zelfstandigen',
      title: 'Uw boekhouding op orde, zonder aan te werven',
      text: 'U houdt uw accountant. Wij doen het invoerwerk dat elke maand op hem wacht.',
      points: ['Inboeken van aankopen, verkopen, kas', 'Btw voorbereid vóór de deadline', 'Peppol volledig voor u geregeld'],
      cta: 'Bereken mijn prijs',
    },
    firms: {
      tag: 'Boekhoudkantoren en accountants',
      title: 'Meer dossiers, zonder uw kantoor uit te breiden',
      text: 'Een white-label team in uw software, volgens uw afspraken. Uw klanten zien alleen u.',
      points: ['Capaciteit elke maand bij te sturen', 'Vast team op uw dossiers', 'Kantoortarief vanaf 1 500 stukken'],
      cta: 'Het aanbod voor kantoren',
    },
  },
  security: {
    label: 'Beveiliging',
    title: 'Uw gegevens blijven in Europa, en onder controle',
    lead: 'Wat we regelen nog voor we uw eerste dossier aanraken.',
    cta: 'Ons AVG-beleid',
  },
  guides: { label: 'Gidsen', title: 'Te lezen voor u beslist' },
  faq: { label: 'FAQ', more: 'Nog een vraag? Schrijf ons.' },
  footerCta: {
    title: 'Stuur ons een maand aan stukken.',
    text: 'We boeken ze bij wijze van proef in en sturen u het resultaat terug, met een vaste prijs.',
  },
  common: { section: 'Sectie', menu: 'Menu', close: 'Sluiten' },
  demo: { or: 'of', cta: 'Bekijk het demo-account', note: 'Direct toegang tot een portaal met fictieve gegevens.', banner: 'Demo-account · fictieve gegevens, bij elke aanmelding opnieuw ingesteld.', staffCta: "Toegang Delegis-team (demo)" },
};

export default nl;
