/**
 * Annexe A — Table des 57 règles d'opérations du SYSCOHADA
 * Ces règles sont une DONNÉE, jamais du code (EXG-01).
 * Aucune modification du moteur comptable ne devrait être requise pour ajouter une règle.
 */

export const REGLES_OPERATIONS = [
  // VENTES
  { lib: "Vente de marchandises", type: "Vente", cpt: "701", sens: "C", tva: 18, cptTva: "4431", fixe: "" },
  { lib: "Vente de marchandises exonérée de TVA", type: "Vente", cpt: "701", sens: "C", tva: 0, cptTva: "", fixe: "" },
  { lib: "Prestation de services", type: "Vente", cpt: "706", sens: "C", tva: 18, cptTva: "4431", fixe: "" },
  { lib: "Produits accessoires", type: "Vente", cpt: "707", sens: "C", tva: 18, cptTva: "4431", fixe: "" },
  { lib: "Autres produits de gestion courante", type: "Vente", cpt: "758", sens: "C", tva: 0, cptTva: "", fixe: "" },
  { lib: "Produits financiers (intérêts reçus)", type: "Vente", cpt: "771", sens: "C", tva: 0, cptTva: "", fixe: "" },
  { lib: "Subvention d'exploitation reçue", type: "Vente", cpt: "71", sens: "C", tva: 0, cptTva: "", fixe: "" },

  // ACHATS
  { lib: "Achat de marchandises pour revente", type: "Achat", cpt: "601", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Achat de marchandises exonéré de TVA", type: "Achat", cpt: "601", sens: "D", tva: 0, cptTva: "", fixe: "" },

  // CHARGES
  { lib: "Achat de fournitures de bureau", type: "Charge", cpt: "6055", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Eau", type: "Charge", cpt: "6051", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Électricité", type: "Charge", cpt: "6052", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Carburant et lubrifiants", type: "Charge", cpt: "6053", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Fournitures d'entretien", type: "Charge", cpt: "6054", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Transport sur achats de marchandises", type: "Charge", cpt: "6112", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Transport du personnel", type: "Charge", cpt: "614", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Loyer magasin / bureau / entrepôt", type: "Charge", cpt: "6222", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Entretien et réparations", type: "Charge", cpt: "624", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Primes d'assurance", type: "Charge", cpt: "625", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Publicité et communication", type: "Charge", cpt: "627", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Téléphone et internet", type: "Charge", cpt: "628", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Frais bancaires", type: "Charge", cpt: "631", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Honoraires (expert-comptable, juriste, conseil)", type: "Charge", cpt: "6324", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Frais de formation du personnel", type: "Charge", cpt: "633", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Impôts et taxes", type: "Charge", cpt: "641", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Autres charges de gestion courante", type: "Charge", cpt: "658", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Salaires du personnel (constatation)", type: "Charge", cpt: "661", sens: "D", tva: 0, cptTva: "", fixe: "422" },
  { lib: "Charges sociales CNPS (constatation)", type: "Charge", cpt: "664", sens: "D", tva: 0, cptTva: "", fixe: "431" },
  { lib: "Intérêts d'emprunt", type: "Charge", cpt: "671", sens: "D", tva: 0, cptTva: "", fixe: "" },

  // IMMOBILISATIONS
  { lib: "Achat de matériel informatique", type: "Immobilisation", cpt: "2442", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Achat de mobilier et matériel de bureau", type: "Immobilisation", cpt: "2441", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Achat de véhicule de livraison", type: "Immobilisation", cpt: "245", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Achat de logiciel", type: "Immobilisation", cpt: "2131", sens: "D", tva: 18, cptTva: "4452", fixe: "" },
  { lib: "Aménagement du local", type: "Immobilisation", cpt: "2331", sens: "D", tva: 18, cptTva: "4452", fixe: "" },

  // RÉGULARISATIONS
  { lib: "Dotation aux amortissements", type: "Régularisation", cpt: "681", sens: "D", tva: 0, cptTva: "", fixe: "284" },
  { lib: "Impôt sur le résultat (constatation)", type: "Régularisation", cpt: "891", sens: "D", tva: 0, cptTva: "", fixe: "441" },
  { lib: "Inventaire — augmentation du stock", type: "Régularisation", cpt: "6031", sens: "C", tva: 0, cptTva: "", fixe: "311" },
  { lib: "Inventaire — diminution du stock", type: "Régularisation", cpt: "6031", sens: "D", tva: 0, cptTva: "", fixe: "311" },
  { lib: "Écart de caisse — manquant", type: "Régularisation", cpt: "658", sens: "D", tva: 0, cptTva: "", fixe: "571" },
  { lib: "Écart de caisse — excédent", type: "Régularisation", cpt: "758", sens: "C", tva: 0, cptTva: "", fixe: "571" },

  // FINANCEMENTS
  { lib: "Apport en capital (numéraire)", type: "Financement", cpt: "101", sens: "C", tva: 0, cptTva: "", fixe: "" },
  { lib: "Apport en compte courant d'associé", type: "Financement", cpt: "462", sens: "C", tva: 0, cptTva: "", fixe: "" },
  { lib: "Emprunt bancaire reçu", type: "Financement", cpt: "162", sens: "C", tva: 0, cptTva: "", fixe: "" },
  { lib: "Remboursement d'emprunt (capital)", type: "Financement", cpt: "162", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Retrait / prélèvement de l'exploitant", type: "Financement", cpt: "108", sens: "D", tva: 0, cptTva: "", fixe: "" },

  // ENCAISSEMENTS
  { lib: "Règlement reçu d'un client", type: "Encaissement", cpt: "411", sens: "C", tva: 0, cptTva: "", fixe: "" },

  // DÉCAISSEMENTS
  { lib: "Règlement payé à un fournisseur", type: "Décaissement", cpt: "401", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Paiement des salaires", type: "Décaissement", cpt: "422", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Paiement des charges sociales CNPS", type: "Décaissement", cpt: "431", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Paiement de la TVA à la DGI", type: "Décaissement", cpt: "4441", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Paiement de l'impôt sur le résultat", type: "Décaissement", cpt: "441", sens: "D", tva: 0, cptTva: "", fixe: "" },

  // TRÉSORERIE
  { lib: "Approvisionnement de la caisse (retrait bancaire)", type: "Trésorerie", cpt: "571", sens: "D", tva: 0, cptTva: "", fixe: "521" },
  { lib: "Versement d'espèces en banque", type: "Trésorerie", cpt: "521", sens: "D", tva: 0, cptTva: "", fixe: "571" },
  { lib: "Approvisionnement de la caisse depuis le mobile money", type: "Trésorerie", cpt: "571", sens: "D", tva: 0, cptTva: "", fixe: "552" },
  { lib: "Dépôt d'espèces sur le mobile money", type: "Trésorerie", cpt: "552", sens: "D", tva: 0, cptTva: "", fixe: "571" },
  { lib: "Virement de fonds — sortie du compte", type: "Trésorerie", cpt: "585", sens: "D", tva: 0, cptTva: "", fixe: "" },
  { lib: "Virement de fonds — arrivée sur le compte", type: "Trésorerie", cpt: "585", sens: "C", tva: 0, cptTva: "", fixe: "" }
];

// Index pour recherche rapide par libellé
export function obtenirRegle(libelle) {
  return REGLES_OPERATIONS.find(r => r.lib === libelle) || null;
}

// Toutes les opérations de type donnée
export function operationsDeType(type) {
  return REGLES_OPERATIONS.filter(r => r.type === type);
}

export default REGLES_OPERATIONS;
