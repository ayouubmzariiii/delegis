import { localeMeta, type Lang, type Locale } from '@/lib/i18n';
import { getDict } from '.';

/**
 * What makes each city page worth reading on its own: a local search snippet, the economic
 * context, and the kinds of businesses we typically help there. Keep it factual and general.
 */
export type CityLocal = { description: string; title: string; paragraphs: string[]; sectorsTitle: string; sectors: string[] };

export const cityLocal: Record<string, Record<Lang, CityLocal>> = {
  brussels: {
    fr: {
      description: 'PME, indépendants et fiduciaires bruxellois : encodage comptable, TVA, CODA et Peppol externalisés, pour des dossiers en français et en néerlandais.',
      title: 'Bruxelles : un tissu dense de PME et de cabinets',
      paragraphs: [
        'Bruxelles réunit des dizaines de milliers d’entreprises, des institutions européennes et un grand nombre de professions libérales, dans un environnement officiellement bilingue. Les fiduciaires bruxelloises gèrent souvent des clients étrangers, des dossiers en français et en néerlandais, et des pics de pièces à chaque échéance TVA.',
        'Delegis absorbe ces pics : nous encodons dans votre logiciel (Exact Online, Yuki, Winbooks, Octopus…), rapprochons vos extraits CODA et préparons vos grilles TVA, pour que votre équipe garde du temps pour le conseil.',
      ],
      sectorsTitle: 'Les dossiers bruxellois que nous traitons le plus',
      sectors: ['Consultance et services aux entreprises', 'Professions libérales et indépendants', 'Commerce, horeca et e-commerce', 'Fiduciaires et bureaux comptables'],
    },
    nl: {
      description: 'Kmo’s, zelfstandigen en boekhoudkantoren in Brussel: uitbestede boekhouding, btw, CODA en Peppol, voor dossiers in het Nederlands en het Frans.',
      title: 'Brussel: een dicht netwerk van kmo’s en kantoren',
      paragraphs: [
        'Brussel telt tienduizenden ondernemingen, de Europese instellingen en heel wat vrije beroepen, in een officieel tweetalige omgeving. Brusselse boekhoudkantoren beheren vaak buitenlandse klanten, dossiers in het Nederlands en het Frans, en pieken in documenten bij elke btw-deadline.',
        'Delegis vangt die pieken op: wij boeken in uw software (Exact Online, Yuki, Winbooks, Octopus…), verwerken uw CODA-uittreksels en bereiden uw btw-roosters voor, zodat uw team tijd overhoudt voor advies.',
      ],
      sectorsTitle: 'De Brusselse dossiers die we het vaakst verwerken',
      sectors: ['Consultancy en zakelijke dienstverlening', 'Vrije beroepen en zelfstandigen', 'Handel, horeca en e-commerce', 'Boekhoudkantoren en accountants'],
    },
    en: {
      description: 'Brussels SMEs, freelancers and accounting firms: outsourced bookkeeping, VAT, CODA and Peppol, for files in French and Dutch.',
      title: 'Brussels: a dense network of SMEs and firms',
      paragraphs: [
        'Brussels is home to tens of thousands of companies, the EU institutions and many liberal professions, in an officially bilingual setting. Brussels accounting firms often handle foreign clients, files in French and Dutch, and document peaks at every VAT deadline.',
        'Delegis absorbs those peaks: we post entries in your software (Exact Online, Yuki, Winbooks, Octopus…), reconcile your CODA statements and prepare your VAT returns, so your team keeps time for advisory work.',
      ],
      sectorsTitle: 'The Brussels files we handle most',
      sectors: ['Consulting and business services', 'Liberal professions and freelancers', 'Retail, hospitality and e-commerce', 'Accounting and fiduciary firms'],
    },
    ar: {
      description: 'الشركات الصغيرة والمستقلون ومكاتب المحاسبة في بروكسل: مسك المحاسبة والضريبة على القيمة المضافة وCODA وPeppol، لملفات بالفرنسية والهولندية.',
      title: 'بروكسل: نسيج كثيف من الشركات الصغيرة والمكاتب',
      paragraphs: [
        'تضم بروكسل عشرات الآلاف من الشركات والمؤسسات الأوروبية وعددًا كبيرًا من المهن الحرة، في بيئة ثنائية اللغة رسميًا. وكثيرًا ما تدير مكاتب المحاسبة في بروكسل عملاء أجانب وملفات بالفرنسية والهولندية، مع ذروة في الوثائق عند كل موعد للتصريح بالضريبة على القيمة المضافة.',
        'تستوعب Delegis هذه الذروة: نسجّل القيود في برنامجكم (Exact Online وYuki وWinbooks وOctopus…)، ونطابق كشوفات CODA، ونحضّر تصاريح الضريبة على القيمة المضافة، ليتفرغ فريقكم للاستشارة.',
      ],
      sectorsTitle: 'ملفات بروكسل التي نعالجها أكثر',
      sectors: ['الاستشارات وخدمات الشركات', 'المهن الحرة والمستقلون', 'التجارة والمطاعم والتجارة الإلكترونية', 'مكاتب المحاسبة والائتمان'],
    },
  },
  antwerp: {
    fr: {
      description: 'Entreprises et bureaux comptables d’Anvers : encodage des factures d’achat, CODA, TVA et Peppol externalisés, adaptés aux volumes de la logistique et du port.',
      title: 'Anvers : port, logistique et commerce international',
      paragraphs: [
        'Avec le port d’Anvers-Bruges, l’un des plus grands d’Europe, Anvers vit au rythme de la logistique, de la chimie et du commerce international. Beaucoup d’entreprises anversoises reçoivent un flux important de factures fournisseurs, souvent étrangères et en plusieurs devises.',
        'Nous encodons ces volumes dans votre logiciel, contrôlons les codes TVA intracommunautaires et rapprochons vos paiements, avec des gestionnaires qui suivent les dossiers flamands en néerlandais.',
      ],
      sectorsTitle: 'Les dossiers anversois que nous traitons le plus',
      sectors: ['Transport, logistique et transitaires', 'Négoce et import-export', 'Industrie et sous-traitance', 'Bureaux comptables flamands'],
    },
    nl: {
      description: 'Bedrijven en boekhoudkantoren in Antwerpen: uitbestede inboeking van aankoopfacturen, CODA, btw en Peppol, afgestemd op de volumes van logistiek en haven.',
      title: 'Antwerpen: haven, logistiek en internationale handel',
      paragraphs: [
        'Met de haven van Antwerpen-Brugge, een van de grootste van Europa, draait Antwerpen op logistiek, chemie en internationale handel. Veel Antwerpse bedrijven krijgen een grote stroom leveranciersfacturen binnen, vaak buitenlands en in verschillende munten.',
        'Wij boeken die volumes in uw software, controleren de intracommunautaire btw-codes en matchen uw betalingen, met dossierbeheerders die Vlaamse dossiers in het Nederlands opvolgen.',
      ],
      sectorsTitle: 'De Antwerpse dossiers die we het vaakst verwerken',
      sectors: ['Transport, logistiek en expeditie', 'Groothandel en import-export', 'Industrie en toelevering', 'Vlaamse boekhoudkantoren'],
    },
    en: {
      description: 'Antwerp companies and accounting firms: outsourced purchase invoice entry, CODA, VAT and Peppol, built for logistics and port volumes.',
      title: 'Antwerp: port, logistics and international trade',
      paragraphs: [
        'With the Port of Antwerp-Bruges, one of the largest in Europe, Antwerp runs on logistics, chemicals and international trade. Many Antwerp businesses receive a heavy flow of supplier invoices, often from abroad and in several currencies.',
        'We post those volumes in your software, check intra-EU VAT codes and match your payments, with file managers who follow Flemish files in Dutch.',
      ],
      sectorsTitle: 'The Antwerp files we handle most',
      sectors: ['Transport, logistics and forwarding', 'Wholesale and import-export', 'Manufacturing and subcontracting', 'Flemish accounting firms'],
    },
    ar: {
      description: 'شركات ومكاتب محاسبة في أنتويرب: تسجيل فواتير الشراء وCODA والضريبة على القيمة المضافة وPeppol، بما يناسب أحجام اللوجستيك والميناء.',
      title: 'أنتويرب: ميناء ولوجستيك وتجارة دولية',
      paragraphs: [
        'بفضل ميناء أنتويرب-بروج، أحد أكبر موانئ أوروبا، تعيش أنتويرب على إيقاع اللوجستيك والصناعة الكيميائية والتجارة الدولية. وتتلقى شركات كثيرة في المدينة تدفقًا كبيرًا من فواتير الموردين، غالبًا أجنبية وبعملات متعددة.',
        'نسجّل هذه الأحجام في برنامجكم، ونراقب رموز الضريبة داخل الاتحاد الأوروبي، ونطابق مدفوعاتكم، مع مسيّري ملفات يتابعون الملفات الفلامانية بالهولندية.',
      ],
      sectorsTitle: 'ملفات أنتويرب التي نعالجها أكثر',
      sectors: ['النقل واللوجستيك والعبور', 'تجارة الجملة والاستيراد والتصدير', 'الصناعة والمناولة', 'مكاتب المحاسبة الفلامانية'],
    },
  },
  ghent: {
    fr: {
      description: 'Entreprises et fiduciaires de Gand : encodage comptable, CODA, TVA et Peppol externalisés, pour l’industrie, la tech et les services de la région gantoise.',
      title: 'Gand : industrie portuaire, université et innovation',
      paragraphs: [
        'Gand combine un port industriel (North Sea Port), une grande université et un écosystème biotech et tech en croissance. Les entreprises gantoises vont de l’industrie lourde aux start-up, avec des besoins comptables très différents.',
        'Nous adaptons notre façon de travailler à chaque dossier : encodage au fil de l’eau pour les start-up qui veulent des chiffres à jour, traitement en volume pour l’industrie, préparation TVA pour les bureaux comptables de la région.',
      ],
      sectorsTitle: 'Les dossiers gantois que nous traitons le plus',
      sectors: ['Industrie et activités portuaires', 'Start-up tech et biotech', 'Commerce et horeca', 'Bureaux comptables de Flandre-Orientale'],
    },
    nl: {
      description: 'Bedrijven en boekhoudkantoren in Gent: uitbestede boekhouding, CODA, btw en Peppol voor industrie, tech en dienstverlening in de Gentse regio.',
      title: 'Gent: havenindustrie, universiteit en innovatie',
      paragraphs: [
        'Gent combineert een industriële haven (North Sea Port), een grote universiteit en een groeiend biotech- en tech-ecosysteem. Gentse bedrijven gaan van zware industrie tot start-ups, met heel verschillende boekhoudnoden.',
        'Wij passen onze werkwijze aan elk dossier aan: doorlopend inboeken voor start-ups die actuele cijfers willen, verwerking in volume voor de industrie, btw-voorbereiding voor de boekhoudkantoren uit de regio.',
      ],
      sectorsTitle: 'De Gentse dossiers die we het vaakst verwerken',
      sectors: ['Industrie en havenactiviteiten', 'Tech- en biotech-start-ups', 'Handel en horeca', 'Boekhoudkantoren in Oost-Vlaanderen'],
    },
    en: {
      description: 'Ghent companies and accounting firms: outsourced bookkeeping, CODA, VAT and Peppol for manufacturing, tech and services across the Ghent region.',
      title: 'Ghent: port industry, university and innovation',
      paragraphs: [
        'Ghent combines an industrial port (North Sea Port), a major university and a growing biotech and tech ecosystem. Ghent businesses range from heavy industry to start-ups, with very different bookkeeping needs.',
        'We adapt our way of working to each file: continuous posting for start-ups that want up-to-date figures, volume processing for manufacturers, VAT preparation for the region’s accounting firms.',
      ],
      sectorsTitle: 'The Ghent files we handle most',
      sectors: ['Manufacturing and port activities', 'Tech and biotech start-ups', 'Retail and hospitality', 'East Flanders accounting firms'],
    },
    ar: {
      description: 'شركات ومكاتب محاسبة في غنت: مسك المحاسبة وCODA والضريبة على القيمة المضافة وPeppol للصناعة والتكنولوجيا والخدمات في منطقة غنت.',
      title: 'غنت: صناعة مينائية وجامعة وابتكار',
      paragraphs: [
        'تجمع غنت بين ميناء صناعي (North Sea Port) وجامعة كبرى ومنظومة متنامية في التكنولوجيا الحيوية والرقمية. وتتنوع شركاتها من الصناعة الثقيلة إلى الشركات الناشئة، باحتياجات محاسبية مختلفة جدًا.',
        'نكيّف طريقة عملنا مع كل ملف: تسجيل مستمر للشركات الناشئة التي تريد أرقامًا محدّثة، ومعالجة بالحجم للصناعة، وتحضير الضريبة على القيمة المضافة لمكاتب المحاسبة في المنطقة.',
      ],
      sectorsTitle: 'ملفات غنت التي نعالجها أكثر',
      sectors: ['الصناعة والأنشطة المينائية', 'الشركات الناشئة في التكنولوجيا', 'التجارة والمطاعم', 'مكاتب المحاسبة في فلاندرز الشرقية'],
    },
  },
  liege: {
    fr: {
      description: 'PME et fiduciaires liégeoises : encodage comptable, CODA, TVA et Peppol externalisés, pour la logistique, l’industrie et le commerce de la région.',
      title: 'Liège : logistique, industrie et savoir-faire',
      paragraphs: [
        'Liège s’est réinventée autour de la logistique, avec Liège Airport, l’un des principaux aéroports de fret d’Europe, tout en gardant une forte base industrielle et universitaire. Le tissu local compte beaucoup de PME familiales et d’indépendants.',
        'Pour ces entreprises, nous encodons les pièces dans le logiciel de votre fiduciaire, préparons les déclarations TVA et suivons les factures Peppol, avec une équipe entièrement francophone.',
      ],
      sectorsTitle: 'Les dossiers liégeois que nous traitons le plus',
      sectors: ['Logistique et transport', 'Industrie et construction', 'Commerce de détail et horeca', 'Fiduciaires de la province de Liège'],
    },
    nl: {
      description: 'Kmo’s en boekhoudkantoren in Luik: uitbestede boekhouding, CODA, btw en Peppol voor logistiek, industrie en handel in de regio.',
      title: 'Luik: logistiek, industrie en vakmanschap',
      paragraphs: [
        'Luik heeft zich heruitgevonden rond logistiek, met Liège Airport, een van de belangrijkste vrachtluchthavens van Europa, en behoudt tegelijk een sterke industriële en universitaire basis. Het lokale weefsel telt veel familiale kmo’s en zelfstandigen.',
        'Voor die bedrijven boeken wij de stukken in de software van uw boekhouder, bereiden de btw-aangiften voor en volgen de Peppol-facturen op.',
      ],
      sectorsTitle: 'De Luikse dossiers die we het vaakst verwerken',
      sectors: ['Logistiek en transport', 'Industrie en bouw', 'Detailhandel en horeca', 'Boekhoudkantoren in de provincie Luik'],
    },
    en: {
      description: 'Liège SMEs and accounting firms: outsourced bookkeeping, CODA, VAT and Peppol for logistics, manufacturing and retail across the region.',
      title: 'Liège: logistics, industry and know-how',
      paragraphs: [
        'Liège has reinvented itself around logistics, with Liège Airport, one of Europe’s leading cargo airports, while keeping a strong industrial and academic base. The local economy includes many family-run SMEs and self-employed professionals.',
        'For these businesses, we post documents in your accountant’s software, prepare VAT returns and follow up Peppol invoices, with a fully French-speaking team.',
      ],
      sectorsTitle: 'The Liège files we handle most',
      sectors: ['Logistics and transport', 'Manufacturing and construction', 'Retail and hospitality', 'Accounting firms in Liège province'],
    },
    ar: {
      description: 'الشركات الصغيرة ومكاتب المحاسبة في لييج: مسك المحاسبة وCODA والضريبة على القيمة المضافة وPeppol للوجستيك والصناعة والتجارة.',
      title: 'لييج: لوجستيك وصناعة وخبرة',
      paragraphs: [
        'أعادت لييج ابتكار نفسها حول اللوجستيك بفضل مطار Liège Airport، أحد أهم مطارات الشحن في أوروبا، مع الحفاظ على قاعدة صناعية وجامعية قوية. ويضم نسيجها المحلي كثيرًا من الشركات العائلية والمستقلين.',
        'لهذه الشركات، نسجّل الوثائق في برنامج محاسبكم، ونحضّر تصاريح الضريبة على القيمة المضافة، ونتابع فواتير Peppol، مع فريق ناطق بالفرنسية بالكامل.',
      ],
      sectorsTitle: 'ملفات لييج التي نعالجها أكثر',
      sectors: ['اللوجستيك والنقل', 'الصناعة والبناء', 'تجارة التجزئة والمطاعم', 'مكاتب المحاسبة في إقليم لييج'],
    },
  },
  charleroi: {
    fr: {
      description: 'Entreprises et fiduciaires de Charleroi : encodage comptable, TVA, CODA et rattrapage de retard externalisés, pour l’industrie, la biotech et le commerce.',
      title: 'Charleroi : une économie en pleine reconversion',
      paragraphs: [
        'Ancien bassin industriel, Charleroi mise aujourd’hui sur la biotech (Biopark), l’aéroport de Brussels South Charleroi et une nouvelle génération d’entreprises. Beaucoup de PME y grandissent vite, et leur comptabilité doit suivre.',
        'Quand les pièces s’accumulent, notre offre Dossier Rescue remet un dossier à jour en dix jours ouvrables ; ensuite, l’encodage mensuel et la préparation TVA évitent que le retard revienne.',
      ],
      sectorsTitle: 'Les dossiers carolos que nous traitons le plus',
      sectors: ['Industrie et sous-traitance', 'Biotech et santé', 'Construction et artisans', 'Fiduciaires du Hainaut'],
    },
    nl: {
      description: 'Bedrijven en boekhoudkantoren in Charleroi: uitbestede boekhouding, btw, CODA en het wegwerken van achterstand, voor industrie, biotech en handel.',
      title: 'Charleroi: een economie in volle omschakeling',
      paragraphs: [
        'Het voormalige industriebekken Charleroi zet vandaag in op biotech (Biopark), de luchthaven Brussels South Charleroi en een nieuwe generatie bedrijven. Veel kmo’s groeien er snel, en hun boekhouding moet volgen.',
        'Als de stukken zich opstapelen, brengt ons Dossier Rescue een dossier in tien werkdagen weer bij; daarna voorkomen maandelijkse inboeking en btw-voorbereiding dat de achterstand terugkomt.',
      ],
      sectorsTitle: 'De dossiers uit Charleroi die we het vaakst verwerken',
      sectors: ['Industrie en toelevering', 'Biotech en gezondheid', 'Bouw en ambachten', 'Boekhoudkantoren in Henegouwen'],
    },
    en: {
      description: 'Charleroi companies and accounting firms: outsourced bookkeeping, VAT, CODA and backlog clean-up for manufacturing, biotech and retail.',
      title: 'Charleroi: an economy in full transformation',
      paragraphs: [
        'A former industrial basin, Charleroi now bets on biotech (Biopark), Brussels South Charleroi Airport and a new generation of companies. Many SMEs grow fast there, and their bookkeeping has to keep up.',
        'When documents pile up, our Dossier Rescue offer brings a file up to date in ten working days; after that, monthly posting and VAT preparation keep the backlog from coming back.',
      ],
      sectorsTitle: 'The Charleroi files we handle most',
      sectors: ['Manufacturing and subcontracting', 'Biotech and healthcare', 'Construction and trades', 'Hainaut accounting firms'],
    },
    ar: {
      description: 'شركات ومكاتب محاسبة في شارلروا: مسك المحاسبة والضريبة على القيمة المضافة وCODA وتدارك التأخر، للصناعة والتكنولوجيا الحيوية والتجارة.',
      title: 'شارلروا: اقتصاد في طور التحول',
      paragraphs: [
        'شارلروا، الحوض الصناعي القديم، تراهن اليوم على التكنولوجيا الحيوية (Biopark) ومطار Brussels South Charleroi وجيل جديد من الشركات. كثير من الشركات الصغيرة والمتوسطة تنمو فيها بسرعة، ويجب أن تواكبها محاسبتها.',
        'عندما تتراكم الوثائق، تعيد خدمة Dossier Rescue الملف إلى وضعه السليم في عشرة أيام عمل؛ ثم يمنع التسجيل الشهري وتحضير الضريبة على القيمة المضافة عودة التأخر.',
      ],
      sectorsTitle: 'ملفات شارلروا التي نعالجها أكثر',
      sectors: ['الصناعة والمناولة', 'التكنولوجيا الحيوية والصحة', 'البناء والحرف', 'مكاتب المحاسبة في إينو'],
    },
  },
  namur: {
    fr: {
      description: 'Indépendants, PME et fiduciaires namurois : encodage comptable, TVA, CODA et paie externalisés, avec un interlocuteur unique et une équipe francophone.',
      title: 'Namur : capitale wallonne, terre d’indépendants',
      paragraphs: [
        'Siège du gouvernement wallon, Namur rassemble administrations, services et un grand nombre d’indépendants et de professions libérales. Leurs dossiers sont souvent plus petits, mais demandent la même rigueur à chaque trimestre.',
        'Notre tarification à la pièce convient bien à ces volumes : vous payez ce qui est encodé, sans forfait surdimensionné, et votre fiduciaire reçoit un dossier propre, prêt à valider.',
      ],
      sectorsTitle: 'Les dossiers namurois que nous traitons le plus',
      sectors: ['Professions libérales et indépendants', 'Services et conseil', 'Commerce de proximité', 'Fiduciaires de la province de Namur'],
    },
    nl: {
      description: 'Zelfstandigen, kmo’s en boekhoudkantoren in Namen: uitbestede boekhouding, btw, CODA en loon, met één aanspreekpunt.',
      title: 'Namen: Waalse hoofdstad, land van zelfstandigen',
      paragraphs: [
        'Als zetel van de Waalse regering verenigt Namen administraties, dienstverlening en een groot aantal zelfstandigen en vrije beroepen. Hun dossiers zijn vaak kleiner, maar vragen elk kwartaal dezelfde nauwkeurigheid.',
        'Onze prijs per stuk past goed bij die volumes: u betaalt wat ingeboekt wordt, zonder overgedimensioneerd forfait, en uw boekhouder krijgt een net dossier, klaar om te valideren.',
      ],
      sectorsTitle: 'De Naamse dossiers die we het vaakst verwerken',
      sectors: ['Vrije beroepen en zelfstandigen', 'Dienstverlening en advies', 'Buurthandel', 'Boekhoudkantoren in de provincie Namen'],
    },
    en: {
      description: 'Namur freelancers, SMEs and accounting firms: outsourced bookkeeping, VAT, CODA and payroll prep, with a single point of contact.',
      title: 'Namur: Walloon capital, home of the self-employed',
      paragraphs: [
        'As the seat of the Walloon government, Namur brings together public administrations, services and a large number of self-employed and liberal professionals. Their files are often smaller, but need the same rigour every quarter.',
        'Our per-document pricing suits these volumes: you pay for what is posted, with no oversized flat fee, and your accountant receives a clean file, ready to approve.',
      ],
      sectorsTitle: 'The Namur files we handle most',
      sectors: ['Liberal professions and freelancers', 'Services and consulting', 'Local retail', 'Accounting firms in Namur province'],
    },
    ar: {
      description: 'المستقلون والشركات الصغيرة ومكاتب المحاسبة في نامور: مسك المحاسبة والضريبة على القيمة المضافة وCODA وتحضير الأجور، مع محاور وحيد.',
      title: 'نامور: عاصمة والونيا وأرض المستقلين',
      paragraphs: [
        'نامور، مقر الحكومة الوالونية، تجمع الإدارات والخدمات وعددًا كبيرًا من المستقلين وأصحاب المهن الحرة. ملفاتهم غالبًا أصغر، لكنها تتطلب الدقة نفسها في كل ربع سنة.',
        'تناسب تسعيرتنا بالوثيقة هذه الأحجام: تدفعون مقابل ما يُسجَّل فقط، دون جزاف مبالغ فيه، ويتلقى محاسبكم ملفًا نظيفًا جاهزًا للمصادقة.',
      ],
      sectorsTitle: 'ملفات نامور التي نعالجها أكثر',
      sectors: ['المهن الحرة والمستقلون', 'الخدمات والاستشارة', 'تجارة القرب', 'مكاتب المحاسبة في إقليم نامور'],
    },
  },
  leuven: {
    fr: {
      description: 'Start-up, spin-off et bureaux comptables de Louvain : encodage comptable, CODA, TVA et Peppol externalisés, pour des chiffres à jour chaque mois.',
      title: 'Louvain : université, recherche et spin-off',
      paragraphs: [
        'Autour de la KU Leuven et du centre de recherche imec, Louvain a vu naître de nombreuses spin-off et entreprises technologiques, à côté de grands sièges comme celui d’AB InBev. Ces sociétés lèvent des fonds et doivent présenter des chiffres fiables, vite.',
        'Nous tenons leur comptabilité à jour en continu : encodage hebdomadaire, rapprochement bancaire et reporting mensuel, pour que les fondateurs et leur comptable décident sur des données récentes.',
      ],
      sectorsTitle: 'Les dossiers louvanistes que nous traitons le plus',
      sectors: ['Spin-off et start-up technologiques', 'Recherche et santé', 'Services aux entreprises', 'Bureaux comptables du Brabant flamand'],
    },
    nl: {
      description: 'Start-ups, spin-offs en boekhoudkantoren in Leuven: uitbestede boekhouding, CODA, btw en Peppol, voor elke maand actuele cijfers.',
      title: 'Leuven: universiteit, onderzoek en spin-offs',
      paragraphs: [
        'Rond de KU Leuven en het onderzoekscentrum imec zijn in Leuven talrijke spin-offs en technologiebedrijven ontstaan, naast grote hoofdzetels zoals die van AB InBev. Die bedrijven halen kapitaal op en moeten snel betrouwbare cijfers tonen.',
        'Wij houden hun boekhouding doorlopend bij: wekelijkse inboeking, bankafstemming en maandelijkse rapportering, zodat oprichters en hun boekhouder beslissen op recente gegevens.',
      ],
      sectorsTitle: 'De Leuvense dossiers die we het vaakst verwerken',
      sectors: ['Spin-offs en tech-start-ups', 'Onderzoek en gezondheid', 'Zakelijke dienstverlening', 'Boekhoudkantoren in Vlaams-Brabant'],
    },
    en: {
      description: 'Leuven start-ups, spin-offs and accounting firms: outsourced bookkeeping, CODA, VAT and Peppol, for up-to-date figures every month.',
      title: 'Leuven: university, research and spin-offs',
      paragraphs: [
        'Around KU Leuven and the imec research centre, Leuven has produced many spin-offs and technology companies, alongside major headquarters such as AB InBev’s. These companies raise funding and need reliable figures, fast.',
        'We keep their books current: weekly posting, bank reconciliation and monthly reporting, so founders and their accountant decide on recent data.',
      ],
      sectorsTitle: 'The Leuven files we handle most',
      sectors: ['Spin-offs and tech start-ups', 'Research and healthcare', 'Business services', 'Flemish Brabant accounting firms'],
    },
    ar: {
      description: 'الشركات الناشئة ومكاتب المحاسبة في لوفن: مسك المحاسبة وCODA والضريبة على القيمة المضافة وPeppol، لأرقام محدّثة كل شهر.',
      title: 'لوفن: جامعة وبحث وشركات منبثقة',
      paragraphs: [
        'حول جامعة KU Leuven ومركز الأبحاث imec، ظهرت في لوفن شركات منبثقة وتكنولوجية عديدة، إلى جانب مقرات كبرى مثل مقر AB InBev. هذه الشركات تجمع التمويل وتحتاج إلى أرقام موثوقة بسرعة.',
        'نحافظ على محاسبتها محدّثة باستمرار: تسجيل أسبوعي ومطابقة بنكية وتقارير شهرية، ليتخذ المؤسسون ومحاسبهم قراراتهم على بيانات حديثة.',
      ],
      sectorsTitle: 'ملفات لوفن التي نعالجها أكثر',
      sectors: ['الشركات المنبثقة والناشئة', 'البحث والصحة', 'خدمات الشركات', 'مكاتب المحاسبة في برابانت الفلامانية'],
    },
  },
  casablanca: {
    fr: {
      description: 'Entreprises de Casablanca : saisie comptable, back-office et service client externalisés auprès d’une équipe locale, en français, arabe et anglais.',
      title: 'Casablanca : la capitale économique du Maroc',
      paragraphs: [
        'Premier port et premier centre d’affaires du pays, Casablanca accueille les sièges de nombreux groupes, la place financière Casablanca Finance City et un tissu très dense de PME. C’est aussi là que travaille l’équipe Delegis.',
        'Pour les entreprises casablancaises, nous prenons en charge la saisie comptable, la gestion administrative et le service client, en français, en arabe et en anglais, avec un suivi régulier et des délais clairs.',
      ],
      sectorsTitle: 'Les dossiers casablancais que nous traitons le plus',
      sectors: ['Commerce et distribution', 'Services aux entreprises', 'Industrie et logistique', 'E-commerce et centres de relation client'],
    },
    nl: {
      description: 'Bedrijven in Casablanca: uitbestede boekhouding, backoffice en klantendienst bij een lokaal team, in het Frans, Arabisch en Engels.',
      title: 'Casablanca: de economische hoofdstad van Marokko',
      paragraphs: [
        'Als grootste haven en zakencentrum van het land huisvest Casablanca de hoofdzetels van talrijke groepen, het financiële centrum Casablanca Finance City en een heel dicht netwerk van kmo’s. Het is ook hier dat het Delegis-team werkt.',
        'Voor bedrijven in Casablanca nemen wij de boekhouding, de administratie en de klantendienst op ons, in het Frans, Arabisch en Engels, met regelmatige opvolging en duidelijke termijnen.',
      ],
      sectorsTitle: 'De dossiers uit Casablanca die we het vaakst verwerken',
      sectors: ['Handel en distributie', 'Zakelijke dienstverlening', 'Industrie en logistiek', 'E-commerce en klantcontact'],
    },
    en: {
      description: 'Casablanca businesses: outsourced bookkeeping, back office and customer service with a local team, in French, Arabic and English.',
      title: 'Casablanca: Morocco’s economic capital',
      paragraphs: [
        'As the country’s largest port and business hub, Casablanca hosts the headquarters of many groups, the Casablanca Finance City financial centre and a very dense network of SMEs. It is also where the Delegis team works.',
        'For Casablanca businesses, we take on bookkeeping, administration and customer service, in French, Arabic and English, with regular follow-up and clear deadlines.',
      ],
      sectorsTitle: 'The Casablanca files we handle most',
      sectors: ['Retail and distribution', 'Business services', 'Manufacturing and logistics', 'E-commerce and customer contact'],
    },
    ar: {
      description: 'شركات الدار البيضاء: مسك المحاسبة والمكتب الخلفي وخدمة العملاء لدى فريق محلي، بالعربية والفرنسية والإنجليزية.',
      title: 'الدار البيضاء: العاصمة الاقتصادية للمغرب',
      paragraphs: [
        'بصفتها أكبر ميناء ومركز أعمال في البلاد، تحتضن الدار البيضاء مقرات مجموعات عديدة والقطب المالي Casablanca Finance City ونسيجًا كثيفًا جدًا من الشركات الصغيرة والمتوسطة. وفيها يعمل فريق Delegis.',
        'لشركات الدار البيضاء، نتولى مسك المحاسبة والتسيير الإداري وخدمة العملاء، بالعربية والفرنسية والإنجليزية، مع متابعة منتظمة وآجال واضحة.',
      ],
      sectorsTitle: 'ملفات الدار البيضاء التي نعالجها أكثر',
      sectors: ['التجارة والتوزيع', 'خدمات الشركات', 'الصناعة واللوجستيك', 'التجارة الإلكترونية ومراكز العلاقة مع العملاء'],
    },
  },
  rabat: {
    fr: {
      description: 'Entreprises et organisations de Rabat : saisie comptable, back-office administratif et saisie de données externalisés, avec une équipe à Casablanca.',
      title: 'Rabat : capitale administrative et pôle de services',
      paragraphs: [
        'Capitale du royaume, Rabat concentre ministères, institutions, ambassades et organisations internationales, avec autour d’elles un écosystème de bureaux d’études, de sociétés de services et d’entreprises technologiques.',
        'Ces structures produisent beaucoup de documents : nous les aidons avec la saisie comptable, la numérisation et l’indexation de dossiers, et la gestion administrative récurrente, à une heure de route de notre équipe.',
      ],
      sectorsTitle: 'Les dossiers rbatis que nous traitons le plus',
      sectors: ['Bureaux d’études et conseil', 'Sociétés de services et IT', 'Associations et organisations', 'Commerce et professions libérales'],
    },
    nl: {
      description: 'Bedrijven en organisaties in Rabat: uitbestede boekhouding, administratieve backoffice en data-invoer, met een team in Casablanca.',
      title: 'Rabat: administratieve hoofdstad en dienstencentrum',
      paragraphs: [
        'Als hoofdstad van het koninkrijk concentreert Rabat ministeries, instellingen, ambassades en internationale organisaties, met daarrond een ecosysteem van studiebureaus, dienstverleners en technologiebedrijven.',
        'Die organisaties produceren veel documenten: wij helpen met boekhouding, digitalisering en indexering van dossiers, en terugkerend administratief werk.',
      ],
      sectorsTitle: 'De dossiers uit Rabat die we het vaakst verwerken',
      sectors: ['Studiebureaus en advies', 'Dienstverleners en IT', 'Verenigingen en organisaties', 'Handel en vrije beroepen'],
    },
    en: {
      description: 'Rabat companies and organisations: outsourced bookkeeping, administrative back office and data entry, with a team in Casablanca.',
      title: 'Rabat: administrative capital and services hub',
      paragraphs: [
        'As the kingdom’s capital, Rabat gathers ministries, institutions, embassies and international organisations, surrounded by an ecosystem of consultancies, service companies and tech firms.',
        'These organisations produce a lot of paperwork: we help with bookkeeping, document scanning and indexing, and recurring administrative work, an hour’s drive from our team.',
      ],
      sectorsTitle: 'The Rabat files we handle most',
      sectors: ['Engineering and consulting firms', 'Service and IT companies', 'Associations and organisations', 'Retail and liberal professions'],
    },
    ar: {
      description: 'شركات ومؤسسات الرباط: مسك المحاسبة والمكتب الخلفي الإداري وإدخال البيانات، مع فريق بالدار البيضاء.',
      title: 'الرباط: العاصمة الإدارية وقطب الخدمات',
      paragraphs: [
        'بصفتها عاصمة المملكة، تجمع الرباط الوزارات والمؤسسات والسفارات والمنظمات الدولية، وحولها منظومة من مكاتب الدراسات وشركات الخدمات والشركات التكنولوجية.',
        'تنتج هذه الهياكل وثائق كثيرة: نساعدها في مسك المحاسبة ورقمنة الملفات وفهرستها والتسيير الإداري المتكرر، على بعد ساعة من فريقنا.',
      ],
      sectorsTitle: 'ملفات الرباط التي نعالجها أكثر',
      sectors: ['مكاتب الدراسات والاستشارة', 'شركات الخدمات والمعلوميات', 'الجمعيات والمنظمات', 'التجارة والمهن الحرة'],
    },
  },
  tangier: {
    fr: {
      description: 'Entreprises de Tanger : saisie comptable, back-office et saisie de données externalisés, pour l’industrie, la logistique et l’export vers l’Europe.',
      title: 'Tanger : la porte industrielle vers l’Europe',
      paragraphs: [
        'Avec le port de Tanger Med, ses zones d’accélération industrielle et une importante filière automobile, Tanger est devenue l’un des moteurs industriels du Maroc, à quelques kilomètres de l’Europe.',
        'Les entreprises tournées vers l’export y gèrent des factures en plusieurs devises, des clients européens et des flux logistiques soutenus : nous prenons en charge leur saisie comptable, leur back-office et la tenue de leurs données.',
      ],
      sectorsTitle: 'Les dossiers tangérois que nous traitons le plus',
      sectors: ['Industrie et sous-traitance automobile', 'Logistique et transit', 'Export et négoce', 'Services aux entreprises'],
    },
    nl: {
      description: 'Bedrijven in Tanger: uitbestede boekhouding, backoffice en data-invoer voor industrie, logistiek en export naar Europa.',
      title: 'Tanger: de industriële poort naar Europa',
      paragraphs: [
        'Met de haven Tanger Med, zijn industriële zones en een belangrijke autosector is Tanger uitgegroeid tot een van de industriële motoren van Marokko, op enkele kilometers van Europa.',
        'Exportgerichte bedrijven beheren er facturen in verschillende munten, Europese klanten en drukke logistieke stromen: wij nemen hun boekhouding, backoffice en databeheer op ons.',
      ],
      sectorsTitle: 'De dossiers uit Tanger die we het vaakst verwerken',
      sectors: ['Industrie en autotoelevering', 'Logistiek en transit', 'Export en handel', 'Zakelijke dienstverlening'],
    },
    en: {
      description: 'Tangier businesses: outsourced bookkeeping, back office and data entry for manufacturing, logistics and exports to Europe.',
      title: 'Tangier: the industrial gateway to Europe',
      paragraphs: [
        'With the Tanger Med port, its industrial acceleration zones and a major automotive cluster, Tangier has become one of Morocco’s industrial engines, a few kilometres from Europe.',
        'Export-oriented companies there handle invoices in several currencies, European customers and busy logistics flows: we take on their bookkeeping, back office and data management.',
      ],
      sectorsTitle: 'The Tangier files we handle most',
      sectors: ['Manufacturing and automotive supply', 'Logistics and freight', 'Export and trading', 'Business services'],
    },
    ar: {
      description: 'شركات طنجة: مسك المحاسبة والمكتب الخلفي وإدخال البيانات للصناعة واللوجستيك والتصدير نحو أوروبا.',
      title: 'طنجة: البوابة الصناعية نحو أوروبا',
      paragraphs: [
        'بفضل ميناء طنجة المتوسط ومناطق التسريع الصناعي وقطاع سيارات مهم، أصبحت طنجة أحد المحركات الصناعية للمغرب، على بعد كيلومترات قليلة من أوروبا.',
        'تدير الشركات المصدّرة فيها فواتير بعملات متعددة وعملاء أوروبيين وتدفقات لوجستية كثيفة: نتولى مسك محاسبتها ومكتبها الخلفي وتدبير بياناتها.',
      ],
      sectorsTitle: 'ملفات طنجة التي نعالجها أكثر',
      sectors: ['الصناعة ومناولة السيارات', 'اللوجستيك والعبور', 'التصدير والتجارة', 'خدمات الشركات'],
    },
  },
  marrakech: {
    fr: {
      description: 'Hôtels, riads et entreprises de Marrakech : saisie comptable, back-office et service client externalisés, pour absorber la saisonnalité.',
      title: 'Marrakech : tourisme, hôtellerie et événementiel',
      paragraphs: [
        'Destination touristique majeure, Marrakech vit de l’hôtellerie, des riads, de la restauration, de l’événementiel et de l’artisanat. L’activité y est très saisonnière, et les pièces comptables suivent le même rythme.',
        'Nous absorbons ces variations : saisie des factures et des encaissements en haute saison, rapprochements réguliers, et service client multilingue pour répondre aux réservations et demandes de vos clients.',
      ],
      sectorsTitle: 'Les dossiers marrakchis que nous traitons le plus',
      sectors: ['Hôtels et riads', 'Restauration et événementiel', 'Artisanat et commerce', 'Agences et services touristiques'],
    },
    nl: {
      description: 'Hotels, riads en bedrijven in Marrakesh: uitbestede boekhouding, backoffice en klantendienst om de seizoensgebondenheid op te vangen.',
      title: 'Marrakesh: toerisme, hotels en evenementen',
      paragraphs: [
        'Als grote toeristische bestemming leeft Marrakesh van hotels, riads, restaurants, evenementen en ambachten. De activiteit is er sterk seizoensgebonden, en de boekhoudstukken volgen hetzelfde ritme.',
        'Wij vangen die schommelingen op: inboeking van facturen en ontvangsten in het hoogseizoen, regelmatige afstemmingen en een meertalige klantendienst voor reservaties en vragen van uw klanten.',
      ],
      sectorsTitle: 'De dossiers uit Marrakesh die we het vaakst verwerken',
      sectors: ['Hotels en riads', 'Restaurants en evenementen', 'Ambachten en handel', 'Reisbureaus en toeristische diensten'],
    },
    en: {
      description: 'Marrakech hotels, riads and businesses: outsourced bookkeeping, back office and customer service to handle seasonal peaks.',
      title: 'Marrakech: tourism, hospitality and events',
      paragraphs: [
        'A major tourist destination, Marrakech lives on hotels, riads, restaurants, events and crafts. Activity is highly seasonal, and accounting documents follow the same rhythm.',
        'We absorb those swings: posting invoices and receipts in high season, regular reconciliations, and multilingual customer service to answer your guests’ bookings and questions.',
      ],
      sectorsTitle: 'The Marrakech files we handle most',
      sectors: ['Hotels and riads', 'Restaurants and events', 'Crafts and retail', 'Travel agencies and tourism services'],
    },
    ar: {
      description: 'فنادق ورياضات وشركات مراكش: مسك المحاسبة والمكتب الخلفي وخدمة العملاء لاستيعاب الموسمية.',
      title: 'مراكش: السياحة والفندقة والتظاهرات',
      paragraphs: [
        'بصفتها وجهة سياحية كبرى، تعيش مراكش على الفنادق والرياضات والمطاعم والتظاهرات والصناعة التقليدية. والنشاط فيها موسمي جدًا، والوثائق المحاسبية تتبع الإيقاع نفسه.',
        'نستوعب هذه التقلبات: تسجيل الفواتير والمداخيل في ذروة الموسم، ومطابقات منتظمة، وخدمة عملاء متعددة اللغات للرد على حجوزات زبنائكم وأسئلتهم.',
      ],
      sectorsTitle: 'ملفات مراكش التي نعالجها أكثر',
      sectors: ['الفنادق والرياضات', 'المطاعم والتظاهرات', 'الصناعة التقليدية والتجارة', 'وكالات الأسفار والخدمات السياحية'],
    },
  },
};

/** Search description for a city page: the local one, except on fr-ma, which keeps its own market template. */
export function cityDescription(locale: Locale, cityId: string, name: string) {
  if (locale === 'fr-ma') return getDict(locale).cities.metaDescription.replaceAll('{city}', name);
  return cityLocal[cityId][localeMeta[locale].lang].description;
}
