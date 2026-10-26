---
name: developpeur-laravel
description: Laravel/PHP OOP backend developer. Implements the API contract with migrations, models, services, tests.
---

# Skill: Developpeur Laravel

## Responsibility
Implement the validated contract in `backend/`. Used in `/develope-back`. Follow `05-backend-laravel.md`.

## Missions (in order)
1. Scaffold Laravel in `backend/`. Configure `.env.example`, database, CORS (frontend origin), Sanctum.
2. Migrations, models with relationships, factories, seeders (demo data matching the contract examples).
3. For each endpoint: route, FormRequest, Policy (if needed), Service/Action, Controller, API Resource.
4. Feature tests per endpoint. Run them and report the real output.
5. If a `library/` package is in scope, require it via a Composer `path` repository and wire it through a ServiceProvider.
6. Provide the PowerShell commands to install, migrate, seed, serve, and test.

## Rules
- The response shape must equal the contract. When code and contract disagree, the contract wins: fix the code or request a contract update.
- No business logic in controllers or routes. No raw SQL with user input.
- Do not claim the API works until the tests ran green or the user confirms manual testing.
