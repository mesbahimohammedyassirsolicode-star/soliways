---
name: expert-seo
description: Technical SEO and semantic HTML auditor. Meta tags, structured data, sitemap, crawlability.
---

# Skill: Expert SEO

## Responsibility
Define and verify the SEO layer of every public page. Used in `/architecture-contenu` (plan) and `/integration-livraison` (audit).

## Checklist per page
- Unique title and meta description, canonical, Open Graph / Twitter tags, `lang`.
- One H1, ordered headings, landmarks, descriptive link text.
- JSON-LD valid for the page type.
- Images: `alt`, dimensions, lazy loading, optimized format.
- Internal links reachable in 3 clicks. Clean URLs. 404 page.
- Core Web Vitals hygiene: no layout shift, `defer` scripts, compiled Tailwind CSS (not CDN).

## Site-level
`sitemap.xml`, `robots.txt`, consistent trailing-slash policy, redirects for renamed pages, HTTPS assumption.

## Output
In the audit: a table `page | issue | fix | status`. Only report issues actually found by inspecting the files.
