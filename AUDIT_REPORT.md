# SOLIWAYS 2027 — Phase 1: Comprehensive Website Audit

**Audit date:** 2026-10-26 · **Audited commit:** `7128bb7` (HEAD) · **Mode:** Audit only — no project files modified except this report.

**Method:** Static analysis of every tracked file, cross-referenced against live deployment checks (`https://www.soli-ways.online/`, fetched 2026-10-26), local mathematical WCAG contrast computations, and Vercel platform documentation. What could **not** be tested is listed in §12 (Caveats).

---

## 1. Executive Summary

The site is a well-executed single-page static event landing page, already deployed on Vercel and live at `https://www.soli-ways.online/` (verified by fetching the live domain — content matches the local source). Visual identity is coherent and consistent with the charte graphique; confirmed facts (dates, city) are correct everywhere. No secrets were found in the repository.

However, the site is **not yet publication-quality** in four areas:

1. **The "notify me when registration opens" modal is a frontend-only simulation** with a false success message — no email is stored or sent anywhere. Trust and lead-capture risk.
2. **Brand/organizer identity conflict** across the repo and the live site: `SOLIWAY` vs `SOLIWAYS`, and organizer `équipe SOLICODE` vs `Équipe SOLIWAYS`. The live JSON-LD states organizer = "Équipe SOLIWAYS" while the official content source document says the organizer is "équipe SOLICODE". This directly affects SEO, AI comprehension, and legal accuracy.
3. **Registration messaging conflict**: the project brief states registration is open (URL unconfirmed), while the live site says "Les inscriptions arrivent bientôt !" in 6+ places, and the JSON-LD invents `price: "0"`, `availability: PreOrder`, `validFrom: 2027-01-01`.
4. **Internal UI kit and design docs are publicly exposed** on the production domain (verified: `/ui-kit/index.html` returns the full internal component catalog, including "Validated by user GO" notes and a `SOLICODE` brand mention inconsistent with the live page).

Additional significant gaps: no English version (verified: `/en.html` → 404) despite the FR+EN requirement; OG image is a 386×730 px portrait logo (verified dimension) instead of a dedicated 1200×630 share image; accessibility gaps in the modal, program tabs, and FAQ accordion; `x-collapse` silently does nothing (Alpine Collapse plugin is not loaded); unsupported statistics ("+1000 participants"); reduced-motion not honored anywhere; no edition/archive-ready URL architecture ("2027" is hardcoded in ~40 places).

**Finding counts:** 3 Critical · 8 High · 12 Medium · 8 Low.

---

## 2. Existing Architecture and Technology Stack

### 2.1 Repository layout (as deployed)

```
soliways/                          ← git root, deployed root = frontend/ (vercel.json)
├── vercel.json                    ← framework: null, outputDirectory: "frontend"  ← DEPLOY ROOT
├── frontend/                      ← everything here is publicly served (verified live)
│   ├── index.html                 ← THE production page (framings, 1016 lines)
│   ├── 404.html                   ← branded 404 (robots noindex, follow)
│   ├── sitemap.xml / robots.txt   ← the LIVE copies (verified)
│   ├── package.json, package-lock.json, tailwind.config.js   ← build tooling, served too
│   ├── assets/
│   │   ├── css/app.css (37 KB, compiled min Tailwind) + input.css (source)
│   │   ├── js/app.js (~3 KB, 6 Alpine components)
│   │   └── img/ (11 logo PNGs; only 3 are used)
│   └── ui-kit/                    ← internal design system — publicly reachable (verified)
│       ├── index.html, components-manifest.yaml
│       ├── charte-graphique/ (charte.md, index.html)
│       ├── atoms/ molecules/ organisms/ layouts/
├── robots.txt, sitemap.xml        ← root duplicates; NOT deployed (shadowed by frontend/)
├── soliway-web/                   ← README + docs/brief.md, content-architecture.md, wireframes.md
│                                     (describes old layout soliway-web/frontend — stale)
├── soliway_contenu_site.md        ← official content source (says SOLIWAY / équipe SOLICODE)
├── SOLIWAY Futuristic Brand and Website Guide (1).png  ← visual identity reference (1.85 MB)
└── .vscode/tasks.json             ← broken: points to soliway-web\frontend (doesn't exist)
```

### 2.2 Stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | Semantic HTML5 | Single page, section-anchored navigation; exactly one `<h1>` |
| Styling | Tailwind CSS v3.4.17 (CLI build, **not** CDN in production) | Compiled/minified `app.css` committed; `npm run build:css` regenerates; `node_modules/` present locally |
| Interactivity | Alpine.js v3.14.3 (pinned CDN, `defer`) | 6 components: navbar, countdown, programTabs, faqAccordion, notificationModal, scrollTop |
| Fonts | Google Fonts: Inter (6 weights) + Manrope (4 weights) | `display=swap`, preconnected |
| SEO/structured data | Meta tags + JSON-LD `Event` | Single schema block |
| Backend | None | Registration is external/later; notify modal is simulated |
| Hosting | Vercel static | `"framework": null`, `outputDirectory: "frontend"`; Vercel KB confirms `404.html` in output dir is auto-served as 404 |
| Tests / linting | None | No test runner, linter, or CI configured |

### 2.3 Environment and tooling
- No environment variables or secrets required; `.gitignore` correctly excludes `.env*` (none present), `node_modules/`, `.vercel/`.
- The only safe automated check currently available is `npm run build:css` (would **modify** `app.css` — not run during audit). Nothing else is runnable without installing dependencies, which was not allowed and not needed: the compiled CSS is committed and the site is plain static files.
- Deployment root is `frontend/`, so root-level `robots.txt`/`sitemap.xml` are **dead duplicates**; the live robots.txt/sitemap.xml are the `frontend/` copies (verified live).

### 2.4 Component relationship and drift risk
`frontend/index.html` is hand-assembled from `ui-kit/organisms/*` (copy-paste, no build-time includes). Drift has already occurred:
- `ui-kit/organisms/NotificationModal.html` differs from the index implementation (different validation, different error copy, label lacking `for`, Alpine `3.x.x` unpinned, Play CDN, no URL in `og`…).
- Token maps are duplicated again inside every ui-kit Play-CDN `tailwind.config` inline script.
This means future edits must be made in both places, or the kit lies. Not a bug today; a maintenance hazard.

---

## 3. Findings

Severity definitions: **Critical** = blocks trustworthy publication or corrupts core facts/actions; **High** = significant user/SEO/business damage before any marketing push; **Medium** = quality/maintainability debt that should land in Phase 2; **Low** = polish.

### CRITICAL

| # | Finding | Affected | Evidence | Impact | Recommended fix | Verification |
|---|---|---|---|---|---|---|
| **C1** | **Notification modal is a frontend-only simulation with a false success message** | `frontend/assets/js/app.js:60-91`, `frontend/index.html:958-992` | `notificationModal.submit()` only validates the regex and sets `this.submitted = true`; no `fetch`, no endpoint, no storage. Success screen states: "Votre email a bien été enregistré. Vous recevrez une notification prioritaire…" | Users believe they are on a list; no leads are collected; backlog of silently-lost interested visitors; brand trust damage when discovered. GDPR-adjacent messaging ("email enregistré") with zero data processing is misleading either way | Owner decision (required): (a) connect to a real waitlist endpoint (e.g., Vercel Function + provider or external form tool) with consent notice, loading/error states; or (b) until a backend exists, replace with an honest CTA (publish the registration link or "Suivez-nous / revenez bientôt" state) and remove "Votre email a bien été enregistré" | Open modal, submit valid email, observe **Network tab** for an actual request; confirm a test email arrives in the receiving system; then confirm no success state without a 2xx response |
| **C2** | **Brand and organizer identity conflict (SOLIWAY vs SOLIWAYS; équipe SOLICODE vs Équipe SOLIWAYS), including in JSON-LD** | `soliway_contenu_site.md` (whole doc: "SOLIWAY", "équipe SOLICODE", title "SOLIWAY 2027 \| Événement IT à Tanger"); `soliway-web/docs/brief.md:1-4` ("SOLIWAY 2027" title, "SOLIWAYS"/"team soliways" in goal); `soliway-web/docs/content-architecture.md:110,126-127` (organizer "Équipe SOLICODE", url `https://solicode.co`); `frontend/index.html:70` JSON-LD (`"organizer": "Équipe SOLIWAYS"`); `frontend/ui-kit/charte-graphique/index.html:99` ("l'équipe SOLICODE"); `frontend/ui-kit/organisms/NotificationModal.html:87` ("SOLIWAY 2027"); `frontend/ui-kit/organisms/TeamSection.html` (same section copy differs) | Grep comparison of every mention. External context (not a confirmation): `https://www.it-wave.online/` is an annual event by *Solicode students in Tanger* (Apr 2026), suggesting the organizer entity is Solicode Tanger | Search engines and AI systems receive contradictory organizer facts; product/lawful identity uncertainty; internal tooling copies contradictory copy; impossible to fill structured-data organizer fields correctly | Owner decision (required): the official event name (SOLIWAYS is stated by the brief) **and** the official organizer entity name; update once, everywhere (page copy, JSON-LD organizer.name/url, ui-kit, docs, content source annotated as legacy) | `grep -ri "SOLIWAY"` and `grep -ri "SOLICODE"` over the repo returning 0 conflicts after fix |
| **C3** | **Registration status messaging conflicts with the stated business status, and JSON-LD invents offer data** | `frontend/index.html:126-127,160-162,723-734,789-791` (6+ "bientôt/Bientôt disponibles" occurrences); JSON-LD `index.html:73-79` (`price: "0"`, `availability: "…/PreOrder"`, `validFrom: "2027-01-01"`) | Project brief: "Registration status: Open, but the registration URL has not yet been confirmed for publication." Live site: registration "arrive bientôt". `validFrom`, price 0 MAD, and PreOrder have **no source anywhere in the repo** | If registration is actually open, every CTA blocks conversions ("bientôt" reads as closed). Structured-data `offers.price = 0` is an unconfirmed factual claim Google may display ("Free") in event rich results | Owner decision (required): actual current status + final registration URL (or the mechanism), whether entry is free or paid, and whether a real `validFrom` exists. Then: align page copy (a single source of truth for the status string), and either populate `offers` correctly or remove `offers` until real data exists | Diff the six surface locations + JSON-LD against the owner's decision doc; Google Rich Results Test must show no invented offer fields |

### HIGH

| # | Finding | Affected | Evidence | Impact | Recommended fix | Verification |
|---|---|---|---|---|---|---|
| **H1** | **Internal UI kit and tooling exposed on the production domain** | `vercel.json` (deploys whole `frontend/`), `frontend/ui-kit/**`, `frontend/package.json`, `frontend/package-lock.json`, `frontend/tailwind.config.js` | Verified live: `https://www.soli-ways.online/ui-kit/index.html` serves the full internal catalog (incl. "Validated by user GO", charte guide, component previews). Ui-kit pages load the **Tailwind Play CDN** (`cdn.tailwindcss.com`) and unpinned `alpinejs@3.x.x`. `robots.txt:3` blocks crawling but not access. `/package.json` returned 404 (Vercel filters it); `/package-lock.json`, `/tailwind.config.js` exposure not individually re-fetched | Off-brand, contradicting copy (`SOLICODE`, `SOLIWAY`) is publicly reachable; "private" design notes visible; production bundle relies on an anti-pattern CDN in the reachable pages; wastes crawl-adjacent surfaces; unprofessional for anyone who finds it | Move `ui-kit/`, `package*.json`, `tailwind.config.js` outside the deploy root (e.g., `internal/ui-kit/`), or restrict via Vercel routes; keep `robots.txt` disallow for any remaining path | `GET /ui-kit/index.html` → 404 after fix; grep deploy output for `cdn.tailwindcss.com` → 0 |
| **H2** | **No English version and no hreflang, despite FR+EN being a stated requirement** | `frontend/index.html:2` (`lang="fr"` only), `frontend/404.html:2`; no `/en` route (verified: `https://www.soli-ways.online/en.html` → 404); no `hreflang`/`og:locale:alternate` anywhere | The requirement says "Website languages: French and English". Only French exists | International/AI audience cannot get EN facts; impossible to correctly annotate alternates until EN exists; English speaker names/terminology ("hackathon", "tech") search demand missed | Combined with the URL-structure decision (H7): publish `fr`/`en` dual pages with a visible language switcher, `hreflang` cross-links, and consistent JSON-LD in both | Live `/en/` returns 200 with an EN page; hreflang validator passes; switcher toggles without losing scroll position |
| **H3** | **OG/social image is a 386×730 px portrait logo, dimensions/alt missing; the planned dedicated OG image was never created** | `frontend/index.html:25,33` (`og:image`/`twitter:image` = `logo-darkmode.png`); `soliway-web/docs/content-architecture.md:101` planned `/assets/img/og-soliway-2027.png` (file does not exist in `assets/img/`) | Image measured: `logo-darkmode.png` = 386×730 px, 79 KB. No `og:image:width/height/alt`, no `twitter:image:alt` | Ugly/letterboxed previews on WhatsApp/LinkedIn/Facebook/iMessage — the primary viral channel for a public event; animated/planned share asset absent | Create one branded 1200×630 px (≤300 KB) OG image (event name, dates, Tanger, identity), reference it in both `<meta>`, add `width/height/alt` | Facebook/LinkedIn/WhatsApp share debuggers show full-image landscape preview |
| **H4** | **Unsupported statistics and claims** | `frontend/index.html:240-254` hero stats: "+1000 Participants", "4 Jours", "5 Thèmes", "1 Hackathon"; `index.html:11` meta says "événement tech de référence"; `index.html:786` audience "Grand public & Étudiants IT" vs. source doc `soliway_contenu_site.md:7` "grand public" | No baseline data for "+1000 participants" (aspirational target presented as stat); "de référence" is unverifiable puffery; audience widened vs. content source; the stats grid is the first thing AI/SEO extractors read | A first-edition event presenting a participant count as fact risks credibility; inconsistent audience definition confuses targeting and FAQ copy | Owner confirmation per stat: keep as-is with "attendus/attendu" framing, or replace with verifiable facts (duration/theme/hackathon counts are structural and fine); unify audience wording | Editorial sign-off doc per stat; screenshot diff of hero |
| **H5** | **Accessibility gaps in modal, program tabs, FAQ accordion; `x-collapse` is a silent no-op; no `<form>` (Enter doesn't submit)** | `frontend/index.html:918-997` (modal: no `role="dialog"`, no `aria-modal`, no focus trap/return, no body scroll lock, error `<p>` not announced, no `aria-invalid`); `:365-427` (day-tabs: no `role="tablist"/tab/aria-selected`, panels not labelled); `:806-848` + `ui-kit/molecules/FaqAccordionItem.html:43` + `ui-kit/organisms/PracticalFaqSection.html:101` (`x-collapse` used, but only Alpine core is loaded — `index.html:44-46`, no `@alpinejs/collapse` anywhere: repo-wide grep = 0 hits); `:962-978` submit button `type="button"` outside any `<form>` | Keyboard-only and screen-reader users: tab panels can't be operated as tabs, accordion state invisible, modal leaves background scrollable and keeps focus outside; FAQ animation never runs (cosmetic); pressing Enter in the email field does nothing | WCAG A/AA failures; Mars keyboard bugs; broken promised animation | Playwright script: Escape reaches modal, tab via `main` landmarks; add real ARIA, focus moves into dialog on open and returns on close, `aria-live="polite"` error region, `aria-invalid`; load `@alpinejs/collapse` or drop `x-collapse`; wrap email in `<form>` and submit Enter | axe DevTools / pa11y reports zero critical violations on `index.html` |
| **H6** | **Countdown target parsed in visitor-local timezone; contradicts structured data** | `frontend/assets/js/app.js:25` → `new Date('2027-04-13T09:00:00').getTime()` (no offset ⇒ parsed as local time per ECMAScript date-time rules); JSON-LD `index.html:55` says `2027-04-13T09:00:00+01:00` (Tangier = UTC+1 in April 2027) | Live fetch showed the pre-JS fallback all-zeros state rendered before Alpine hydrates (expected) | Countdown off by hours for visitors outside Tangier (e.g., Paris +02:00 in April ⇒ 1-hour error); AI systems extracting the countdown markup see contradicting facts relative to JSON-LD | Append `+01:00` to the countdown target; label the countdown "heure de Tanger" | Unit test: freeze Date at `09:00+01:00` on 13 Apr 2027 → days=00/hours=00; cross-visitor sanity check with London/Paris mock TZ |
| **H7** | **No edition or archive-ready architecture; "2027" hardcoded in ~40 places** | `frontend/index.html` (title/copy/JSON-LD/etc.), `frontend/404.html:6,62`, sitemap entries; no `/2027/` or `/editions/` path exists | All event identity is baked into a single path (`/`) | Adding a 2028 edition or an archive requires an invasive rebuild-in-place; URL equity decisions get rushed later | Adopt (now, since it shapes everything): keep the current live page at `/` as the *current edition*, but isolate all edition-varying facts into a single data source; house **future** editions at `/editions/<year>/`; build an archive index only when verified past-edition content is provided. Do **not** create empty archive pages | Content/code review confirms one canonical place defines `year, dates, venue, status`; future-edition scaffold created only on instruction |

### MEDIUM

| # | Finding | Affected | Evidence / detail | Impact | Fix |
|---|---|---|---|---|---|
| M1 | Project docs describe a non-existent layout; VS Code task is broken | `soliway-web/README.md` (tree shows `soliway-web/frontend/`, launch commands with `c:\Users\Solicode\Desktop\soliway`; the files live at repo-root `frontend/`), `.vscode/tasks.json` (`--directory soliway-web\frontend`) | Launch task fails instantly; README instructions never worked in this repo | Contributor confusion on day one | Fix paths; move docs: `soliway-web/` content belongs under `docs/` at this root; add an updated structure diagram |
| M2 | Sitemap quality problems | `frontend/sitemap.xml` | `lastmod` = `2027-01-01` (a future date invented at build time; actual last change 2026-10-26 — verified by git log); `/404.html` listed with priority 0.1 (should never be listed); homepage-only, no `fr/en` alternates | Search-engine distrust of lastmod; crawl budget on a nonsense URL; no language support | Homepage-only sitemap, real lastmod, drop `/404.html`, regenerate on content change (manual then; template if future pages) |
| M3 | Duplicate serving of `/` and `/index.html` (no cleanUrls); canonical only mitigates homepage | `vercel.json`, `frontend/index.html` — verified live data at both | No config file exists for `cleanUrls`/`trailingSlash` | Diluted link equity on any future `.html` demolition path | Set `cleanUrls: true` in `vercel.json`; then `/index.html` redirects to `/` (also strips `.html` on all future pages) |
| M4 | Manual assembly drift between kit and live page | Live copy differs from kit copy: `ui-kit/organisms/NotificationModal.html:87` says "SOLIWAY 2027" vs. index "SOLIWAYS 2027"; error copy differs ("Veuillez renseigner…" vs. "Veuillez saisir…"); duplicate token configs | Any future edit must be applied twice | After C2 content authority decision, either generate `index.html` from kit (build step) or declare kit read-only and amend in one direction |
| M5 | No security headers configured | `vercel.json` (no `headers` block) | No CSP / X-Content-Type-Options / X-Frame-Options / Referrer-Policy / Permissions-Policy added by this repo (live header values untested — see caveats) | Default-ish safety; defense-in-depth missing | Add headers in `vercel.json` (script-src fonts.googleapis/jsdelivr + `unsafe-inline` for Alpine inline config until moved) |
| M6 | External JS/fonts without integrity; no SRI; too many font weights | `frontend/index.html:38,46` — 2 Google-Font families (Inter ×6 weights, Manrope ×4); Alpine from jsdelivr, no `integrity` | Font-loading render-blocking (preconnect mitigates); supply-chain risk on Alpine CDN; larger font payload than needed | Self-host both fonts (subsets), pin Alpine as a local vendored file with integrity hash, trim to used weights after audit of usage |
| M7 | Reduced motion not honored anywhere | `frontend/index.html:2` `scroll-smooth`, `:106` `animate-ping`, plus `animate-pulse` ×3, x-transitions everywhere; `soliway-web` — repo-wide `grep "motion-reduce|prefers-reduced-motion"` = 0 hits | Vestibular discomfort; WCAG 2.1 §2.3.3 best-practice | Add a `motion-reduce:` pass for pings/pulses/smooth-scroll, e.g. `@media (prefers-reduced-motion: reduce)` in `input.css` handling `scroll-behavior` + transitions |
| M8 | Non-square favicon and unoptimized touch icons | `assets/img/logo-s.png` measured 366×343 px (favicon + apple-touch-icon), no `sizes` attr, no `.ico`/SVG | Browser letterboxing/crop; iOS home-screen icon cropped oddly | Square 512×512 PNG + 32/16 favicon set |
| M9 | No analytics, no GSC verification meta | no analytics JS anywhere (verified), no GSC tag | Zero observability of the site's primary funnel (registration interest) — but only owner decides privacy | Owner chooses provider (privacy-friendly GA4/Plausible); add GSC verification via meta file |
| M10 | Footer fine-print contrast; legal-year copy | `frontend/index.html:906-908` — `text-slate-500` on `bg-dark/85` fallback composite; `© 2027` hardcoded in 2026 (verified live) | Computed ≈ **3.76:1** (fails AA 4.5:1 for 12 px text); copyright year feels stale when the event page is visited in 2026 | `text-slate-400` copyright line + "Tous droits réservés." |
| M11 | Metadata refinements | `index.html:12` (`meta keywords` deprecated, useless); `index.html:11` description ≈163 chars (risks mobile SERP truncation); no `og:locale:alternate` (`fr` pair will be needed when EN lands) | SERPSnippet truncation on mobile | Drop keywords; tighten description ≤155 chars incl. both `fr/en` if EN lands |
| M12 | JS hygiene: non-passive scroll listeners, deprecated `pageYOffset`, uncleaned countdown interval, smooth-scroll without reduced-motion | `app.js:14-16,32,96-103` | Minor; two listeners on the same scroll event; countdown tick never stopped | `passive: true` + `scrollY` + `clearInterval` on teardown + reduced-motion guard on `scrollToTop` |

### LOW

| # | Finding | Affected | Detail |
|---|---|---|---|
| L1 | 8 unused logo images (of 11) + 1.85 MB brand-guide PNG in repo | `frontend/assets/img/{logo-icon,logo-s-dark,logo-tagline-dark,logo-tagline,logo-transparent,logo-wordmark-dark,logo-wordmark,logo}.png` + root `SOLIWAY Futuristic Brand and Website Guide (1).png` | Only `logo-s.png`, `logo-nav-dark.png`, `logo-darkmode.png` are referenced (verified by grep). Clean before Phase 2 finals |
| L2 | Root-level `robots.txt` and `sitemap.xml` are dead duplicates | `/robots.txt`, `/sitemap.xml` (root) | Live copies come from `frontend/` (verified via live robots.txt); remove root copies or replace with a redirect |
| L3 | "L'organisation confirme le déroulé définitif à l'approche de l'événement" note visible in production UI | `frontend/index.html:528-531` | It is honest about an unconfirmed schedule, but reads like internal messaging on a public page; discuss with owner whether to keep, its wording is a content decision not a bug |
| L4 | Nav CTA label reads truncated | `frontend/index.html:127` "Inscriptions bientôt" | Wording polish — tie to C3 single-status copy |
| L5 | Ui-kit token sets drift from `tailwind.config.js` (inline Play-CDN config duplicates) | Every `ui-kit/*.html` | Assumes M4 resolution |
| L6 | `keywords` meta and speckle tags beyond current spec | `index.html` | Clean-up quality pass |
| L7 | `selection:bg-primary` — selected text contrast unverified | `frontend/index.html:83` | Verify with axe once real browser pass happens |
| L8 | GitHub Pages-style `/ui-kit/` nav tree in the deployed site has no sitemap exclusion anywhere while robots.txt attempts disallow | `frontend/robots.txt:3` | Robots disallow is honored but files stay reachable — noindex on kit pages would harden it (secondary to H1) |

---

## 4. SEO and AI Discoverability Assessment

**Verified live:** the canonical URL, HTTP 200, full content, robots.txt, sitemap — all fetched on 2026-10-26.

### 4.1 What is already good
- Single `<h1>`, clear semantic heading order; **all content is in crawlable HTML** (verified: live fetch returned all copy server-rendered — no JS-gating).
- `<html lang="fr">` correct; `robots.txt`/`sitemap.xml` exist and are correctly wired together via `Sitemap:` line; branded `404.html` (per Vercel KB it should be served automatically for unknown routes; **HTTP status/case not re-verified live — see caveats**).
- Canonical URL present, absolute, self-referential; OG/Twitter basics present with absolute image URL; event schema has correct `name`, `startDate`/`endDate` (+01:00, consistent with Morocco UTC+1 in April 2027), `eventStatus=Scheduled`, `location.name/addressLocality/addressCountry`, `organizer.name/url`, and correctly avoids calling speakers/partners who don't exist.

### 4.2 Gaps (mapped to findings)
| Area | Status | Evidence / fix |
|---|---|---|
| Title / description | Title 53 chars — fine. Description ~163 chars — mobile truncation risk (M11). "tech de référence" puffery (H4). | Refine after owner decisions |
| Canonical domain | **Consistent** — every technical file uses `https://www.soli-ways.online/` (verified by grep + live). Only `soliway-web/docs/content-architecture.md` references `https://solicode.co` (stale doc, not live). Bare domain `https://soli-ways.online/` **returns identical content** (verified) — whether that's via 301 redirect to `www` or a genuine duplicate is not visible with the tools used here and **must be confirmed via response headers**; if not a redirect, pick one canonical and redirect the other (H3/M3 territory) | _Decision required_ — including which secondary domains should redirect |
| hreflang / i18n | Missing entirely; EN version missing (verified: `/en.html` → 404) (H2) | Build EN route + hreflang pair |
| Sitemap | `lastmod` = future `2027-01-01`; `/404.html` indexed; no language alternates (M2) | Correct sitemap |
| Structured data | `Event` exists but contains **unverifiable/invented** fields: `offers.price "0"`, `validFrom 2027-01-01`, `PreOrder` (C3). Also missing: venue street address (only locality), `image`, and the `performer`/`speaker` fields that would be natural for the event — correctly left out today rather than invented. `organizer.url` points at the event site itself, defensible only once the organizer identity is settled (C2) | Owner answers, then: correct/limited JSON-LD; consider adding `FAQPage` (matching the real FAQ content), `WebSite`, `Organization` |
| Internal linking | All in-page anchors resolve (verified while reading: every `#id` used in nav/footer exists). No external links (nothing broken/injectable) | — |
| Images / alt text | All `<img>` alts present ("Soliways Logo", "Soliways Official Logo"); decorative SVG backgrounds correctly `aria-hidden` | For brand SVG, alt texts should be more descriptive than "Soliways Logo" (Low) |
| GSC readiness | Nothing blocks submission; **no verification meta** yet; sitemap URL valid; will submit after fixes | Add GSC meta/site owners access |
| Search intent / keyword targeting | The single FR page covers "SOLIWAYS", "événement IT Tanger", "hackathon web" well; nothing for EN demand yet (H2) | EN page + FR/EN keyword plan |
| **AI discoverability** | Good foundation: facts are in static HTML, single canonical source, no contradicting dates. Weaknesses: (a) conflicting organizer/brand names across repo and live page (C2) — the thing AI systems triangulate worst; (b) JSON-LD invented offer fields (C3); (c) no EN (H2); (d) all event facts live in prose split across sections + JSON-LD without a machine-preferred summary surface | (1) Fix C2/C3 first. (2) An `llms.txt` is **worth adding** as a plain-text factual summary (brand, dates, venue, status, languages) — it helps AI crawlers that do read it and costs nothing; it does **not** directly influence Google ranking and should not be expected to change search positions by itself; it also risks becoming stale if not maintained. Recommend creating it in Phase 2 **AFTER** facts are settled. (3) Keep every future page's `lang`, `hreflang`, and canonical in a single template |

---

## 5. UI/UX and Responsive Assessment

*(Code-level review + live HTML fetch; no browser/device session was run — see caveats.)*

### 5.1 Visual identity
- Coherently implemented dark "circuits & glow" brand: deep night-blue base `#0b1323`, documented tokens in `tailwind.config.js` matching the charte (`#25A6AC` turquoise, `#456BB8` digital blue, `#6554B8` violet, `#101828`, `#162036`), Inter/Manrope pairing, target-`glow`/glass overlays — consistent with `SOLIWAY Futuristic Brand and Website Guide (1).png` referenced by the brief. Distinctive and recognizable.
- The brand guide appears to have its own personality that doesn't obviously borrow from the demo reference site (checked `https://www.it-wave.online/` for information-architecture inspiration only: hero → objectives → program → past editions → sponsors/how-to-arrive). SOLIWAYS covers the same structural needs (hero/countdown → about → program → themes → team → registration → practical info/FAQ/footer) without copying branding, text, or their idiosyncratic design (e.g., we are not copying their carousel, their gallery, their phone/contact/modem copy). No legal IP concern.

### 5.2 Weaknesses, by priority
| Priority | Issue | Where |
|---|---|---|
| P0 | Modal experience: focus not moved/trapped, no scroll lock, error not announced; email field offers no Enter submission (H5) | `index.html:918-997` |
| P0 | Registration CTA messaging conflicts with the actual business status everywhere (C3) | Six locations |
| P1 | CTA wording "Inscriptions bientôt" reads truncated (L4) | `index.html:127` |
| P1 | Countdown colors, accessibility and cross-visitor timezone drift (H6) | `app.js:25`, hero block |
| P1 | Footer copyright/legal year says "© 2027" while the page is viewed in 2026 (M10) — feels odd on first read | `index.html:908` |
| P2 | Footer/link tap targets: 14-px links with no vertical padding are tight for thumbs; consistent 44 px touch targets recommended | `index.html:883-889` |
| P2 | "Étudiants IT" audience addition vs. "grand public" in the source (H4) — affects FAQ and practical info card tone | `index.html:786` |
| P2 | Reduced-motion behavior absent; decorative `animate-ping/pulse` + forced smooth scroll (M7) | Throughout |
| P3 | Hero stats grid borders tuned for 2-col and 4-col; mid-size (≈ md) tablet layout is the reasonable risk spot; not verified in a real browser | `index.html:238-256` |

### 5.3 Responsive confidence
Class-based review suggests sensible behavior at the covered breakpoints (`sm 640`, `md 768`, `xl 1280`): hamburger below 768, CTA hidden < 640 in the nav (drawer replaces it), 2-col program tabs, 2→4-col stats grid, wrap-friendly flex action buttons, no horizontal-overflow-prone fixed widths besides two decorative fixed blur blobs inside an `overflow-hidden fixed` container (safe). **Not verified on real devices** (no browser session in this audit). Fonts are the most likely CLS contributors; `display=swap` mitigates invisibility but allows a swap shift.

---

## 6. Accessibility, Security, and Performance Assessment

### 6.1 Accessibility (computed WCAG contrast — exact formula, not a browser measurement)

| Pair (fg on bg) | Computed ratio | AA verdict |
|---|---|---|
| White on primary `#25A6AC` (all primary CTAs, `text-xs`/`sm` semibold) | **2.95:1** | ❌ Fails 4.5:1 (and even 3:1 for large text) |
| Footer fine print `slate-500 #64748B` on footer bg (~`#0F1727` composite) | **3.76:1** | ❌ Fails 4.5:1 (12 px text) |
| Primary `#25A6AC` on dark surface `#162036` | 5.51:1 | ✅ |
| Primary on badge-bg (`bg-primary/10` over `#162036`) | 4.78:1 | ✅ (barely) |
| Primary on dark `#101828` / on page bg `#0b1323` | 6.02–6.30:1 | ✅ |
| `slate-400 #94A3B8` body text on dark surfaces | 6.33–7.24:1 | ✅ |
| Slate-900 on white (secondary CTA), white on dark headings, amber/rose/cyan-300 accents | 6.03–17.85:1 | ✅ |

**Note:** the charte (`charte-graphique/charte.md:40`) claims "White on Primary = 3.5:1" — our exact computation gives **2.95:1**, i.e. worse than documented, and it fails AA for the small bold button text used on every primary button. Raising the button text to ≥16–19 px bold and/or whitening the bg is not a valid fix alone — recommend darkening the button surface or using a darker text-on-primary token once; audit all `bg-primary text-white` instances together.

Other a11y: landmark structure and heading order are correct; all interactive controls have accessible names; FAQ/answers are in the DOM (content not display:none from markup); day-tab panels are keyboard-reachable but without tab semantics. Focus indicators: buttons rely on default UA outlines — acceptable but weak on the glowing brand color; focus-visible styling is unverified in a real browser.

### 6.2 Security
- **No secrets committed.** Grep across all tracked text files for `password|secret|api[_-]?key|token|private[_-]?key` etc. produced only false positives ("Tokens" = design tokens). `.gitignore` covers `.env`, `.env.*`; none exist in the repo, and no secret-looking strings are present anywhere (verified).
- No backend; no data is transmitted anywhere today (C1 is the main functional gap); no `window.innerHTML`/`document.write` usage (app.js reviewed in full); anchor-only links, no `target=_blank`; no mixed-content risk (both CDNs HTTPS).
- External surface: fonts.googleapis/gstatic + jsdelivr without SRI (M6); production exposes ui-kit + fetaturing the Play CDN in reachable pages (H1). `/package.json` → 404 live (verified); `/package-lock.json`, `/tailwind.config.js` were not individually re-fetched — treat as exposed-by-default until H1 is fixed.
- No security headers configured in `vercel.json` (M5). Live header values (HSTS/CSP/CFO/XCTO) were not captured with the tools available — **treat的安全性 audit as unverified at the header layer rather than as a measured pass**.

### 6.3 Performance
- **Strong structural choices:** a single committed 37 KB minified CSS output; deferred, pinned Alpine (~15 KB gz from CDN); no hero bitmap assets (backgrounds are CSS/SVG); 11 PNGs exist but only 3 are ever requested on the homepage (~10 KB for nav logo, 79 KB for about logo at most).
- Unmeasured (no claims made): no Lighthouse/Lighthouse-CI, no device/network emulation, no live CWV field data, no RUM. Only improvements — not scores — are recommended here:
  1. Fonts are the main hidden cost: 2 families × 10 weights (verified URL weights: Inter 400/500/600/700/800/900 + Manrope 400..700). Unused weights still get fetched only if used per-subset logic — verify with devtools; simplification will materially help LCP. Preload the (subset) heading font or self-host (M6).
  2. Bundle Alpine locally with SRI (M6).
  3. Render-blocking Google Fonts stylesheet is the main optimized-path risk; `font-display swap` mitigates invisible text, not block-then-swap; measure after Phase 2.
  4. The two big `blur` layers are GPU-cost heavy on low-end phones — optional decorative downgrade on `motion-reduce`/low-power devices.

### 6.4 Dependency health
Only 1 runtime-affecting dev dependency (`tailwindcss ^3.4.17`), 2 build scripts; `package-lock.json` present; Alpine pinned to `3.14.3` (good) but not self-hosted/SRI (M6); `ui-kit` uses unpinned `3.x.x` (H1 kit cleanup). No known advisories noted; no `npm audit` was run (it would modify nothing — but it was deliberately not installed/run as it requires network and node tooling; **not tested**).

---

## 7. Confirmed Facts vs. Information Requiring Organizer Confirmation

### Confirmed (per project brief + verified in repo/live)
| Fact | Note |
|---|---|
| Brand name: **SOLIWAYS** | Brief-stated; conflicts remain in repo (C2) that the owner must resolve before Phase 2 edits |
| Dates: **13–16 April 2027** | Consistent across all pages, JSON-LD, taglines, doc sources (verified by grep) |
| Location: **Tangier, Morocco**, venue "SOLICODE" | Venue name consistent in every live text file; exact building/address **not** provided anywhere (§7.2) |
| Audience: **General public** | Brief-stated; site adds "Étudiants IT" (H4 conflict) |
| Registration: **Open, but final public URL not confirmed** | Brief-stated; the live site says "bientôt" — C3 |
| Languages target: **French and English** | Brief-stated; only FR exists now (H2) |
| Timezone assumption | JSON-LD `+01:00` (Tangier = UTC+1 in April 2027, post-Ramadan) — internally consistent; confirm when program times are set |

### Requires organizer confirmation before Phase 2 changes
1. **Official organizer entity name** for page copy and JSON-LD: "Équipe SOLIWAYS" (live site) vs "équipe SOLICODE" (source doc + ui-kit + docs) vs "Solicode Tanger" (external context).
2. **Current registration status wording** to publish (open with URL vs. opening soon), and the **final registration URL**/platform when confirmed.
3. **Free or paid?** JSON-LD currently claims price 0 with `PreOrder` and `validFrom 2027-01-01` — all three invented in the builder; either correct or delete `offers` entirely (never publish invented structured-data facts).
4. **Venue exact name + street address** (for `Event.location` completeness and any map embed).
5. **Hero stats**: are "+1000 participants" a confirmed target/fact or aspirational? (and any acceptable "attendus" framing). "5 thèmes", "1 hackathon", "4 jours" are internally consistent — just confirm.
6. **Day-by-day program allocation** (the site itself carries the candid internal note that this is a proposal — confirm before finalizing; L3).
7. **Speakers, partners, sponsors**: none exist yet on the site — correct. Confirm any addition later with real names only.
8. **Contact details, socials, email, phone**: none exist anywhere in the repo — correct behavior; add only when supplied.
9. **Analytics/GSC ownership and tool choices** (M9).
10. **Domain policy**: canonical domain (`www.soli-ways.online` today), whether apex and any non-`www`/renamed domains redirect to the canonical host, and any new domain for future editions — see **§10 decision D1 plus live-redirect verification** (the bare domain currently serves identical content; whether that's a redirect cannot be verified with the tools used).

---

## 8. Event Editions and Archive — Recommended Architecture

Current architecture is a static flat site with edition facts embedded in one page's copy. The simplest maintainable evolution given this base:

**Recommended (minimal-change, low risk):**
1. **Keep `/` as the live current edition**, but before Phase 2 production starts, extract every edition-varying fact into one clearly-marked file (e.g., `frontend/data/edition-2027.json` or a consistently delimited content block). Even in a static setup, this makes future regen/translation trivial.
2. **Future editions** live at `/editions/<year>/` (real pages only, when they exist), while `/` always redirects or canonicalizes to the current edition — choose at the time editions are added, not now. Do **not** pre-create placeholder edition pages.
3. **Archive**: only when the owner provides **verified** past-edition material ( predecessors' facts, dates, reports), create `/editions/` index + per-edition archive pages, each with its own canonical URL and correct dates; keep them factually minimal (name, year, dates, one-line summary). Never invent previous editions — no archive pages now.

**Rejected option:** moving the current page to `/2027/` immediately. It costs domain SEO equity for zero present-day user value and complicates the fix set; revisit at edition #2.

**Dependencies:** owner decisions D1 (domain) and D2 (editions timeline) — see §10.

---

## 9. Recommended Automated and Manual Tests (Phase 2 artifacts)

### Automated (addable without a framework)
1. `npm run build:css` determinism test — rebuild must produce a byte-identical `app.css` (protects against un-committed/stale builds).
2. HTML validation (`html-validate` or W3C) on `index.html` + `404.html`; JSON parse/`schema.org` class validation of the JSON-LD block.
3. Asset-integrity test: every referenced `/assets/...` path exists in `frontend/`; every `#anchor` link target exists on the page (both currently passing — verified manually; automate to keep it true).
4. Brand integrity greps in CI: exactly one canonical domain string; zero "SOLIWAY " (no S) matches; zero `solicode.co` outside doc-exceptions (guards C2 regressions).
5. axe/pa11y/lighthouse (`lhci`) with budgets: a11y ≥ 95, perf budget on CSS ≤ 50 KB gzip, LCP ≈ < 2.0 s on Fast 3G mock — as targets to verify, **not** as pre-claimed results.
6. Alpine component tests or Playwright smoke: countdown tick, day-tab switching, FAQ accordion, modal open/close/Escape/backdrop, Enter submits email, 404 route served with branded page.
7. When the waitlist endpoint exists (C1): contract test for POST success/error paths + honeypot/spam-resistance verification.

### Manual checklist
- Keyboard-only full journey; NVDA/VoiceOver pass on modal, tabs, accordion, countdown.
- Device matrix: 320 / 375 / 430 / 768 / 1024 / 1280 / 1440+; iOS Safari + Android Chrome; hover-state degradation check on touch.
- Social-card previews: Facebook/LinkedIn/WhatsApp/iMessage/Slack after new OG image.
- Network-tab functional test of the notify modal (prove C1 behavior changed).
- Reduced-motion OS setting run-through.
- Cross-check every fact against §7 before each release (testable content checklist).
- 404 spot checks via conditionally configured custom responses on the live domain.

---

## 10. Decisions and Credentials Needed from the Project Owner

| # | Decision | Blocks | Notes |
|---|---|---|---|
| D1 | **Canonical domain** — confirm `https://www.soli-ways.online/`; confirm all other owned domains 301-redirect to it; check apex-domain redirect currently returns a redirect or a duplicate | SEO, sitemap, canonical, OG, JSON-LD, GSC | Bare domain currently serves identical content; verify redirect via HTTP headers (see caveats) |
| D2 | **Official brand + organizer identity** — final copy for event name and organizer name (and `organizer.url`) | C1..C3, JSON-LD | Highest-impact single decision |
| D3 | Registration status & platform — publish wording + URL or keep waitlist messaging; free/paid entry; whether to remove `offers` or populate correctly | C1, C3, JSON-LD, CTAs |
| D4 | **Notify/waitlist strategy**: real endpoint (provider/credential choice, service account/consent) vs. temporarily removing email capture | C1, tests, RGPD notice | Credentials only if a self-built endpoint is chosen |
| D5 | EN translation — timing, who translates/translates what final copy (ournée 2027 wording) | H2, hreflang, sitemap |
| D6 | Stats truth-set for hero (H4) and audience wording; program-day confirmation (L3) | Copy, JSON-LD |
| D7 | Venue: exact official name + street address for structured data (-throw in a visit-map link policy) | Event schema |
| D8 | Analytics/GSC: provider account, consent policy, GSC site-profile ownership | M9 |
| D9 | Kit privacy policy: confirm H1 move of ui-kit/product files out of the deploy path is acceptable (needed for the "kit workflow") | H1 |
| D10 | Contact details/social accounts "when available" (never invent) | Copy, footer, schema |
| D11 | LLMs.txt — approve addition after fact-fix (recommend yes; no SEO guarantee expressed) | AI-discoverability |

---

## 11. Prioritized Checklist for Phase 2 and Beyond

**P0 — correctness & trust (before any promo)**
1. Resolve D1–D4 (domain, identity, registration, waitlist).
2. Single status copy everywhere (6 surfaces) + honest modal behavior (C1/C3).
3. Reconcile brand/organizer across site, JSON-LD, ui-kit, docs (C2).
4. Fix or remove JSON-LD `offers` (price/validFrom) — no invented fields (C3).
5. Fix countdown offset `+01:00` (H6).
6. Move ui-kit/package files out of deploy path (H1) + `cleanUrls: true` (M3).

**P1 — SEO & social foundation**
7. OG/Twitter image 1200×630 + `width/height/alt` (H3).
8. sitemap.xml: correct `lastmod`, drop `/404.html`; GSC verification + submission (M2, M9).
9. EN page or bilingual switch — with hreflang/canonical pairs (H2, D5).
10. Consolidate hero stats (H4, D6).

**P2 — accessibility & structure**
11. Modal `role`/`aria-modal`/focus-trap/scroll-lock/live error; `<form>` wrapping (H5).
12. Tabs/accordion ARIA roles; load `@alpinejs/collapse` or drop `x-collapse` (H5).
13. `prefers-reduced-motion` pass (M7); scroll-listener hygiene (M12).
14. Primary-button contrast fix (6.1 table); footer contrast/copyright-year (M10).
15. Security headers in `vercel.json` (M5); self-host fonts + pinned Alpine with SRI, trim weights (M6).

**P3 — housekeeping & future-proofing**
16. Remove 8 unused logos + root duplicates (L1, L2); brand-guide asset management.
17. Refresh `soliway-web/` docs; fix `.vscode/tasks.json` path (M1).
18. Edition data isolation + architecture scaffold for `/editions/` (H7, §8).
19. Phase-2 test suite from §9; Lighthouse/axe CI.
20. `llms.txt`, `FAQPage`/`Organization`/`WebSite` schema — only after facts are locked (D11).

---

## 12. Caveats — What Was NOT Tested

- **No browser session was run**: no Lighthouse score claims, no CWV data, no mobile-device rendering screenshots; all responsive/a11y findings are code-review and exact-math based.
- **Live HTTP headers** (redirect status codes between apex ↔ `www`, HSTS/CSP presence, 404 page HTTP status + branded body on the live domain, `/ui-kit/` response headers): not capturable with the fetch methods used here. Explicitly flagged items H1 (verified via content fetch), M3 (verified by content fetch on both paths, redirect status unverified), M5 (unverified), and the 404 auto-serve behavior (Vercel KB-documented, live status unverified).
- The **`/index.html` duplicate URL** was verified to serve identical content (fetched live), but its HTTP status/redirect chain was not header-verified.
- **Countdown runtime behavior** was not observed ticking (static + live fetch both show the pre-JS `00` fallback state in markup); the timezone reasoning is spec-based plus local math; a runtime test is recommended.
- **`npm audit`, `npm run build:css`, or any install/build** were deliberately not run (audit-only rule). Dependency-health statements are from manifest review.
- Contrast values are **exact WCAG 2.x formula computations** from source hex values (with computed alpha compositing for translucent backgrounds) — mathematically exact, not device-measured; hover/gradient states were out of scope.
- The waitlist modal, day-tabs, accordion, and ui-kit controls were analyzed statically and not driven in a live browser — console-error claims are limited to "no static JS errors identified".
- **Google Search Console indexing status** for the domain is unknown (no access).

---

## 13. Verification Summary (what was actually checked live)

| Check | Result |
|---|---|
| `https://www.soli-ways.online/` reachable, content matches `frontend/index.html` | ✅ Verified 2026-10-26 |
| `https://soli-ways.online/` (bare apex) serves identical content | ✅ Verified (redirect status unverified) |
| `/index.html` serves identical content | ✅ Verified |
| `/en.html` | ❌ 404 (no EN version) — verified |
| `/ui-kit/index.html` publicly served (internal tooling exposed) | ✅ Verified |
| `/package.json` | ❌ 404 (filtered) — verified |
| `/robots.txt` content + disallow `/ui-kit/` | ✅ Verified (matches `frontend/robots.txt`) |
| `/sitemap.xml` content | ✅ Verified (matches `frontend/sitemap.xml`, incl. lastmod `2027-01-01` and `/404.html` entry) |
| Branded 404 auto-serve by Vercel for static output dir | ✅ Per Vercel KB (`vercel.com/guides/custom-404-page`); live status unverified |
| OG image dimensions (`logo-darkmode.png`) | ✅ Measured: 386×730 px, 79 KB |
| Unused logo assets | ✅ Verified via grep (8 of 11 PNGs unreferenced) |
| `x-collapse` used but Alpine collapse plugin missing | ✅ Verified repo-wide grep |
| One `<h1>` per page; all internal anchors resolve; no broken external links | ✅ Verified by full read of both pages |
| No secrets in repo | ✅ Verified by grep + file inventory |
| Reduced-motion support | ❌ Absent — verified by grep |
| White-on-primary contrast | ❌ 2.95:1 computed — fails AA |
| Footer fine-print contrast | ❌ 3.76:1 computed — fails AA |

**End of Phase 1 audit. No production files were modified; the only artifact created is this report at `AUDIT_REPORT.md` (which did not exist previously — verified before writing).**
