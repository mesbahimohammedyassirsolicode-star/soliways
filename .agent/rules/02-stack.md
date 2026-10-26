---
trigger: always_on
---

# Technical Stack

| Layer | Default stack |
| --- | --- |
| Frontend | Semantic HTML5, Tailwind CSS v3, Alpine.js v3, Vanilla JS (ES6+ modules) |
| Backend | PHP 8.x OOP with **Laravel** (current stable release) |
| Database | SQL (MySQL/MariaDB by default; SQLite for tests) |
| Mobile | **Kotlin** (Android) with Jetpack Compose |
| Library | Framework-agnostic native PHP package (Composer) |

## Rules
- **Frameworks**: React, Vue, Angular are FORBIDDEN unless the project already uses them or the user explicitly asks.
- **Native PHP instead of Laravel** only if the user says so. Then follow the principles of `05-backend-laravel.md` (OOP, PSR-4, PDO prepared statements, front controller, no procedural scripts).
- **Tailwind**: CDN is allowed for ui-kit previews only. The delivered frontend MUST use a compiled CSS file (Tailwind CLI), not the CDN.
- **Alpine.js**: load via CDN with `defer`, pinned to a major version. It handles UI state only. Business logic lives in the backend.
- **Dependencies**: prefer the standard library and framework features before adding a package. Justify every new dependency in one sentence.
- Never invent package names or versions. If unsure, say so and check the official docs.
