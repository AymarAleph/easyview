# easyview — Instructions de développement

## Contexte du projet

**Nom** : easyview  
**Cahier des charges** : SAY'S IMPERIUM — Logiciel de comptabilité SYSCOHADA (v1.6, septembre 2026)  
**Lot** : Lot 1 — Socle technique (modèle de données, moteur, écrans de saisie/journal/balance/grand livre)

## Principes non négociables

1. **EXG-01 — Moteur piloté par les données**
   - Aucune règle comptable en dur dans le code
   - Toutes les règles viennent de `regleOperations.js` (Annexe A)
   - Un changement de règle = édition d'une donnée, pas modification de code

2. **EXG-07 / EXG-08 — Un seul moteur**
   - Toutes les écritures passent par `genererEcritures()` et `genererJournal()`
   - Pas de logique comptable parallèle dans l'interface
   - Les écrans de saisie, de caisse, bancaire, etc. partagent le même moteur

3. **Arrondi et précision**
   - Franc CFA : pas de sous-unité
   - TVA arrondie `ROUND_HALF_UP` (demi vers le haut)
   - Utiliser `Decimal.js` pour éviter les erreurs de flottant

4. **Invariants permanents à chaque opération**
   - Débits du journal = Crédits du journal (CT-01)
   - Débits de la balance = Crédits de la balance (CT-03)
   - Actif du bilan = Passif du bilan (qui en découle)
   - Aucun compte utilisé absent du plan (CT-07)

## Structure du code

```
src/moteur/
├── moteur.js              # Fonction unique genererEcritures()
├── regleOperations.js     # Annexe A (57 règles, données)
├── planComptable.js       # Annexe B (plan, données)
└── __tests__/moteur.test.js

src/composants/
├── EcranSaisie.jsx        # E-05 (à implémenter)
├── Journal.jsx            # E-07 (à implémenter)
├── Balance.jsx            # E-09 (à implémenter)
└── GrandLivre.jsx         # E-08 (à implémenter)
```

## Scénario de test de référence

Section 15.1 du cahier des charges : 15 opérations qui doivent produire exactement 35 écritures.

Résultats attendus (section 15.2) :
- Journal : 35 écritures
- Banque (521) : 8 220 000 F débiteur
- Mobile Money (552) : 59 000 F créditeur
- TVA collectée (4431) : 990 000 F créditeur
- Tous les autres comptes comme spécifiés

Lancez les tests avec `npm test`. Si une seule valeur dévie d'un franc, le test échoue.

## Avant de coder une modification

1. Lisez la section du cahier des charges qui s'y rapporte (numéro RG, CT, E, etc.)
2. Vérifiez que vous ne violez pas EXG-01 (pas de logique en dur)
3. Lancez les tests : `npm test`
4. Vérifiez les invariants (débits = crédits)

## Questions dont vous ne décidez pas

Les 14 questions ouvertes (Q-01 à Q-14) restent ouvertes. Codez l'option la plus prudente et signalez-la :
- Q-03 (licence perpétuelle ou abonnement) — déterminerait toute la conception du lot 4
- Q-05 (le client peut-il modifier les règles) — affecte le risque de support
- Autres — voir section 18 du cahier

Si vous trouvez une ambiguïté, posez la question plutôt que de supposer.

## Ce que vous ne faites pas (autres lots)

❌ Lot 2 — Compte de résultat, bilan, registres  
❌ Lot 3 — Exercices, clôture, report à nouveau  
❌ Lot 4 — Licence et activation  
❌ Lot 10 — Écran d'accueil, graphiques, alertes  
❌ Et les 10 autres lots...

Vous arrêtez quand le lot 1 passe tous les tests de la section 15.

## Attribution

Tous les commits doivent mentionner :
```
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: [URL de la session]
```

---

**Dernière mise à jour** : Septembre 2026  
**Branche** : `claude/app-construction-rename-g6l3v0`
