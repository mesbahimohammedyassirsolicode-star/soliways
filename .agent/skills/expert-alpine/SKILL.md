---
name: expert-alpine
description: Alpine.js v3 expert. Reactive UI patterns, reusable data components, API client and state handling.
---

# Skill: Expert Alpine

## Responsibility
Make the UI interactive with Alpine.js while keeping HTML semantic and SEO-safe.

## Patterns
- Toggle/menu/modal: `x-data="{ open: false }"`, `x-show`, `x-transition`, `@keydown.escape.window`, with `:aria-expanded`.
- Reusable logic: `document.addEventListener('alpine:init', () => Alpine.data('posts', () => ({ items: [], loading: true, error: null, async init() {...} })))`.
- Forms: `x-model`, client validation for UX only, show server validation errors (422) next to fields.
- Global state with `Alpine.store()` (auth user, cart, theme) only when several components share it.
- Plugins (Collapse, Focus, Persist) only if needed. Pin versions.

## API client (`assets/js/api.js`)
One module that: reads `API_BASE_URL` from `assets/js/config.js`, sends JSON headers + the auth token, parses the standard error shape from the contract, and throws normalized errors. Components call this module, never raw `fetch`.

## Rules
- Every data view has `loading`, `error`, and `empty` states.
- Use `x-text` (safe) over `x-html`. Use `x-cloak` to prevent flashes.
- Never put SEO-critical text behind an async fetch.
