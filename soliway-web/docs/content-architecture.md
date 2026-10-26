# Content Architecture & SEO Plan: SOLIWAY 2027

## 1. Sitemap & URL Architecture

| Page | File | URL | Purpose | Primary Audience | Rendering |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Home / Landing** | `frontend/index.html` | `/` | Showcase event landing page with complete agenda, tracks, registration status, and contact info | General public, students, developers, tech community | Static HTML + Alpine.js |
| **404 Not Found** | `frontend/404.html` | `/404.html` | Branded fallback page guiding lost visitors back to the home page | All visitors | Static HTML |

---

## 2. Page Blueprint (`index.html`)

### Landmark Structure
- `<header>`: Sticky Top Navigation Bar
- `<main>`:
  - `<section id="accueil">`: Hero Banner + Live Countdown + Impact Numbers
  - `<section id="a-propos">`: Event Overview, Vision & 3 Pillars (Apprendre, Échanger, Pratiquer)
  - `<section id="programme">`: Interactive 4-Day Timeline (J1 to J4 Hackathon)
  - `<section id="thematiques">`: 5 Thematic Exploration Tracks
  - `<section id="equipe">`: Organizer Spotlight (SOLICODE Team)
  - `<section id="inscriptions">`: Registration Call-To-Action & Notification Modal
  - `<section id="pratique">`: Practical Info, Event Access & FAQ
- `<footer>`: Brand, Links, Socials, Legal mentions

### Detailed Content Blocks & Headings Hierarchy

```
H1: SOLIWAY 2027 — Apprendre. Échanger. Créer.
│
├── H2: À propos de SOLIWAY
│   ├── H3: Un événement pour explorer le monde du numérique
│   ├── H3: Notre vision
│   └── H3: Notre approche (Apprendre, Échanger, Pratiquer)
│
├── H2: Programme officiel
│   ├── H3: Jour 1 — 13 avril 2027 : Ouverture et ateliers
│   ├── H3: Jour 2 — 14 avril 2027 : Ateliers thématiques
│   ├── H3: Jour 3 — 15 avril 2027 : Forum, meetups et speakers
│   └── H3: Jour 4 — 16 avril 2027 : Hackathon de développement web
│
├── H2: Les thématiques au cœur de l'événement
│   ├── H3: Développement web
│   ├── H3: Intelligence artificielle et prompting
│   ├── H3: Cybersécurité
│   ├── H3: Marketing digital
│   └── H3: Freelance
│
├── H2: L'équipe SOLICODE
│   └── H3: Une initiative portée par SOLICODE Tanger
│
├── H2: Rejoignez SOLIWAY 2027
│   └── H3: Les inscriptions arrivent bientôt !
│
└── H2: Informations pratiques & Contact
    ├── H3: Coordonnées & Lieu (SOLICODE Tanger)
    └── H3: Foire aux questions (FAQ)
```

---

## 3. Navigation Schema

### Desktop Header
- **Brand**: SOLIWAY logo + tagline.
- **Anchor Links**:
  - `Accueil` (`#accueil`)
  - `À propos` (`#a-propos`)
  - `Programme` (`#programme`)
  - `Thématiques` (`#thematiques`)
  - `Équipe` (`#equipe`)
  - `Infos pratiques` (`#pratique`)
- **Action Button**: `Inscriptions bientôt` (`#inscriptions`) - Highlighting button with turquoise glow.

### Mobile Drawer Navigation
- Slide-over backdrop with Alpine.js (`x-show`, smooth transitions).
- Links with touch-friendly spacing and icon accents.

### Footer Navigation
- Column 1: SOLIWAY & SOLICODE identity and mission.
- Column 2: Navigation rapide (sections).
- Column 3: Informations clés (dates, Tanger, contact).
- Column 4: Réseaux sociaux & partenariats.

---

## 4. Technical SEO & Semantic Specifications

### Meta Specifications (`index.html`)
- **Title**: `SOLIWAY 2027 | Événement IT & Hackathon Web à Tanger` (52 characters)
- **Meta Description**: `Découvrez SOLIWAY 2027, l'événement tech de référence organisé par l'équipe SOLICODE à Tanger du 13 au 16 avril 2027 : ateliers IA, web, cybersécurité et hackathon.` (166 characters)
- **Canonical**: `https://www.soli-ways.online/`
- **Robots**: `index, follow`
- **Language**: `<html lang="fr" class="scroll-smooth">`

### Social Metadata (Open Graph & Twitter)
- `og:site_name`: SOLIWAY 2027
- `og:type`: `website`
- `og:title`: SOLIWAY 2027 | Événement IT à Tanger — Apprendre. Échanger. Créer.
- `og:description`: 4 jours pour explorer les technologies numériques, partager des expériences et donner vie à des idées à Tanger.
- `og:image`: `/assets/img/og-soliway-2027.png`
- `twitter:card`: `summary_large_image`

### Structured Data (Schema.org `Event`)
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "SOLIWAY 2027",
  "description": "Quatre jours pour explorer les technologies numériques, partager des expériences et donner vie à des idées avec l'équipe SOLICODE.",
  "startDate": "2027-04-13T09:00:00+01:00",
  "endDate": "2027-04-16T18:00:00+01:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "SOLICODE Tanger",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tanger",
      "addressCountry": "MA"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Équipe SOLICODE",
    "url": "https://solicode.co"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/PreOrder",
    "price": "0",
    "priceCurrency": "MAD",
    "validFrom": "2027-01-01"
  }
}
```

---

## 5. Rendering & Client Interactivity Plan

- **Pure Semantic HTML**: All texts, titles, descriptions, and schedule descriptions are directly in the HTML markup. Search engine crawlers get 100% of the content without waiting for JavaScript execution.
- **Alpine.js Progressive Enhancements**:
  1. `countdown`: Reactive days/hours/minutes/seconds countdown to April 13, 2027.
  2. `programTabs`: Day tab selector (`activeDay: 1`) allowing visitors to seamlessly switch between Day 1, 2, 3, and 4.
  3. `mobileMenu`: Responsive toggle for mobile navigation drawer.
  4. `notifyModal`: Modal dialog allowing visitors to enter email for notification when registration opens.
  5. `faqAccordion`: Smooth expand/collapse for practical info questions.

---

## 6. Implied Data Entities

1. **Event**: `title`, `dates`, `location`, `organizer`, `tagline`, `description`.
2. **ProgramDay**: `dayNumber`, `date`, `title`, `badge`, `summary`, `highlights[]`.
3. **ThematicTrack**: `slug`, `title`, `description`, `icon`, `colorTag`.
4. **PracticalInfo**: `dates`, `locationName`, `city`, `targetAudience`, `registrationStatus`.
5. **FAQItem**: `id`, `question`, `answer`.
