/**
 * Tests du moteur comptable — Section 15 du cahier des charges
 * Scénario de référence : 15 opérations et 35 écritures attendues
 */

import { describe, it, expect } from "vitest";
import {
  genererEcritures,
  genererJournal,
  genererBalance,
  totaliserJournal,
  totaliserBalance
} from "../moteur.js";

describe("Moteur comptable — Scénario de référence (15 opérations)", () => {
  const config = {
    tauxTva: 18,
    assujetti: true
  };

  const operations = [
    { id: 1, date: "2026-01-01", lib: "Apport en capital (numéraire)", ht: 5000000, mode: "Banque", piece: "", tiers: "" },
    { id: 2, date: "2026-01-05", lib: "Emprunt bancaire reçu", ht: 3000000, mode: "Banque", piece: "", tiers: "" },
    { id: 3, date: "2026-01-10", lib: "Achat de matériel informatique", ht: 1000000, mode: "Banque", piece: "", tiers: "" },
    { id: 4, date: "2026-01-15", lib: "Achat de marchandises pour revente", ht: 4000000, mode: "Crédit", piece: "", tiers: "" },
    { id: 5, date: "2026-01-20", lib: "Vente de marchandises", ht: 3000000, mode: "Crédit", piece: "", tiers: "" },
    { id: 6, date: "2026-01-25", lib: "Règlement reçu d'un client", ht: 1500000, mode: "Banque", piece: "", tiers: "" },
    { id: 7, date: "2026-01-28", lib: "Loyer magasin / bureau / entrepôt", ht: 300000, mode: "Banque", piece: "", tiers: "" },
    { id: 8, date: "2026-01-30", lib: "Salaires du personnel (constatation)", ht: 500000, mode: "Crédit", piece: "", tiers: "" },
    { id: 9, date: "2026-01-31", lib: "Paiement des salaires", ht: 500000, mode: "Banque", piece: "", tiers: "" },
    { id: 10, date: "2026-02-05", lib: "Règlement payé à un fournisseur", ht: 2000000, mode: "Banque", piece: "", tiers: "" },
    { id: 11, date: "2026-02-10", lib: "Remboursement d'emprunt (capital)", ht: 250000, mode: "Banque", piece: "", tiers: "" },
    { id: 12, date: "2026-02-15", lib: "Vente de marchandises", ht: 2500000, mode: "Banque", piece: "", tiers: "" },
    { id: 13, date: "2026-02-28", lib: "Inventaire — augmentation du stock", ht: 1500000, mode: "", piece: "", tiers: "" },
    { id: 14, date: "2026-02-28", lib: "Dotation aux amortissements", ht: 200000, mode: "", piece: "", tiers: "" },
    { id: 15, date: "2026-02-28", lib: "Téléphone et internet", ht: 50000, mode: "Mobile Money", piece: "", tiers: "" }
  ];

  it("Doit générer exactement 35 écritures (RG-02)", () => {
    const journal = genererJournal(operations, config);
    expect(journal.length).toBe(35);
  });

  it("Le journal doit être équilibré (CT-01)", () => {
    const journal = genererJournal(operations, config);
    const totaux = totaliserJournal(journal);
    expect(totaux.totalDebits).toBe(totaux.totalCredits);
  });

  it("La balance doit être équilibrée (CT-03)", () => {
    const balance = genererBalance(operations, config);
    const totaux = totaliserBalance(balance);
    expect(totaux.totalDebits).toBe(totaux.totalCredits);
  });

  it("Opération 1 : Apport en capital → 2 écritures (101 C, 521 D)", () => {
    const ecritures = genererEcritures(operations[0], operations, config);
    expect(ecritures.length).toBe(2);
    expect(ecritures[0]).toEqual({ compte: "101", sens: "C", montant: 5000000 });
    expect(ecritures[1]).toEqual({ compte: "521", sens: "D", montant: 5000000 });
  });

  it("Opération 4 : Achat à crédit → 3 écritures (601 D, 4452 D, 401 C)", () => {
    const ecritures = genererEcritures(operations[3], operations, config);
    expect(ecritures.length).toBe(3);
    // 601 Achats HT
    expect(ecritures[0]).toEqual({ compte: "601", sens: "D", montant: 4000000 });
    // 4452 TVA (4 000 000 × 18% = 720 000)
    expect(ecritures[1]).toEqual({ compte: "4452", sens: "D", montant: 720000 });
    // 401 Fournisseurs TTC
    expect(ecritures[2]).toEqual({ compte: "401", sens: "C", montant: 4720000 });
  });

  it("Opération 5 : Vente à crédit → 3 écritures (701 C, 4431 C, 411 D)", () => {
    const ecritures = genererEcritures(operations[4], operations, config);
    expect(ecritures.length).toBe(3);
    // 701 Ventes HT
    expect(ecritures[0]).toEqual({ compte: "701", sens: "C", montant: 3000000 });
    // 4431 TVA collectée (3 000 000 × 18% = 540 000)
    expect(ecritures[1]).toEqual({ compte: "4431", sens: "C", montant: 540000 });
    // 411 Clients TTC
    expect(ecritures[2]).toEqual({ compte: "411", sens: "D", montant: 3540000 });
  });

  it("Opération 13 : Inventaire stock → 2 écritures (6031 C, 311 D)", () => {
    const ecritures = genererEcritures(operations[12], operations, config);
    expect(ecritures.length).toBe(2);
    expect(ecritures[0]).toEqual({ compte: "6031", sens: "C", montant: 1500000 });
    expect(ecritures[1]).toEqual({ compte: "311", sens: "D", montant: 1500000 });
  });

  it("Opération 8 : Salaire constaté → 2 écritures (661 D, 422 C)", () => {
    const ecritures = genererEcritures(operations[7], operations, config);
    expect(ecritures.length).toBe(2);
    expect(ecritures[0]).toEqual({ compte: "661", sens: "D", montant: 500000 });
    expect(ecritures[1]).toEqual({ compte: "422", sens: "C", montant: 500000 });
  });

  it("Compte 521 (Banque) doit être débiteur de 8 220 000 F", () => {
    const balance = genererBalance(operations, config);
    const banque = balance.find(cpt => cpt.compte === "521");
    expect(banque.soldeDebiteur).toBe(8220000);
  });

  it("Compte 552 (Mobile Money) doit être créditeur de 59 000 F", () => {
    const balance = genererBalance(operations, config);
    const mobile = balance.find(cpt => cpt.compte === "552");
    // 15 : 50 000 HT + 9 000 TVA (50 000 × 18%) = 59 000
    expect(mobile.soldeCrebiteur).toBe(59000);
  });

  it("Compte 401 (Fournisseurs) doit être créditeur de 2 720 000 F", () => {
    const balance = genererBalance(operations, config);
    const fournisseurs = balance.find(cpt => cpt.compte === "401");
    // 4 : 4 720 000 | 10 : −2 000 000 = 2 720 000
    expect(fournisseurs.soldeCrebiteur).toBe(2720000);
  });

  it("Compte 411 (Clients) doit être débiteur de 2 040 000 F", () => {
    const balance = genererBalance(operations, config);
    const clients = balance.find(cpt => cpt.compte === "411");
    // 5 : 3 540 000 | 6 : −1 500 000 | 12 : +2 950 000 = 5 040 000 − 3 000 000 = 2 040 000
    expect(clients.soldeDebiteur).toBe(2040000);
  });

  it("Compte 4431 (TVA collectée) doit être créditeur de 990 000 F", () => {
    const balance = genererBalance(operations, config);
    const tvaColl = balance.find(cpt => cpt.compte === "4431");
    // 5 : 540 000 | 12 : 450 000 = 990 000
    expect(tvaColl.soldeCrebiteur).toBe(990000);
  });

  it("Compte 4452 (TVA déductible) doit être débiteur de 909 000 F", () => {
    const balance = genererBalance(operations, config);
    const tvaDed = balance.find(cpt => cpt.compte === "4452");
    // 3 : 180 000 | 4 : 720 000 | 15 : 9 000 = 909 000
    expect(tvaDed.soldeDebiteur).toBe(909000);
  });

  it("Compte 311 (Stocks) doit être débiteur de 1 500 000 F", () => {
    const balance = genererBalance(operations, config);
    const stock = balance.find(cpt => cpt.compte === "311");
    expect(stock.soldeDebiteur).toBe(1500000);
  });

  it("Cas limite : TVA qui s'arrondit à zéro", () => {
    const op = { id: 999, date: "2026-03-01", lib: "Vente de marchandises", ht: 2, mode: "Banque" };
    const ecritures = genererEcritures(op, [op], config);
    // 2 F × 18% = 0.36 arrondi à 0 → pas d'écriture de TVA
    expect(ecritures.length).toBe(2);
    expect(ecritures.some(e => e.compte === "4431")).toBe(false);
  });

  it("Cas limite : TVA au demi-franc arrondi vers le haut", () => {
    const op = { id: 999, date: "2026-03-01", lib: "Vente de marchandises", ht: 25, mode: "Banque" };
    const ecritures = genererEcritures(op, [op], config);
    // 25 F × 18% = 4.5 arrondi à 5 (ROUND_HALF_UP)
    expect(ecritures.length).toBe(3);
    expect(ecritures[1]).toEqual({ compte: "4431", sens: "C", montant: 5 });
  });

  it("Mode Mobile Money : contrepartie toujours 552, jamais 521", () => {
    const op = { id: 999, date: "2026-03-01", lib: "Vente de marchandises", ht: 100000, mode: "Mobile Money" };
    const ecritures = genererEcritures(op, [op], config);
    const contrepartie = ecritures.find(e => e.sens === "D" && e.compte !== "701" && e.compte !== "4431");
    expect(contrepartie.compte).toBe("552");
  });

  it("Montant nul ne produit aucune écriture", () => {
    const op = { id: 999, date: "2026-03-01", lib: "Vente de marchandises", ht: 0, mode: "Banque" };
    const ecritures = genererEcritures(op, [op], config);
    expect(ecritures.length).toBe(0);
  });
});
