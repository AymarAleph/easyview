/**
 * Lot 2 — E-10 : Compte de résultat
 *
 * Affiche les charges et produits, calcule le résultat
 */

import React, { useMemo } from 'react'
import { genererCompteResultat } from '../moteur/etatsFinanciers'
import './CompteResultat.css'

export default function CompteResultat({ dossier = {}, operations = [] }) {
  const config = {
    tauxTva: dossier.tauxTva || 18,
    assujetti: dossier.assujetti !== false
  }

  const resultat = useMemo(() => {
    return genererCompteResultat(operations, config)
  }, [operations, config])

  if (operations.length === 0) {
    return (
      <div className="compte-resultat">
        <h2>Compte de résultat</h2>
        <p className="info">Aucune opération saisie</p>
      </div>
    )
  }

  return (
    <div className="compte-resultat">
      <h2>Compte de résultat</h2>

      <div className="container-resultat">
        <div className="section">
          <h3>Charges (Classe 6)</h3>
          {resultat.charges.length === 0 ? (
            <p className="info-petit">Aucune charge</p>
          ) : (
            <table className="tableau-detail">
              <tbody>
                {resultat.charges.map((c, idx) => (
                  <tr key={idx}>
                    <td className="num-compte">{c.compte}</td>
                    <td>{c.intitule}</td>
                    <td className="montant">{c.montant.toLocaleString('fr-FR')} F</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="total-ligne">
                  <td colSpan="2">Total des charges</td>
                  <td className="montant">
                    {resultat.totalCharges.toLocaleString('fr-FR')} F
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        <div className="section">
          <h3>Produits (Classe 7)</h3>
          {resultat.produits.length === 0 ? (
            <p className="info-petit">Aucun produit</p>
          ) : (
            <table className="tableau-detail">
              <tbody>
                {resultat.produits.map((p, idx) => (
                  <tr key={idx}>
                    <td className="num-compte">{p.compte}</td>
                    <td>{p.intitule}</td>
                    <td className="montant">{p.montant.toLocaleString('fr-FR')} F</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="total-ligne">
                  <td colSpan="2">Total des produits</td>
                  <td className="montant">
                    {resultat.totalProduits.toLocaleString('fr-FR')} F
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>

      <div className={`resultat-final ${resultat.beneficiaire ? 'benefice' : 'perte'}`}>
        <div className="resultat-ligne">
          <span>Total produits</span>
          <span className="montant">{resultat.totalProduits.toLocaleString('fr-FR')} F</span>
        </div>
        <div className="resultat-ligne">
          <span>Moins : Total charges</span>
          <span className="montant">−{resultat.totalCharges.toLocaleString('fr-FR')} F</span>
        </div>
        <div className="resultat-solde">
          <span>{resultat.beneficiaire ? 'Bénéfice' : 'Perte'} de l\'exercice</span>
          <span className="montant">
            {Math.abs(resultat.resultat).toLocaleString('fr-FR')} F
          </span>
        </div>
      </div>
    </div>
  )
}
