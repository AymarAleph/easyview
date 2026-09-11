/**
 * E-14 : Paramètres de l'entreprise
 *
 * Configuration de l'entreprise, régime fiscal, paramètres comptables
 */

import React, { useState, useCallback } from 'react'
import { REGIMES_FISCAUX, listerRegimes } from '../moteur/regimesFiscaux'
import './ParametresEntreprise.css'

export default function ParametresEntreprise({ dossier = {}, onDossierChange = null }) {
  const [form, setForm] = useState({
    nom: dossier.nom || 'Nouveau dossier',
    raison_sociale: dossier.raison_sociale || '',
    secteur: dossier.secteur || 'Commerce',
    regime: dossier.regime || 'reel',
    adresse: dossier.adresse || '',
    telephone: dossier.telephone || '',
    email: dossier.email || '',
    exerciceDebut: dossier.exerciceDebut || '2026-01-01',
    exerciceFin: dossier.exerciceFin || '2026-12-31',
    monnaie: dossier.monnaie || 'XOF'
  })

  const [mode, setMode] = useState('lecture')

  const regime = REGIMES_FISCAUX[form.regime]

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleSauvegarder = useCallback(() => {
    if (form.nom.trim() === '') {
      alert('Le nom du dossier est obligatoire')
      return
    }

    if (onDossierChange) {
      onDossierChange({
        ...form,
        tauxTva: regime.tva,
        assujetti: regime.assujetti
      })
    }

    setMode('lecture')
    alert('Paramètres enregistrés')
  }, [form, regime, onDossierChange])

  return (
    <div className="parametres-entreprise">
      <h2>Paramètres de l'entreprise</h2>

      {mode === 'lecture' ? (
        <div className="affichage-parametres">
          <div className="section-params">
            <h3>Informations générales</h3>
            <div className="params-grid">
              <div className="param">
                <label>Nom du dossier</label>
                <p className="valeur">{form.nom}</p>
              </div>
              <div className="param">
                <label>Raison sociale</label>
                <p className="valeur">{form.raison_sociale || '—'}</p>
              </div>
              <div className="param">
                <label>Secteur d'activité</label>
                <p className="valeur">{form.secteur}</p>
              </div>
              <div className="param">
                <label>Téléphone</label>
                <p className="valeur">{form.telephone || '—'}</p>
              </div>
              <div className="param full">
                <label>Adresse</label>
                <p className="valeur">{form.adresse || '—'}</p>
              </div>
              <div className="param full">
                <label>Email</label>
                <p className="valeur">{form.email || '—'}</p>
              </div>
            </div>
          </div>

          <div className="section-params">
            <h3>Régime fiscal</h3>
            <div className="regime-card">
              <div className="regime-titre">
                <h4>{regime.nom}</h4>
                <span className="regime-id">{form.regime}</span>
              </div>
              <p className="regime-desc">{regime.description}</p>

              <div className="regime-caracteristiques">
                <div className="caract">
                  <span className="label">TVA</span>
                  <span className={`valeur ${regime.assujetti ? 'assujetti' : 'exempt'}`}>
                    {regime.assujetti ? `${regime.tva}%` : 'Exonéré'}
                  </span>
                </div>
                <div className="caract">
                  <span className="label">Impôt sur le bénéfice</span>
                  <span className="valeur">{regime.impotBenefice ? 'Oui' : 'Non'}</span>
                </div>
                <div className="caract">
                  <span className="label">Contribution sociale</span>
                  <span className="valeur">{regime.contribution ? 'Oui' : 'Non'}</span>
                </div>
                <div className="caract">
                  <span className="label">Déclaration</span>
                  <span className="valeur">{regime.declaration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-params">
            <h3>Exercice comptable</h3>
            <div className="params-grid">
              <div className="param">
                <label>Début d'exercice</label>
                <p className="valeur">{form.exerciceDebut}</p>
              </div>
              <div className="param">
                <label>Fin d'exercice</label>
                <p className="valeur">{form.exerciceFin}</p>
              </div>
              <div className="param">
                <label>Monnaie</label>
                <p className="valeur">{form.monnaie} (Franc CFA)</p>
              </div>
            </div>
          </div>

          <button className="btn-editer" onClick={() => setMode('edition')}>
            ✎ Modifier les paramètres
          </button>
        </div>
      ) : (
        <form className="formulaire-parametres" onSubmit={(e) => { e.preventDefault(); handleSauvegarder(); }}>
          <div className="section-form">
            <h3>Informations générales</h3>
            <div className="form-grid">
              <div className="form-groupe">
                <label>Nom du dossier *</label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-groupe">
                <label>Raison sociale</label>
                <input
                  type="text"
                  name="raison_sociale"
                  value={form.raison_sociale}
                  onChange={handleChange}
                  placeholder="Raison sociale de l'entreprise"
                />
              </div>
              <div className="form-groupe">
                <label>Secteur d'activité</label>
                <select name="secteur" value={form.secteur} onChange={handleChange}>
                  <option value="Commerce">Commerce</option>
                  <option value="Services">Services</option>
                  <option value="Industrie">Industrie</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Autres">Autres</option>
                </select>
              </div>
              <div className="form-groupe">
                <label>Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  placeholder="+225 XX XX XX XX"
                />
              </div>
              <div className="form-groupe full">
                <label>Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={form.adresse}
                  onChange={handleChange}
                  placeholder="Adresse complète"
                />
              </div>
              <div className="form-groupe full">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="contact@entreprise.com"
                />
              </div>
            </div>
          </div>

          <div className="section-form">
            <h3>Régime fiscal *</h3>
            <div className="regime-options">
              {listerRegimes().map(r => (
                <label key={r.id} className={`regime-option ${form.regime === r.id ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="regime"
                    value={r.id}
                    checked={form.regime === r.id}
                    onChange={handleChange}
                  />
                  <div className="regime-content">
                    <span className="regime-nom">{r.nom}</span>
                    <span className="regime-desc-petit">{r.description}</span>
                    <span className="regime-tva">TVA: {r.assujetti ? `${r.tva}%` : 'Exonéré'}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="section-form">
            <h3>Exercice comptable</h3>
            <div className="form-grid">
              <div className="form-groupe">
                <label>Début d'exercice</label>
                <input
                  type="date"
                  name="exerciceDebut"
                  value={form.exerciceDebut}
                  onChange={handleChange}
                />
              </div>
              <div className="form-groupe">
                <label>Fin d'exercice</label>
                <input
                  type="date"
                  name="exerciceFin"
                  value={form.exerciceFin}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-boutons">
            <button type="submit" className="btn-valider">
              Enregistrer les paramètres
            </button>
            <button
              type="button"
              className="btn-annuler"
              onClick={() => setMode('lecture')}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
