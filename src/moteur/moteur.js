/**
 * MOTEUR COMPTABLE — Annexe D
 * Fonction unique qui produit les écritures à partir d'une opération et d'une règle.
 *
 * Exigences (EXG-01, EXG-07, EXG-08) :
 * - Un seul moteur pour toutes les écritures
 * - Tous les écrans passent par cette fonction
 * - Aucune logique comptable ailleurs
 * - Pas d'ajustement en dur : tout par la table des règles
 */

import Decimal from "decimal.js";
import { obtenirRegle } from "./regleOperations.js";
import { obtenirCompte } from "./planComptable.js";

// Configuration d'arrondi : franc CFA, ROUND_HALF_UP
Decimal.set({ rounding: Decimal.ROUND_HALF_UP, precision: 20 });

/**
 * Retrouve l'opération d'origine d'une extourne
 */
function operationSource(operations, idExtourne) {
  return operations.find(op => String(op.id) === String(idExtourne)) || null;
}

/**
 * LA FONCTION UNIQUE — Génère les écritures pour une opération
 *
 * @param {Object} operation - Opération saisie
 * @param {Array<Object>} operations - Toutes les opérations (pour les extournes)
 * @param {Object} config - Configuration du dossier
 * @param {number} prof - Profondeur récursive (garde-fou contre boucles d'extournes)
 * @returns {Array<Object>} Écritures générées (peut être vide en cas d'erreur)
 */
export function genererEcritures(operation, operations = [], config = {}, prof = 0) {
  // Garde-fou : empêcher boucles infinies d'extournes
  if (prof > 3) return [];

  // Cas 1 : extourne (annulation miroir d'une opération d'origine)
  if (operation.extourneDe) {
    const src = operationSource(operations, operation.extourneDe);
    if (!src) return [];

    // Récupérer les écritures de l'opération d'origine, puis les inverser
    const origEcritures = genererEcritures(src, operations, config, prof + 1);
    return origEcritures.map(ligne => ({
      compte: ligne.compte,
      sens: ligne.sens === "D" ? "C" : "D",
      montant: ligne.montant
    }));
  }

  // Cas 2 : opération normale
  const regle = obtenirRegle(operation.lib);
  if (!regle) return []; // RG-08 : pas d'écriture si règle introuvable

  const ht = Number(operation.ht) || 0;
  if (ht === 0 && !operation.extourneDe) return []; // Montant nul

  // Calcul de la TVA
  // - Zéro si le dossier n'est pas assujetti ou si la règle est exonérée
  // - ROUND_HALF_UP toujours
  const tauxEff = regle.cptTva ? (config.tauxTva || 18) : 0;
  const montantTva = regle.cptTva
    ? new Decimal(ht).times(tauxEff).dividedBy(100).toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber()
    : 0;

  const montantTTC = ht + montantTva;

  // Construire les trois écritures possibles
  const ecritures = [];

  // Écriture 1 : compte principal, sens de la règle, montant HT
  ecritures.push({
    compte: regle.cpt,
    sens: regle.sens,
    montant: ht
  });

  // Écriture 2 : TVA, si montant TVA > 0
  if (regle.cptTva && montantTva > 0) {
    ecritures.push({
      compte: regle.cptTva,
      sens: regle.sens,
      montant: montantTva
    });
  }

  // Écriture 3 : contrepartie (imposée par la règle ou déduite du mode de règlement)
  const contrepartie = regle.fixe || calculerContrepartie(regle.type, operation.mode);
  ecritures.push({
    compte: contrepartie,
    sens: regle.sens === "D" ? "C" : "D",
    montant: montantTTC
  });

  return ecritures;
}

/**
 * Détermine la contrepartie selon le mode de règlement (RG-06)
 */
function calculerContrepartie(typeOperation, mode) {
  switch (mode) {
    case "Caisse":
      return "571";
    case "Banque":
      return "521";
    case "Mobile Money":
      return "552";
    case "Crédit":
      // Crédit : 411 pour Vente, 401 pour autres
      return typeOperation === "Vente" ? "411" : "401";
    default:
      return typeOperation === "Vente" ? "411" : "401";
  }
}

/**
 * Génère le journal complet
 * Toutes les écritures, classées par date d'opération
 */
export function genererJournal(operations = [], config = {}) {
  const journal = [];
  let numeroLigne = 0;

  // Trier par date, puis par ID
  const opsTriees = [...operations].sort((a, b) => {
    const cmpDate = (a.date || "").localeCompare(b.date || "");
    return cmpDate !== 0 ? cmpDate : String(a.id).localeCompare(String(b.id));
  });

  opsTriees.forEach(op => {
    const ecritures = genererEcritures(op, operations, config);
    ecritures.forEach(ligne => {
      numeroLigne++;
      journal.push({
        numero: numeroLigne,
        date: op.date,
        piece: op.piece || "",
        idOperation: op.id,
        tiers: op.tiers || "",
        libelle: op.lib + (op.tiers ? ` — ${op.tiers}` : ""),
        compte: ligne.compte,
        intituleCompte: obtenirCompte(ligne.compte)?.intitule || "COMPTE ABSENT DU PLAN",
        debit: ligne.sens === "D" ? ligne.montant : 0,
        credit: ligne.sens === "C" ? ligne.montant : 0
      });
    });
  });

  return journal;
}

/**
 * Génère la balance générale
 * Un compte par ligne : débits, crédits, soldes
 */
export function genererBalance(operations = [], config = {}) {
  const journal = genererJournal(operations, config);
  const comptes = new Map();

  journal.forEach(ligne => {
    if (!comptes.has(ligne.compte)) {
      comptes.set(ligne.compte, {
        compte: ligne.compte,
        intitule: ligne.intituleCompte,
        totalDebits: 0,
        totalCredits: 0
      });
    }

    const cpt = comptes.get(ligne.compte);
    cpt.totalDebits += ligne.debit;
    cpt.totalCredits += ligne.credit;
  });

  // Calculer les soldes et trier
  const balance = Array.from(comptes.values())
    .map(cpt => ({
      ...cpt,
      soldeDebiteur: cpt.totalDebits > cpt.totalCredits ? cpt.totalDebits - cpt.totalCredits : 0,
      soldeCrebiteur: cpt.totalCredits > cpt.totalDebits ? cpt.totalCredits - cpt.totalDebits : 0
    }))
    .sort((a, b) => a.compte.localeCompare(b.compte));

  return balance;
}

/**
 * Calcule les totaux du journal
 * Pour vérifier l'équilibre : totalDebits === totalCredits (CT-01)
 */
export function totaliserJournal(journal) {
  return {
    totalDebits: journal.reduce((sum, l) => sum + l.debit, 0),
    totalCredits: journal.reduce((sum, l) => sum + l.credit, 0),
    nombreEcritures: journal.length
  };
}

/**
 * Calcule les totaux de la balance
 * Pour vérifier l'équilibre : totalDebits === totalCredits
 */
export function totaliserBalance(balance) {
  return {
    totalDebits: balance.reduce((sum, cpt) => sum + cpt.soldeDebiteur, 0),
    totalCredits: balance.reduce((sum, cpt) => sum + cpt.soldeCrebiteur, 0),
    nombreComptes: balance.length
  };
}

export default {
  genererEcritures,
  genererJournal,
  genererBalance,
  totaliserJournal,
  totaliserBalance
};
