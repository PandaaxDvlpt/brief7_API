# Dashboard Utilisateurs

Un tableau de bord moderne et interactif pour gérer et visualiser des données utilisateurs, développé avec HTML, CSS et JavaScript.

## 🌟 Fonctionnalités

### Interface Utilisateur
- Design moderne et responsive
- Sidebar rétractable avec état persistant
- Cartes utilisateurs avec animations au survol
- Barre de recherche en temps réel
- Interface adaptative (mobile et desktop)

### Gestion des Données
- Récupération de données utilisateurs via l'API RandomUser
- Affichage de 50 utilisateurs aléatoires
- Montants générés aléatoirement pour chaque utilisateur
- Système de tri multiple :
  - Par genre (Homme/Femme)
  - Par montant (croissant/décroissant)
  - Par ordre alphabétique (A-Z/Z-A)

### Fonctionnalités Interactives
- Recherche en temps réel sur :
  - Prénom
  - Nom
  - Email
  - Ville
  - Pays
  - Montant
- Filtres de tri dynamiques
- Animations de survol sur les cartes utilisateurs
- Persistance de l'état de la sidebar

## 🛠️ Technologies Utilisées

- HTML5
- CSS3 (avec variables CSS personnalisées)
- JavaScript (ES6+)
- API RandomUser
- LocalStorage pour la persistance des données

## 📦 Installation

1. Clonez le repository :
```bash
git clone [URL_DU_REPO]
```

2. Ouvrez le projet dans votre éditeur de code préféré

3. Lancez le projet :
   - Ouvrez le fichier `index.html` dans votre navigateur
   - Ou utilisez un serveur local (recommandé) :
     ```bash
     # Avec Node.js
     npx serve
     ```

## 🎨 Personnalisation

### Variables CSS
Le projet utilise des variables CSS pour une personnalisation facile. Vous pouvez modifier les couleurs et autres propriétés dans le fichier `css/index.css` :

```css
:root {
    --primary-blue: #6aacf1;
    --secondary-dark: #294e6d;
    --white: #ffffff;
}
```

### Styles des Cartes
Les cartes utilisateurs peuvent être personnalisées en modifiant la classe `.user-card` dans `css/index.css`.

## 📱 Responsive Design

Le projet est entièrement responsive avec :
- Une sidebar adaptative
- Des cartes utilisateurs redimensionnables
- Une mise en page flexible
- Des breakpoints pour mobile et desktop

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request


## 👥 Auteur

IZUKA - Dimitri C.

---
