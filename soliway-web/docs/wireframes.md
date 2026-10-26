# Textual Wireframes & User Flows: SOLIWAY 2027

## 1. Key User Flows

### Flow 1: Visitor Exploration & Agenda Discovery
1. **Entry**: Visitor lands on `index.html` (Hero section).
2. **First Impression**: Sees the brand identity ("THE WAY TO SUCCESS"), event title ("SOLIWAY 2027 — Apprendre. Échanger. Créer."), Tangier dates (13-16 April 2027), and live ticking countdown.
3. **Action**: Clicks primary CTA "Découvrir le programme" or scrolls down.
4. **Program Exploration**: Clicks between Jour 1, Jour 2, Jour 3, Jour 4 tabs to inspect activities and discover the Day 4 Web Hackathon.
5. **Theme Inspection**: Scrolls to Themes section, reviews topics (Web Dev, AI, Cyber, Marketing, Freelance).
6. **Next Step**: Clicks "Inscriptions bientôt" or notification button to register interest.

### Flow 2: Getting Notified for Registrations
1. **Trigger**: Visitor clicks "Me prévenir à l'ouverture" or "Inscriptions bientôt disponibles".
2. **Interaction**: An interactive Alpine.js modal opens smoothly.
3. **Input**: Visitor types their email address into the input field.
4. **Validation**: Email validation runs (instant feedback if invalid).
5. **Success**: Form displays an animated success state ("Merci ! Vous serez le premier informé.") and closes or allows dismissing.

---

## 2. Textual Wireframes by Zone

### Page: Home (`index.html`)

#### Zone 1: Top Navigation Bar (Organism: `Navbar`)
- **Left**: SOLIWAY circuit S-badge + "soliway" wordmark.
- **Center (Desktop)**: Smooth scroll links (`Accueil`, `À propos`, `Programme`, `Thématiques`, `Équipe`, `Pratique`).
- **Right (Desktop)**: Glowing CTA button ("Inscriptions bientôt").
- **Mobile**: Hamburger icon button opening full-height slide-over drawer with all links and CTA.
- **States**: Default transparent / semi-transparent, sticky with backdrop blur on scroll, mobile drawer open / closed.

#### Zone 2: Hero & Live Countdown (Organism: `Hero`)
- **Top**: Badge "13 — 16 AVRIL 2027 • SOLICODE TANGER, MAROC".
- **Middle**:
  - H1: "SOLIWAY 2027"
  - Tagline: "Apprendre. Échanger. Créer."
  - Narrative: "Quatre jours pour explorer les technologies numériques, partager des expériences et donner vie à des idées."
  - Live Countdown component (Days, Hours, Minutes, Seconds).
  - CTA Button Pair:
    - Primary: "Découvrir le programme" (scrolls to `#programme` with icon arrow).
    - Secondary: "À propos de SOLIWAY" (scrolls to `#a-propos`).
- **Bottom**: High-impact stats bar (+1000 participants, 4 jours immersifs, 5 thématiques clés, 1 Hackathon web).
- **States**: Live countdown ticking; responsive stack on mobile.

#### Zone 3: About SOLIWAY (Organism: `AboutSection`)
- **Header**: Tag "À PROPOS DE SOLIWAY" + H2 "Un événement pour explorer le monde du numérique".
- **Body**: Editorial text highlighting SOLICODE's initiative and vision.
- **3 Pillars Grid (Molecules: `PillarCard`)**:
  - Pillar 1: **Apprendre** (Explorer de nouvelles notions et des domaines variés de l'IT).
  - Pillar 2: **Échanger** (Partager des idées et découvrir différentes expériences).
  - Pillar 3: **Pratiquer** (Mettre ses connaissances en application à travers des ateliers et un hackathon).
- **Side/Visual**: Futuristic brand asset showcase card.

#### Zone 4: Program & Agenda (Organism: `ProgramSection`)
- **Header**: Tag "AGENDA OFFICIEL" + H2 "Quatre jours d'immersion technologique".
- **Tab Bar (Molecules: `DayTab`)**:
  - Tab 1: "Jour 1 • 13 Avril" (Ouverture & Ateliers)
  - Tab 2: "Jour 2 • 14 Avril" (Ateliers thématiques)
  - Tab 3: "Jour 3 • 15 Avril" (Forum, meetups & speakers)
  - Tab 4: "Jour 4 • 16 Avril" (Hackathon Web)
- **Content Area**: Dynamic panel switching based on active tab with session cards (`AgendaItem`), tags, and descriptions.
- **Note**: Validation badge indicating editorial schedule awaiting final internal confirmation.

#### Zone 5: Themes & Tracks (Organism: `ThemesSection`)
- **Header**: Tag "THÉMATIQUES CLÉS" + H2 "Les thématiques au cœur de l'événement".
- **Grid of 5 Cards (Molecules: `ThemeCard`)**:
  1. Développement Web
  2. Intelligence Artificielle & Prompting
  3. Cybersécurité
  4. Marketing Digital
  5. Freelance
- **Hover States**: Glowing border transition, icon scale, subtle elevation.

#### Zone 6: SOLICODE Team & Manifesto (Organism: `TeamSection`)
- **Header**: Tag "ORGANISATION" + H2 "Une initiative portée par l'équipe SOLICODE".
- **Body**: Presentation of SOLICODE Tangier and its mission.
- **Callout Banner**: "SOLICODE organise. SOLIWAY rassemble. Ensemble, explorons le numérique."

#### Zone 7: Registration Call-to-Action (Organism: `RegistrationCta`)
- **Container**: Futuristic glowing card with night blue background, cyber circuit lines, and electric cyan gradients.
- **Content**:
  - H2: "Rejoignez SOLIWAY 2027"
  - Subtitle: "Préparez-vous à vivre quatre jours dédiés à l'informatique et au partage."
  - Status Badge: "Inscriptions bientôt disponibles"
  - Action: Button "M'avertir de l'ouverture" triggering modal.

#### Zone 8: Practical Information & FAQ (Organism: `PracticalFaqSection`)
- **Left Column**: Event practical card (Dates, Lieu SOLICODE Tanger, Public cible grand public, format gratuit).
- **Right Column**: Interactive accordion FAQ (Questions regarding prerequisites, hackathon registration, location access).

#### Zone 9: Modal Notification (Organism: `NotificationModal`)
- **Overlay**: Backdrop blur with darkened opacity.
- **Card**: Centered dialog with close button, title "Soyez informé en premier", email input, and submit button.
- **States**: Hidden, Open, Loading, Success confirmation message.

#### Zone 10: Footer (Organism: `Footer`)
- Brand S-logo, tagline, quick links, event dates, copyright, and social links.
