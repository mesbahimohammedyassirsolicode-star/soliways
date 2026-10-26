---
trigger: glob
globs: "**/frontend/**"
---

# Frontend Standards: Semantic HTML, SEO, Tailwind, Alpine.js

## 1. Semantic HTML (mandatory)
- Landmarks: one `<header>`, one `<main>`, `<nav>` (labelled with `aria-label`), `<footer>`; use `<section>`/`<article>` only with a heading.
- Exactly **one `<h1>` per page**; headings never skip levels.
- Buttons for actions (`<button>`), links for navigation (`<a href>`). Never a clickable `<div>`.
- Forms: every input has a `<label>`, correct `type`, `name`, `autocomplete`, and visible error text.
- `<html lang="...">` always set.

## 2. SEO (every public page)
- Unique `<title>` (about 50-60 characters) and `<meta name="description">` (about 120-155 characters).
- `<link rel="canonical">`, Open Graph + Twitter card tags, favicon.
- JSON-LD structured data matching the page type (Organization, LocalBusiness, Article, Product, FAQ...).
- Clean readable file names/URLs (`/menu`, not `/page2`), a custom 404 page, `sitemap.xml`, `robots.txt`.
- Images: descriptive `alt`, `width` and `height`, `loading="lazy"` below the fold, modern formats (WebP/AVIF) when possible.
- **SEO-critical content (text that must rank) MUST be present in the served HTML.** Do not load it with Alpine `fetch` after page load. If such content is dynamic, render it server-side (Laravel Blade) and state that decision in `architecture-contenu`.

## 3. Tailwind
- Standard utility classes only, no arbitrary values (`bg-[#123456]`) except when the charte requires one.
- Colors, radius, shadows and fonts come from the validated `charte.md` tokens (mapped in `tailwind.config.js`).
- 4px spacing scale. Mobile-first (`sm:`, `md:`, `lg:`). No accidental horizontal scroll.
- States on everything interactive: `hover:`, `focus-visible:`, `active:`, `disabled:`, plus `cursor-pointer` and `transition`.

## 4. Alpine.js
- Alpine for UI state only (menus, tabs, modals, form state, small data views).
- Inline `x-data` only when it is 10 lines or fewer. Otherwise use `Alpine.data('name', () => ({...}))` in `assets/js/`.
- Add `x-cloak` (with its CSS rule) to anything hidden at load. Keep ARIA in sync (`:aria-expanded`, `:aria-hidden`).
- All HTTP calls go through one client file `assets/js/api.js` (base URL, JSON headers, auth token, error handling). Never scatter raw `fetch` calls in templates.
- Every data-driven view handles **loading, error, and empty** states.

## 5. Accessibility and Performance
- WCAG AA contrast, visible focus, full keyboard navigation, `prefers-reduced-motion` respected.
- Non-critical scripts use `defer`. Fonts use `font-display: swap`. No render-blocking third-party scripts without a reason.
- External links with `target="_blank"` MUST have `rel="noopener noreferrer"`.
