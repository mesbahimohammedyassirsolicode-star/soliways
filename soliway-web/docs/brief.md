# Project Brief: SOLIWAY 2027

- **Folder name**: `soliway-web`
- **Goal**: Create an exact, high-impact, futuristic web landing page for the SOLIWAYS 2027 IT event organized by team soliways in Tangier.
- **Target users**: General public, tech students, IT professionals, developers, and aspiring digital freelancers in Morocco and internationally.
- **Product language(s)**: French (`fr`) as defined in the official content source.
- **Tone / inspirations**: Modern, futuristic, high-tech, inspiring, and professional; strictly aligned with the visual identity guide (Turquoise `#25A6AC`, Digital Blue `#456BB8`, Innovation Violet `#6554B8`, Night Blue `#101828`, light background `#F5F8FC`, Inter and Manrope typography, circuit and glow accents).

## Scope
- [x] web (Semantic HTML5, Tailwind CSS v3 via CLI, Alpine.js v3, SEO meta & JSON-LD Event schema)
- [ ] backend (None needed for this phase; registration link will be announced later according to the brief)
- [ ] mobile (None)
- [ ] library (None)

## Features (user stories)
| Priority | As a... | I want... | So that... |
| --- | --- | --- | --- |
| MUST | Visitor | to see a futuristic, impactful hero section with branding, event dates (13-16 April 2027), and countdown | I immediately understand the event's prestige and when it takes place |
| MUST | Visitor | to discover the event vision, approach (Apprendre, Échanger, Pratiquer), and SOLICODE team | I understand who organizes it and why I should attend |
| MUST | Visitor | to explore the 4-day agenda with an interactive day-by-day tab system | I can quickly review the schedule from Day 1 to Day 4 (Hackathon) |
| MUST | Visitor | to browse the 5 key event tracks (Web Dev, AI & Prompting, Cyber, Digital Marketing, Freelance) | I can identify topics relevant to my skills and interests |
| MUST | Visitor | to access clear practical information (location in Tangier, registration readiness, dates) | I can plan my attendance |
| MUST | Visitor | to navigate smoothly via desktop and mobile-optimized responsive navigation | I have an effortless browsing experience on any device |
| SHOULD | Visitor | to have an interactive notification modal ("Me prévenir à l'ouverture des inscriptions") | I can leave my email or get notified when tickets drop |
| COULD | Visitor | to toggle/filter themes or view interactive speaker spot teasers | I can explore more details interactively |

## Constraints
- **Brand Fidelity**: Must follow the exact color palette, typography (Inter + Manrope), UI elements, button hierarchy, and aesthetics specified in `SOLIWAY Futuristic Brand and Website Guide (1).png`.
- **Content Fidelity**: Must incorporate all text and structure from `soliway_contenu_site.md` without omission or arbitrary modifications.
- **Stack & Architecture**: Strict compliance with `.agent/rules/`:
  - Semantic HTML5 + compiled Tailwind CSS v3 (no CDN in production output) + Alpine.js v3 for reactive UI.
  - UI-First methodology (`frontend/ui-kit/` components validated before assembling pages).
  - Clean SEO metadata, Open Graph tags, and Schema.org `Event` structured data.
- **Environment**: Windows / PowerShell compatible.

## Assumptions and open questions
- **Assumption 1**: Scope is single-page responsive event web showcase (`web` only), since registrations will be handled externally or at a later date as specified in the content document.
- **Assumption 2**: Project folder is named `soliway-web` inside the workspace.
- **Assumption 3**: A live countdown timer targeting 2027-04-13 09:00:00 (Tangier time) will be integrated in the Hero or Event Details section.
