/**
 * Lot 3 — Gestion des exercices
 *
 * Fermeture d'exercice, report à nouveau
 */

export function cloturerExercice(operations, exerciceInfo) {
  const cloture = {
    id: exerciceInfo.id,
    annee: exerciceInfo.annee,
    dateClotureFrom: exerciceInfo.dateFrom,
    dateClosureTo: exerciceInfo.dateTo,
    dateClosureActual: new Date().toISOString().split('T')[0],
    operationsCount: operations.length,
    status: 'cloture'
  }

  return cloture
}

export function genererReportANouveau(balance, exerciceInfo) {
  const operations = []

  balance.forEach(cpt => {
    const solde = cpt.soldeDebiteur || cpt.soldeCrebiteur

    if (solde > 0) {
      const sens = cpt.soldeDebiteur ? 'D' : 'C'
      const contreSens = sens === 'D' ? 'C' : 'D'
      const compte = sens === 'D' ? cpt.compte : cpt.compte

      operations.push({
        id: `report_${cpt.compte}_1`,
        date: exerciceInfo.dateAfter,
        lib: `Report à nouveau — ${cpt.intitule}`,
        ht: solde,
        mode: '',
        piece: `Report ${exerciceInfo.annee}`,
        tiers: '',
        isReport: true
      })
    }
  })

  return operations
}

export function genererExerciceInfo(annee, dateDebut, dateFin) {
  return {
    id: `exercice_${annee}`,
    annee,
    dateFrom: dateDebut,
    dateTo: dateFin,
    dateAfter: new Date(parseInt(annee) + 1, 0, 1).toISOString().split('T')[0],
    status: 'ouvert'
  }
}
