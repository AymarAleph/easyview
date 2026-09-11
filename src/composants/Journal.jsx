/**
 * E-07 : Journal comptable
 *
 * Requis par le cahier des charges :
 * - Liste complète des écritures
 * - Triées par date
 * - Affichage des comptes, libellés, montants
 * - Vérification de l'équilibre (débits = crédits)
 */

import React, { useMemo } from 'react'
import { genererJournal, totaliserJournal } from '../moteur/moteur'
import { intituleCompte } from '../moteur/planComptable'
import './Journal.css'

export default function Journal({ dossier = {}, operations = [] }) {
  const config = {
    tauxTva: dossier.tauxTva || 18,
    assujetti: dossier.assujetti !== false
  }

  const journal = useMemo(() => {
    return genererJournal(operations, config)
  }, [operations, config])

  const totaux = useMemo(() => {
    return totaliserJournal(journal)
  }, [journal])

  const equilibre = totaux.totalDebits === totaux.totalCredits

  if (operations.length === 0) {
    return (
      <div className="journal">
        <h2>Journal comptable</h2>
        <p className="info">Aucune opération saisie</p>
      </div>
    )
  }

  return (
    <div className="journal">
      <h2>Journal comptable</h2>

      {journal.length === 0 ? (
        <p className="info">Aucune écriture générée</p>
      ) : (
        <>
          <table className="tableau-journal">
            <thead>
              <tr>
                <th>Date</th>
                <th>N° Compte</th>
                <th>Intitulé</th>
                <th>Débit</th>
                <th>Crédit</th>
              </tr>
            </thead>
            <tbody>
              {journal.map((e, idx) => (
                <tr key={idx}>
                  <td className="date">{e.date}</td>
                  <td className="num-compte">{e.compte}</td>
                  <td>{intituleCompte(e.compte)}</td>
                  <td className="montant">
                    {e.sens === 'D' ? `${e.montant.toLocaleString('fr-FR')} F` : ''}
                  </td>
                  <td className="montant">
                    {e.sens === 'C' ? `${e.montant.toLocaleString('fr-FR')} F` : ''}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className={equilibre ? 'equilibre' : 'desequilibre'}>
                <td colSpan="3">Total</td>
                <td className="montant">{totaux.totalDebits.toLocaleString('fr-FR')} F</td>
                <td className="montant">{totaux.totalCredits.toLocaleString('fr-FR')} F</td>
              </tr>
            </tfoot>
          </table>

          <div className={`statut ${equilibre ? 'ok' : 'erreur'}`}>
            {equilibre ? (
              <span>✓ Équilibré — Débits = Crédits ({journal.length} écritures)</span>
            ) : (
              <span>✗ Déséquilibré — Écart de {Math.abs(totaux.totalDebits - totaux.totalCredits).toLocaleString('fr-FR')} F</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
