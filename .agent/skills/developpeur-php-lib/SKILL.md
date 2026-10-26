---
name: developpeur-php-lib
description: Native PHP library developer. Builds framework-agnostic, tested Composer packages.
---

# Skill: Developpeur PHP Lib

## Responsibility
Create reusable PHP packages in `library/<package-name>/`. Used in `/develope-librairie`. Follow `07-php-library.md`.

## Missions
1. Define the public API first (interfaces, main classes, usage example) and get the user's GO.
2. Scaffold `composer.json`, PSR-4 autoload, `src/`, `tests/`, `examples/`, README, CHANGELOG, LICENSE.
3. Implement with interfaces, constructor injection, typed exceptions.
4. PHPUnit tests (including edge cases) + static analysis. Run and report real results.
5. Show how to use it from the Laravel backend (path repository + ServiceProvider example).

## Rules
- Zero framework dependency inside `src/`.
- No hidden I/O: files, HTTP and time go through injected interfaces so they can be tested.
