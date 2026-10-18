import type { Ui } from './ui-types';

const fr: Ui = {
  receipt: {
    title: 'Dossier · septembre 2026',
    client: 'Brico Pro SRL',
    steps: [
      { label: 'Pièces reçues', time: 'lun. 08:12' },
      { label: 'Encodées dans Exact Online', time: 'mar. 15:40' },
      { label: 'Contrôle par un second gestionnaire', time: 'mer. 10:05' },
      { label: 'Livré à votre comptable', time: 'mer. 11:30' },
    ],
    footer: '214 pièces · 0 en attente',
  },
  index: {
    label: 'Services',
    title: 'Ce que nous retirons de votre bureau',
    lead: 'Treize services, facturés à la pièce ou au dossier. Choisissez-en un, ou laissez-nous le tout.',
    colService: 'Service',
    colFrom: 'À partir de',
    all: 'Tous les services',
  },
  process: { label: 'Méthode' },
  pricing: {
    label: 'Tarifs',
    title: 'Le prix, avant même de nous parler',
    lead: 'Glissez le curseur : vous voyez ce que l’encodage vous coûte aujourd’hui, et ce qu’il coûterait chez nous.',
    modelsTitle: 'Deux façons de payer',
  },
  audience: {
    label: 'Pour qui',
    title: 'Deux types de clients, une même exigence',
    sme: {
      tag: 'PME et indépendants',
      title: 'Votre comptabilité tenue, sans recruter',
      text: 'Vous gardez votre expert-comptable. Nous faisons le travail de saisie qui l’attend chaque mois.',
      points: ['Encodage achats, ventes, caisse', 'TVA préparée avant l’échéance', 'Peppol géré de bout en bout'],
      cta: 'Estimer mon prix',
    },
    firms: {
      tag: 'Fiduciaires et experts-comptables',
      title: 'Plus de dossiers, sans agrandir le bureau',
      text: 'Une équipe en marque blanche dans vos logiciels, avec vos conventions. Vos clients ne voient que vous.',
      points: ['Capacité ajustable chaque mois', 'Même équipe sur vos dossiers', 'Tarif cabinet dès 1 500 pièces'],
      cta: 'L’offre pour les cabinets',
    },
  },
  security: {
    label: 'Sécurité',
    title: 'Vos données restent en Europe, et sous contrôle',
    lead: 'Ce que nous mettons en place avant de toucher à votre premier dossier.',
    cta: 'Notre politique RGPD',
  },
  guides: { label: 'Guides', title: 'À lire avant de décider' },
  faq: { label: 'FAQ', more: 'Une autre question ? Écrivez-nous.' },
  footerCta: {
    title: 'Envoyez-nous un mois de pièces.',
    text: 'On l’encode à titre d’essai et on vous renvoie le résultat avec un prix ferme.',
  },
  common: { section: 'Section', menu: 'Menu', close: 'Fermer' },
  demo: { or: 'ou', cta: 'Explorer le compte démo', note: 'Accès instantané à un portail rempli de données fictives.', banner: 'Compte de démonstration · données fictives, réinitialisées à chaque connexion.', staffCta: "Accès équipe Delegis (démo)" },
};

export default fr;
