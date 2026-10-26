# PHASE_2A REPORT

## Summary
Phase 2A (correctness, trust & technical fixes) applied to the SOLIWAYS site.

## Changes

### 2A.1 Brand / organizer
- index.html: Updated about/equipe/team text to use SOLIWAYS as organizer (kept SOLICODE as venue/location only). Updated footer and "Organisation" to SOLIWAYS. Updated nav/footer links.
- 404.html: Footer updated to "Organisé par SOLIWAYS".
- ui-kit references preserved as sources (not deleted); /ui-kit/ remains disallowed in robots.txt.

### 2A.2 Remove email modal / false flow
- Removed notification modal markup and all modal triggers.
- index.html: Hero/registration CTAs now link to #inscriptions. Modal section replaced with removed marker. FAQ updated to remove alert/notification promise.
- app.js: Removed Alpine.data('notificationModal') component.
- All email collection/UI removed.

### 2A.3 Clean Event JSON-LD
- index.html: JSON-LD cleaned - removed price, PreOrder, validFrom, unsupported offer fields. Organizer set to "SOLIWAYS" with canonical URL. Kept only verified fields (dates, location SOLICODE Tanger, status/mode).

### 2A.4 Countdown (Morocco UTC+1)
- app.js: Target changed to 2027-04-13T00:00:00+01:00 (Date.parse), guards added for invalid/expired, stops on expiry.
- index.html: Countdown unchanged in structure.

### 2A.5 UI kit exclusion
- robots.txt already disallows /ui-kit/ (kept). frontend/ui-kit/ sources not deleted. Verce.json unchanged.

### 2A.6 Canonical/URLs
- Canonical and og:url/twitter set to https://www.soli-ways.online/. sitemap.xml normalized to www.soli-ways.online (fixed double www). robots.txt points to www sitemap.

## Build
- Tailwind rebuilt in frontend/ (node ./node_modules/tailwindcss/lib/cli.js).

## Notes
- No new deps added. No commits/pushes/deploys. No English/i18n/blog/editions/contact added.
- No internal UI kit files deleted.
