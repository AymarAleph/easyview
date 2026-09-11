/**
 * E-05 : Écran de saisie d'opération avec prévisualisation
 *
 * Requis par le cahier des charges :
 * - Formulaire à gauche
 * - Prévisualisation des écritures à droite
 * - Mise à jour en temps réel
 * - Pas de saisie directe des écritures (RG-03)
 */

import React, { useState, useCallback, useMemo } from 'react'
import { genererEcritures } from '../moteur/moteur'
import { operationsDeType } from '../moteur/regleOperations'
import { intituleCompte } from '../moteur/planComptable'
import './EcranSaisie.css'

export default function EcranSaisie({ dossier = {}, onOperationSaisie = null }) {
  const config = {
    tauxTva: dossier.tauxTva || 18,
    assujetti: dossier.assujetti !== false
  }

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    libelle: '',
    montantHT: '',
    mode: 'Banque',
    piece: '',
    tiers: ''
  })

  const [mode, setMode] = useState('Tout') // Tout, Vendre, Acheter, etc.

  // Récupérer les écritures prévisualisées
  const ecrituresPreview = useMemo(() => {
    if (!formData.libelle || !formData.montantHT) return []

    const operation = {
      id: 0,
      date: formData.date,
      lib: formData.libelle,
      ht: parseInt(formData.montantHT) || 0,
      mode: formData.mode,
      piece: formData.piece,
      tiers: formData.tiers
    }

    return genererEcritures(operation, [], config)
  }, [formData, config])

  // Vérifier l'équilibre
  const totalDebits = useMemo(
    () => ecrituresPreview.reduce((sum, e) => sum + (e.sens === 'D' ? e.montant : 0), 0),
    [ecrituresPreview]
  )

  const totalCredits = useMemo(
    () => ecrituresPreview.reduce((sum, e) => sum + (e.sens === 'C' ? e.montant : 0), 0),
    [ecrituresPreview]
  )

  const equilibre = totalDebits === totalCredits

  // Gérer les changements du formulaire
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  // Soumettre l'opération
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.libelle || !formData.montantHT) {
      alert('Veuillez remplir au minimum le libellé et le montant')
      return
    }

    if (!equilibre) {
      alert('Les écritures doivent être équilibrées (débits = crédits)')
      return
    }

    const operation = {
      id: Date.now(),
      date: formData.date,
      lib: formData.libelle,
      ht: parseInt(formData.montantHT),
      mode: formData.mode,
      piece: formData.piece,
      tiers: formData.tiers
    }

    if (onOperationSaisie) {
      onOperationSaisie(operation)
    }

    // Réinitialiser le formulaire
    setFormData({
      date: new Date().toISOString().split('T')[0],
      libelle: '',
      montantHT: '',
      mode: 'Banque',
      piece: '',
      tiers: ''
    })
  }

  return (
    <div className="ecran-saisie">
      <h2>Saisir une opération</h2>

      <div className="container-saisie">
        {/* FORMULAIRE */}
        <div className="formulaire">
          <form onSubmit={handleSubmit}>
            <div className="groupe">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="groupe">
              <label>Type d'opération</label>
              <select
                name="libelle"
                value={formData.libelle}
                onChange={handleChange}
              >
                <option value="">— Choisir —</option>
                <optgroup label="Ventes">
                  {operationsDeType('Vente').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
                <optgroup label="Achats">
                  {operationsDeType('Achat').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
                <optgroup label="Charges">
                  {operationsDeType('Charge').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
                <optgroup label="Immobilisations">
                  {operationsDeType('Immobilisation').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
                <optgroup label="Financements">
                  {operationsDeType('Financement').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
                <optgroup label="Encaissements">
                  {operationsDeType('Encaissement').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
                <optgroup label="Décaissements">
                  {operationsDeType('Décaissement').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
                <optgroup label="Régularisations">
                  {operationsDeType('Régularisation').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
                <optgroup label="Trésorerie">
                  {operationsDeType('Trésorerie').map(r => (
                    <option key={r.lib} value={r.lib}>{r.lib}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="groupe">
              <label>Montant HT (francs CFA)</label>
              <input
                type="number"
                name="montantHT"
                value={formData.montantHT}
                onChange={handleChange}
                min="0"
                step="1000"
              />
            </div>

            <div className="groupe">
              <label>Mode de règlement</label>
              <select name="mode" value={formData.mode} onChange={handleChange}>
                <option value="Banque">Banque</option>
                <option value="Caisse">Caisse</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Crédit">Crédit</option>
              </select>
            </div>

            <div className="groupe">
              <label>Référence de pièce</label>
              <input
                type="text"
                name="piece"
                value={formData.piece}
                onChange={handleChange}
                placeholder="Facture, chèque..."
              />
            </div>

            <div className="groupe">
              <label>Tiers (client/fournisseur)</label>
              <input
                type="text"
                name="tiers"
                value={formData.tiers}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-soumettre">
              Enregistrer l'opération
            </button>
          </form>
        </div>

        {/* PRÉVISUALISATION */}
        <div className="preview">
          <h3>Aperçu des écritures</h3>

          {ecrituresPreview.length === 0 ? (
            <p className="info">Remplissez le formulaire pour voir l'aperçu</p>
          ) : (
            <>
              <table className="tableau-apercu">
                <thead>
                  <tr>
                    <th>Compte</th>
                    <th>Intitulé</th>
                    <th>Débit</th>
                    <th>Crédit</th>
                  </tr>
                </thead>
                <tbody>
                  {ecrituresPreview.map((e, idx) => (
                    <tr key={idx}>
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
                    <td colSpan="2">Total</td>
                    <td className="montant">{totalDebits.toLocaleString('fr-FR')} F</td>
                    <td className="montant">{totalCredits.toLocaleString('fr-FR')} F</td>
                  </tr>
                </tfoot>
              </table>

              <div className={`statut ${equilibre ? 'ok' : 'erreur'}`}>
                {equilibre ? (
                  <span>✓ Équilibré — Débits = Crédits</span>
                ) : (
                  <span>✗ Déséquilibré — Écart de {Math.abs(totalDebits - totalCredits).toLocaleString('fr-FR')} F</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
