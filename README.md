# Site Web SimplonCode

Un site web simple de trois pages représentant **SimplonCode**, une école de code engagée pour l’inclusion numérique et l’apprentissage pratique.

## 📌 Pages

1. **Accueil**

    - Présentation de l’école (histoire, valeurs, pédagogie)
    - Section « Pourquoi nous choisir »

2. **Contact**

    - Informations de contact (adresse, téléphone, email)
    - Formulaire de contact pour les demandes

3. **Programmes**

    - Page dynamique listant tous les programmes depuis un **JSON Server**
    - Formulaire pour ajouter un nouveau programme
    - Barre de recherche pour filtrer les programmes

## 🛠️ Technologies Utilisées

-   **HTML5** pour la structure
-   **CSS3** pour le style
-   **JavaScript** pour les fonctionnalités dynamiques (consommation du JSON Server)
-   **JSON Server** pour simuler une API

## 📂 Structure du Projet

```
simploncode-site/
│
├── index.html          # Page d'accueil
├── contact.html        # Page de contact
├── programmes.html     # Page des programmes
├── css/
│   └── style.css       # Feuille de style principale
├── js/
│   └── main.js         # Scripts pour les fonctionnalités dynamiques
└── images/             # Images utilisées dans le site
```

## 🚀 Fonctionnalités

-   Design responsive adapté aux écrans desktop et mobile
-   Interface claire et moderne
-   Fonctionnalité de recherche et d’ajout pour les programmes via JSON Server
-   Formulaire de contact avec validation basique

## 📷 Aperçu

_Ajouter ici une capture d’écran une fois le site en ligne._

## 💻 Utilisation

1. Cloner le dépôt :

    ```bash
    git clone https://github.com/khalidx21/simploncode-presentation.git
    ```

2. Installer JSON Server :

    ```bash
    npm install -g json-server
    ```

3. Lancer JSON Server (avec un fichier `db.json`) :

    ```bash
    json-server --watch db.json
    ```

4. Ouvrir le projet avec **Live Server** dans VS Code pour prévisualiser le site.

## 📜 Licence

Ce projet est sous licence MIT.

```
© 2025 SimplonCode. Tous droits réservés.
```
