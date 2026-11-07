import type { Article } from './extra-types';

/** Guides published in November 2026 (fr). Same ids, structure and links in every language. */
export const guidesFr: Article[] = [
  {
    id: 'vat-deadlines',
    slug: 'declaration-tva-belgique-delais-calendrier',
    title: 'Déclaration TVA en Belgique : délais, calendrier et pièges à éviter',
    metaTitle: 'Déclaration TVA Belgique : délais et calendrier 2026',
    metaDescription:
      'Mensuelle le 20, trimestrielle le 25 : les délais de la déclaration TVA belge, les listings à ne pas oublier et une méthode pour ne plus déposer en retard.',
    excerpt: 'Les échéances qui s’appliquent à votre entreprise, ce qu’il faut déposer avec la déclaration et comment préparer chaque période sans rush.',
    readingMinutes: 7,
    date: '2026-11-07',
    sections: [
      {
        h2: 'Mensuel ou trimestriel : quel régime s’applique ?',
        paragraphs: [
          'En Belgique, la déclaration TVA périodique est en principe mensuelle. Une entreprise peut déposer chaque trimestre tant que son chiffre d’affaires annuel hors TVA ne dépasse pas 2,5 millions d’euros, sauf pour certaines activités (livraisons de produits énergétiques, véhicules neufs, téléphonie mobile, ordinateurs…) où le seuil est nettement plus bas.',
          'Le régime trimestriel allège la charge administrative, mais il retarde aussi le remboursement d’un crédit de TVA. Une entreprise qui investit beaucoup ou qui exporte a souvent intérêt à passer en mensuel, ce qui se demande au bureau TVA compétent.',
        ],
      },
      {
        h2: 'Les délais de dépôt et de paiement',
        paragraphs: [
          'Depuis la réforme entrée en vigueur en 2025, les délais ne sont plus les mêmes pour tous. La déclaration et le paiement doivent être arrivés au SPF Finances à la même date.',
        ],
        bullets: [
          'Déclaration mensuelle : au plus tard le 20 du mois qui suit la période (la TVA de mars se déclare et se paie pour le 20 avril).',
          'Déclaration trimestrielle : au plus tard le 25 du mois qui suit le trimestre, soit le 25 avril, le 25 juillet, le 25 octobre et le 25 janvier.',
          'Si l’échéance tombe un samedi, un dimanche ou un jour férié, vérifiez la date exacte publiée par le SPF Finances sur MyMinfin : c’est elle qui fait foi.',
          'Le paiement doit être crédité sur le compte du SPF Finances à l’échéance, pas simplement ordonné : prévoyez un ou deux jours ouvrables de marge.',
        ],
      },
      {
        h2: 'Ce qu’il ne faut pas oublier à côté de la déclaration',
        paragraphs: ['La déclaration périodique n’est qu’une partie des obligations TVA. Trois autres documents reviennent régulièrement :'],
        bullets: [
          'Le relevé intracommunautaire (listing des livraisons et services à des clients assujettis dans l’UE), à déposer selon la même périodicité que la déclaration.',
          'Le listing annuel des clients assujettis belges, à déposer au plus tard le 31 mars de l’année suivante.',
          'Les déclarations spéciales ou rectificatives quand une erreur est découverte : mieux vaut corriger spontanément que d’attendre un contrôle.',
        ],
      },
      {
        h2: 'Ce que coûte un retard',
        paragraphs: [
          'Un dépôt tardif entraîne une amende administrative, qui augmente avec la répétition des infractions, et un paiement tardif génère des intérêts de retard sur la TVA due. Au-delà de l’argent, les retards répétés attirent l’attention de l’administration et compliquent les demandes de remboursement.',
          'Dans la pratique, la plupart des retards ne viennent pas du calcul de la TVA mais des pièces manquantes : factures d’achat reçues tard, extraits bancaires non traités, notes de crédit oubliées.',
        ],
      },
      {
        h2: 'Une méthode simple pour ne plus courir',
        paragraphs: [
          'La TVA se prépare pendant la période, pas après. Si les factures sont [encodées chaque semaine](service:encoding) et les extraits bancaires rapprochés au fil de l’eau, la déclaration n’est plus qu’un contrôle final.',
          'Depuis 2026, les factures B2B arrivent en grande partie via Peppol : elles sont plus rapides à traiter, à condition que quelqu’un surveille la boîte de réception. Notre guide sur [la facturation électronique Peppol](guide:peppol-2026) détaille ce point.',
        ],
        bullets: [
          'J+1 à J+5 après la fin de période : relance des pièces manquantes.',
          'J+5 à J+10 : encodage terminé, rapprochement bancaire bouclé.',
          'J+10 à J+15 : grille TVA préparée, contrôles de cohérence, validation par le comptable.',
          'Avant l’échéance : dépôt sur Intervat et paiement, avec une marge de quelques jours.',
        ],
      },
      {
        h2: 'Les contrôles avant de déposer',
        paragraphs: [
          'Une déclaration bien préparée se vérifie en quelques minutes : la TVA due correspond au chiffre d’affaires de la période, les autoliquidations (cocontractant, intracommunautaire) apparaissent des deux côtés de la grille, et les déductions ne portent pas sur des frais non déductibles comme les restaurants ou une partie des voitures.',
          'Si vous préférez déléguer cette préparation, notre service de [préparation de la déclaration TVA](service:vat) livre une grille contrôlée, prête à être validée et déposée par votre comptable, avec des [prix publics à la pièce](page:pricing).',
        ],
      },
    ],
    faq: [
      { q: 'Quelle est la date limite de la déclaration TVA trimestrielle ?', a: 'Le 25 du mois qui suit le trimestre : 25 avril, 25 juillet, 25 octobre et 25 janvier. La déclaration et le paiement doivent être arrivés à cette date.' },
      { q: 'Peut-on passer du régime trimestriel au régime mensuel ?', a: 'Oui. Une entreprise qui remplit les conditions du trimestriel peut choisir le mensuel, notamment pour récupérer plus vite un crédit de TVA. La demande se fait auprès du bureau TVA compétent.' },
      { q: 'Le listing clients annuel est-il toujours obligatoire ?', a: 'Oui, pour les assujettis qui ont facturé des clients assujettis belges. Il se dépose au plus tard le 31 mars de l’année suivante via Intervat.' },
    ],
  },
  {
    id: 'coda-reconciliation',
    slug: 'fichiers-coda-rapprochement-bancaire',
    title: 'Fichiers CODA : comment automatiser le rapprochement bancaire',
    metaTitle: 'Fichiers CODA et rapprochement bancaire en Belgique',
    metaDescription:
      'Ce que contient un fichier CODA, comment l’activer auprès de votre banque et comment rapprocher vos paiements avec la communication structurée, sans ressaisie.',
    excerpt: 'Le format bancaire belge expliqué simplement, et la méthode pour lettrer vos paiements sans passer vos soirées sur les extraits.',
    readingMinutes: 6,
    date: '2026-11-07',
    sections: [
      {
        h2: 'Qu’est-ce qu’un fichier CODA ?',
        paragraphs: [
          'CODA (pour « coded statement of account ») est le format standard des extraits de compte électroniques en Belgique, défini par Febelfin, la fédération du secteur financier. Chaque jour où le compte bouge, la banque produit un fichier texte qui reprend le solde de départ, chaque mouvement et le nouveau solde.',
          'Le fichier est fait pour les machines : des lignes de 128 caractères, chacune avec un type d’enregistrement. Votre logiciel comptable le lit directement, ce qui évite de recopier les extraits à la main.',
        ],
        bullets: [
          'Enregistrement 0 : en-tête (banque, date, titulaire du compte).',
          'Enregistrement 1 : ancien solde.',
          'Enregistrements 2 et 3 : mouvements et informations détaillées (montant, contrepartie, communication).',
          'Enregistrement 8 : nouveau solde. Enregistrement 9 : fin de fichier et totaux de contrôle.',
        ],
      },
      {
        h2: 'Comment recevoir vos CODA',
        paragraphs: [
          'Les banques belges fournissent les CODA à la demande, en général via un mandat signé par le titulaire du compte. Le plus simple est de passer par un service de distribution qui collecte les fichiers de toutes vos banques et les dépose chaque jour dans votre logiciel comptable ou chez votre fiduciaire.',
          'Une fois le flux actif, vérifiez qu’il couvre tous les comptes : compte courant, compte d’épargne, comptes en devises et cartes de crédit professionnelles, qui sont souvent oubliés.',
        ],
      },
      {
        h2: 'La communication structurée, clé du lettrage automatique',
        paragraphs: [
          'En Belgique, une facture peut porter une communication structurée de la forme +++123/4567/89012+++. Les deux derniers chiffres sont un contrôle modulo 97, ce qui permet au logiciel de vérifier qu’il n’y a pas d’erreur de frappe.',
          'Quand le client paie avec cette communication, le CODA la transmet telle quelle et le logiciel retrouve la facture sans hésitation. C’est le moyen le plus efficace d’augmenter le taux de lettrage automatique.',
        ],
      },
      {
        h2: 'Les paiements qui posent problème',
        paragraphs: ['Même avec des CODA, une partie des mouvements demande une intervention humaine :'],
        bullets: [
          'Paiements groupés de plusieurs factures, ou paiements partiels.',
          'Communication libre ou absente, nom de contrepartie différent du client.',
          'Frais bancaires, terminaux de paiement et plateformes (Stripe, PayPal, Mollie) qui versent des montants nets.',
          'Remboursements, notes de crédit et avances de clients.',
        ],
      },
      {
        h2: 'Une routine de rapprochement qui tient',
        paragraphs: [
          'Le rapprochement se fait idéalement chaque semaine : les montants sont encore frais, les questions au client restent simples, et le suivi des factures ouvertes est fiable pour [relancer les retards de paiement](guide:late-payment).',
          'La règle d’or : un mouvement non identifié ne reste jamais sur un compte d’attente plus d’un mois. Au-delà, il devient très coûteux à retrouver, en particulier au moment de la [clôture annuelle](guide:annual-closing).',
        ],
      },
      {
        h2: 'Déléguer le rapprochement',
        paragraphs: [
          'Le traitement des CODA est une tâche régulière, précise et facile à décrire : elle se prête bien à la sous-traitance. Notre service de [rapprochement bancaire et CODA](service:bank) traite vos extraits, lettre les paiements et vous signale uniquement les cas qui demandent une décision, dans votre propre logiciel.',
        ],
      },
    ],
    faq: [
      { q: 'Le CODA est-il payant ?', a: 'Cela dépend de la banque et du service de distribution choisi. Beaucoup de fiduciaires et de logiciels comptables incluent la collecte des CODA dans leur offre.' },
      { q: 'Quelle différence entre CODA et CAMT.053 ?', a: 'CAMT.053 est le format XML international (ISO 20022) pour les extraits de compte. Le CODA reste le format de référence en Belgique et la plupart des logiciels belges lisent les deux.' },
      { q: 'Peut-on rapprocher sans CODA ?', a: 'Oui, à partir d’extraits PDF ou d’exports CSV, mais c’est plus lent et plus sujet aux erreurs. Le CODA est vivement recommandé dès que le volume dépasse quelques dizaines de mouvements par mois.' },
    ],
  },
  {
    id: 'annual-closing',
    slug: 'cloture-annuelle-comptes-annuels-bnb',
    title: 'Clôture annuelle et dépôt des comptes à la BNB : le guide pas à pas',
    metaTitle: 'Clôture annuelle et comptes annuels BNB : le guide',
    metaDescription:
      'Écritures d’inventaire, assemblée générale, dépôt à la Banque nationale dans les sept mois : le calendrier et la checklist d’une clôture annuelle sans retard.',
    excerpt: 'Ce qu’il faut préparer, dans quel ordre et pour quand, de la dernière facture de l’exercice au dépôt des comptes annuels.',
    readingMinutes: 8,
    date: '2026-11-07',
    sections: [
      {
        h2: 'Le calendrier légal',
        paragraphs: [
          'Pour une société belge, la clôture suit un calendrier fixé par le Code des sociétés et des associations. Pour un exercice clôturé le 31 décembre, cela donne :',
        ],
        bullets: [
          'L’organe d’administration établit les comptes annuels et, le cas échéant, le rapport de gestion.',
          'L’assemblée générale approuve les comptes dans les six mois de la clôture, soit au plus tard le 30 juin.',
          'Les comptes sont déposés à la Banque nationale de Belgique dans les 30 jours de l’approbation, et au plus tard sept mois après la clôture, soit le 31 juillet.',
          'La déclaration à l’impôt des sociétés suit son propre calendrier, fixé chaque année par le SPF Finances.',
        ],
      },
      {
        h2: 'Les écritures d’inventaire',
        paragraphs: ['Avant d’établir les comptes, la comptabilité doit refléter la situation réelle au jour de la clôture. Ce sont les écritures d’inventaire :'],
        bullets: [
          'Amortissements des immobilisations selon le plan d’amortissement.',
          'Inventaire des stocks et en-cours.',
          'Charges à reporter et produits acquis, charges à imputer et produits à reporter.',
          'Réductions de valeur sur les créances douteuses et provisions pour risques.',
          'Estimation de l’impôt des sociétés de l’exercice.',
        ],
      },
      {
        h2: 'La checklist de préparation',
        paragraphs: [
          'Une clôture rapide se prépare pendant l’année. Plus les comptes sont propres en décembre, moins il reste de travail en janvier. Avant de commencer, vérifiez au moins ces points :',
        ],
        bullets: [
          'Toutes les factures de l’exercice sont [encodées](service:encoding), y compris celles reçues en janvier pour l’année précédente.',
          'Les comptes bancaires sont rapprochés jusqu’au 31 décembre et les comptes d’attente sont vides (voir notre guide sur [les fichiers CODA](guide:coda-reconciliation)).',
          'Les soldes clients et fournisseurs sont justifiés et les vieilles créances analysées.',
          'Les comptes TVA, ONSS et précompte concordent avec les déclarations déposées.',
          'Les contrats, prêts et leasings sont à jour dans le tableau des immobilisations et des dettes.',
        ],
      },
      {
        h2: 'Le dépôt à la Banque nationale',
        paragraphs: [
          'Les comptes annuels se déposent via l’application en ligne de la Centrale des bilans, au format structuré (XBRL) ou en PDF selon le schéma utilisé : micro, abrégé ou complet selon la taille de la société. Le dépôt est payant et le tarif dépend du schéma et du format.',
          'Un dépôt tardif entraîne une majoration de tarif qui augmente avec la durée du retard. Le vrai risque est ailleurs : une société qui ne dépose pas ses comptes pendant trois exercices consécutifs peut être dissoute judiciairement, et en cas de faillite l’absence de dépôt peut être retenue contre les administrateurs.',
        ],
      },
      {
        h2: 'Combien de temps prévoir',
        paragraphs: [
          'Pour une PME dont la comptabilité est tenue à jour, la clôture prend quelques jours de travail répartis sur deux à quatre semaines, le temps de rassembler les dernières pièces et les informations d’inventaire. Pour un dossier en retard, il faut d’abord rattraper l’arriéré : c’est l’objet de notre [Dossier Rescue](service:rescue).',
          'Si votre équipe ou votre fiduciaire manque de bras au printemps, notre service de [support à la clôture](service:closing) prépare les annexes, les tableaux d’amortissement et le dossier de révision, pour que le comptable n’ait plus qu’à vérifier et signer.',
        ],
      },
    ],
    faq: [
      { q: 'Quelle est la date limite de dépôt des comptes annuels ?', a: 'Trente jours après l’approbation par l’assemblée générale, et au plus tard sept mois après la clôture de l’exercice. Pour une clôture au 31 décembre, c’est le 31 juillet.' },
      { q: 'Que se passe-t-il en cas de dépôt tardif ?', a: 'La Banque nationale applique une majoration de tarif qui augmente avec le retard. Un défaut de dépôt pendant trois exercices consécutifs expose en plus la société à une dissolution judiciaire.' },
      { q: 'Une société peut-elle clôturer ailleurs qu’au 31 décembre ?', a: 'Oui, la date de clôture est fixée dans les statuts. Les délais de six et sept mois se calculent alors à partir de cette date.' },
    ],
  },
  {
    id: 'late-payment',
    slug: 'retard-de-paiement-belgique-interets-relances',
    title: 'Retards de paiement entre entreprises : intérêts, indemnité et relances',
    metaTitle: 'Retard de paiement B2B en Belgique : vos droits',
    metaDescription:
      'Délai de 60 jours maximum, indemnité de 40 €, intérêts de 10,5 % en 2026 : ce que la loi belge prévoit contre les retards de paiement et comment relancer.',
    excerpt: 'Les règles qui protègent votre trésorerie face aux clients qui paient tard, et une procédure de relance qui préserve la relation.',
    readingMinutes: 7,
    date: '2026-11-07',
    sections: [
      {
        h2: 'Les délais de paiement autorisés',
        paragraphs: [
          'Entre entreprises, la loi du 2 août 2002 concernant la lutte contre le retard de paiement fixe le cadre. À défaut d’accord, une facture est payable dans les 30 jours de sa réception ou de la livraison, si celle-ci est plus tardive.',
          'Depuis le 1er février 2022, les parties ne peuvent plus convenir d’un délai supérieur à 60 jours. Une clause prévoyant 90 jours est réputée non écrite, et une éventuelle période de vérification est comptée dans ces 60 jours.',
        ],
      },
      {
        h2: 'Ce qui est dû dès le premier jour de retard',
        paragraphs: ['Si le client ne paie pas à l’échéance, deux montants sont dus de plein droit, sans mise en demeure préalable :'],
        bullets: [
          'Des intérêts de retard au taux légal pour les transactions commerciales : le taux de la BCE majoré de huit points, arrondi au demi-point supérieur. Il est de 10,5 % par an pour 2026.',
          'Une indemnité forfaitaire de 40 € par facture pour les frais de recouvrement, en plus des intérêts.',
          'Des frais de recouvrement supplémentaires raisonnables peuvent être réclamés s’ils sont justifiés.',
        ],
      },
      {
        h2: 'Et avec les particuliers ?',
        paragraphs: [
          'Les règles sont plus strictes envers les consommateurs. Le Code de droit économique impose un premier rappel gratuit, qui laisse au moins 14 jours pour payer, avant de pouvoir réclamer des intérêts ou une indemnité, et ces montants sont plafonnés. Si vous facturez aussi des particuliers, vos conditions générales et vos modèles de rappel doivent en tenir compte.',
        ],
      },
      {
        h2: 'Une procédure de relance efficace',
        paragraphs: [
          'La majorité des retards ne sont pas de la mauvaise foi : facture égarée, mauvais destinataire, bon de commande manquant. Une relance rapide et courtoise règle la plupart des cas, à condition d’être systématique.',
        ],
        bullets: [
          'Avant l’échéance : un rappel amical pour les montants importants.',
          'J+3 : premier rappel par e-mail, avec la facture et la communication structurée.',
          'J+15 : appel téléphonique pour comprendre le blocage et obtenir une date de paiement.',
          'J+30 : mise en demeure écrite mentionnant les intérêts et l’indemnité.',
          'Au-delà : plan de paiement, recouvrement par un huissier de justice ou procédure judiciaire.',
        ],
      },
      {
        h2: 'Les dettes non contestées',
        paragraphs: [
          'Entre entreprises, une dette d’argent certaine, exigible et non contestée peut être recouvrée sans passer par le tribunal, via une procédure menée par un huissier de justice. Si le débiteur ne réagit pas, l’huissier obtient un titre exécutoire. C’est souvent plus rapide et moins coûteux qu’une citation.',
        ],
      },
      {
        h2: 'Mettre la relance en routine',
        paragraphs: [
          'Une relance efficace repose sur des données fiables : les paiements doivent être [rapprochés chaque semaine](guide:coda-reconciliation) pour ne pas relancer un client qui a déjà payé. Ensuite, c’est une question de régularité.',
          'Notre service de [credit management](service:credit) relance vos clients en votre nom, par e-mail et par téléphone, suit les promesses de paiement et vous transmet chaque semaine la liste des dossiers à escalader. Pour en parler, [contactez-nous](page:contact).',
        ],
      },
    ],
    faq: [
      { q: 'Puis-je réclamer 40 € sur chaque facture payée en retard ?', a: 'Oui, entre entreprises l’indemnité forfaitaire de 40 € est due par facture payée en retard, en plus des intérêts, sans mise en demeure préalable.' },
      { q: 'Quel est le taux d’intérêt de retard en 2026 ?', a: 'Pour les transactions commerciales, le taux légal est de 10,5 % par an en 2026. Il est revu chaque semestre et publié par le SPF Finances.' },
      { q: 'Un client peut-il m’imposer un délai de 90 jours ?', a: 'Non. Depuis 2022, un délai de paiement contractuel entre entreprises ne peut pas dépasser 60 jours. Une clause plus longue est réputée non écrite.' },
    ],
  },
];
