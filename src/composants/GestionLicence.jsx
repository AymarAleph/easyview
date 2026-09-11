/**
 * Lot 4 — E-13 : Gestion de licence
 *
 * Affichage et gestion de la licence d'utilisation
 */

import React, { useState, useCallback } from 'react'
import { verifierLicence, activerLicence, renouvelerLicence, getLicenceParDefaut } from '../moteur/licence'
import './GestionLicence.css'

export default function GestionLicence() {
  const [licence, setLicence] = useState(() => verifierLicence(getLicenceParDefaut()))
  const [afficherForm, setAfficherForm] = useState(false)
  const [cleSaisie, setCleSaisie] = useState('')
  const [message, setMessage] = useState('')

  const handleActiverLicence = useCallback((e) => {
    e.preventDefault()

    const result = activerLicence(cleSaisie)
    setMessage(result.message)

    if (result.success) {
      setLicence(verifierLicence(result.licence))
      setCleSaisie('')
      setAfficherForm(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }, [cleSaisie])

  const handleRenouveler = useCallback(() => {
    if (window.confirm('Êtes-vous sûr de vouloir renouveler la licence ?')) {
      const result = renouvelerLicence(licence)
      if (result.success) {
        setLicence(verifierLicence(result.licence))
        setMessage(result.message)
        setTimeout(() => setMessage(''), 3000)
      }
    }
  }, [licence])

  const getStatusColor = () => {
    if (!licence.actif) return 'erreur'
    if (licence.joursRestants < 7) return 'alerte'
    return 'ok'
  }

  return (
    <div className="gestion-licence">
      <h2>Gestion de licence</h2>

      <div className={`licence-card ${getStatusColor()}`}>
        <div className="licence-status">
          <div className="status-icon">
            {licence.actif ? '✓' : '✗'}
          </div>
          <div className="status-texte">
            <h3>
              {licence.actif ? 'Licence Active' : 'Licence Inactive'}
            </h3>
            <p className="type">Type: {licence.type}</p>
          </div>
        </div>

        <div className="licence-details">
          <div className="detail">
            <span className="label">Version du moteur</span>
            <span className="valeur">{licence.moteurVersion}</span>
          </div>
          <div className="detail">
            <span className="label">Date d'activation</span>
            <span className="valeur">{licence.dateActivation}</span>
          </div>
          <div className="detail">
            <span className="label">Date d'expiration</span>
            <span className="valeur">{licence.dateExpiration}</span>
          </div>
          {licence.joursRestants > 0 && (
            <div className="detail jours">
              <span className="label">Jours restants</span>
              <span className="valeur">{licence.joursRestants} jours</span>
            </div>
          )}
        </div>

        {message && (
          <div className={`message ${message.includes('succès') ? 'succes' : 'erreur'}`}>
            {message}
          </div>
        )}

        <div className="licence-actions">
          {licence.actif && licence.joursRestants < 30 && (
            <button className="btn-renouveler" onClick={handleRenouveler}>
              Renouveler la licence
            </button>
          )}
          <button
            className="btn-activer"
            onClick={() => setAfficherForm(!afficherForm)}
          >
            {licence.actif ? 'Changer de clé' : 'Activer la licence'}
          </button>
        </div>
      </div>

      {afficherForm && (
        <div className="form-activation">
          <h3>Activation de licence</h3>
          <form onSubmit={handleActiverLicence}>
            <div className="form-groupe">
              <label>Clé de licence</label>
              <input
                type="text"
                value={cleSaisie}
                onChange={e => setCleSaisie(e.target.value)}
                placeholder="Entrez votre clé de licence..."
                autoFocus
              />
              <small>Format: au minimum 10 caractères alphanumériques</small>
            </div>

            <div className="form-boutons">
              <button type="submit" className="btn-valider">
                Activer
              </button>
              <button
                type="button"
                className="btn-annuler"
                onClick={() => {
                  setAfficherForm(false)
                  setCleSaisie('')
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="licence-info">
        <h3>À propos</h3>
        <p>
          <strong>easyview</strong> — Logiciel de comptabilité SYSCOHADA<br />
          Version: 1.0.0<br />
          Moteur comptable: v{licence.moteurVersion}
        </p>
        <p className="legal">
          Les conditions d'utilisation et la licence sont disponibles à l'activation.
        </p>
      </div>
    </div>
  )
}
