/**
 * Régimes fiscaux en Côte d'Ivoire
 *
 * Régimes officiels définis par la DGI (Direction Générale des Impôts)
 * selon l'article 33 de l'annexe fiscale du Budget de l'État (loi de finances 2026)
 *
 * Références:
 * - DGI Côte d'Ivoire: https://www.dgi.gouv.ci/
 * - Code Général des Impôts 2026
 * - Loi de Finances 2026 - Annexe Fiscale
 *
 * Les régimes sont définis selon le chiffre d'affaires annuel de l'entreprise
 */

export const REGIMES_FISCAUX = {
  reel: {
    id: 'reel',
    nom: 'Régime Réel Normal (RNI)',
    description: 'Pour les entreprises avec CA ≥ 500 millions FCFA. TVA obligatoire à 18%, impôt sur bénéfice réel, déclarations mensuelles de TVA.',
    tva: 18,
    assujetti: true,
    impotBenefice: true,
    contribution: true,
    declaration: 'Mensuelle',
    fichesClients: true,
    provisions: true,
    seuilMin: 500000000,
    description_details: 'Impôt sur le bénéfice réel avec assujettissement à la TVA. Déclarations mensuelles obligatoires. Tenue de comptes détaillée requise.'
  },
  simplifie: {
    id: 'simplifie',
    nom: 'Régime Réel Simplifié (RRS)',
    description: 'Pour les entreprises avec CA entre 50-500 millions FCFA. TVA obligatoire à 18%, impôt sur bénéfice, déclarations trimestrielles ou mensuelles.',
    tva: 18,
    assujetti: true,
    impotBenefice: true,
    contribution: true,
    declaration: 'Trimestrielle',
    fichesClients: true,
    provisions: true,
    seuilMin: 50000000,
    seuilMax: 500000000,
    description_details: 'Régime intermédiaire pour PME. TVA à 18%. Impôt sur bénéfice réel avec déclarations trimestrielles de TVA.'
  },
  forfaitaire: {
    id: 'forfaitaire',
    nom: 'Régime Forfaitaire',
    description: 'Pour les entreprises avec CA entre 5-50 millions FCFA. Pas de TVA, impôt synthétique annuel couvrant patente et BIC.',
    tva: 0,
    assujetti: false,
    impotBenefice: false,
    contribution: false,
    declaration: 'Annuelle',
    fichesClients: false,
    provisions: false,
    seuilMin: 5000000,
    seuilMax: 50000000,
    description_details: 'Régime forfaitaire avec impôt synthétique annuel. Pas de TVA à facturer. Convient aux petites entreprises.'
  },
  franchise: {
    id: 'franchise',
    nom: 'Franchise de TVA (Micro-entreprises)',
    description: 'Pour les entreprises avec CA < 5 millions FCFA. Exonération de TVA et impôt synthétique minimal.',
    tva: 0,
    assujetti: false,
    impotBenefice: false,
    contribution: false,
    declaration: 'Annuelle',
    fichesClients: false,
    provisions: false,
    seuilMax: 5000000,
    description_details: 'Exonération de TVA pour micro-entreprises. Impôt synthétique minimal. Régime simplifié adapté aux très petits commerces.'
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
