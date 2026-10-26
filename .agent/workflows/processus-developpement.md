---
description: MASTER workflow. Orchestrates a full-stack project from idea to delivery with mandatory checkpoints.
---

# Workflow: Processus de Developpement (Master)

## Trigger
"Build me a site/app/API...", "Start a new project", "Add a feature to <project>".

## Law
Phases run in order. After each phase: short report, then **STOP and wait for an explicit GO**. Optional phases depend on the `scope` in the brief.

| Phase | Workflow | Skill(s) | Condition |
| --- | --- | --- | --- |
| 1 | `/analyse-besoin` | analyste-besoin | always |
| 2 | `/architecture-contenu` | architecte-contenu, expert-seo | web in scope |
| 3 | `/designe-ui` (charte -> conception -> creation) | graphiste-charte, concepteur-ui, createur-ui | web or mobile in scope |
| 4 | `/conception-api` | architecte-api | backend, or any dynamic data |
| 5 | `/develope-back` | developpeur-laravel | backend in scope |
| 6 | `/develope-front` | createur-ui, expert-alpine, expert-tailwind | web in scope |
| 7 | `/develope-mobile` | developpeur-kotlin | mobile in scope |
| 8 | `/develope-librairie` | developpeur-php-lib | library in scope (can run earlier if the backend needs it) |
| 9 | `/integration-livraison` | integrateur, expert-seo | always |

## Notes
- Phases already completed and validated are skipped when adding a feature to an existing project. Only re-run the impacted phases (a new endpoint means updating the contract first).
- Phases 5, 6, 7 may run in any order once phases 3 and 4 are validated. Default order: back, front, mobile.
- Print the phase map with progress (done / current / next) at the start of each reply's report.
