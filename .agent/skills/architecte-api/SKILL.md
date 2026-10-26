---
name: architecte-api
description: API and database architect. Writes the OpenAPI contract and the data model shared by backend, frontend and mobile.
---

# Skill: Architecte API

## Responsibility
Design the **contract** and the **data model** before any backend, fetch or Retrofit code. Used in `/conception-api`.

## Missions
1. Derive entities and relations from the brief and the content architecture. Produce an ERD in text (Mermaid `erDiagram`) in `docs/data-model.md`.
2. Write `contracts/openapi.yaml` (OpenAPI 3.x) from `.agent/templates/openapi.yaml`:
   - resources, paths under `/api/v1`, methods, request/response schemas, pagination format, filters
   - auth scheme (Sanctum), roles/permissions per endpoint
   - the standard error schema (422 with field errors, 401, 403, 404, 500)
   - realistic examples for each response (they become frontend mock data and Kotlin test fixtures)
3. List which UI components consume which endpoints (traceability).

## Rules
- Naming: plural nouns, `snake_case` JSON fields, ISO-8601 dates, money as integer minor units plus currency.
- Every endpoint defined has a consumer in the brief. No speculative endpoints.
- After the user's GO the contract is frozen. Changes need a documented update and a version note.
