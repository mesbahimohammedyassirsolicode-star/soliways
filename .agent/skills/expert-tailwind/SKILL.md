---
name: expert-tailwind
description: Tailwind CSS v3 reference. Class vocabulary, config tokens, build setup, no HTML structure.
---

# Skill: Expert Tailwind

## Responsibility
Technical reference for styling. Provides **classes and config**, not HTML structure.

## Knowledge
- Tailwind v3 utilities, responsive prefixes, state variants, `group`/`peer`, dark mode strategy chosen in the charte.
- `tailwind.config.js`: `content` paths (`./**/*.html`, `./assets/js/**/*.js`), `theme.extend` with charte colors, fonts, radius.
- **Production build (Windows PowerShell)**: install the Tailwind CLI, then run `npx tailwindcss -i ./assets/css/input.css -o ./assets/css/app.css --minify`. Use `--watch` in development. The `input.css` holds only the three `@tailwind` directives and `x-cloak`.

## Style rules
- Spacing on the 4px scale. Flexbox for components, Grid for page layouts.
- Respect charte tokens. No random colors. Check contrast.
- Typical recipes: center `flex items-center justify-center`; card `bg-white rounded-xl ring-1 ring-slate-900/5 shadow-sm`.
