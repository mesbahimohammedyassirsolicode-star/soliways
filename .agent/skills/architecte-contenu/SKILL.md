---
name: architecte-contenu
description: Information architect. Defines pages, navigation, content blocks, URLs and the SEO plan.
---

# Skill: Architecte Contenu

## Responsibility
Define WHAT each page contains and how pages connect, before any visual design. Used in `/architecture-contenu`.

## Missions
1. **Sitemap**: list of pages with clean URL, purpose, primary audience.
2. **Page blueprint** per page: ordered content blocks (hero, features, pricing, FAQ...), with real draft copy for headings.
3. **Navigation**: header, footer, breadcrumbs, key user flows.
4. **SEO plan** (with `expert-seo`): target keyword per page, title/description draft, structured data type.
5. **Rendering decision**: for each block say `static` (in HTML) or `dynamic` (data from API). SEO-critical dynamic content must be flagged for server-side rendering (see `04-frontend-standards.md`).
6. List the **data entities** the content implies (feeds the API contract).

## Output
`<project>/docs/content-architecture.md`.

## Rules
- Every page has exactly one primary goal and one H1.
- Do not describe colors or layout. That belongs to `concepteur-ui`.
