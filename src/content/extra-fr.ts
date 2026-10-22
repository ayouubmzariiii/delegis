import type { Extra } from './extra-types';

const fr: Extra = {
  nav: { firms: 'Fiduciaires', method: 'Méthode', guides: 'Guides', careers: 'Carrières' },
  home: {
    heroBadge: 'Délai moyen constaté en septembre : 31 h',
    invoiceLabel: 'Facture fournisseur reçue',
    invoiceFields: [
      { label: 'Fournisseur', value: 'Brico Pro SRL' },
      { label: 'N° TVA', value: 'BE 0412.345.678' },
      { label: 'Montant HTVA', value: '1 284,50 €' },
      { label: 'TVA 21 %', value: '269,75 €' },
    ],
    ledgerLabel: 'Écriture passée',
    marqueeLabel: 'On travaille directement dans votre logiciel',
    compareKicker: 'Le calcul que nos clients font avant de signer',
    compareTitle: 'Un encodeur en interne coûte plus que son salaire',
    compareText:
      'Pour une PME qui traite environ 600 pièces par mois, voici ce que représente un poste d’encodage à temps plein en Belgique, comparé à un dossier mensuel chez nous.',
    compareInhouse: 'Encodeur salarié',
    compareDelegis: 'Dossier Delegis',
    compareRows: [
      { label: 'Salaire et charges patronales', inhouse: '≈ 4 300 €', delegis: '—' },
      { label: 'Pécule de vacances, 13e mois (lissés)', inhouse: '≈ 650 €', delegis: '—' },
      { label: 'Poste de travail, logiciel, formation', inhouse: '≈ 250 €', delegis: 'inclus' },
      { label: 'Remplacement pendant les congés', inhouse: 'à organiser', delegis: 'inclus' },
      { label: 'Coût mensuel estimé', inhouse: '≈ 5 200 €', delegis: '≈ 780 €' },
    ],
    compareNote: 'Ordres de grandeur pour un employé comptable à Bruxelles en 2026. Votre situation peut varier : demandez-nous le calcul exact.',
    casesKicker: 'Situations typiques',
    casesTitle: 'Ce pour quoi on nous appelle, le plus souvent',
    cases: [
      {
        who: 'Fiduciaire à Liège, 4 collaborateurs',
        problem: 'Mars arrive, 180 dossiers à clôturer et une comptable en congé de maternité.',
        solution: 'Deux gestionnaires Delegis encodent les achats et les CODA dans Winbooks pendant quatre mois.',
        result: 'Le cabinet garde ses délais sans recruter un CDD qu’il faudrait former.',
      },
      {
        who: 'Grossiste alimentaire à Anvers',
        problem: 'Depuis janvier 2026, les factures Peppol rejetées s’accumulent et personne n’a le temps de les suivre.',
        solution: 'Le desk Peppol reprend la boîte de réception, corrige les rejets avec les clients et encode les factures reçues.',
        result: 'Plus aucune facture bloquée au-delà de 48 h.',
      },
      {
        who: 'Agence e-commerce à Bruxelles',
        problem: 'Huit mois de pièces jamais encodées et un contrôle TVA annoncé.',
        solution: 'Dossier Rescue : tri, encodage, rapprochement bancaire et déclarations préparées.',
        result: 'Dossier remis à jour en 9 jours ouvrables, au prix annoncé.',
      },
    ],
    casesNote: 'Exemples représentatifs, décrits de manière anonyme.',
    firmsTeaserTitle: 'Vous êtes une fiduciaire ?',
    firmsTeaserText:
      'On travaille en marque blanche, dans vos logiciels, selon vos conventions d’encodage. Vos clients ne voient que vous.',
    firmsTeaserCta: 'Notre offre pour les cabinets',
    guidesTitle: 'Guides pratiques',
  },
  firms: {
    metaTitle: 'Sous-traitance d’encodage pour fiduciaires | Delegis',
    metaDescription:
      'Renfort d’encodage en marque blanche pour fiduciaires et experts-comptables belges : vos logiciels, vos conventions, votre nom. Capacité ajustable chaque mois.',
    kicker: 'Pour les fiduciaires et experts-comptables',
    h1: 'Plus de dossiers, sans agrandir le bureau',
    intro:
      'La plupart de nos clients sont des cabinets comptables. Ils gardent la relation, le conseil et la signature ; nous prenons la saisie, le lettrage et la préparation. Votre client ne sait pas que nous existons, et c’est voulu.',
    painsTitle: 'Ce qu’on entend dans chaque cabinet',
    pains: [
      { title: '« On refuse des clients »', text: 'Le carnet est plein, mais recruter un encodeur prend trois mois et le former six.' },
      { title: '« Mars, avril, mai »', text: 'Les clôtures et les trimestres TVA tombent en même temps. L’équipe fait des heures sup, les erreurs aussi.' },
      { title: '« Nos juniors encodent »', text: 'Des profils formés pour conseiller passent leurs journées à saisir des tickets de carburant.' },
      { title: '« Peppol a tout changé »', text: 'Nouveaux flux, nouveaux rejets, nouvelles questions des clients. Sans personne de plus pour y répondre.' },
    ],
    modelTitle: 'Comment on s’intègre à votre cabinet',
    model: [
      { title: 'Marque blanche', text: 'Nous signons un NDA et un DPA avec vous. Vos clients restent vos clients.' },
      { title: 'Dans vos outils', text: 'Accès nominatif à Bob, Winbooks, Exact, Yuki, Horus, Octopus ou Silverfin. Pas d’export.' },
      { title: 'Vos conventions', text: 'On reprend votre manuel d’encodage, vos comptes d’attente, vos codes analytiques.' },
      { title: 'Une équipe fixe', text: 'Les mêmes gestionnaires sur vos dossiers, mois après mois, avec un team lead joignable.' },
      { title: 'Capacité variable', text: 'Vous augmentez en mars, vous réduisez en août. Préavis d’un mois.' },
      { title: 'Tarif cabinet', text: 'Remise de volume dès 1 500 pièces par mois, facturation consolidée.' },
    ],
    quoteTitle: 'Vos collaborateurs reviennent à ce pour quoi ils ont été formés : conseiller.',
    faq: [
      { q: 'Vos équipes connaissent-elles la comptabilité belge ?', a: 'Oui. Chaque gestionnaire suit une formation interne au PCMN, à la TVA belge et aux logiciels du marché avant de toucher un dossier client, puis un contrôle à 100 % pendant son premier mois.' },
      { q: 'Peut-on tester sur un seul dossier ?', a: 'Oui. Nous proposons un dossier pilote d’un mois, facturé au tarif normal, sans engagement pour la suite.' },
      { q: 'Qui porte la responsabilité professionnelle ?', a: 'Votre cabinet, comme aujourd’hui. Nous sommes un sous-traitant de production ; vous révisez, validez et signez.' },
    ],
  },
  method: {
    metaTitle: 'Notre méthode : démarrage, qualité et sécurité | Delegis',
    metaDescription:
      'Comment se passe un démarrage chez Delegis, comment nous contrôlons chaque pièce et ce qui arrive à vos documents entre le dépôt et la livraison.',
    kicker: 'Méthode',
    h1: 'Ce qui se passe entre le dépôt et la livraison',
    intro:
      'Externaliser, c’est accepter de ne plus voir le travail se faire. On compense par de la méthode et des chiffres : vous savez à tout moment où en est chaque pièce, et qui l’a touchée.',
    timelineTitle: 'Les dix premiers jours',
    timeline: [
      { day: 'J1', title: 'Appel de cadrage', text: '45 minutes avec votre responsable de compte : logiciels, volumes, conventions, échéances.' },
      { day: 'J2–3', title: 'Accès et documents', text: 'Création des accès nominatifs, signature du DPA, réception de votre manuel d’encodage.' },
      { day: 'J4–6', title: 'Dossier test', text: 'Un mois réel est encodé, puis comparé ligne par ligne avec votre propre travail.' },
      { day: 'J7', title: 'Ajustements', text: 'On corrige les écarts, on fige les règles dans une fiche dossier partagée.' },
      { day: 'J8–10', title: 'Production', text: 'Le flux normal démarre, avec un contrôle renforcé pendant les quatre premières semaines.' },
    ],
    qualityTitle: 'Comment on mesure la qualité',
    quality: [
      { value: '2', label: 'paires d’yeux', text: 'Chaque pièce est encodée par un gestionnaire et contrôlée par un second.' },
      { value: '5 %', label: 'd’échantillon', text: 'Un team lead revoit au hasard 5 % des pièces chaque semaine.' },
      { value: '< 0,5 %', label: 'd’erreurs visé', text: 'Le taux réel est indiqué dans votre rapport mensuel.' },
      { value: '4 h', label: 'pour répondre', text: 'Délai maximum de réponse à une question, en heures ouvrables.' },
    ],
    dayTitle: 'Une journée de votre dossier',
    day: [
      { time: '08:30', text: 'Les pièces déposées la veille sont triées et affectées au gestionnaire de votre dossier.' },
      { time: '10:00', text: 'Encodage dans votre logiciel. Les pièces douteuses partent en question dans le portail.' },
      { time: '14:00', text: 'Import CODA et lettrage des paiements du jour.' },
      { time: '16:00', text: 'Contrôle croisé par un second gestionnaire.' },
      { time: '17:30', text: 'Statut mis à jour dans votre portail. Vous voyez ce qui est fait et ce qui attend.' },
    ],
    faq: [
      { q: 'Que se passe-t-il si une pièce est illisible ?', a: 'Elle n’est pas encodée. Vous recevez une demande dans le portail, avec la pièce en pièce jointe.' },
      { q: 'Puis-je parler directement au gestionnaire ?', a: 'Oui, par messagerie dans le portail. Votre responsable de compte reste votre interlocuteur pour tout ce qui est contractuel.' },
    ],
  },
  careers: {
    metaTitle: 'Emploi comptable à Casablanca : rejoignez Delegis',
    metaDescription:
      'Delegis recrute des comptables et gestionnaires de dossiers à Casablanca pour des clients belges. CDI, formation à la comptabilité belge, horaires de journée.',
    kicker: 'Carrières · Casablanca',
    h1: 'Travaillez sur des dossiers belges, depuis Casablanca',
    intro:
      'Nous recrutons des profils comptables qui veulent apprendre un deuxième référentiel, travailler sur des logiciels européens et avancer vite. Pas de centre d’appels, pas d’horaires de nuit.',
    perksTitle: 'Ce que nous proposons',
    perks: [
      { title: 'CDI dès l’embauche', text: 'Après une période d’essai, sans passer par l’intérim.' },
      { title: 'Formation payée', text: 'Six semaines sur la comptabilité, la TVA et les logiciels belges avant le premier dossier.' },
      { title: 'Horaires de bureau', text: 'Du lundi au vendredi, en journée, aligné sur l’heure belge.' },
      { title: 'Évolution', text: 'Gestionnaire, puis contrôleur, puis team lead. Les critères sont écrits et connus.' },
    ],
    rolesTitle: 'Postes ouverts',
    roles: [
      { title: 'Gestionnaire de dossiers comptables', type: 'CDI · Casablanca', text: 'Bac+3 en comptabilité ou finance, français courant. Le néerlandais est un vrai plus.' },
      { title: 'Contrôleur qualité comptable', type: 'CDI · Casablanca', text: '3 ans d’expérience en cabinet, rigueur et goût du détail.' },
      { title: 'Chargé(e) de service client FR/EN/AR', type: 'CDI · Casablanca', text: 'Excellente expression écrite, expérience en relation client B2B.' },
    ],
    applyTitle: 'Candidature spontanée',
    applyText: 'Envoyez votre CV et quelques lignes sur vous à jobs@delegis.ma. Nous répondons à chaque candidature.',
    applyCta: 'Postuler par e-mail',
  },
  guides: {
    metaTitle: 'Guides : comptabilité, Peppol et externalisation | Delegis',
    metaDescription:
      'Guides pratiques pour PME et fiduciaires belges : facturation Peppol 2026, coût réel de l’encodage interne, externaliser sa comptabilité, nearshore au Maroc.',
    h1: 'Guides pratiques',
    intro: 'Ce que nous expliquons le plus souvent à nos clients, écrit une bonne fois pour toutes.',
    read: 'Lire le guide',
    minutes: 'min de lecture',
    updated: 'Mis à jour le',
    tocTitle: 'Sommaire',
    articles: [
      {
        id: 'peppol-2026',
        slug: 'facturation-electronique-peppol-belgique-2026',
        title: 'Facturation électronique Peppol en Belgique : ce qui change en 2026',
        metaTitle: 'Peppol en Belgique : l’obligation 2026 expliquée | Delegis',
        metaDescription:
          'Depuis le 1er janvier 2026, la facture électronique structurée est obligatoire entre entreprises belges. Qui est concerné, quels délais, quelles amendes.',
        excerpt: 'Qui est concerné, ce qu’il faut avoir mis en place et ce que l’obligation change pour votre comptabilité.',
        readingMinutes: 6,
        date: '2026-09-15',
        sections: [
          {
            h2: 'Ce que dit l’obligation',
            paragraphs: [
              'Depuis le 1er janvier 2026, les entreprises assujetties à la TVA et établies en Belgique doivent émettre et recevoir leurs factures B2B sous forme électronique structurée. Un PDF envoyé par e-mail ne compte plus comme une facture électronique au sens de la loi.',
              'Le réseau retenu par défaut est Peppol, avec le format Peppol BIS Billing 3.0. Les deux parties peuvent convenir d’un autre canal, mais en pratique presque tout le marché passe par Peppol.',
            ],
          },
          {
            h2: 'Qui est concerné',
            paragraphs: ['L’obligation vise les opérations entre assujettis belges. Quelques catégories restent hors champ.'],
            bullets: [
              'Concernés : sociétés et indépendants assujettis à la TVA établis en Belgique, pour leurs factures à d’autres assujettis belges.',
              'Non concernés : factures aux particuliers, entreprises exemptées de TVA (article 44), certaines opérations spécifiques.',
              'Factures vers l’étranger : pas visées par l’obligation belge pour l’instant, même si beaucoup d’entreprises les envoient déjà via Peppol.',
            ],
          },
          {
            h2: 'Les sanctions prévues',
            paragraphs: [
              'Le législateur a prévu des amendes administratives progressives en cas de manquement répété : 1 500 € la première fois, 3 000 € la deuxième, 5 000 € à partir de la troisième. Une période de tolérance a été annoncée pour les premiers mois de 2026, mais elle ne dispense pas de se mettre en ordre.',
            ],
          },
          {
            h2: 'Ce que ça change pour votre comptabilité',
            paragraphs: [
              'Les factures reçues arrivent en données structurées, ce qui accélère l’encodage. Mais il faut quelqu’un pour surveiller la boîte de réception Peppol, traiter les factures rejetées et relancer les fournisseurs qui envoient encore des PDF.',
              'C’est ce travail de suivi, plus que la technique, qui pose problème à la plupart des PME.',
            ],
          },
          {
            h2: 'La liste de vérification',
            paragraphs: ['Avant de considérer que vous êtes prêt :'],
            bullets: [
              'Votre entreprise est inscrite sur Peppol avec son numéro d’entreprise.',
              'Votre logiciel de facturation peut émettre au format Peppol BIS 3.0.',
              'Vos principaux clients ont été prévenus et leurs identifiants vérifiés.',
              'Quelqu’un est responsable des rejets et des factures entrantes.',
              'Votre comptable reçoit les factures sans ressaisie.',
            ],
          },
        ],
        faq: [
          { q: 'Un PDF par e-mail est-il encore valable ?', a: 'Non, pas entre assujettis belges depuis 2026. Il doit s’agir d’une facture électronique structurée, en principe via Peppol.' },
          { q: 'Mon logiciel comptable reçoit-il les factures Peppol ?', a: 'La plupart des logiciels belges (Exact, Yuki, Octopus, Odoo, Billit…) sont connectés. Vérifiez que la réception est activée et liée au bon numéro d’entreprise.' },
        ],
      },
      {
        id: 'cost-inhouse',
        slug: 'cout-encodage-comptable-interne-vs-externalise',
        title: 'Combien coûte vraiment l’encodage comptable en interne ?',
        metaTitle: 'Coût de l’encodage comptable : interne ou externalisé',
        metaDescription:
          'Salaire, charges, pécule, remplacement : le coût réel d’un encodeur salarié en Belgique, comparé au prix d’une sous-traitance à la pièce.',
        excerpt: 'Le salaire n’est que la partie visible. Le calcul complet, ligne par ligne.',
        readingMinutes: 5,
        date: '2026-08-28',
        sections: [
          {
            h2: 'Le salaire n’est que le point de départ',
            paragraphs: [
              'Un employé comptable expérimenté à Bruxelles gagne en 2026 aux alentours de 3 300 € bruts par mois. Avec les cotisations patronales, le coût employeur dépasse 4 300 €.',
              'Il faut ensuite ajouter le double pécule de vacances et la prime de fin d’année, qui représentent ensemble presque deux mois de salaire supplémentaires sur l’année.',
            ],
          },
          {
            h2: 'Les coûts qu’on oublie',
            paragraphs: ['Ils ne figurent sur aucune fiche de paie, mais ils sont bien réels :'],
            bullets: [
              'Le poste de travail, les licences logicielles et la formation continue.',
              'Les semaines de congé, pendant lesquelles les pièces s’accumulent.',
              'Le recrutement et la période d’apprentissage à chaque départ.',
              'Le temps du comptable senior qui contrôle et corrige.',
            ],
          },
          {
            h2: 'Ramener le coût à la pièce',
            paragraphs: [
              'Un encodeur traite en moyenne 30 à 40 pièces par heure sur un dossier bien organisé, beaucoup moins sur un dossier désordonné. Sur un mois de 150 heures productives, on arrive souvent à un coût complet de 1,50 € à 3 € par pièce.',
              'À titre de comparaison, nos tarifs démarrent à 0,80 € pour une facture de vente et 1,10 € pour une facture d’achat, contrôle compris.',
            ],
          },
          {
            h2: 'Quand garder l’encodage en interne',
            paragraphs: [
              'L’externalisation n’est pas toujours la bonne réponse. Si vos pièces demandent une connaissance très fine du métier, ou si l’encodeur fait aussi l’accueil et la logistique, le garder en interne peut se justifier. Le plus souvent, nos clients gardent une personne en interne et nous confient le volume.',
            ],
          },
        ],
      },
      {
        id: 'outsourcing-checklist',
        slug: 'externaliser-sa-comptabilite-guide',
        title: 'Externaliser sa comptabilité : comment s’y prendre sans perdre le contrôle',
        metaTitle: 'Externaliser sa comptabilité en Belgique : le guide',
        metaDescription:
          'Ce qu’on peut externaliser, ce qu’on garde, les questions à poser à un prestataire et les points du contrat à vérifier avant de signer.',
        excerpt: 'Ce qu’on peut confier, ce qu’on garde, et les questions à poser avant de signer.',
        readingMinutes: 7,
        date: '2026-07-10',
        sections: [
          {
            h2: 'Ce qu’on externalise, ce qu’on garde',
            paragraphs: [
              'On confie la production : saisie, lettrage, préparation des déclarations, classement. On garde la décision : validation, signature, conseil, relation avec l’administration.',
              'En Belgique, la tenue de comptabilité pour compte de tiers et le conseil fiscal relèvent de professions réglementées. Un prestataire sérieux travaille pour vous ou pour votre expert-comptable, pas à sa place.',
            ],
          },
          {
            h2: 'Les questions à poser à un prestataire',
            paragraphs: ['Avant de choisir :'],
            bullets: [
              'Où sont stockées mes données, et qui y a accès ?',
              'Travaillez-vous dans mon logiciel ou dans le vôtre ?',
              'Comment mesurez-vous les erreurs, et me montrez-vous ce chiffre ?',
              'Qui me répond quand j’ai une question, et en combien de temps ?',
              'Que se passe-t-il si je veux arrêter ?',
            ],
          },
          {
            h2: 'Ce que doit contenir le contrat',
            paragraphs: [
              'Un contrat de service avec des délais et un niveau de qualité chiffrés, un DPA conforme à l’article 28 du RGPD, une clause de confidentialité, et une clause de sortie qui prévoit la restitution de toutes vos données.',
            ],
          },
          {
            h2: 'Bien démarrer',
            paragraphs: [
              'Commencez par un dossier test sur un mois que vous avez déjà traité. Comparez le résultat ligne par ligne. C’est la façon la plus simple de savoir si le prestataire comprend vos règles.',
            ],
          },
        ],
      },
      {
        id: 'why-morocco',
        slug: 'sous-traitance-comptable-maroc-nearshore',
        title: 'Pourquoi le Maroc pour la sous-traitance comptable belge',
        metaTitle: 'Sous-traitance comptable au Maroc : nearshore | Delegis',
        metaDescription:
          'Langue, fuseau horaire, formation, coût : ce qui fait du Maroc une destination naturelle pour le back-office comptable des entreprises belges.',
        excerpt: 'Langue, fuseau horaire, formation, coût : les raisons concrètes, et les limites.',
        readingMinutes: 5,
        date: '2026-06-20',
        sections: [
          {
            h2: 'La langue',
            paragraphs: [
              'Le français est la langue des affaires et de l’enseignement supérieur au Maroc. Les comptables lisent vos pièces, vos e-mails et vos procédures sans traduction, ce qui évite une grande partie des erreurs observées dans l’offshore lointain.',
            ],
          },
          {
            h2: 'Le fuseau horaire',
            paragraphs: [
              'Le Maroc vit à une heure de la Belgique la majeure partie de l’année. Une question posée à 10 h reçoit une réponse le jour même, pas le lendemain matin.',
            ],
          },
          {
            h2: 'Un vivier de comptables',
            paragraphs: [
              'Les écoles de commerce et universités marocaines forment chaque année des milliers de diplômés en comptabilité et finance. Le plan comptable marocain est inspiré du modèle français, proche du PCMN belge, ce qui rend la formation rapide.',
            ],
          },
          {
            h2: 'Les limites à connaître',
            paragraphs: [
              'Le néerlandais reste rare : pour un dossier flamand, nous combinons des gestionnaires néerlandophones et des outils de traduction contrôlés. Le transfert de données hors UE doit être encadré par des clauses contractuelles types, ce que nous faisons systématiquement.',
            ],
          },
        ],
      },
    ],
  },
};

export default fr;
