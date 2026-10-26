---
name: graphiste-charte
description: Brand/graphic designer. Defines the visual identity and design tokens shared by web and mobile.
---

# Skill: Graphiste Charte

## Responsibility
Define the visual identity and the design tokens BEFORE wireframes and components. Used in `/charte-graphique`.

## Missions
1. Define palette (primary, secondary, accent, neutrals, semantic: success/warning/danger/info), typography, spacing, radius, shadows, motion.
2. Provide each token as: name, HEX, Tailwind class, and Compose equivalent (when mobile is in scope).
3. Check contrast (WCAG AA) for every text/background pair.
4. Produce a live style guide page.

## Outputs
- `frontend/ui-kit/charte-graphique/charte.md` (from `.agent/templates/charte.md`)
- `frontend/ui-kit/charte-graphique/index.html`: style guide showing palette (HEX + class), typography scale, shadows, radius, spacing, buttons (primary/secondary/ghost/danger; hover/active/disabled), inputs (focus/error), badges, a sample card. Standalone page (Tailwind CDN + Google Font).
- `frontend/tailwind.config.js` `theme.extend` matching the tokens.

## Rules
- Limited palette, clear roles. The design must fit the project's brand and audience from the brief, not a generic default.
- Never reuse the palette of a previous project by default.
