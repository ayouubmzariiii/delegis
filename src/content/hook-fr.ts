import type { Hook } from './hook-types';

const fr: Hook = {
  hero: {
    eyebrow: 'Back-office comptable pour entreprises et fiduciaires belges',
    title: 'Votre comptabilité à jour,',
    highlight: 'sans y passer vos soirées.',
    text: 'Vous déposez vos factures, extraits CODA et fiches de paie. Notre équipe les encode dans votre logiciel sous 48 h, contrôle tout deux fois, et votre comptable n’a plus qu’à valider.',
    cta: 'Faire encoder un mois test',
    ctaNote: 'Réponse sous 24 h ouvrables · Sans engagement',
    secondary: 'Voir les tarifs',
  },
  calc: {
    title: 'Combien vous coûte l’encodage aujourd’hui ?',
    docsLabel: 'Pièces à encoder par mois',
    unit: 'pièces',
    hoursLabel: 'heures d’encodage par mois',
    inhouseLabel: 'Coût interne estimé',
    delegisLabel: 'Avec Delegis',
    savingLabel: 'Économie estimée par an',
    note: 'Base : 35 pièces/heure et 52 €/heure de coût employeur complet. Estimation indicative.',
    cta: 'Calculer mon prix exact',
  },
  proof: [
    { value: '48 h', label: 'délai de traitement standard' },
    { value: '2×', label: 'contrôle sur chaque pièce' },
    { value: '1 mois', label: 'de préavis, aucun engagement' },
    { value: 'UE', label: 'hébergement des données' },
  ],
  bento: {
    label: 'Services',
    title: 'Tout ce que votre bureau repousse à la semaine prochaine',
    lead: 'Treize services, un seul interlocuteur, dans votre logiciel.',
    encodingStat: '214 pièces encodées en septembre pour un client',
    peppolBadge: 'Obligatoire depuis le 1er janvier 2026',
    rescueSeal: 'Délai tenu, ou 10 % remboursés par jour de retard',
    toolsLabel: 'Compatible avec',
    allServices: 'Voir les 13 services',
  },
  beforeAfter: {
    label: 'Le mois type',
    title: 'Le même mois, deux façons de le vivre',
    without: 'Sans Delegis',
    with: 'Avec Delegis',
    withoutItems: [
      { day: 'Semaine 1', text: 'Les factures arrivent par e-mail, sur WhatsApp, dans une boîte à chaussures.' },
      { day: 'Semaine 2', text: 'Quelqu’un les encode entre deux appels. Les CODA attendent.' },
      { day: 'Semaine 3', text: 'Le comptable relance : il manque des pièces pour la TVA.' },
      { day: 'Semaine 4', text: 'Soirée à tout rattraper avant l’échéance.' },
    ],
    withItems: [
      { day: 'Jour 1', text: 'Vous glissez les pièces dans le portail, ou elles arrivent via Peppol.' },
      { day: 'Jour 2', text: 'Tout est encodé et contrôlé dans votre logiciel.' },
      { day: 'Jour 3', text: 'Les pièces manquantes vous sont demandées, une par une, dans le portail.' },
      { day: 'Fin du mois', text: 'Votre comptable reçoit un dossier propre et la TVA préparée.' },
    ],
    withoutSummary: '≈ 17 h de travail interne et une échéance stressante',
    withSummary: '≈ 20 minutes de votre temps, le reste est fait',
  },
  risk: [
    { title: 'Un mois test', text: 'On encode un mois réel. Vous comparez avec votre travail avant de décider.' },
    { title: 'Aucun engagement', text: 'Contrat mensuel, résiliable avec un mois de préavis.' },
    { title: 'Délai garanti', text: 'Sur Dossier Rescue : 10 jours ouvrables ou remboursement partiel.' },
  ],
  stickyCta: 'Mois test',
};

export default fr;
