---
trigger: always_on
---

# Quality and Security Standards (all scopes)

## 1. Clean Code
- Small, named, single-purpose units. DRY: a pattern repeated 3 times becomes a component, partial, service or function.
- Names describe intent. Comments explain "why", not "what". No dead code, no leftover `console.log`/`dd()`/`println`.

## 2. Security
- Validate all input on the server, even if the frontend validates too. Escape output (Blade `{{ }}`, no `innerHTML` with user data; Alpine `x-text` over `x-html`).
- Never commit secrets, tokens or `.env`. Use `.env.example` / `local.properties` templates.
- Auth, CSRF/CORS, rate limiting and file upload checks as defined in the scope rules.
- HTTPS everywhere in production. No mixed content.

## 3. Definition of Done (check before every checkpoint)
- It runs. The relevant tests exist and were executed, with real results reported.
- Contract respected (no undocumented endpoint or field).
- Accessibility, SEO (web) and responsive checks done for UI work.
- Files documented: manifest, README or spec updated.

## 4. Reporting
At each checkpoint, give a short report: what was built, what was verified (and how), what was not verified, and the next phase awaiting GO.
