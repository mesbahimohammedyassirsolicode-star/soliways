# SOLIWAYS 2027 — Site Web Officiel

Site web officiel, vitrine événementielle et UI Kit pour l'événement IT **SOLIWAYS 2027**, organisé par l'**équipe SOLIWAYS** du **13 au 16 avril 2027** chez SOLICODE à Tanger, Maroc.

---

## Architecture du Projet

```
soliway-web/
├── docs/
│   ├── brief.md                 # Brief projet validé (objectifs, cibles, scope)
│   ├── content-architecture.md  # Architecture de l'information et plan SEO
│   └── wireframes.md            # Wireframes textuels et parcours utilisateurs
├── frontend/
│   ├── ui-kit/                  # Bibliothèque de composants standalone & catalogue
│   │   ├── charte-graphique/    # Guide de style, palette HEX, typographies
│   │   ├── atoms/               # Button, Badge, Input, IconBox
│   │   ├── molecules/           # CountdownCard, ThemeCard, DayTab, AgendaItem, PillarCard, FaqAccordionItem, StatCounter
│   │   ├── organisms/           # Navbar, Hero, AboutSection, ProgramSection, ThemesSection, TeamSection, RegistrationCta, PracticalFaqSection, NotificationModal, Footer
│   │   ├── layouts/             # DefaultLayout.html
│   │   ├── components-manifest.yaml # Manifeste complet des composants (statut: validated)
│   │   └── index.html           # Galerie interactive du UI Kit avec iframe responsive
│   ├── assets/
│   │   ├── css/
│   │   │   ├── input.css        # Source Tailwind CSS
│   │   │   └── app.css          # CSS compilé et minifié (37 KB, autonome sans CDN)
│   │   ├── js/
│   │   │   └── app.js           # Modules réactifs Alpine.js (countdown, onglets, modale, FAQ, navigation)
│   │   └── img/                 # Logos officiels (navbar lockup, darkmode, transparent, icon)
│   ├── index.html               # Page d'accueil officielle assemblée (SEO + JSON-LD Schema.org)
│   ├── 404.html                 # Page d'erreur 404 personnalisée
│   ├── sitemap.xml              # Sitemap XML pour les moteurs de recherche
│   ├── robots.txt               # Directives d'indexation pour robots d'exploration
│   ├── package.json             # Scripts de compilation Tailwind CSS CLI
│   └── tailwind.config.js       # Tokens de design conformes à la charte graphique
└── README.md                    # Documentation de démarrage et de maintenance
```

---

## Stack Technique

| Couche | Technologie | Justification |
| :--- | :--- | :--- |
| **Structure** | HTML5 Sémantique | Structure claire, balisage accessible, exactement un `<h1>` par page |
| **Styles** | Tailwind CSS v3 | Design system basé sur les tokens du brand guide, fichier compilé et minifié |
| **Interactivité** | Alpine.js v3 | Composants réactifs légers (compte à rebours temps réel, onglets, modale, accordéon) |
| **Typographies** | Inter & Manrope | Respect strict de la charte graphique officielle (Google Fonts) |
| **SEO & Données** | Schema.org Event JSON-LD | Référencement naturel optimisé pour les événements tech |

---

## Palette de Couleurs & Identité Visuelle

- **Turquoise Principal (`primary`)** : `#25A6AC` (Actions clés, accents néon, hover)
- **Bleu Digital (`secondary`)** : `#456BB8` (Badges, dégradés, confiance)
- **Violet Innovation (`accent`)** : `#6554B8` (Touches futuristes, badges d'honneur)
- **Bleu Nuit (`dark`)** : `#101828` (Arrière-plans sombres, sections immersives)
- **Surface Sombre (`dark-surface`)** : `#162036` (Cartes en élévation)
- **Gris Clair (`surface-muted`)** : `#F5F8FC` (Sections contrastées claires)

---

## Démarrage Rapide (PowerShell sur Windows)

### 1. Prérequis
- [Node.js](https://nodejs.org/) (v18+)
- [Python 3](https://www.python.org/) (pour le serveur local de prévisualisation)

### 2. Lancer le site en local

Ouvrez un terminal PowerShell dans le dossier du frontend :

```powershell
cd c:\Users\Solicode\Desktop\soliway\soliway-web\frontend
python -m http.server 8080
```

Accédez au site dans votre navigateur :
👉 **http://localhost:8080/index.html**

Pour consulter la galerie du UI Kit :
👉 **http://localhost:8080/ui-kit/index.html**

### 3. Recompiler les styles CSS (si modification des classes)

```powershell
cd c:\Users\Solicode\Desktop\soliway\soliway-web\frontend
npm run build:css
```

Pour activer la compilation automatique en mode surveillance :

```powershell
npm run watch:css
```

---

## Fonctionnalités Clés Livrées

1. **Logo Officiel SOLIWAYS Intégré** :
   - Lockup horizontal adapté pour navbar sombre (`logo-nav-dark.png`).
   - Présentation 3D immersive dans la section À propos (`logo-darkmode.png`).
2. **Compte à Rebours en Direct** :
   - Décompte précis calculé dynamiquement jusqu'au **13 avril 2027 à 09:00**.
3. **Programme Interactif sur 4 Jours** :
   - Sélecteur d'onglets instantané (Jour 1 Ouverture, Jour 2 Ateliers, Jour 3 Forum & Speakers, Jour 4 Hackathon Web).
4. **5 Thématiques Tech Détaillées** :
   - Développement Web, IA & Prompting, Cybersécurité, Marketing Digital, Freelance.
5. **Modale d'Alerte & Inscriptions** :
   - Fenêtre pop-in avec validation de format email et message de confirmation.
6. **Accessibilité & Audit SEO** :
   - Balisage Schema.org `Event`, métadonnées Open Graph, Twitter Cards, `sitemap.xml` et `robots.txt`.
   - Bouton flottant de retour en haut de page.
