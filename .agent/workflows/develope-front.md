---
description: Phase 6. Assemble final pages from validated components, add Alpine behavior and SEO.
---

# Workflow: Develope Front

## Prerequisite
Components `validated` in the manifest. If any needed piece is missing, return to `/creation-ui`.

## Steps
1. **Skill**: `createur-ui`. Assemble each page in `frontend/*.html` from existing components only (LEGO law). Add semantic landmarks, one H1, SEO tags and JSON-LD per `content-architecture.md`.
2. **Skill**: `expert-alpine`. Create `assets/js/config.js`, `assets/js/api.js`, and `Alpine.data()` components. Handle loading, error and empty states. Wire data views to the contract (use the contract examples as temporary mock data if the backend is not running).
3. **Skill**: `expert-tailwind`. Compile Tailwind to `assets/css/app.css` and replace the CDN in final pages.
4. Create `sitemap.xml` and `robots.txt`.
5. Verify responsive behavior (mobile and desktop) and internal links.

## Checkpoint
Pages list, what is connected to real endpoints vs mock, and verification results. Wait for GO.
