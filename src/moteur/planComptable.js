/**
 * Annexe B — Plan comptable du SYSCOHADA révisé
 * Extrait utilisé par les règles. Modifiable par dossier (RG-20).
 */

export const PLAN_COMPTABLE_DEFAUT = [
  // CLASSE 1 — CAPITAUX PROPRES
  { numero: "101", intitule: "Capital social", classe: "1" },
  { numero: "108", intitule: "Compte de l'exploitant", classe: "1" },
  { numero: "11", intitule: "Report à nouveau", classe: "1" },
  { numero: "12", intitule: "Résultat net de l'exercice", classe: "1" },
  { numero: "162", intitule: "Emprunts auprès des établissements de crédit", classe: "1" },

  // CLASSE 2 — IMMOBILISATIONS
  { numero: "2131", intitule: "Logiciels", classe: "2" },
  { numero: "2331", intitule: "Aménagements et installations", classe: "2" },
  { numero: "2441", intitule: "Mobilier et matériel de bureau", classe: "2" },
  { numero: "2442", intitule: "Matériel informatique", classe: "2" },
  { numero: "245", intitule: "Matériel de transport", classe: "2" },
  { numero: "281", intitule: "Amortissements des immobilisations incorporelles", classe: "2" },
  { numero: "283", intitule: "Amortissements des bâtiments et aménagements", classe: "2" },
  { numero: "284", intitule: "Amortissements du matériel", classe: "2" },

  // CLASSE 3 — STOCKS
  { numero: "311", intitule: "Stocks de marchandises", classe: "3" },

  // CLASSE 4 — TIERS ET COMPTES SPÉCIAUX
  { numero: "401", intitule: "Fournisseurs", classe: "4" },
  { numero: "411", intitule: "Clients", classe: "4" },
  { numero: "422", intitule: "Personnel, rémunérations dues", classe: "4" },
  { numero: "431", intitule: "Sécurité sociale (CNPS)", classe: "4" },
  { numero: "441", intitule: "État, impôt sur le résultat", classe: "4" },
  { numero: "4431", intitule: "État, TVA facturée (collectée)", classe: "4" },
  { numero: "4441", intitule: "État, TVA due", classe: "4" },
  { numero: "4452", intitule: "État, TVA récupérable sur achats", classe: "4" },
  { numero: "447", intitule: "État, autres impôts et taxes", classe: "4" },
  { numero: "462", intitule: "Associés, comptes courants", classe: "4" },

  // CLASSE 5 — COMPTES FINANCIERS
  { numero: "521", intitule: "Banque", classe: "5" },
  { numero: "552", intitule: "Monnaie électronique (mobile money)", classe: "5" },
  { numero: "571", intitule: "Caisse", classe: "5" },
  { numero: "585", intitule: "Virements de fonds", classe: "5" },

  // CLASSE 6 — CHARGES
  { numero: "601", intitule: "Achats de marchandises", classe: "6" },
  { numero: "6031", intitule: "Variation des stocks de marchandises", classe: "6" },
  { numero: "6051", intitule: "Eau", classe: "6" },
  { numero: "6052", intitule: "Électricité", classe: "6" },
  { numero: "6053", intitule: "Carburant et lubrifiants", classe: "6" },
  { numero: "6054", intitule: "Fournitures d'entretien", classe: "6" },
  { numero: "6055", intitule: "Fournitures de bureau", classe: "6" },
  { numero: "6112", intitule: "Transports sur achats", classe: "6" },
  { numero: "614", intitule: "Transports du personnel", classe: "6" },
  { numero: "6222", intitule: "Locations de bâtiments", classe: "6" },
  { numero: "624", intitule: "Entretien, réparations et maintenance", classe: "6" },
  { numero: "625", intitule: "Primes d'assurance", classe: "6" },
  { numero: "627", intitule: "Publicité, publications, relations publiques", classe: "6" },
  { numero: "628", intitule: "Frais de télécommunications", classe: "6" },
  { numero: "631", intitule: "Frais bancaires", classe: "6" },
  { numero: "6324", intitule: "Honoraires", classe: "6" },
  { numero: "633", intitule: "Frais de formation du personnel", classe: "6" },
  { numero: "641", intitule: "Impôts et taxes directs", classe: "6" },
  { numero: "658", intitule: "Autres charges de gestion courante", classe: "6" },
  { numero: "661", intitule: "Rémunérations directes versées au personnel", classe: "6" },
  { numero: "664", intitule: "Charges sociales", classe: "6" },
  { numero: "671", intitule: "Intérêts des emprunts", classe: "6" },
  { numero: "681", intitule: "Dotations aux amortissements d'exploitation", classe: "6" },

  // CLASSE 7 — PRODUITS
  { numero: "701", intitule: "Ventes de marchandises", classe: "7" },
  { numero: "706", intitule: "Services vendus", classe: "7" },
  { numero: "707", intitule: "Produits accessoires", classe: "7" },
  { numero: "71", intitule: "Subventions d'exploitation", classe: "7" },
  { numero: "758", intitule: "Produits divers de gestion courante", classe: "7" },
  { numero: "771", intitule: "Intérêts et produits financiers", classe: "7" },

  // CLASSE 8 — IMPÔTS SUR LE RÉSULTAT
  { numero: "891", intitule: "Impôts sur le résultat", classe: "8" }
];

// Index pour recherche rapide par numéro
export function obtenirCompte(numero) {
  return PLAN_COMPTABLE_DEFAUT.find(c => c.numero === numero) || null;
}

export function intituleCompte(numero) {
  const compte = obtenirCompte(numero);
  return compte ? compte.intitule : "COMPTE ABSENT DU PLAN";
}

export function comptesDeClasse(classe) {
  return PLAN_COMPTABLE_DEFAUT.filter(c => c.classe === classe);
}

export default PLAN_COMPTABLE_DEFAUT;
