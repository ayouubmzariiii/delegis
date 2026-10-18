import type { Extra } from './extra-types';

const nl: Extra = {
  nav: { firms: 'Boekhoudkantoren', method: 'Werkwijze', guides: 'Gidsen', careers: 'Vacatures' },
  home: {
    heroBadge: 'Gemiddelde doorlooptijd in september: 31 u',
    invoiceLabel: 'Aankoopfactuur ontvangen',
    invoiceFields: [
      { label: 'Leverancier', value: 'Brico Pro SRL' },
      { label: 'Btw-nr.', value: 'BE 0412.345.678' },
      { label: 'Bedrag excl. btw', value: '1.284,50 €' },
      { label: 'Btw 21 %', value: '269,75 €' },
    ],
    ledgerLabel: 'Boeking verwerkt',
    marqueeLabel: 'Wij werken rechtstreeks in uw software',
    compareKicker: 'De rekensom die onze klanten maken voor ze tekenen',
    compareTitle: 'Een interne encodeur kost meer dan zijn loon',
    compareText:
      'Voor een kmo die ongeveer 600 stukken per maand verwerkt: dit kost een voltijdse encodeur in België, naast een maanddossier bij ons.',
    compareInhouse: 'Encodeur in loondienst',
    compareDelegis: 'Dossier bij Delegis',
    compareRows: [
      { label: 'Loon en werkgeversbijdragen', inhouse: '≈ 4.300 €', delegis: '—' },
      { label: 'Vakantiegeld, 13e maand (gespreid)', inhouse: '≈ 650 €', delegis: '—' },
      { label: 'Werkplek, software, opleiding', inhouse: '≈ 250 €', delegis: 'inbegrepen' },
      { label: 'Vervanging tijdens verlof', inhouse: 'zelf te regelen', delegis: 'inbegrepen' },
      { label: 'Geschatte maandkost', inhouse: '≈ 5.200 €', delegis: '≈ 780 €' },
    ],
    compareNote: 'Grootteorde voor een boekhoudkundig bediende in Brussel in 2026. Uw situatie kan verschillen: vraag ons de exacte berekening.',
    casesKicker: 'Typische situaties',
    casesTitle: 'Waarvoor men ons het vaakst belt',
    cases: [
      {
        who: 'Boekhoudkantoor in Luik, 4 medewerkers',
        problem: 'Maart komt eraan, 180 dossiers moeten worden afgesloten en een boekhouder is met zwangerschapsverlof.',
        solution: 'Twee Delegis-dossierbeheerders boeken vier maanden lang de aankopen en CODA-bestanden in Winbooks in.',
        result: 'Het kantoor haalt zijn deadlines zonder een tijdelijke kracht aan te werven die eerst moet worden opgeleid.',
      },
      {
        who: 'Voedingsgroothandel in Antwerpen',
        problem: 'Sinds januari 2026 stapelen geweigerde Peppol-facturen zich op en niemand heeft tijd om ze op te volgen.',
        solution: 'De Peppol-desk neemt de inbox over, lost de weigeringen op met de klanten en boekt de ontvangen facturen in.',
        result: 'Geen enkele factuur blijft nog langer dan 48 u geblokkeerd.',
      },
      {
        who: 'E-commercebureau in Brussel',
        problem: 'Acht maanden aan stukken die nooit zijn ingeboekt, en een aangekondigde btw-controle.',
        solution: 'Rescue-dossier: sorteren, inboeken, bankafstemming en voorbereide aangiften.',
        result: 'Dossier bijgewerkt in 9 werkdagen, tegen de aangekondigde prijs.',
      },
    ],
    casesNote: 'Representatieve voorbeelden, anoniem beschreven.',
    firmsTeaserTitle: 'Bent u een boekhoudkantoor?',
    firmsTeaserText:
      'Wij werken in white label, in uw software en volgens uw boekingsafspraken. Uw klanten zien alleen u.',
    firmsTeaserCta: 'Ons aanbod voor kantoren',
    guidesTitle: 'Praktische gidsen',
  },
  firms: {
    metaTitle: 'Encodage uitbesteden voor boekhoudkantoren | Delegis',
    metaDescription:
      'Extra encodagecapaciteit in white label voor Belgische boekhoudkantoren en accountants: uw software, uw afspraken, uw naam. Elke maand bij te stellen.',
    kicker: 'Voor boekhoudkantoren en accountants',
    h1: 'Meer dossiers, zonder groter kantoor',
    intro:
      'De meeste van onze klanten zijn boekhoudkantoren. Zij houden de klantrelatie, het advies en de handtekening; wij nemen het inboeken, het afpunten en de voorbereiding voor onze rekening. Uw klant weet niet dat wij bestaan, en dat is de bedoeling.',
    painsTitle: 'Wat we in elk kantoor horen',
    pains: [
      { title: '„We moeten klanten weigeren”', text: 'De portefeuille zit vol, maar een encodeur aanwerven duurt drie maanden en inwerken zes.' },
      { title: '„Maart, april, mei”', text: 'Jaarafsluitingen en btw-kwartalen vallen samen. Het team maakt overuren, en ook meer fouten.' },
      { title: '„Onze junioren boeken in”', text: 'Mensen die zijn opgeleid om te adviseren, tikken de hele dag tankbonnetjes in.' },
      { title: '„Peppol heeft alles veranderd”', text: 'Nieuwe stromen, nieuwe weigeringen, nieuwe vragen van klanten. En niemand extra om ze te beantwoorden.' },
    ],
    modelTitle: 'Hoe we in uw kantoor passen',
    model: [
      { title: 'White label', text: 'We tekenen een NDA en een DPA met u. Uw klanten blijven uw klanten.' },
      { title: 'In uw tools', text: 'Persoonlijke toegang tot Bob, Winbooks, Exact, Yuki, Horus, Octopus of Silverfin. Geen export.' },
      { title: 'Uw afspraken', text: 'We nemen uw boekingshandleiding, uw wachtrekeningen en uw analytische codes over.' },
      { title: 'Een vast team', text: 'Dezelfde dossierbeheerders op uw dossiers, maand na maand, met een bereikbare teamleider.' },
      { title: 'Variabele capaciteit', text: 'In maart schaalt u op, in augustus af. Opzegtermijn van één maand.' },
      { title: 'Kantoortarief', text: 'Volumekorting vanaf 1.500 stukken per maand, geconsolideerde facturatie.' },
    ],
    quoteTitle: 'Uw medewerkers doen opnieuw waarvoor ze zijn opgeleid: adviseren.',
    faq: [
      { q: 'Kennen uw teams de Belgische boekhouding?', a: 'Ja. Elke dossierbeheerder volgt een interne opleiding over het MAR, de Belgische btw en de gangbare software voor hij aan een klantdossier begint, en wordt de eerste maand voor 100 % gecontroleerd.' },
      { q: 'Kunnen we testen op één dossier?', a: 'Ja. We bieden een pilootdossier van één maand aan, tegen het normale tarief, zonder verplichting voor daarna.' },
      { q: 'Wie draagt de beroepsaansprakelijkheid?', a: 'Uw kantoor, zoals vandaag. Wij zijn een onderaannemer voor de productie; u reviseert, keurt goed en tekent.' },
    ],
  },
  method: {
    metaTitle: 'Onze werkwijze: opstart, kwaliteit, beveiliging | Delegis',
    metaDescription:
      'Hoe een opstart bij Delegis verloopt, hoe we elk stuk controleren en wat er met uw documenten gebeurt tussen het opladen en de oplevering van uw boekhouding.',
    kicker: 'Werkwijze',
    h1: 'Wat er gebeurt tussen opladen en oplevering',
    intro:
      'Wie uitbesteedt, ziet het werk niet meer gebeuren. Dat vangen we op met methode en cijfers: u weet op elk moment hoe ver elk stuk staat en wie eraan heeft gewerkt.',
    timelineTitle: 'De eerste tien dagen',
    timeline: [
      { day: 'D1', title: 'Kick-offgesprek', text: '45 minuten met uw accountmanager: software, volumes, afspraken, deadlines.' },
      { day: 'D2–3', title: 'Toegang en documenten', text: 'Aanmaak van persoonlijke toegangen, ondertekening van de DPA, ontvangst van uw boekingshandleiding.' },
      { day: 'D4–6', title: 'Testdossier', text: 'Een echte maand wordt ingeboekt en daarna regel per regel vergeleken met uw eigen werk.' },
      { day: 'D7', title: 'Bijsturen', text: 'We corrigeren de verschillen en leggen de regels vast in een gedeelde dossierfiche.' },
      { day: 'D8–10', title: 'Productie', text: 'De normale stroom start, met een verscherpte controle tijdens de eerste vier weken.' },
    ],
    qualityTitle: 'Hoe we kwaliteit meten',
    quality: [
      { value: '2', label: 'paar ogen', text: 'Elk stuk wordt ingeboekt door één dossierbeheerder en gecontroleerd door een tweede.' },
      { value: '5 %', label: 'steekproef', text: 'Een teamleider controleert elke week willekeurig 5 % van de stukken.' },
      { value: '< 0,5 %', label: 'beoogde foutmarge', text: 'Het werkelijke percentage staat in uw maandrapport.' },
      { value: '4 u', label: 'om te antwoorden', text: 'Maximale antwoordtijd op een vraag, in werkuren.' },
    ],
    dayTitle: 'Een dag in uw dossier',
    day: [
      { time: '08:30', text: 'De stukken van de vorige dag worden gesorteerd en toegewezen aan de dossierbeheerder van uw dossier.' },
      { time: '10:00', text: 'Inboeken in uw software. Twijfelachtige stukken gaan als vraag naar het portaal.' },
      { time: '14:00', text: 'CODA-import en afpunten van de betalingen van de dag.' },
      { time: '16:00', text: 'Kruiscontrole door een tweede dossierbeheerder.' },
      { time: '17:30', text: 'Status bijgewerkt in uw portaal. U ziet wat klaar is en wat nog wacht.' },
    ],
    faq: [
      { q: 'Wat als een stuk onleesbaar is?', a: 'Dan wordt het niet ingeboekt. U krijgt een vraag in het portaal, met het stuk als bijlage.' },
      { q: 'Kan ik rechtstreeks met de dossierbeheerder praten?', a: 'Ja, via de berichtenfunctie in het portaal. Voor alles wat contractueel is, blijft uw accountmanager uw aanspreekpunt.' },
    ],
  },
  careers: {
    metaTitle: 'Boekhoudkundige job in Casablanca: werk bij Delegis',
    metaDescription:
      'Delegis zoekt boekhouders en dossierbeheerders in Casablanca voor Belgische klanten. Vast contract, opleiding in Belgische boekhouding en dagwerk.',
    kicker: 'Vacatures · Casablanca',
    h1: 'Werk aan Belgische dossiers, vanuit Casablanca',
    intro:
      'We zoeken boekhoudkundige profielen die een tweede referentiekader willen leren, met Europese software willen werken en snel willen groeien. Geen callcenter, geen nachtwerk.',
    perksTitle: 'Wat we bieden',
    perks: [
      { title: 'Vast contract vanaf de start', text: 'Na een proefperiode, zonder via een uitzendkantoor te gaan.' },
      { title: 'Betaalde opleiding', text: 'Zes weken over Belgische boekhouding, btw en software voor het eerste dossier.' },
      { title: 'Kantooruren', text: 'Van maandag tot vrijdag, overdag, afgestemd op de Belgische tijd.' },
      { title: 'Doorgroeien', text: 'Dossierbeheerder, dan controleur, dan teamleider. De criteria staan op papier en iedereen kent ze.' },
    ],
    rolesTitle: 'Openstaande vacatures',
    roles: [
      { title: 'Boekhoudkundig dossierbeheerder', type: 'Vast contract · Casablanca', text: 'Bachelor in boekhouding of financiën, vloeiend Frans. Nederlands is een echte troef.' },
      { title: 'Kwaliteitscontroleur boekhouding', type: 'Vast contract · Casablanca', text: '3 jaar ervaring in een kantoor, nauwgezet en oog voor detail.' },
      { title: 'Klantendienstmedewerker FR/EN/AR', type: 'Vast contract · Casablanca', text: 'Uitstekende schriftelijke uitdrukking, ervaring met B2B-klantcontact.' },
    ],
    applyTitle: 'Spontaan solliciteren',
    applyText: 'Stuur uw cv en een paar regels over uzelf naar jobs@delegis.ma. We antwoorden op elke sollicitatie.',
    applyCta: 'Solliciteren per e-mail',
  },
  guides: {
    metaTitle: 'Gidsen: boekhouding, Peppol en uitbesteden | Delegis',
    metaDescription:
      'Praktische gidsen voor Belgische kmo’s en boekhoudkantoren: Peppol e-facturatie 2026, de echte kost van interne encodage, boekhouding uitbesteden, Marokko.',
    h1: 'Praktische gidsen',
    intro: 'Wat we onze klanten het vaakst uitleggen, voor eens en altijd op papier gezet.',
    read: 'Lees de gids',
    minutes: 'min leestijd',
    updated: 'Bijgewerkt op',
    tocTitle: 'Inhoud',
    articles: [
      {
        id: 'peppol-2026',
        slug: 'peppol-e-facturatie-belgie-2026',
        title: 'Peppol e-facturatie in België: wat verandert er in 2026',
        metaTitle: 'Peppol in België: de verplichting van 2026 uitgelegd',
        metaDescription:
          'Sinds 1 januari 2026 is de gestructureerde e-factuur verplicht tussen Belgische bedrijven. Wie valt eronder, welke termijnen en welke boetes gelden er?',
        excerpt: 'Wie eronder valt, wat u in orde moet hebben en wat de verplichting verandert voor uw boekhouding.',
        readingMinutes: 6,
        date: '2026-09-15',
        sections: [
          {
            h2: 'Wat de verplichting inhoudt',
            paragraphs: [
              'Sinds 1 januari 2026 moeten btw-plichtige ondernemingen die in België gevestigd zijn hun B2B-facturen in gestructureerde elektronische vorm versturen en ontvangen. Een pdf per e-mail geldt wettelijk niet meer als elektronische factuur.',
              'Het standaardnetwerk is Peppol, met het formaat Peppol BIS Billing 3.0. Beide partijen kunnen een ander kanaal afspreken, maar in de praktijk loopt bijna de hele markt via Peppol.',
            ],
          },
          {
            h2: 'Wie valt eronder',
            paragraphs: ['De verplichting geldt voor handelingen tussen Belgische btw-plichtigen. Enkele categorieën vallen erbuiten.'],
            bullets: [
              'Wel: vennootschappen en zelfstandigen die btw-plichtig en in België gevestigd zijn, voor hun facturen aan andere Belgische btw-plichtigen.',
              'Niet: facturen aan particulieren, ondernemingen die vrijgesteld zijn van btw (artikel 44), bepaalde specifieke handelingen.',
              'Facturen naar het buitenland: voorlopig niet onder de Belgische verplichting, al versturen veel bedrijven ze nu al via Peppol.',
            ],
          },
          {
            h2: 'De voorziene sancties',
            paragraphs: [
              'De wetgever heeft oplopende administratieve boetes voorzien bij herhaalde inbreuken: 1.500 € de eerste keer, 3.000 € de tweede keer, 5.000 € vanaf de derde. Voor de eerste maanden van 2026 is een tolerantieperiode aangekondigd, maar die ontslaat u niet van de plicht om in orde te komen.',
            ],
          },
          {
            h2: 'Wat dit verandert voor uw boekhouding',
            paragraphs: [
              'Ontvangen facturen komen binnen als gestructureerde data, wat het inboeken versnelt. Maar iemand moet de Peppol-inbox opvolgen, geweigerde facturen afhandelen en leveranciers aanmanen die nog pdf’s sturen.',
              'Bij de meeste kmo’s zit het probleem in dat opvolgwerk, meer dan in de techniek.',
            ],
          },
          {
            h2: 'De checklist',
            paragraphs: ['Voor u ervan uitgaat dat u klaar bent:'],
            bullets: [
              'Uw onderneming is op Peppol geregistreerd met haar ondernemingsnummer.',
              'Uw facturatiesoftware kan versturen in het formaat Peppol BIS 3.0.',
              'Uw belangrijkste klanten zijn verwittigd en hun identificatiecodes zijn nagekeken.',
              'Iemand is verantwoordelijk voor weigeringen en inkomende facturen.',
              'Uw boekhouder ontvangt de facturen zonder ze opnieuw te moeten intikken.',
            ],
          },
        ],
        faq: [
          { q: 'Is een pdf per e-mail nog geldig?', a: 'Nee, niet tussen Belgische btw-plichtigen sinds 2026. Het moet een gestructureerde elektronische factuur zijn, in principe via Peppol.' },
          { q: 'Ontvangt mijn boekhoudsoftware Peppol-facturen?', a: 'De meeste Belgische pakketten (Exact, Yuki, Octopus, Odoo, Billit…) zijn gekoppeld. Controleer of de ontvangst geactiveerd is en aan het juiste ondernemingsnummer gekoppeld.' },
        ],
      },
      {
        id: 'cost-inhouse',
        slug: 'kost-interne-boekhouding-vs-uitbesteden',
        title: 'Wat kost interne boekhoudkundige encodage echt?',
        metaTitle: 'Kost van encodage: intern of boekhouding uitbesteden',
        metaDescription:
          'Loon, bijdragen, vakantiegeld, vervanging: de echte kost van een encodeur in loondienst in België, vergeleken met de prijs van uitbesteden per stuk.',
        excerpt: 'Het loon is maar het zichtbare deel. De volledige berekening, regel per regel.',
        readingMinutes: 5,
        date: '2026-08-28',
        sections: [
          {
            h2: 'Het loon is pas het vertrekpunt',
            paragraphs: [
              'Een ervaren boekhoudkundig bediende in Brussel verdient in 2026 rond de 3.300 € bruto per maand. Met de werkgeversbijdragen loopt de loonkost op tot meer dan 4.300 €.',
              'Daarbovenop komen het dubbel vakantiegeld en de eindejaarspremie, samen goed voor bijna twee extra maandlonen per jaar.',
            ],
          },
          {
            h2: 'De kosten die men vergeet',
            paragraphs: ['Ze staan op geen enkele loonfiche, maar ze zijn wel reëel:'],
            bullets: [
              'De werkplek, de softwarelicenties en de permanente vorming.',
              'De verlofweken, waarin de stukken zich opstapelen.',
              'De aanwerving en de inwerkperiode bij elk vertrek.',
              'De tijd van de senior boekhouder die controleert en corrigeert.',
            ],
          },
          {
            h2: 'De kost per stuk berekenen',
            paragraphs: [
              'Een encodeur verwerkt gemiddeld 30 tot 40 stukken per uur in een goed georganiseerd dossier, veel minder in een rommelig dossier. Op een maand van 150 productieve uren komt men vaak uit op een volledige kost van 1,50 € tot 3 € per stuk.',
              'Ter vergelijking: onze tarieven beginnen bij 0,80 € voor een verkoopfactuur en 1,10 € voor een aankoopfactuur, controle inbegrepen.',
            ],
          },
          {
            h2: 'Wanneer u de encodage beter intern houdt',
            paragraphs: [
              'Uitbesteden is niet altijd het juiste antwoord. Als uw stukken een heel grondige kennis van uw sector vragen, of als de encodeur ook het onthaal en de logistiek doet, kan intern houden te verantwoorden zijn. Meestal houden onze klanten één persoon intern en vertrouwen ze ons het volume toe.',
            ],
          },
        ],
      },
      {
        id: 'outsourcing-checklist',
        slug: 'boekhouding-uitbesteden-gids',
        title: 'Boekhouding uitbesteden: zo pakt u het aan zonder de controle te verliezen',
        metaTitle: 'Boekhouding uitbesteden in België: de gids | Delegis',
        metaDescription:
          'Wat u kunt uitbesteden, wat u zelf houdt, welke vragen u een dienstverlener stelt en welke punten u in het contract nakijkt voor u uw boekhouding uitbesteedt.',
        excerpt: 'Wat u kunt toevertrouwen, wat u zelf houdt, en welke vragen u stelt voor u tekent.',
        readingMinutes: 7,
        date: '2026-07-10',
        sections: [
          {
            h2: 'Wat u uitbesteedt, wat u houdt',
            paragraphs: [
              'U besteedt de productie uit: inboeken, afpunten, aangiften voorbereiden, klasseren. U houdt de beslissing: goedkeuring, handtekening, advies, contact met de administratie.',
              'In België zijn het voeren van een boekhouding voor rekening van derden en fiscaal advies gereglementeerde beroepen. Een ernstige dienstverlener werkt voor u of voor uw accountant, en neemt hun plaats niet in.',
            ],
          },
          {
            h2: 'De vragen voor een dienstverlener',
            paragraphs: ['Voor u kiest:'],
            bullets: [
              'Waar worden mijn gegevens opgeslagen, en wie heeft er toegang toe?',
              'Werkt u in mijn software of in de uwe?',
              'Hoe meet u fouten, en laat u mij dat cijfer zien?',
              'Wie antwoordt als ik een vraag heb, en hoe snel?',
              'Wat gebeurt er als ik wil stoppen?',
            ],
          },
          {
            h2: 'Wat er in het contract moet staan',
            paragraphs: [
              'Een dienstverleningscontract met becijferde termijnen en kwaliteitsniveau, een DPA conform artikel 28 van de GDPR, een vertrouwelijkheidsclausule, en een exitclausule die de teruggave van al uw gegevens regelt.',
            ],
          },
          {
            h2: 'Goed van start gaan',
            paragraphs: [
              'Begin met een testdossier op een maand die u zelf al hebt verwerkt. Vergelijk het resultaat regel per regel. Zo ziet u het snelst of de dienstverlener uw regels begrijpt.',
            ],
          },
        ],
      },
      {
        id: 'why-morocco',
        slug: 'boekhouding-uitbesteden-marokko-nearshore',
        title: 'Waarom Marokko voor Belgische boekhoudkundige outsourcing',
        metaTitle: 'Boekhouding uitbesteden in Marokko: nearshore | Delegis',
        metaDescription:
          'Taal, tijdzone, opleiding, kostprijs: waarom Marokko een logische keuze is voor de boekhoudkundige backoffice van Belgische bedrijven, en waar de grens ligt.',
        excerpt: 'Taal, tijdzone, opleiding, kostprijs: de concrete redenen, en de grenzen.',
        readingMinutes: 5,
        date: '2026-06-20',
        sections: [
          {
            h2: 'De taal',
            paragraphs: [
              'Frans is in Marokko de taal van het bedrijfsleven en het hoger onderwijs. De boekhouders lezen uw stukken, e-mails en procedures zonder vertaling, wat een groot deel van de fouten vermijdt die men bij verre offshore ziet.',
            ],
          },
          {
            h2: 'De tijdzone',
            paragraphs: [
              'Het grootste deel van het jaar is er tussen Marokko en België maar één uur tijdsverschil. Een vraag die u om 10 u stelt, krijgt dezelfde dag een antwoord, niet pas de volgende ochtend.',
            ],
          },
          {
            h2: 'Een grote vijver aan boekhouders',
            paragraphs: [
              'Marokkaanse handelsscholen en universiteiten leveren elk jaar duizenden afgestudeerden in boekhouding en financiën af. Het Marokkaanse rekeningenstelsel is gebaseerd op het Franse model, dat dicht bij het Belgische MAR ligt, waardoor de opleiding snel gaat.',
            ],
          },
          {
            h2: 'De grenzen die u moet kennen',
            paragraphs: [
              'Nederlands blijft zeldzaam: voor een Vlaams dossier combineren we Nederlandstalige dossierbeheerders met gecontroleerde vertaaltools. Gegevensoverdracht buiten de EU moet worden omkaderd met standaardcontractbepalingen, en dat doen we systematisch.',
            ],
          },
        ],
      },
    ],
  },
};

export default nl;
