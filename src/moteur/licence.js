/**
 * Lot 4 — Gestion de licence
 *
 * Vérification et gestion de la licence d'utilisation
 */

const DEFAULT_LICENCE = {
  type: 'eval',
  dateActivation: new Date().toISOString().split('T')[0],
  dateExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  etat: 'actif',
  moteurVersion: '1.0.0'
}

export function verifierLicence(licence = DEFAULT_LICENCE) {
  const aujourd = new Date().toISOString().split('T')[0]
  const actif = licence.dateExpiration >= aujourd && licence.etat === 'actif'

  return {
    ...licence,
    actif,
    joursRestants: Math.max(0, Math.floor((new Date(licence.dateExpiration) - new Date(aujourd)) / (24 * 60 * 60 * 1000)))
  }
}

export function activerLicence(cle) {
  if (!cle || cle.length < 10) {
    return { success: false, message: 'Clé invalide' }
  }

  const dateExpiration = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return {
    success: true,
    message: 'Licence activée avec succès',
    licence: {
      type: 'commercial',
      dateActivation: new Date().toISOString().split('T')[0],
      dateExpiration,
      etat: 'actif',
      moteurVersion: '1.0.0',
      cle: cle.substring(0, 10) + '...'
    }
  }
}

export function renouvelerLicence(licence) {
  if (!licence.actif) {
    return { success: false, message: 'La licence n\'est pas active' }
  }

  const dateExpiration = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return {
    success: true,
    message: 'Licence renouvelée avec succès',
    licence: {
      ...licence,
      dateExpiration
    }
  }
}

export function getLicenceParDefaut() {
  return DEFAULT_LICENCE
}
