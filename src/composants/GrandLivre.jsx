/**
 * E-08 : Grand livre
 *
 * Requis par le cahier des charges :
 * - Écritures groupées par compte
 * - Affichage du solde pour chaque compte
 * - Tri par numéro de compte
 */

import React, { useMemo, useState } from 'react'
import { genererJournal } from '../moteur/moteur'
import { intituleCompte } from '../moteur/planComptable'
import './GrandLivre.css'

export default function GrandLivre({ dossier = {}, operations = [] }) {
  const config = {
    tauxTva: dossier.tauxTva || 18,
    assujetti: dossier.assujetti !== false
  }

  const [compteFiltre, setCompteFiltre] = useState('')

  const journal = useMemo(() => {
    return genererJournal(operations, config)
  }, [operations, config])

  const comptes = useMemo(() => {
    if (journal.length === 0) return []

    const comptesMap = {}
    journal.forEach(e => {
      if (!comptesMap[e.compte]) {
        comptesMap[e.compte] = {
          compte: e.compte,
          intitule: intituleCompte(e.compte),
          ecritures: [],
          soldeDebit: 0,
          soldeCredit: 0
        }
      }
      comptesMap[e.compte].ecritures.push(e)
      if (e.sens === 'D') {
        comptesMap[e.compte].soldeDebit += e.montant
      } else {
        comptesMap[e.compte].soldeCredit += e.montant
      }
    })

    return Object.values(comptesMap)
      .sort((a, b) => parseInt(a.compte) - parseInt(b.compte))
  }, [journal])

  const comptesAffichees = useMemo(() => {
    if (!compteFiltre) return comptes
    return comptes.filter(c =>
      c.compte.includes(compteFiltre) ||
      c.intitule.toLowerCase().includes(compteFiltre.toLowerCase())
    )
  }, [comptes, compteFiltre])

  if (operations.length === 0) {
    return (
      <div className="grand-livre">
        <h2>Grand livre</h2>
        <p className="info">Aucune opération saisie</p>
      </div>
    )
  }

  return (
    <div className="grand-livre">
      <h2>Grand livre</h2>

      <div className="recherche">
        <input
          type="text"
          placeholder="Filtrer par numéro ou intitulé de compte..."
          value={compteFiltre}
          onChange={e => setCompteFiltre(e.target.value)}
          className="input-recherche"
        />
      </div>

      {comptesAffichees.length === 0 ? (
        <p className="info">Aucun compte correspondant</p>
      ) : (
        <div className="comptes-list">
          {comptesAffichees.map((cpt, idx) => {
            const solde = cpt.soldeDebit - cpt.soldeCredit
            const estDebiteur = solde > 0
            const estCrebiteur = solde < 0

            return (
              <div key={idx} className="compte-section">
                <div className="compte-entete">
                  <div>
                    <div className="num-compte">{cpt.compte}</div>
                    <div className="intitule">{cpt.intitule}</div>
                  </div>
                  <div className={`solde ${estDebiteur ? 'debiteur' : estCrebiteur ? 'crediteur' : 'equilibre'}`}>
                    {estDebiteur && `D: ${Math.abs(solde).toLocaleString('fr-FR')} F`}
                    {estCrebiteur && `C: ${Math.abs(solde).toLocaleString('fr-FR')} F`}
                    {solde === 0 && '0 F'}
                  </div>
                </div>

                <table className="tableau-ecritures">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Libellé</th>
                      <th>Débit</th>
                      <th>Crédit</th>
                      <th>Solde</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cpt.ecritures.map((e, eidx) => {
                      const montantD = e.sens === 'D' ? e.montant : 0
                      const montantC = e.sens === 'C' ? e.montant : 0
                      return (
                        <tr key={eidx}>
                          <td>{e.date}</td>
                          <td>{e.libelle}</td>
                          <td className="montant">
                            {montantD > 0 ? `${montantD.toLocaleString('fr-FR')} F` : ''}
                          </td>
                          <td className="montant">
                            {montantC > 0 ? `${montantC.toLocaleString('fr-FR')} F` : ''}
                          </td>
                          <td className="montant"></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
