/**
 * Lot 2 — États financiers
 *
 * Génération du compte de résultat et du bilan
 * à partir des opérations comptables
 */

import { genererBalance } from './moteur.js'
import { intituleCompte, comptesDeClasse } from './planComptable.js'

export function genererCompteResultat(operations, config) {
  const balance = genererBalance(operations, config)

  const charges = []
  const produits = []

  balance.forEach(cpt => {
    const classe = parseInt(cpt.compte[0])

    if (classe === 6) {
      charges.push({
        compte: cpt.compte,
        intitule: cpt.intitule,
        montant: cpt.soldeDebiteur || cpt.soldeCrebiteur
      })
    } else if (classe === 7) {
      produits.push({
        compte: cpt.compte,
        intitule: cpt.intitule,
        montant: cpt.soldeCrebiteur || cpt.soldeDebiteur
      })
    }
  })

  const totalCharges = charges.reduce((sum, c) => sum + c.montant, 0)
  const totalProduits = produits.reduce((sum, p) => sum + p.montant, 0)
  const resultat = totalProduits - totalCharges

  return {
    charges,
    produits,
    totalCharges,
    totalProduits,
    resultat,
    beneficiaire: resultat > 0
  }
}

export function genererBilan(operations, config) {
  const balance = genererBalance(operations, config)

  const actif = {
    immobilisations: [],
    stocks: [],
    tiers: [],
    tresorerie: [],
    totalActif: 0
  }

  const passif = {
    capital: [],
    dettes: [],
    reserves: [],
    benefices: [],
    totalPassif: 0
  }

  balance.forEach(cpt => {
    const classe = parseInt(cpt.compte[0])
    const solde = cpt.soldeDebiteur || cpt.soldeCrebiteur

    const compte = {
      numero: cpt.compte,
      intitule: cpt.intitule,
      montant: solde
    }

    if (classe === 2) {
      actif.immobilisations.push(compte)
      actif.totalActif += solde
    } else if (classe === 3) {
      actif.stocks.push(compte)
      actif.totalActif += solde
    } else if (classe === 4 && cpt.compte.startsWith('41')) {
      actif.tiers.push(compte)
      actif.totalActif += solde
    } else if (classe === 5 && cpt.compte.startsWith('52')) {
      actif.tresorerie.push(compte)
      actif.totalActif += solde
    } else if (classe === 1) {
      passif.capital.push(compte)
      passif.totalPassif += solde
    } else if (classe === 4 && cpt.compte.startsWith('40')) {
      passif.dettes.push(compte)
      passif.totalPassif += solde
    } else if (classe === 5 && cpt.compte.startsWith('51')) {
      passif.reserves.push(compte)
      passif.totalPassif += solde
    } else if (classe === 8) {
      passif.benefices.push(compte)
      passif.totalPassif += solde
    }
  })

  return {
    actif,
    passif,
    equilibre: actif.totalActif === passif.totalPassif
  }
}
