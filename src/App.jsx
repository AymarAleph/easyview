import React, { useState, useCallback } from 'react'
import EcranSaisie from './composants/EcranSaisie'
import Journal from './composants/Journal'
import Balance from './composants/Balance'
import GrandLivre from './composants/GrandLivre'
import CompteResultat from './composants/CompteResultat'
import Bilan from './composants/Bilan'
import GestionExercices from './composants/GestionExercices'
import GestionLicence from './composants/GestionLicence'
import ParametresEntreprise from './composants/ParametresEntreprise'
import { REGIMES_FISCAUX } from './moteur/regimesFiscaux'
import './App.css'

export default function App() {
  const [operations, setOperations] = useState([])
  const [dossier, setDossier] = useState({
    nom: 'Nouveau dossier',
    raison_sociale: '',
    secteur: 'Commerce',
    regime: 'reel',
    adresse: '',
    telephone: '',
    email: '',
    exerciceDebut: '2026-01-01',
    exerciceFin: '2026-12-31',
    monnaie: 'XOF',
    tauxTva: REGIMES_FISCAUX.reel.tva,
    assujetti: REGIMES_FISCAUX.reel.assujetti
  })
  const [ongletActif, setOngletActif] = useState('saisie')
  const [nomDossierEdition, setNomDossierEdition] = useState('')

  const handleOperationSaisie = useCallback((operation) => {
    setOperations(prev => [...prev, operation])
  }, [])

  const handleReinitialiser = useCallback(() => {
    if (window.confirm('Êtes-vous certain ? Cela supprimera toutes les opérations.')) {
      setOperations([])
    }
  }, [])

  const handleModifierNomDossier = useCallback((e) => {
    e.preventDefault()
    if (nomDossierEdition.trim()) {
      setDossier(prev => ({ ...prev, nom: nomDossierEdition }))
      setNomDossierEdition('')
    }
  }, [nomDossierEdition])

  const handleDossierChange = useCallback((nouveauDossier) => {
    setDossier(nouveauDossier)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-gauche">
          <h1>easyview</h1>
          <p className="sous-titre">Logiciel comptable SYSCOHADA</p>
        </div>
        <div className="header-droit">
          <div className="dossier-info">
            <h2>{dossier.nom}</h2>
            <button
              className="btn-petit"
              onClick={() => setNomDossierEdition(dossier.nom)}
              title="Renommer le dossier"
            >
              ✎
            </button>
          </div>
          <p className="meta">
            {operations.length} opération{operations.length !== 1 ? 's' : ''} — TVA {dossier.tauxTva}%
          </p>
        </div>
      </header>

      {nomDossierEdition && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Renommer le dossier</h3>
            <form onSubmit={handleModifierNomDossier}>
              <input
                type="text"
                value={nomDossierEdition}
                onChange={e => setNomDossierEdition(e.target.value)}
                autoFocus
                className="input-modal"
              />
              <div className="modal-boutons">
                <button type="submit" className="btn-valider">Valider</button>
                <button
                  type="button"
                  className="btn-annuler"
                  onClick={() => setNomDossierEdition('')}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <nav className="app-nav">
        <button
          className={`nav-bouton ${ongletActif === 'parametres' ? 'actif' : ''}`}
          onClick={() => setOngletActif('parametres')}
          title="Configuration du dossier et du régime fiscal"
        >
          ⚙ Paramètres
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'saisie' ? 'actif' : ''}`}
          onClick={() => setOngletActif('saisie')}
        >
          Saisie
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'journal' ? 'actif' : ''}`}
          onClick={() => setOngletActif('journal')}
        >
          Journal
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'livre' ? 'actif' : ''}`}
          onClick={() => setOngletActif('livre')}
        >
          Grand Livre
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'balance' ? 'actif' : ''}`}
          onClick={() => setOngletActif('balance')}
        >
          Balance
        </button>
        <div className="nav-separator"></div>
        <button
          className={`nav-bouton ${ongletActif === 'resultat' ? 'actif' : ''}`}
          onClick={() => setOngletActif('resultat')}
        >
          Compte Résultat
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'bilan' ? 'actif' : ''}`}
          onClick={() => setOngletActif('bilan')}
        >
          Bilan
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'exercices' ? 'actif' : ''}`}
          onClick={() => setOngletActif('exercices')}
        >
          Exercices
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'licence' ? 'actif' : ''}`}
          onClick={() => setOngletActif('licence')}
        >
          Licence
        </button>
        <button
          className="nav-bouton nav-reinit"
          onClick={handleReinitialiser}
          title="Réinitialiser toutes les opérations"
        >
          ↻ Réinit
        </button>
      </nav>

      <main className="app-main">
        {ongletActif === 'parametres' && (
          <ParametresEntreprise
            dossier={dossier}
            onDossierChange={handleDossierChange}
          />
        )}
        {ongletActif === 'saisie' && (
          <EcranSaisie
            dossier={dossier}
            onOperationSaisie={handleOperationSaisie}
          />
        )}
        {ongletActif === 'journal' && (
          <Journal dossier={dossier} operations={operations} />
        )}
        {ongletActif === 'livre' && (
          <GrandLivre dossier={dossier} operations={operations} />
        )}
        {ongletActif === 'balance' && (
          <Balance dossier={dossier} operations={operations} />
        )}
        {ongletActif === 'resultat' && (
          <CompteResultat dossier={dossier} operations={operations} />
        )}
        {ongletActif === 'bilan' && (
          <Bilan dossier={dossier} operations={operations} />
        )}
        {ongletActif === 'exercices' && (
          <GestionExercices dossier={dossier} operations={operations} />
        )}
        {ongletActif === 'licence' && (
          <GestionLicence />
        )}
      </main>
    </div>
  )
}
