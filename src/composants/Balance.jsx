/**
 * E-09 : Balance des comptes
 *
 * Requis par le cahier des charges :
 * - Liste de tous les comptes
 * - Soldes débiteurs et créditeurs
 * - Vérification de l'équilibre (débits = crédits)
 */

import React, { useMemo } from 'react'
import { genererBalance, totaliserBalance } from '../moteur/moteur'
import './Balance.css'

export default function Balance({ dossier = {}, operations = [] }) {
  const config = {
    tauxTva: dossier.tauxTva || 18,
    assujetti: dossier.assujetti !== false
  }

  const balance = useMemo(() => {
    return genererBalance(operations, config)
  }, [operations, config])

  const totaux = useMemo(() => {
    return totaliserBalance(balance)
  }, [balance])

  const equilibre = totaux.totalDebits === totaux.totalCredits

  if (operations.length === 0) {
    return (
      <div className="balance">
        <h2>Balance des comptes</h2>
        <p className="info">Aucune opération saisie</p>
      </div>
    )
  }

  return (
    <div className="balance">
      <h2>Balance des comptes</h2>

      {balance.length === 0 ? (
        <p className="info">Aucun compte</p>
      ) : (
        <>
          <table className="tableau-balance">
            <thead>
              <tr>
                <th>Compte</th>
                <th>Intitulé</th>
                <th>Débiteur</th>
                <th>Créditeur</th>
              </tr>
            </thead>
            <tbody>
              {balance.map((cpt, idx) => (
                <tr key={idx}>
                  <td className="num-compte">{cpt.compte}</td>
                  <td>{cpt.intitule}</td>
                  <td className="montant">
                    {cpt.soldeDebiteur > 0 ? `${cpt.soldeDebiteur.toLocaleString('fr-FR')} F` : ''}
                  </td>
                  <td className="montant">
                    {cpt.soldeCrebiteur > 0 ? `${cpt.soldeCrebiteur.toLocaleString('fr-FR')} F` : ''}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className={equilibre ? 'equilibre' : 'desequilibre'}>
                <td colSpan="2">Total</td>
                <td className="montant">{totaux.totalDebits.toLocaleString('fr-FR')} F</td>
                <td className="montant">{totaux.totalCredits.toLocaleString('fr-FR')} F</td>
              </tr>
            </tfoot>
          </table>

          <div className={`statut ${equilibre ? 'ok' : 'erreur'}`}>
            {equilibre ? (
              <span>✓ Équilibré — Débits = Crédits ({balance.length} comptes)</span>
            ) : (
              <span>✗ Déséquilibré — Écart de {Math.abs(totaux.totalDebits - totaux.totalCredits).toLocaleString('fr-FR')} F</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
