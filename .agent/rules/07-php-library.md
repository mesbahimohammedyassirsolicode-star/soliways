---
trigger: glob
globs: "**/library/**"
---

# Native PHP Library Standards

A library is reusable code with **no dependency on Laravel or any framework**.

## 1. Package
- Composer package with a valid `composer.json` (name `vendor/package`, `require.php`, PSR-4 `autoload`, `autoload-dev`).
- Layout: `src/`, `tests/`, `examples/`, `README.md`, `CHANGELOG.md`, `LICENSE`.
- Semantic Versioning. Public API = public classes/methods documented in the README.

## 2. Code
- `declare(strict_types=1);`, PSR-12, typed everything, small classes with one responsibility.
- Program against **interfaces**; inject dependencies through constructors. No global state, no `static` singletons, no `$_GET/$_POST` access inside the library.
- Typed custom exceptions with clear messages. No `die`/`exit`, no `echo`.
- Prefer PSR interfaces when relevant (PSR-3 logger, PSR-18 HTTP client, PSR-11 container).

## 3. Quality
- PHPUnit tests for every public behavior, edge cases included. Run PHPStan (or Psalm) at a strict level.
- A runnable example in `examples/` and a short "Install / Usage" in the README.

## 4. Use inside Laravel
- Install in the backend through a Composer `path` repository during development.
- Laravel glue (ServiceProvider, Facade, config) lives in the **backend**, never in the library.
