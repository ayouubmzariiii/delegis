import type { DemoText } from './demo-types';

const fr: DemoText = {
  months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  monthly: 'Comptabilité {m}',
  vat: 'Préparation TVA T{q} {y}',
  peppolBatch: 'Factures Peppol reçues — lot hebdomadaire',
  leasing: 'Contrat de leasing camionnette',
  payroll: 'Prestations et variables de paie',
  messages: [
    { author: 'team', who: 'manager', daysAgo: 21, body: 'Bonjour Camille, la clôture du mois d’août est terminée. Le rapport est disponible dans l’onglet Documents.' },
    { author: 'client', who: 'client', daysAgo: 20, body: 'Merci Thomas ! Est-ce que la facture Brico Matériaux de 2 340 € a bien été passée en immobilisation ?' },
    { author: 'team', who: 'specialist', daysAgo: 20, body: 'Oui, comptabilisée en 230000 avec un amortissement sur 5 ans. Le tableau est joint au rapport.' },
    { author: 'team', who: 'specialist', daysAgo: 6, body: 'Pour septembre, il nous manque deux pièces : je vous ai créé une demande dans l’onglet Demandes.' },
    { author: 'client', who: 'client', daysAgo: 5, body: 'Je regarde ça demain matin, je les ai dans la camionnette.' },
    { author: 'team', who: 'manager', daysAgo: 1, body: 'Petit rappel : la déclaration TVA du 3e trimestre est préparée. Votre comptable peut la valider sur Intervat avant le 20.' },
  ],
  requests: [
    { title: 'Facture manquante : Total Energies', detail: 'Ticket carburant du 14 septembre (86,40 €) visible sur l’extrait CODA, sans facture correspondante.', open: true, daysAgo: 6, dueInDays: 3 },
    { title: 'Justificatif de paiement Bol.com', detail: 'Encaissement de 1 245,00 € du 22 septembre : merci de nous transmettre le relevé de ventes Bol.com.', open: true, daysAgo: 6, dueInDays: 3 },
    { title: 'Note de crédit fournisseur Würth', detail: 'La note de crédit NC-0091 de juillet a bien été retrouvée et encodée.', open: false, daysAgo: 40, dueInDays: 5 },
  ],
  deliverables: {
    report: 'Rapport mensuel — {m}',
    vat: 'Grille TVA préparée — T{q} {y}',
    ledger: 'Grand livre provisoire {y}',
    peppol: 'Journal Peppol — {m}',
  },
  autoReply: 'Merci pour votre message, c’est bien reçu. Je regarde cela et je reviens vers vous dans la journée.',
};

export default fr;
