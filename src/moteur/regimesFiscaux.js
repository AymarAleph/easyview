/**
 * Régimes fiscaux en Côte d'Ivoire
 *
 * Définit les paramètres et règles selon le régime choisi
 */

export const REGIMES_FISCAUX = {
  reel: {
    id: 'reel',
    nom: 'Régime du réel',
    description: 'Impôt sur le bénéfice réel — Déclaration annuelle',
    tva: 18,
    assujetti: true,
    impotBenefice: true,
    contribution: true,
    declaration: 'Annuelle',
    fichesClients: false,
    provisions: true
  },
  simplifie: {
    id: 'simplifie',
    nom: 'Régime simplifié',
    description: 'Pour micro-entreprises — Chiffre d\'affaires limité',
    tva: 18,
    assujetti: true,
    impotBenefice: false,
    contribution: false,
    declaration: 'Annuelle',
    fichesClients: true,
    provisions: false
  },
  forfaitaire: {
    id: 'forfaitaire',
    nom: 'Régime forfaitaire',
    description: 'Impôt forfaitaire — Montant fixe par activité',
    tva: 0,
    assujetti: false,
    impotBenefice: false,
    contribution: false,
    declaration: 'Semestrielle',
    fichesClients: false,
    provisions: false
  },
  franchise: {
    id: 'franchise',
    nom: 'Franchise de TVA',
    description: 'Exonération de TVA — Petit commerce',
    tva: 0,
    assujetti: false,
    impotBenefice: true,
    contribution: false,
    declaration: 'Annuelle',
    fichesClients: false,
    provisions: false
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
