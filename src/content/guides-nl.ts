import type { Article } from './extra-types';

/** Guides published in November 2026 (nl). Same ids, structure and links in every language. */
export const guidesNl: Article[] = [
  {
    id: 'vat-deadlines',
    slug: 'btw-aangifte-belgie-termijnen-kalender',
    title: 'Btw-aangifte in België: termijnen, kalender en valkuilen',
    metaTitle: 'Btw-aangifte België: termijnen en kalender 2026',
    metaDescription:
      'Maandelijks op de 20e, per kwartaal op de 25e: de termijnen van de Belgische btw-aangifte, de listings die u niet mag vergeten en een vaste methode.',
    excerpt: 'Welke termijnen voor uw onderneming gelden, wat u samen met de aangifte indient en hoe u elke periode zonder stress voorbereidt.',
    readingMinutes: 7,
    date: '2026-11-07',
    sections: [
      {
        h2: 'Maandelijks of per kwartaal: welk stelsel geldt?',
        paragraphs: [
          'In België is de periodieke btw-aangifte in principe maandelijks. Een onderneming mag per kwartaal aangeven zolang haar jaaromzet exclusief btw niet hoger is dan 2,5 miljoen euro, behalve voor bepaalde activiteiten (energieproducten, nieuwe voertuigen, gsm’s, computers…) waarvoor de drempel veel lager ligt.',
          'Het kwartaalstelsel beperkt de administratie, maar vertraagt ook de terugbetaling van een btw-tegoed. Een onderneming die veel investeert of exporteert, heeft er vaak belang bij om maandelijks aan te geven. Dat vraagt u aan bij het bevoegde btw-kantoor.',
        ],
      },
      {
        h2: 'De termijnen voor indiening en betaling',
        paragraphs: [
          'Sinds de hervorming die in 2025 in werking trad, gelden niet meer voor iedereen dezelfde termijnen. Aangifte en betaling moeten op dezelfde datum bij de FOD Financiën zijn.',
        ],
        bullets: [
          'Maandaangifte: uiterlijk de 20e van de maand na de periode (de btw van maart wordt aangegeven en betaald tegen 20 april).',
          'Kwartaalaangifte: uiterlijk de 25e van de maand na het kwartaal, dus 25 april, 25 juli, 25 oktober en 25 januari.',
          'Valt de vervaldag op een zaterdag, zondag of feestdag, controleer dan de exacte datum die de FOD Financiën op MyMinfin publiceert: die is bepalend.',
          'De betaling moet op de vervaldag op de rekening van de FOD Financiën staan, niet alleen opgedragen zijn: reken op een of twee werkdagen marge.',
        ],
      },
      {
        h2: 'Wat u naast de aangifte niet mag vergeten',
        paragraphs: ['De periodieke aangifte is maar een deel van de btw-verplichtingen. Drie andere documenten komen regelmatig terug:'],
        bullets: [
          'De intracommunautaire opgave (listing van leveringen en diensten aan btw-plichtige klanten in de EU), met dezelfde periodiciteit als de aangifte.',
          'De jaarlijkse klantenlisting van Belgische btw-plichtige klanten, uiterlijk op 31 maart van het volgende jaar.',
          'Bijzondere of verbeterende aangiften wanneer een fout aan het licht komt: spontaan corrigeren is beter dan wachten op een controle.',
        ],
      },
      {
        h2: 'Wat een laattijdige aangifte kost',
        paragraphs: [
          'Een laattijdige aangifte leidt tot een administratieve boete die stijgt bij herhaling, en een laattijdige betaling levert nalatigheidsinteresten op de verschuldigde btw op. Los van het geld trekken herhaalde vertragingen de aandacht van de administratie en bemoeilijken ze terugbetalingen.',
          'In de praktijk komen de meeste vertragingen niet van de btw-berekening, maar van ontbrekende stukken: laat ontvangen aankoopfacturen, onverwerkte rekeninguittreksels, vergeten creditnota’s.',
        ],
      },
      {
        h2: 'Een eenvoudige methode om niet meer te moeten haasten',
        paragraphs: [
          'De btw bereidt u tijdens de periode voor, niet erna. Als de facturen [elke week ingeboekt](service:encoding) worden en de uittreksels doorlopend afgepunt, is de aangifte nog maar een eindcontrole.',
          'Sinds 2026 komen B2B-facturen grotendeels via Peppol binnen: ze zijn sneller te verwerken, op voorwaarde dat iemand de inbox opvolgt. Onze gids over [e-facturatie via Peppol](guide:peppol-2026) gaat daar dieper op in.',
        ],
        bullets: [
          'Dag 1 tot 5 na het einde van de periode: ontbrekende stukken opvragen.',
          'Dag 5 tot 10: boekingen afgerond, bankafstemming klaar.',
          'Dag 10 tot 15: btw-rooster voorbereid, consistentiecontroles, validatie door de boekhouder.',
          'Voor de vervaldag: indiening via Intervat en betaling, met enkele dagen marge.',
        ],
      },
      {
        h2: 'De controles vóór de indiening',
        paragraphs: [
          'Een goed voorbereide aangifte controleert u in enkele minuten: de verschuldigde btw past bij de omzet van de periode, verleggingen (medecontractant, intracommunautair) staan aan beide kanten van het rooster, en er wordt geen btw afgetrokken op niet-aftrekbare kosten zoals restaurants of een deel van de wagens.',
          'Wilt u die voorbereiding uitbesteden? Onze dienst [voorbereiding van de btw-aangifte](service:vat) levert een gecontroleerd rooster, klaar om door uw boekhouder gevalideerd en ingediend te worden, tegen [publieke prijzen per stuk](page:pricing).',
        ],
      },
    ],
    faq: [
      { q: 'Wat is de uiterste datum voor de kwartaalaangifte btw?', a: 'De 25e van de maand na het kwartaal: 25 april, 25 juli, 25 oktober en 25 januari. Aangifte en betaling moeten op die datum binnen zijn.' },
      { q: 'Kan ik van kwartaal- naar maandaangifte overstappen?', a: 'Ja. Een onderneming die aan de voorwaarden voor kwartaalaangifte voldoet, mag kiezen voor de maandaangifte, bijvoorbeeld om een btw-tegoed sneller terug te krijgen. Dat vraagt u aan bij het bevoegde btw-kantoor.' },
      { q: 'Is de jaarlijkse klantenlisting nog verplicht?', a: 'Ja, voor btw-plichtigen die Belgische btw-plichtige klanten gefactureerd hebben. Ze wordt uiterlijk op 31 maart van het volgende jaar via Intervat ingediend.' },
    ],
  },
  {
    id: 'coda-reconciliation',
    slug: 'coda-bestanden-bankafstemming',
    title: 'CODA-bestanden: zo automatiseert u de bankafstemming',
    metaTitle: 'CODA-bestanden en bankafstemming in België',
    metaDescription:
      'Wat een CODA-bestand bevat, hoe u het bij uw bank activeert en hoe u betalingen met de gestructureerde mededeling afpunt, zonder iets opnieuw in te tikken.',
    excerpt: 'Het Belgische bankformaat eenvoudig uitgelegd, en de methode om betalingen af te punten zonder uw avonden aan uittreksels te besteden.',
    readingMinutes: 6,
    date: '2026-11-07',
    sections: [
      {
        h2: 'Wat is een CODA-bestand?',
        paragraphs: [
          'CODA (« coded statement of account ») is het standaardformaat voor elektronische rekeninguittreksels in België, vastgelegd door Febelfin, de federatie van de financiële sector. Op elke dag dat er beweging op de rekening is, maakt de bank een tekstbestand aan met het beginsaldo, elke verrichting en het nieuwe saldo.',
          'Het bestand is gemaakt voor machines: regels van 128 tekens, elk met een recordtype. Uw boekhoudpakket leest het rechtstreeks in, zodat u uittreksels niet meer manueel hoeft over te nemen.',
        ],
        bullets: [
          'Record 0: hoofding (bank, datum, rekeninghouder).',
          'Record 1: oud saldo.',
          'Records 2 en 3: verrichtingen en details (bedrag, tegenpartij, mededeling).',
          'Record 8: nieuw saldo. Record 9: einde van het bestand en controletotalen.',
        ],
      },
      {
        h2: 'Hoe u uw CODA-bestanden ontvangt',
        paragraphs: [
          'Belgische banken leveren CODA-bestanden op aanvraag, meestal via een mandaat dat de rekeninghouder ondertekent. Het eenvoudigst is een distributiedienst die de bestanden van al uw banken ophaalt en dagelijks in uw boekhoudpakket of bij uw boekhouder aflevert.',
          'Zodra de stroom actief is, controleert u of alle rekeningen erin zitten: zichtrekening, spaarrekening, rekeningen in vreemde munt en professionele kredietkaarten, die vaak vergeten worden.',
        ],
      },
      {
        h2: 'De gestructureerde mededeling, de sleutel tot automatisch afpunten',
        paragraphs: [
          'In België kan een factuur een gestructureerde mededeling dragen in de vorm +++123/4567/89012+++. De laatste twee cijfers zijn een modulo 97-controle, zodat de software kan nagaan dat er geen tikfout in zit.',
          'Betaalt de klant met die mededeling, dan geeft het CODA-bestand ze ongewijzigd door en vindt de software de factuur zonder twijfel terug. Het is de doeltreffendste manier om het percentage automatische afpuntingen te verhogen.',
        ],
      },
      {
        h2: 'De betalingen die problemen geven',
        paragraphs: ['Ook met CODA vraagt een deel van de verrichtingen menselijke tussenkomst:'],
        bullets: [
          'Gegroepeerde betalingen van meerdere facturen, of gedeeltelijke betalingen.',
          'Vrije of ontbrekende mededeling, naam van de tegenpartij anders dan die van de klant.',
          'Bankkosten, betaalterminals en platformen (Stripe, PayPal, Mollie) die nettobedragen storten.',
          'Terugbetalingen, creditnota’s en voorschotten van klanten.',
        ],
      },
      {
        h2: 'Een afstemmingsroutine die standhoudt',
        paragraphs: [
          'De afstemming gebeurt idealiter elke week: de bedragen zijn nog vers, vragen aan de klant blijven eenvoudig en de opvolging van openstaande facturen is betrouwbaar om [laattijdige betalingen op te volgen](guide:late-payment).',
          'De gouden regel: een niet-geïdentificeerde verrichting blijft nooit langer dan een maand op een wachtrekening. Daarna wordt ze heel duur om terug te vinden, zeker bij de [jaarafsluiting](guide:annual-closing).',
        ],
      },
      {
        h2: 'De afstemming uitbesteden',
        paragraphs: [
          'De verwerking van CODA-bestanden is een regelmatige, precieze en goed te beschrijven taak: ideaal om uit te besteden. Onze dienst [bankafstemming en CODA](service:bank) verwerkt uw uittreksels, punt de betalingen af en meldt u alleen de gevallen die een beslissing vragen, in uw eigen software.',
        ],
      },
    ],
    faq: [
      { q: 'Is CODA betalend?', a: 'Dat hangt af van de bank en de gekozen distributiedienst. Veel boekhoudkantoren en boekhoudpakketten nemen het ophalen van CODA-bestanden op in hun aanbod.' },
      { q: 'Wat is het verschil tussen CODA en CAMT.053?', a: 'CAMT.053 is het internationale XML-formaat (ISO 20022) voor rekeninguittreksels. CODA blijft het referentieformaat in België en de meeste Belgische pakketten lezen beide.' },
      { q: 'Kan ik afstemmen zonder CODA?', a: 'Ja, op basis van pdf-uittreksels of csv-exports, maar dat is trager en foutgevoeliger. CODA is sterk aan te raden zodra u meer dan enkele tientallen verrichtingen per maand hebt.' },
    ],
  },
  {
    id: 'annual-closing',
    slug: 'jaarafsluiting-jaarrekening-nbb',
    title: 'Jaarafsluiting en neerlegging van de jaarrekening bij de NBB: stap voor stap',
    metaTitle: 'Jaarafsluiting en jaarrekening bij de NBB: de gids',
    metaDescription:
      'Inventarisboekingen, algemene vergadering, neerlegging bij de Nationale Bank binnen zeven maanden: de kalender en checklist voor een vlotte jaarafsluiting.',
    excerpt: 'Wat u moet voorbereiden, in welke volgorde en tegen wanneer, van de laatste factuur van het boekjaar tot de neerlegging van de jaarrekening.',
    readingMinutes: 8,
    date: '2026-11-07',
    sections: [
      {
        h2: 'De wettelijke kalender',
        paragraphs: [
          'Voor een Belgische vennootschap volgt de afsluiting een kalender die het Wetboek van vennootschappen en verenigingen vastlegt. Voor een boekjaar dat op 31 december afsluit, geeft dat:',
        ],
        bullets: [
          'Het bestuursorgaan stelt de jaarrekening op en, in voorkomend geval, het jaarverslag.',
          'De algemene vergadering keurt de jaarrekening goed binnen zes maanden na de afsluiting, dus uiterlijk op 30 juni.',
          'De jaarrekening wordt bij de Nationale Bank van België neergelegd binnen 30 dagen na de goedkeuring, en uiterlijk zeven maanden na de afsluiting, dus op 31 juli.',
          'De aangifte in de vennootschapsbelasting volgt haar eigen kalender, die de FOD Financiën elk jaar vastlegt.',
        ],
      },
      {
        h2: 'De inventarisboekingen',
        paragraphs: ['Voor de jaarrekening wordt opgesteld, moet de boekhouding de werkelijke toestand op de afsluitingsdatum weergeven. Dat zijn de inventarisboekingen:'],
        bullets: [
          'Afschrijvingen op vaste activa volgens het afschrijvingsplan.',
          'Inventaris van voorraden en bestellingen in uitvoering.',
          'Over te dragen kosten en verworven opbrengsten, toe te rekenen kosten en over te dragen opbrengsten.',
          'Waardeverminderingen op dubieuze debiteuren en voorzieningen voor risico’s.',
          'Raming van de vennootschapsbelasting van het boekjaar.',
        ],
      },
      {
        h2: 'De voorbereidende checklist',
        paragraphs: [
          'Een snelle afsluiting bereidt u het hele jaar voor. Hoe zuiverder de rekeningen in december, hoe minder werk er in januari overblijft. Controleer vooraf minstens deze punten:',
        ],
        bullets: [
          'Alle facturen van het boekjaar zijn [ingeboekt](service:encoding), ook die in januari voor het vorige jaar zijn ontvangen.',
          'De bankrekeningen zijn afgestemd tot 31 december en de wachtrekeningen zijn leeg (zie onze gids over [CODA-bestanden](guide:coda-reconciliation)).',
          'De saldi van klanten en leveranciers zijn verantwoord en oude vorderingen geanalyseerd.',
          'De rekeningen btw, RSZ en bedrijfsvoorheffing stemmen overeen met de ingediende aangiften.',
          'Contracten, leningen en leasings zijn bijgewerkt in de tabel van vaste activa en schulden.',
        ],
      },
      {
        h2: 'De neerlegging bij de Nationale Bank',
        paragraphs: [
          'De jaarrekening wordt neergelegd via de online toepassing van de Balanscentrale, in gestructureerd formaat (XBRL) of als pdf, volgens het gebruikte model: micro, verkort of volledig naargelang de grootte van de vennootschap. De neerlegging is betalend en het tarief hangt af van model en formaat.',
          'Een laattijdige neerlegging leidt tot een tariefverhoging die oploopt met de duur van de vertraging. Het echte risico ligt elders: een vennootschap die drie opeenvolgende boekjaren geen jaarrekening neerlegt, kan gerechtelijk ontbonden worden, en bij een faillissement kan het ontbreken van neerleggingen tegen de bestuurders gebruikt worden.',
        ],
      },
      {
        h2: 'Hoeveel tijd moet u voorzien?',
        paragraphs: [
          'Voor een kmo met een bijgewerkte boekhouding vraagt de afsluiting enkele werkdagen, gespreid over twee tot vier weken om de laatste stukken en inventarisgegevens te verzamelen. Bij een dossier met achterstand moet die eerst ingehaald worden: daarvoor dient onze [Dossier Rescue](service:rescue).',
          'Komt uw team of uw boekhouder in de lente handen tekort? Onze dienst [ondersteuning bij de afsluiting](service:closing) bereidt de bijlagen, afschrijvingstabellen en het revisiedossier voor, zodat de boekhouder alleen nog moet nakijken en ondertekenen.',
        ],
      },
    ],
    faq: [
      { q: 'Wat is de uiterste datum voor de neerlegging van de jaarrekening?', a: 'Dertig dagen na de goedkeuring door de algemene vergadering, en uiterlijk zeven maanden na de afsluiting van het boekjaar. Bij een afsluiting op 31 december is dat 31 juli.' },
      { q: 'Wat gebeurt er bij een laattijdige neerlegging?', a: 'De Nationale Bank past een tariefverhoging toe die stijgt met de vertraging. Wie drie opeenvolgende boekjaren niet neerlegt, riskeert bovendien een gerechtelijke ontbinding van de vennootschap.' },
      { q: 'Kan een vennootschap op een andere datum dan 31 december afsluiten?', a: 'Ja, de afsluitingsdatum staat in de statuten. De termijnen van zes en zeven maanden lopen dan vanaf die datum.' },
    ],
  },
  {
    id: 'late-payment',
    slug: 'laattijdige-betaling-belgie-interesten-herinneringen',
    title: 'Laattijdige betalingen tussen ondernemingen: interesten, vergoeding en herinneringen',
    metaTitle: 'Laattijdige B2B-betaling in België: uw rechten',
    metaDescription:
      'Maximaal 60 dagen betalingstermijn, 40 € forfaitaire vergoeding, 10,5 % interest in 2026: wat de Belgische wet voorziet en hoe u herinnert.',
    excerpt: 'De regels die uw kasstroom beschermen tegen klanten die laat betalen, en een herinneringsprocedure die de relatie spaart.',
    readingMinutes: 7,
    date: '2026-11-07',
    sections: [
      {
        h2: 'De toegelaten betalingstermijnen',
        paragraphs: [
          'Tussen ondernemingen legt de wet van 2 augustus 2002 betreffende de bestrijding van de betalingsachterstand het kader vast. Zonder afspraak is een factuur betaalbaar binnen 30 dagen na ontvangst ervan of na de levering, als die later valt.',
          'Sinds 1 februari 2022 mogen partijen geen termijn van meer dan 60 dagen meer afspreken. Een clausule van 90 dagen wordt voor niet geschreven gehouden, en een eventuele verificatieperiode telt mee binnen die 60 dagen.',
        ],
      },
      {
        h2: 'Wat verschuldigd is vanaf de eerste dag vertraging',
        paragraphs: ['Betaalt de klant niet op de vervaldag, dan zijn twee bedragen van rechtswege verschuldigd, zonder voorafgaande ingebrekestelling:'],
        bullets: [
          'Verwijlinteresten aan de wettelijke rentevoet voor handelstransacties: de ECB-rente verhoogd met acht procentpunten, afgerond op het hogere halve procent. Voor 2026 bedraagt die 10,5 % per jaar.',
          'Een forfaitaire vergoeding van 40 € per factuur voor invorderingskosten, bovenop de interesten.',
          'Bijkomende redelijke invorderingskosten kunnen gevorderd worden als ze verantwoord zijn.',
        ],
      },
      {
        h2: 'En bij particulieren?',
        paragraphs: [
          'Tegenover consumenten zijn de regels strenger. Het Wetboek van economisch recht legt een eerste gratis herinnering op, met minstens 14 dagen om te betalen, voordat u interesten of een vergoeding mag aanrekenen, en die bedragen zijn begrensd. Factureert u ook aan particulieren, dan moeten uw algemene voorwaarden en herinneringsmodellen daarmee rekening houden.',
        ],
      },
      {
        h2: 'Een doeltreffende herinneringsprocedure',
        paragraphs: [
          'De meeste vertragingen zijn geen kwade trouw: zoekgeraakte factuur, verkeerde bestemmeling, ontbrekende bestelbon. Een snelle en vriendelijke herinnering lost de meeste gevallen op, op voorwaarde dat ze systematisch gebeurt.',
        ],
        bullets: [
          'Voor de vervaldag: een vriendelijke herinnering voor grote bedragen.',
          'Dag 3: eerste herinnering per e-mail, met de factuur en de gestructureerde mededeling.',
          'Dag 15: telefoontje om de blokkering te begrijpen en een betaaldatum te krijgen.',
          'Dag 30: schriftelijke ingebrekestelling met vermelding van de interesten en de vergoeding.',
          'Daarna: afbetalingsplan, invordering via een gerechtsdeurwaarder of gerechtelijke procedure.',
        ],
      },
      {
        h2: 'Onbetwiste schulden',
        paragraphs: [
          'Tussen ondernemingen kan een zekere, opeisbare en onbetwiste geldschuld zonder rechtbank ingevorderd worden, via een procedure die een gerechtsdeurwaarder voert. Reageert de schuldenaar niet, dan verkrijgt de deurwaarder een uitvoerbare titel. Dat is vaak sneller en goedkoper dan een dagvaarding.',
        ],
      },
      {
        h2: 'Herinneren als routine',
        paragraphs: [
          'Een doeltreffende opvolging steunt op betrouwbare gegevens: betalingen moeten [elke week afgestemd](guide:coda-reconciliation) worden, zodat u geen klant herinnert die al betaald heeft. Daarna is het een kwestie van regelmaat.',
          'Onze dienst [credit management](service:credit) herinnert uw klanten in uw naam, per e-mail en telefoon, volgt betalingsbeloften op en bezorgt u elke week de lijst van dossiers om te escaleren. [Neem contact op](page:contact) om erover te praten.',
        ],
      },
    ],
    faq: [
      { q: 'Mag ik 40 € aanrekenen op elke laattijdig betaalde factuur?', a: 'Ja, tussen ondernemingen is de forfaitaire vergoeding van 40 € verschuldigd per laattijdig betaalde factuur, bovenop de interesten, zonder voorafgaande ingebrekestelling.' },
      { q: 'Wat is de interestvoet bij laattijdige betaling in 2026?', a: 'Voor handelstransacties bedraagt de wettelijke rentevoet 10,5 % per jaar in 2026. Hij wordt elk semester herzien en door de FOD Financiën gepubliceerd.' },
      { q: 'Kan een klant mij een termijn van 90 dagen opleggen?', a: 'Nee. Sinds 2022 mag een contractuele betalingstermijn tussen ondernemingen niet langer zijn dan 60 dagen. Een langere clausule wordt voor niet geschreven gehouden.' },
    ],
  },
];
