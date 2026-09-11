/**
 * Régimes fiscaux officiels en Côte d'Ivoire (2026)
 *
 * Régimes définis par la DGI (Direction Générale des Impôts) selon:
 * - Guide de Démarrage 1ère Année Fiscale - Edition 2 (Say's Imperium)
 * - Article 33 de l'annexe fiscale du Budget de l'État
 * - Code Général des Impôts 2026
 * - Loi de Finances 2026
 *
 * Les 5 régimes officiel sont déterminés par le chiffre d'affaires annuel TTC.
 * Une transition automatique intervient quand le CA franchit les seuils.
 *
 * Références officielles:
 * - Direction Générale des Impôts: https://www.dgi.gouv.ci/
 * - Télédéclaration e-impôts: https://dgi.gouv.ci/
 */

export const REGIMES_FISCAUX = {
  communal: {
    id: 'communal',
    nom: 'Taxe communale de l\'Entrepreneur',
    description: 'Pour les entreprises avec CA < 5 millions FCFA. Impôt communal de 2-2,5% du CA sans TVA.',
    tva: 0,
    assujetti: false,
    impotBenefice: false,
    contribution: true,
    declaration: 'Communale',
    fichesClients: false,
    provisions: false,
    seuilMax: 5000000,
    taux_detail: '2,5% (commerce/négoce) ou 2% (services/artisanat) du CA',
    description_details: 'Impôt communal pour très petites entreprises. Pas de TVA. Paiement à la commune locale. Seuil d\'exonération: CA < 1,2M FCFA/an avec tarif forfaitaire journalier.'
  },
  tee: {
    id: 'tee',
    nom: 'Taxe d\'État de l\'Entrepreneur (TEE)',
    description: 'Pour les entreprises avec CA 5-50 millions FCFA. Impôt TEE de 4-5% du CA TTC sans TVA. Taux réduit de moitié avec CGA.',
    tva: 0,
    assujetti: false,
    impotBenefice: false,
    contribution: true,
    declaration: 'Mensuelle',
    fichesClients: true,
    provisions: false,
    seuilMin: 5000000,
    seuilMax: 50000000,
    taux_detail: '4% (commerce/négoce) ou 5% (services) du CA TTC - DGI. Taux réduit de moitié avec CGA.',
    description_details: 'Impôt TEE calculé annuellement mais payé mensuellement (1/12ème chaque mois). Échéance: avant le 10. Sanction retard: majoration 10%/mois (plafond 150%). Adhésion CGA avant 31 janvier pour taux réduit.'
  },
  rme: {
    id: 'rme',
    nom: 'Régime des microenterprises (RME)',
    description: 'Pour les entreprises avec CA 50-200 millions FCFA. Impôt forfaitaire 7% du CA TTC sans TVA. Réduit à 5% avec CGA.',
    tva: 0,
    assujetti: false,
    impotBenefice: false,
    contribution: true,
    declaration: 'Télédéclaration',
    fichesClients: false,
    provisions: false,
    seuilMin: 50000000,
    seuilMax: 200000000,
    taux_detail: '7% du CA TTC (5% avec adhésion CGA)',
    description_details: 'Régime forfaitaire pour microenterprises. Pas de TVA. Télédéclaration obligatoire. Transition automatique vers RRS si CA dépasse 200M FCFA.'
  },
  rrs: {
    id: 'rrs',
    nom: 'Régime Réel Simplifié (RRS)',
    description: 'Pour les entreprises avec CA 200-500 millions FCFA. Impôt sur bénéfices réels + TVA à 18%. Comptabilité complète.',
    tva: 18,
    assujetti: true,
    impotBenefice: true,
    contribution: true,
    declaration: 'Trimestrielle',
    fichesClients: true,
    provisions: true,
    seuilMin: 200000000,
    seuilMax: 500000000,
    taux_detail: 'Impôt sur les bénéfices + TVA 18% + comptabilité complète',
    description_details: 'Régime intermédiaire pour PME. Assujettissement à TVA 18%. Impôt calculé sur bénéfices réels. Obligations comptables SYSCOHADA complètes. Déclarations trimestrielles ou mensuelles selon effectif.'
  },
  rni: {
    id: 'rni',
    nom: 'Régime Réel Normal (RNI)',
    description: 'Pour les entreprises avec CA > 500 millions FCFA. Impôt sur Sociétés (IS) 25% + TVA 18%. Comptabilité complète SYSCOHADA.',
    tva: 18,
    assujetti: true,
    impotBenefice: true,
    contribution: true,
    declaration: 'Mensuelle',
    fichesClients: true,
    provisions: true,
    seuilMin: 500000000,
    taux_detail: 'IS 25% sur bénéfices + TVA 18% + comptabilité SYSCOHADA',
    description_details: 'Régime normal pour grandes entreprises. TVA obligatoire 18%. Impôt sur Sociétés (IS) 25% sur bénéfices. Déclarations mensuelles TVA obligatoires. Comptabilité SYSCOHADA complète exigée. Dépôt états financiers auprès DGI après approbation.'
  }
}

export function obtenirRegime(id) {
  return REGIMES_FISCAUX[id] || REGIMES_FISCAUX.reel
}

export function listerRegimes() {
  return Object.values(REGIMES_FISCAUX)
}

export function calculerTvaRegime(regime) {
  return regime.assujetti ? regime.tva : 0
}

export function regimeRequiertFichesClients(regime) {
  return regime.fichesClients
}

export function regimeRequiertProvisions(regime) {
  return regime.provisions
}
