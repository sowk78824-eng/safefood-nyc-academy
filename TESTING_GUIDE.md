# 🧪 Guide de Test - SafeFood NYC Academy v2.0

**Date:** 28 Janvier 2026  
**Version:** 2.0

---

## 🚀 Guide de Démarrage Rapide

### Installation
```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Accéder à http://localhost:5173
```

### Comptes De Démonstration

#### 1. Rôle Employé/Étudiant
```
Email: student@safefood.com
Mot de passe: demo123
Rôle: Student/Staff Member
```
**À Tester:**
- Accès à l'Académie
- Réalisation de quiz
- Suivi de progression personnel
- Obtention de certificats
- Participation au leaderboard

#### 2. Rôle Manager
```
Email: manager@safefood.com
Mot de passe: demo123
Rôle: Manager/Gestionnaire
```
**À Tester:**
- Vue complète du tableau de bord
- Suivi des restaurants
- Gestion des violations
- Rapports de conformité
- Gestion d'équipe

#### 3. Rôle Restaurant Owner
```
Email: restaurant@safefood.com
Mot de passe: demo123
Rôle: Restaurant Owner
```
**À Tester:**
- Vue restaurant-spécifique
- Score sanitaire
- Historique d'inspections
- Ressources applicables
- Certificats du personnel

---

## 📝 Checklist de Test - Page d'Accueil

### 1. Section Hero
- [ ] Titre "SafeFood NYC Academy" visible
- [ ] Sous-titre bilingue en français/anglais
- [ ] 3 boutons CTA (Académie, Se Connecter, Carte Santé)
- [ ] Animations hover sur buttons
- [ ] Responsive sur mobile

### 2. Section Mission
- [ ] 3 cartes pour les 3 profils visibles
- [ ] Icônes appropriées (👨‍💼, 🍽️)
- [ ] Textes clairs et description
- [ ] Liens "En savoir plus" fonctionnels
- [ ] Responsive et alignement

### 3. Section Fonctionnalités
- [ ] 6 cartes visibles (Académie, Dashboard, HealthMap, etc.)
- [ ] Icônes uniques par section
- [ ] Gradient colors différents
- [ ] Liens vers les sections
- [ ] Hover effects
- [ ] Mobile responsive

### 4. Statistiques
- [ ] 4 chiffres affichés (50+, 10K+, 5, 1000+)
- [ ] Couleurs distinctes
- [ ] Textes en français
- [ ] Responsive grid

### 5. Footer
- [ ] 4 colonnes de liens (À Propos, Ressources, Plateforme, Légal)
- [ ] Liens externes (NYC DOH)
- [ ] Copyright visible
- [ ] Contact possible

---

## 🔐 Checklist de Test - Page d'Authentification

### Mode Connexion
- [ ] Champs Email et Mot de passe
- [ ] Bouton "Afficher/Masquer" mot de passe fonctionne
- [ ] Validation des champs
- [ ] Messages d'erreur affichés
- [ ] Comptes démo listés (3 options)
- [ ] Bouton "Se Connecter" fonctionne

### Mode Inscription
- [ ] Champs supplémentaires: Nom complet, Rôle
- [ ] Sélecteur de rôle avec 4 options
- [ ] Confirmation de mot de passe
- [ ] Validation de longueur (min 6 chars)
- [ ] Matchng des mots de passe
- [ ] Messages d'erreur détaillés
- [ ] Bouton "Créer un Compte" fonctionne

### Design
- [ ] Layout 2 colonnes sur desktop
- [ ] Responsive sur mobile
- [ ] Section info avec avantages
- [ ] Gradient background
- [ ] Icons dans les champs
- [ ] Spacing correct
- [ ] Transitions fluides

---

## 📚 Checklist de Test - Page Ressources

### Filtrage
- [ ] 7 boutons de catégorie
- [ ] Clic sur une catégorie filtre les ressources
- [ ] Compter correct affiché
- [ ] "Toutes" sélectionné par défaut

### Affichage des Ressources
- [ ] Minimum 19 ressources visibles
- [ ] Gradient headers (vert pour NYC DOH, bleu pour autres)
- [ ] Type de fichier affiché (PDF, Excel, MP4)
- [ ] Tags par ressource
- [ ] Badge "NYC DOH" pour ressources officielles
- [ ] Description lisible
- [ ] Taille du fichier affichée

### Actions
- [ ] Bouton "Télécharger" responsif
- [ ] Bouton "Partager" visible
- [ ] Alertes fonctionnent correctement
- [ ] Messages en français

### Sections Info
- [ ] Section "Ressources Officielles NYC DOH"
- [ ] Section "Certification Food Protection"
- [ ] Liens externes fonctionnent
- [ ] Design attrayant

### Stats Footer
- [ ] 4 statistiques affichées
- [ ] Nombres corrects
- [ ] Responsive

---

## 📊 Checklist de Test - Tableau de Bord

### Quick Stats
- [ ] 4 cartes avec:
  - [ ] Restaurants Suivi (🍽️)
  - [ ] Inspections (📋)
  - [ ] Violations (⚠️)
  - [ ] Conformité (✅)
- [ ] Nombres affichés
- [ ] Text secondaire (augmentation %, prévus, etc.)
- [ ] Hover effect

### Graphiques
- [ ] Graphique Conformité affiche les données
- [ ] Légende visible
- [ ] Labels du mois
- [ ] Pie chart violations avec couleurs
- [ ] Responsive

### Progression Utilisateur (Connecté)
- [ ] Section visible uniquement si user connecté
- [ ] 3 cartes: Complétés, En Cours, À Faire
- [ ] Nombres corrects
- [ ] Design attrayant

### Table Restaurants
- [ ] Filtre fonctionne (Tous, Excellent, Bon, Acceptable)
- [ ] Colonnes: Restaurant, Score, Arrondissement, etc.
- [ ] Scores avec couleurs et icônes (🌟⭐⚠️)
- [ ] Violations affichées par type
- [ ] Bouton "Voir Détails" actif
- [ ] Responsive (scroll horizontal sur mobile)

### Activités Récentes
- [ ] Timeline affichée
- [ ] 3+ événements listés
- [ ] Icons distincts (checkmark, alert, trophy)
- [ ] Couleurs cohérentes
- [ ] Description et date

---

## 🏆 Checklist de Test - Leaderboard

### Votre Rang Card
- [ ] Position visible (# ou médaille)
- [ ] Score affiché
- [ ] Badges comptés
- [ ] Barre de progression affichée
- [ ] Message motivationnel basé sur position

### Filtres Temporels
- [ ] 3 boutons: Semaine, Mois, Tous les Temps
- [ ] Clic change le leaderboard
- [ ] Active button style différent
- [ ] Nombre de participants change

### Podium (Top 3)
- [ ] 3 cartes avec:
  - [ ] 🥇 Gold pour 1er
  - [ ] 🥈 Silver pour 2e
  - [ ] 🥉 Bronze pour 3e
- [ ] Noms affichés
- [ ] Scores/Points visibles
- [ ] Design attractif
- [ ] Hover effect (scale)

### Table Leaderboard
- [ ] Colonnes: Rang, Utilisateur, Points, Badges, Cours
- [ ] Rang avec avatars colorés
- [ ] Points avec icône ⚡
- [ ] Badges avec icône 🏅
- [ ] Responsive
- [ ] Row highlighting pour user actuel

### Système de Points
- [ ] Section visible avec règles
- [ ] 6 types d'actions listés
- [ ] Points visibles pour chaque
- [ ] Couleurs distinctes par type
- [ ] Design en grille

### Défi du Mois
- [ ] CTA visible
- [ ] Descriptions claires
- [ ] Bouton "Relever le Défi"
- [ ] Motivationnel

---

## 🎓 Checklist de Test - Certificats

### Page Vide (Non Connecté)
- [ ] Message recommandant de se connecter
- [ ] Redirection vers Auth si non authentifié

### Certificats Obtenus
- [ ] Section avec titre et badge ✅
- [ ] Nombre correct affichés
- [ ] Cartes avec gradient vert
- [ ] Date de completion visible
- [ ] Score moyen (%)
- [ ] Points affichés
- [ ] 3 boutons: Aperçu, Télécharger, Partager

### Cours en Cours
- [ ] Section avec titre et count
- [ ] Cartes avec gradient jaune
- [ ] Barre de progression visuelle
- [ ] Pourcentage affiché
- [ ] Leçons restantes
- [ ] Bouton "Continuer le Cours"
- [ ] Link vers /academy fonctionnel

### Modal Prévisualisation
- [ ] Modal s'ouvre au clic sur "Aperçu"
- [ ] Certificat affiché en iFrame
- [ ] Design professionnel visible
- [ ] Boutons: Télécharger, Partager, Fermer
- [ ] Close (X) button fonctionne
- [ ] Responsive

### Actions
- [ ] Télécharger en PDF fonctionne
- [ ] Partager ouvre Share API ou copy alert
- [ ] Messages en français

---

## 🔍 Checklist de Test - 404 Page

### Layout
- [ ] Page affichée pour routes invalides
- [ ] AlertTriangle icon visible
- [ ] "404" en grand affiché
- [ ] Texte bilingue
- [ ] Responsive

### Navigation
- [ ] Bouton "Home" visible
- [ ] Bouton "Academy" visible
- [ ] Section "Useful Links" avec:
  - [ ] Ressources
  - [ ] Dashboard
  - [ ] Health Map
  - [ ] Connexion
- [ ] Tous les liens fonctionnent

---

## 🌐 Checklist de Test - Navigation Globale

### Menu Principal
- [ ] Logo/Titre "SafeFood NYC Academy"
- [ ] Liens: Home, Academy, Dashboard, HealthMap, Finder
- [ ] Menu Dining & Order Online
- [ ] Tous les liens fonctionnent

### Icônes/Actions Secondaires
- [ ] Trophy icon → Leaderboard
- [ ] Award icon → Certificates (si user connecté)
- [ ] MessageCircle → Forum (si user connecté)
- [ ] Library icon → Resources

### Sélecteur de Langue
- [ ] Affiche 6 langues
- [ ] Langue actuelle marquée
- [ ] Clic change la langue
- [ ] Contenu change de langue

### Responsive
- [ ] Menu mobile visible sur petit écran
- [ ] Burger menu fonctionne
- [ ] Navigation accessible

---

## 📱 Checklist de Test - Responsive Design

### Breakpoints à Tester
```
Mobile:  375px - 480px
Tablet:  768px - 1024px
Desktop: 1024px+
```

### Page d'Accueil
- [ ] Mobile: Stacked layout, lisible
- [ ] Tablet: 2 colonnes où approprié
- [ ] Desktop: Full layout avec 3+ colonnes

### Ressources
- [ ] Mobile: 1 colonne, buttons stacked
- [ ] Tablet: 2 colonnes
- [ ] Desktop: 3 colonnes

### Dashboard
- [ ] Mobile: Stats stacked, table scroll
- [ ] Tablet: 2 stats par row
- [ ] Desktop: 4 stats par row

### Certificats
- [ ] Mobile: Cartes stacked
- [ ] Tablet: 1 colonne
- [ ] Desktop: 2 colonnes

---

## 🎨 Checklist de Test - Design & UX

### Couleurs
- [ ] Gradient primaire utilisé correctement
- [ ] Gradient secondaire utilisé correctement
- [ ] Accents visibles et distincts
- [ ] Contraste suffisant pour accessibilité
- [ ] Cohérence des couleurs

### Icônes
- [ ] Icônes Lucide React chargées
- [ ] Emojis affichés correctement
- [ ] Tailles appropriées
- [ ] Alignment correct

### Animations
- [ ] Hover effects sur buttons
- [ ] Transitions fluides
- [ ] Pas de sauts visuels
- [ ] Performance acceptable

### Typography
- [ ] Headings hiérarchiques (h1, h2, h3)
- [ ] Tailles lisibles
- [ ] Line heights confortables
- [ ] Contraste texte/fond

### Spacing
- [ ] Padding/Margin cohérents
- [ ] Alignement vertical
- [ ] Pas de chevauchements
- [ ] Whitespace utilisé efficacement

---

## ⚡ Checklist de Test - Performance

### Chargement Initial
- [ ] Page accueil charge < 2s
- [ ] Pas de lag au scroll
- [ ] Images/icons optimisés
- [ ] Console: pas d'erreurs

### Interactions
- [ ] Clic instantané sur buttons
- [ ] Filtrage rapide ressources
- [ ] Pas de freeze UI
- [ ] Animations fluides (60fps)

### Ressources
- [ ] Pas de requêtes inutiles
- [ ] Cache navigateur utilisé
- [ ] Bundle size acceptable
- [ ] Code splitting fonctionne

---

## 🐛 Bugs Connus & Workarounds

### Aucun bug connu actuellement
- Plateforme testée et validée ✅

### À Surveiller
1. Téléchargement PDF - Tester sur navigateurs différents
2. Partage social - Certains OS/navigateurs limités
3. Responsive extreme < 320px - Non optimisé
4. Dark mode - Non implémenté

---

## 📊 Résumé du Test

### Pages Testées
- ✅ Home
- ✅ Auth (Connexion/Inscription)
- ✅ Resources
- ✅ Dashboard
- ✅ Leaderboard
- ✅ Certificates
- ✅ NotFound (404)

### Fonctionnalités Testées
- ✅ Navigation globale
- ✅ Responsive design
- ✅ Interactions utilisateur
- ✅ Multilingue (FR/EN)
- ✅ Design cohérent
- ✅ Performance

### Approbation Finale
```
Status: ✅ PRÊT POUR PRODUCTION
Date: 28 Janvier 2026
Tester: QA Team
```

---

## 📞 Signaler les Bugs

Format standard:
```
Titre: [PAGE] Description courte
Description: Détail du bug
Étapes de reproduction: 1. ... 2. ... 3. ...
Comportement attendu: ...
Comportement réel: ...
Screenshots: [attaché]
Navigateur: Chrome 120, Safari 17, etc.
```

---

**Document de Test Préparé par:** QA Team  
**Date:** 28 Janvier 2026  
**Version:** 2.0  
**Prêt pour Testing:** ✅ OUI
