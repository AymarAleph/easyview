# 🧮 easyview — Guide de Test

**Application comptable SYSCOHADA pour la Côte d'Ivoire**

---

## 🚀 Démarrage Rapide

### Windows
1. Double-cliquez sur **`START.bat`**
2. Attendez le message : `"Starting local server on http://localhost:8000"`
3. Ouvrez votre navigateur à http://localhost:8000

### Mac / Linux
1. Ouvrez le terminal dans ce dossier
2. Exécutez : `bash START.sh`
3. Ouvrez votre navigateur à http://localhost:8000

---

## ✅ Points de Test Critiques

### 1. **Paramètres** (Onglet ⚙)
- Remplissez : Nom du dossier, Raison sociale, Secteur
- **Test régimes fiscaux** :
  - Sélectionnez **"Régime du réel"** → TVA doit afficher 18%
  - Sélectionnez **"Franchise de TVA"** → TVA doit afficher Exonéré
  - Sélectionnez **"Régime forfaitaire"** → TVA doit afficher Exonéré
- Sauvegardez

### 2. **Saisie** (Onglet Saisie)
- Enregistrez une opération simple :
  - **Type** : Achat (de marchandises)
  - **Montant** : 1 000 000 F
  - Vérifiez : **Débits = Crédits** ✓
- Enregistrez une 2e opération
- Vérifiez le compteur en haut : "2 opérations"

### 3. **Journal** (Onglet Journal)
- Vous devez voir toutes les écritures générées
- **Point critique** : Total débits = Total crédits
- Les dates doivent être triées

### 4. **Grand Livre** (Onglet Grand Livre)
- Cherchez un compte (ex: "Banque")
- Vous devez voir chaque compte avec son solde

### 5. **Balance** (Onglet Balance)
- Vérifiez : **Total débits = Total crédits**
- C'est l'invariant comptable principal CT-03

### 6. **Compte Résultat** (Onglet Compte Résultat)
- Doit afficher Charges vs Produits
- Résultat = Produits - Charges

### 7. **Bilan** (Onglet Bilan)
- Doit afficher Actif = Passif
- Invariant principal du bilan

### 8. **Renommage du dossier**
- Cliquez le bouton ✎ à côté du nom du dossier en haut
- Changez le nom
- Vérifiez que le titre se met à jour

---

## 🔍 Signes que Tout Fonctionne

✅ Débits = Crédits dans le Journal  
✅ Débits = Crédits dans la Balance  
✅ Régimes fiscaux changent la TVA  
✅ Les opérations générent les bonnes écritures  
✅ Pas de message d'erreur en console (F12)

---

## 📊 Scénario de Test Complet (15 min)

1. **Allez à Paramètres** → Configurez l'entreprise + régime fiscal
2. **Allez à Saisie** → Enregistrez 3-4 opérations différentes
3. **Allez à Journal** → Vérifiez débits = crédits
4. **Allez à Balance** → Vérifiez débits = crédits
5. **Allez à Compte Résultat** → Vérifiez calcul
6. **Allez à Bilan** → Vérifiez Actif = Passif

---

## 💾 Données Exemple pour Tester

### Opération 1 : Achat de Marchandises
- Type : **Achat**
- Montant : **500 000 F**
- Fournisseur : Société ABC
- Description : Marchandises à revendre

### Opération 2 : Vente
- Type : **Vente**
- Montant : **1 000 000 F**
- Client : Entreprise XYZ
- Description : Vente de marchandises

### Opération 3 : Charge Externe
- Type : **Charge externe**
- Montant : **100 000 F**
- Description : Loyer du mois

---

## 📞 Si Ça Ne Marche Pas

**Le serveur ne démarre pas?**
- Vérifiez que Python 3 ou Node.js est installé
- Essayez manuellement : `python3 -m http.server 8000`
- Accédez à http://localhost:8000

**Port 8000 déjà utilisé?**
- Changez le port dans START.sh/START.bat : remplacez `8000` par `8001`

**Erreur en console (F12)?**
- Les erreurs JavaScript seront visibles en F12 → Console

---

**Version** : 1.0.0 (Septembre 2026)  
**GitHub** : https://github.com/AymarAleph/easyview
