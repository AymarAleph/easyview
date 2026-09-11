/**
 * Lot 3 — E-12 : Gestion des exercices
 *
 * Clôture d'exercice, archivage, report à nouveau
 */

import React, { useState, useCallback } from 'react'
import { cloturerExercice, genererExerciceInfo } from '../moteur/exercices'
import './GestionExercices.css'

export default function GestionExercices({ dossier = {}, operations = [] }) {
  const [exercices, setExercices] = useState([
    {
      id: 'exercice_2026',
      annee: 2026,
      dateDebut: '2026-01-01',
      dateFin: '2026-12-31',
      status: 'ouvert',
      operationsCount: operations.length
    }
  ])

  const [afficherFormCloture, setAfficherFormCloture] = useState(false)
  const [anneeCloture, setAnneeCloture] = useState(new Date().getFullYear())

  const handleCloturerExercice = useCallback((e) => {
    e.preventDefault()

    const exerciceActuel = exercices.find(ex => ex.annee === anneeCloture && ex.status === 'ouvert')
    if (!exerciceActuel) {
      alert('Aucun exercice ouvert pour cette année')
      return
    }

    if (operations.length === 0) {
      alert('Aucune opération à clôturer')
      return
    }

    if (window.confirm(
      `Êtes-vous sûr de vouloir clôturer l'exercice ${anneeCloture} ?\n${operations.length} opérations seront archivées.`
    )) {
      const cloture = cloturerExercice(operations, exerciceActuel)

      setExercices(prev => prev.map(ex =>
        ex.id === exerciceActuel.id
          ? { ...ex, status: 'cloture', dateCloture: cloture.dateClosureActual }
          : ex
      ))

      const nouvelExercice = {
        id: `exercice_${anneeCloture + 1}`,
        annee: anneeCloture + 1,
        dateDebut: `${anneeCloture + 1}-01-01`,
        dateFin: `${anneeCloture + 1}-12-31`,
        status: 'ouvert',
        operationsCount: 0
      }

      setExercices(prev => [...prev, nouvelExercice])
      setAfficherFormCloture(false)
      setAnneeCloture(anneeCloture + 1)

      alert(`Exercice ${anneeCloture} clôturé avec succès.\nExercice ${anneeCloture + 1} créé.`)
    }
  }, [exercices, anneeCloture, operations])

  return (
    <div className="gestion-exercices">
      <h2>Gestion des exercices comptables</h2>

      <div className="liste-exercices">
        <h3>Exercices</h3>
        <table className="tableau-exercices">
          <thead>
            <tr>
              <th>Année</th>
              <th>Période</th>
              <th>Opérations</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {exercices.map((ex, idx) => (
              <tr key={idx} className={ex.status === 'cloture' ? 'cloture' : 'ouvert'}>
                <td className="annee">{ex.annee}</td>
                <td className="periode">
                  {ex.dateDebut} à {ex.dateFin}
                </td>
                <td className="operations">{ex.operationsCount}</td>
                <td className={`statut ${ex.status}`}>
                  {ex.status === 'ouvert' ? '● Ouvert' : '◯ Clôturé'}
                  {ex.dateCloture && <div className="date-cloture">{ex.dateCloture}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!afficherFormCloture ? (
        <button
          className="btn-cloture"
          onClick={() => setAfficherFormCloture(true)}
          disabled={operations.length === 0}
        >
          Clôturer l'exercice courant
        </button>
      ) : (
        <div className="form-cloture">
          <h3>Clôturer l'exercice</h3>
          <form onSubmit={handleCloturerExercice}>
            <div className="form-groupe">
              <label>Année à clôturer</label>
              <input
                type="number"
                value={anneeCloture}
                onChange={e => setAnneeCloture(parseInt(e.target.value))}
                min={2020}
                max={new Date().getFullYear()}
              />
            </div>

            <div className="form-info">
              <p>
                ⚠️ La clôture archivera toutes les opérations de cet exercice.
                Les données resteront accessibles en lecture.
              </p>
            </div>

            <div className="form-boutons">
              <button type="submit" className="btn-valider">
                Confirmer la clôture
              </button>
              <button
                type="button"
                className="btn-annuler"
                onClick={() => setAfficherFormCloture(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
