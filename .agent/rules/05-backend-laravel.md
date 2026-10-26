---
trigger: glob
globs: "**/backend/**"
---

# Backend Standards: Laravel / PHP OOP

## 1. Architecture
- Default: **API-only Laravel** under `/api/v1`, returning JSON that matches `contracts/openapi.yaml` exactly.
- Layers: `Route -> FormRequest (validation) -> Controller (thin) -> Service/Action (logic) -> Model/Repository -> API Resource (output)`.
- Controllers hold no business logic. Authorization goes through Policies/Gates.
- PHP: `declare(strict_types=1);`, typed properties, return types, PSR-12, PSR-4 autoloading.

## 2. Data
- Every table comes from a **migration**. Provide **factories** and **seeders** with realistic demo data.
- Foreign keys, indexes on searched columns, `SoftDeletes` only when the brief needs it.
- Eloquent relationships with eager loading (`with()`) to avoid N+1. Always paginate list endpoints.
- Never build SQL by concatenating user input.

## 3. API behavior
- Consistent error shape (validation 422, auth 401/403, not found 404, server 500), identical to the contract.
- Authentication: Laravel **Sanctum** (token for mobile, cookie/token for web, as decided in the contract).
- **CORS** configured for the frontend origin(s) only. Rate limiting on auth and write endpoints.
- Version the API (`/v1`). No breaking change without a contract update.

## 4. Config and Security
- Secrets only in `.env`; provide `.env.example`. Never commit `.env`.
- Mass-assignment protection (`$fillable`), hashed passwords, validated file uploads (type + size), no debug mode in production.

## 5. Tests
- At least one feature test per endpoint (happy path + validation failure + unauthorized). Pest or PHPUnit.
- Run the tests before claiming the backend is done. Report the real result.

## 6. Native PHP variant (only if requested)
OOP classes, PSR-4 via Composer, PDO prepared statements, one front controller with a router, `.env` loading, same JSON contract and error shape.
