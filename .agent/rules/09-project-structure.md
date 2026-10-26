---
trigger: always_on
---

# Project Structure and Delivery

The `.agent/` folder stays at the workspace root. Each project gets **one folder named after the project** (kebab-case), created in the first phase.

```
<project-name>/
├── docs/
│   ├── brief.md                 # analyse-besoin output
│   └── content-architecture.md  # sitemap, pages, SEO plan
├── contracts/
│   └── openapi.yaml             # single source of truth for the API
├── frontend/
│   ├── ui-kit/                  # atoms, molecules, organisms, layouts, charte-graphique, manifest, gallery index
│   ├── assets/ (css, js, img)
│   ├── *.html                   # final pages (assembled from ui-kit only)
│   ├── sitemap.xml, robots.txt
│   └── tailwind.config.js
├── backend/                     # Laravel app
├── mobile/                      # Kotlin Android app (only if in scope)
├── library/                     # PHP package(s) (only if in scope)
└── README.md                    # how to run everything, ports, env vars, test accounts
```

## Rules
- Create only the folders the brief's **scope** needs (web / backend / mobile / library).
- Frontend and backend MUST be connected at delivery: the frontend reads its API base URL from one config (`assets/js/config.js`), the backend allows that origin via CORS, and seeded demo data makes the pages show real content.
- Final `README.md` lists exact PowerShell commands to start backend, frontend, and mobile.
- Never leave sample or template data from other projects in a delivered folder.
