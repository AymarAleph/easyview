/**
 * Lot 2 — E-11 : Bilan
 *
 * Affiche l'actif et le passif du bilan
 * Vérifie que Actif = Passif
 */

import React, { useMemo } from 'react'
import { genererBilan } from '../moteur/etatsFinanciers'
import './Bilan.css'

export default function Bilan({ dossier = {}, operations = [] }) {
  const config = {
    tauxTva: dossier.tauxTva || 18,
    assujetti: dossier.assujetti !== false
  }

  const bilan = useMemo(() => {
    return genererBilan(operations, config)
  }, [operations, config])

  if (operations.length === 0) {
    return (
      <div className="bilan">
        <h2>Bilan</h2>
        <p className="info">Aucune opération saisie</p>
      </div>
    )
  }

  return (
    <div className="bilan">
      <h2>Bilan</h2>

      <div className="container-bilan">
        <div className="colonne">
          <h3>Actif</h3>

          {bilan.actif.immobilisations.length > 0 && (
            <div className="section-bilan">
              <h4>Immobilisations</h4>
              <ul className="liste-bilan">
                {bilan.actif.immobilisations.map((cpt, idx) => (
                  <li key={idx}>
                    <span className="label">{cpt.intitule}</span>
                    <span className="montant">{cpt.montant.toLocaleString('fr-FR')} F</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {bilan.actif.stocks.length > 0 && (
            <div className="section-bilan">
              <h4>Stocks</h4>
              <ul className="liste-bilan">
                {bilan.actif.stocks.map((cpt, idx) => (
                  <li key={idx}>
                    <span className="label">{cpt.intitule}</span>
                    <span className="montant">{cpt.montant.toLocaleString('fr-FR')} F</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {bilan.actif.tiers.length > 0 && (
            <div className="section-bilan">
              <h4>Tiers (Clients)</h4>
              <ul className="liste-bilan">
                {bilan.actif.tiers.map((cpt, idx) => (
                  <li key={idx}>
                    <span className="label">{cpt.intitule}</span>
                    <span className="montant">{cpt.montant.toLocaleString('fr-FR')} F</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {bilan.actif.tresorerie.length > 0 && (
            <div className="section-bilan">
              <h4>Trésorerie</h4>
              <ul className="liste-bilan">
                {bilan.actif.tresorerie.map((cpt, idx) => (
                  <li key={idx}>
                    <span className="label">{cpt.intitule}</span>
                    <span className="montant">{cpt.montant.toLocaleString('fr-FR')} F</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="total-bilan">
            <span>Total Actif</span>
            <span className="montant">{bilan.actif.totalActif.toLocaleString('fr-FR')} F</span>
          </div>
        </div>

        <div className="colonne">
          <h3>Passif</h3>

          {bilan.passif.capital.length > 0 && (
            <div className="section-bilan">
              <h4>Capital</h4>
              <ul className="liste-bilan">
                {bilan.passif.capital.map((cpt, idx) => (
                  <li key={idx}>
                    <span className="label">{cpt.intitule}</span>
                    <span className="montant">{cpt.montant.toLocaleString('fr-FR')} F</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {bilan.passif.dettes.length > 0 && (
            <div className="section-bilan">
              <h4>Dettes (Fournisseurs)</h4>
              <ul className="liste-bilan">
                {bilan.passif.dettes.map((cpt, idx) => (
                  <li key={idx}>
                    <span className="label">{cpt.intitule}</span>
                    <span className="montant">{cpt.montant.toLocaleString('fr-FR')} F</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {bilan.passif.reserves.length > 0 && (
            <div className="section-bilan">
              <h4>Réserves</h4>
              <ul className="liste-bilan">
                {bilan.passif.reserves.map((cpt, idx) => (
                  <li key={idx}>
                    <span className="label">{cpt.intitule}</span>
                    <span className="montant">{cpt.montant.toLocaleString('fr-FR')} F</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {bilan.passif.benefices.length > 0 && (
            <div className="section-bilan">
              <h4>Résultats</h4>
              <ul className="liste-bilan">
                {bilan.passif.benefices.map((cpt, idx) => (
                  <li key={idx}>
                    <span className="label">{cpt.intitule}</span>
                    <span className="montant">{cpt.montant.toLocaleString('fr-FR')} F</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="total-bilan">
            <span>Total Passif</span>
            <span className="montant">{bilan.passif.totalPassif.toLocaleString('fr-FR')} F</span>
          </div>
        </div>
      </div>

      <div className={`equilibre-bilan ${bilan.equilibre ? 'ok' : 'erreur'}`}>
        {bilan.equilibre ? (
          <span>✓ Équilibré — Actif = Passif</span>
        ) : (
          <span>
            ✗ Déséquilibré — Actif: {bilan.actif.totalActif.toLocaleString('fr-FR')} F,
            Passif: {bilan.passif.totalPassif.toLocaleString('fr-FR')} F
          </span>
        )}
      </div>
    </div>
  )
}
