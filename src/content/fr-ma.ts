import type { ServiceId } from './types';
import type { Article } from './extra-types';

/**
 * Search snippets for the French pages aimed at Morocco (fr-ma). The body copy is shared with
 * fr-be, so titles and descriptions are rewritten for the Moroccan market to keep every URL
 * distinct in search results.
 */
type Meta = { metaTitle: string; metaDescription: string };

export const frMaPages: Record<'services' | 'pricing' | 'about' | 'contact' | 'privacy' | 'cities' | 'firms' | 'method' | 'careers' | 'guides', Meta> = {
  services: {
    metaTitle: 'Externalisation comptable au Maroc : nos services | Delegis',
    metaDescription: 'Saisie comptable, rapprochement bancaire, paie, saisie de données et service client externalisés depuis Casablanca. Découvrez tous les services Delegis.',
  },
  pricing: {
    metaTitle: 'Prix de la saisie comptable externalisée au Maroc | Delegis',
    metaDescription: 'Tarifs publics à la pièce et au forfait pour la saisie comptable et le back-office depuis Casablanca. Estimez votre budget en ligne, sans engagement.',
  },
  about: {
    metaTitle: 'Delegis : back-office comptable basé à Casablanca',
    metaDescription: 'Delegis réunit des comptables francophones au Maroc pour servir les entreprises marocaines et belges : notre histoire, nos valeurs et notre façon de travailler.',
  },
  contact: {
    metaTitle: 'Contact Delegis Maroc : demande d’offre en 24 h',
    metaDescription: 'Décrivez vos besoins en saisie comptable ou back-office : un responsable de compte vous répond sous 24 h ouvrables. Téléphone, e-mail ou formulaire.',
  },
  privacy: {
    metaTitle: 'Protection des données et confidentialité | Delegis Maroc',
    metaDescription: 'Comment Delegis protège vos pièces comptables : hébergement dans l’UE, accès tracés, chiffrement et contrat de sous-traitance RGPD.',
  },
  cities: {
    metaTitle: 'Saisie comptable externalisée à {city} | Delegis',
    metaDescription: 'Vous êtes à {city} ? Delegis prend en charge votre saisie comptable, votre back-office et votre service client depuis Casablanca. Offre sous 24 h.',
  },
  firms: {
    metaTitle: 'Sous-traitance pour cabinets comptables au Maroc | Delegis',
    metaDescription: 'Cabinets et fiduciaires : renforcez votre capacité de saisie en marque blanche avec une équipe à Casablanca. Vos logiciels, vos délais, votre nom.',
  },
  method: {
    metaTitle: 'Méthode Delegis : démarrage, contrôle et sécurité',
    metaDescription: 'De la réception des pièces à la livraison : démarrage en quelques jours, double contrôle qualité et accès sécurisés. Découvrez notre méthode de travail.',
  },
  careers: {
    metaTitle: 'Offres d’emploi comptable à Casablanca | Delegis',
    metaDescription: 'Comptables, gestionnaires de dossiers et conseillers clientèle : rejoignez l’équipe Delegis et travaillez sur des dossiers belges et marocains.',
  },
  guides: {
    metaTitle: 'Guides externalisation et comptabilité | Delegis Maroc',
    metaDescription: 'Nos guides pratiques sur l’externalisation comptable, le nearshore au Maroc, le coût de la saisie et la facturation électronique, pour décider en confiance.',
  },
};

export const frMaServices: Record<ServiceId, Meta> = {
  encoding: {
    metaTitle: 'Saisie comptable externalisée au Maroc | Delegis',
    metaDescription: 'Confiez la saisie de vos factures d’achat et de vente à une équipe comptable à Casablanca : dans votre logiciel, avec double contrôle et délais garantis.',
  },
  bank: {
    metaTitle: 'Rapprochement bancaire externalisé depuis Casablanca',
    metaDescription: 'Lettrage des relevés, rapprochement bancaire et suivi des écarts par une équipe dédiée au Maroc. Comptes à jour chaque semaine, sans saisie de votre côté.',
  },
  vat: {
    metaTitle: 'Préparation TVA belge par une équipe au Maroc | Delegis',
    metaDescription: 'Grilles TVA, listings clients et intracommunautaires préparés depuis Casablanca pour vos dossiers belges. Votre comptable valide et dépose.',
  },
  closing: {
    metaTitle: 'Aide à la clôture des comptes annuels | Delegis Maroc',
    metaDescription: 'Écritures d’inventaire, rapprochements et dossier de révision préparés par nos comptables à Casablanca pour accélérer votre clôture annuelle.',
  },
  peppol: {
    metaTitle: 'E-facturation Peppol gérée depuis le Maroc | Delegis',
    metaDescription: 'Vous facturez des clients belges ? Notre desk Peppol à Casablanca envoie, reçoit et rapproche vos factures électroniques structurées.',
  },
  credit: {
    metaTitle: 'Recouvrement amiable et relances clients au Maroc',
    metaDescription: 'Relances par e-mail et téléphone, suivi des promesses de paiement et reporting DSO par une équipe à Casablanca. Une trésorerie plus saine, sans conflit.',
  },
  payroll: {
    metaTitle: 'Pré-paie externalisée : pointages et variables | Delegis',
    metaDescription: 'Collecte des pointages, absences et variables de paie préparée par notre équipe au Maroc et transmise à votre secrétariat social ou gestionnaire de paie.',
  },
  'data-entry': {
    metaTitle: 'Saisie de données et numérisation à Casablanca | Delegis',
    metaDescription: 'Numérisation, indexation et saisie de données en volume par une équipe au Maroc. Formulaires, catalogues, dossiers : rapide, contrôlé et confidentiel.',
  },
  migration: {
    metaTitle: 'Nettoyage et migration de données CRM/ERP au Maroc',
    metaDescription: 'Dédoublonnage, normalisation et reprise de vos données CRM ou ERP par une équipe à Casablanca, avant et pendant votre changement de logiciel.',
  },
  customer: {
    metaTitle: 'Service client externalisé au Maroc (FR/EN/AR) | Delegis',
    metaDescription: 'E-mail, chat et téléphone en français, anglais et arabe depuis Casablanca. Nous répondons à vos clients en votre nom, avec des KPI suivis chaque mois.',
  },
  ecommerce: {
    metaTitle: 'Back-office e-commerce externalisé au Maroc | Delegis',
    metaDescription: 'Commandes, retours, fiches produits et rapprochement des paiements gérés par une équipe à Casablanca pour votre boutique en ligne.',
  },
  rescue: {
    metaTitle: 'Rattrapage de retard comptable en 10 jours | Delegis Maroc',
    metaDescription: 'Des mois de pièces en retard ? Dossier Rescue remet votre comptabilité à jour en 10 jours ouvrables depuis Casablanca, ou remboursement partiel.',
  },
  dedicated: {
    metaTitle: 'Assistant comptable dédié à temps plein au Maroc',
    metaDescription: 'Un assistant administratif et comptable à temps plein, formé à vos outils, qui travaille depuis Casablanca pour votre entreprise uniquement.',
  },
};

export const frMaArticles: Record<Article['id'], Meta> = {
  'peppol-2026': {
    metaTitle: 'Peppol 2026 en Belgique : ce qui change pour vous',
    metaDescription: 'Facturer un client belge depuis 2026 : obligation Peppol, factures structurées, sanctions et étapes concrètes pour vous mettre en ordre à temps.',
  },
  'cost-inhouse': {
    metaTitle: 'Saisie comptable : coût interne ou externalisé ?',
    metaDescription: 'Salaire, charges, outils, encadrement : comparez le coût réel d’une saisie comptable faite en interne avec une saisie externalisée au Maroc.',
  },
  'outsourcing-checklist': {
    metaTitle: 'Comment externaliser sa comptabilité : le guide',
    metaDescription: 'Ce que vous pouvez externaliser, ce que vous gardez, les questions à poser au prestataire et les points à vérifier au contrat avant de vous lancer.',
  },
  'why-morocco': {
    metaTitle: 'Le Maroc, terre de nearshore comptable | Delegis',
    metaDescription: 'Langue, fuseau horaire, formation, coût : pourquoi le Maroc s’impose pour le back-office comptable des entreprises européennes, et ses limites.',
  },
};
