import type { DemoText } from './demo-types';

const nl: DemoText = {
  months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  monthly: 'Boekhouding {m}',
  vat: 'Voorbereiding btw K{q} {y}',
  peppolBatch: 'Ontvangen Peppol-facturen — wekelijkse batch',
  leasing: 'Leasecontract bestelwagen',
  payroll: 'Prestaties en loonvariabelen',
  messages: [
    { author: 'team', who: 'manager', daysAgo: 21, body: 'Dag Camille, de afsluiting van augustus is klaar. Het rapport staat bij Documenten.' },
    { author: 'client', who: 'client', daysAgo: 20, body: 'Bedankt Thomas! Is de factuur van Brico Matériaux van € 2.340 wel als investering geboekt?' },
    { author: 'team', who: 'specialist', daysAgo: 20, body: 'Ja, geboekt op 230000 met een afschrijving over 5 jaar. De tabel zit bij het rapport.' },
    { author: 'team', who: 'specialist', daysAgo: 6, body: 'Voor september ontbreken nog twee stukken: ik heb een aanvraag voor u aangemaakt bij Aanvragen.' },
    { author: 'client', who: 'client', daysAgo: 5, body: 'Ik bekijk het morgenvroeg, ze liggen nog in de bestelwagen.' },
    { author: 'team', who: 'manager', daysAgo: 1, body: 'Kleine herinnering: de btw-aangifte voor het 3e kwartaal is klaar. Uw boekhouder kan ze vóór de 20e indienen via Intervat.' },
  ],
  requests: [
    { title: 'Ontbrekende factuur: Total Energies', detail: 'Tankticket van 14 september (€ 86,40) zichtbaar op het CODA-uittreksel, zonder bijhorende factuur.', open: true, daysAgo: 6, dueInDays: 3 },
    { title: 'Betalingsbewijs Bol.com', detail: 'Ontvangst van € 1.245,00 op 22 september: bezorg ons graag het verkoopoverzicht van Bol.com.', open: true, daysAgo: 6, dueInDays: 3 },
    { title: 'Creditnota leverancier Würth', detail: 'Creditnota NC-0091 van juli is teruggevonden en ingeboekt.', open: false, daysAgo: 40, dueInDays: 5 },
  ],
  deliverables: {
    report: 'Maandrapport — {m}',
    vat: 'Voorbereid btw-rooster — K{q} {y}',
    ledger: 'Voorlopig grootboek {y}',
    peppol: 'Peppol-dagboek — {m}',
  },
  autoReply: 'Bedankt voor uw bericht, goed ontvangen. Ik bekijk het en laat vandaag nog iets weten.',
};

export default nl;
