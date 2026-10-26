---
trigger: glob
globs: "**/mobile/**"
---

# Mobile Standards: Kotlin (Android)

## 1. Stack
Kotlin, Jetpack Compose (Material 3), Coroutines + Flow, Hilt for DI, Retrofit + OkHttp + kotlinx.serialization (or Ktor client), Navigation Compose. Room only if offline storage is in the brief.

## 2. Architecture
- MVVM with a simple layering: `ui/` (screens, components, theme), `domain/` (models, use cases if needed), `data/` (API, repository, local).
- One `ViewModel` per screen exposing a single immutable `UiState` (sealed: Loading, Success, Error, Empty) through `StateFlow`. No logic in composables.
- DTOs (API shape) are mapped to domain models. Never expose DTOs to the UI.

## 3. UI-First on mobile
- Theme (`Color.kt`, `Type.kt`, `Shape.kt`) is generated from `charte.md` tokens so web and mobile share one identity.
- Reusable composables live in `ui/components/` with `@Preview` (light + dark). Screens only assemble validated components.

## 4. API connection
- Retrofit interfaces mirror `contracts/openapi.yaml`. Base URL comes from `BuildConfig` (debug: `http://10.0.2.2:8000/api/v1/` for the emulator; release: HTTPS only).
- Cleartext HTTP allowed in the debug build only (network security config).
- Auth token stored in encrypted storage (DataStore + Keystore-backed encryption). Never in plain SharedPreferences, never in logs.
- Every call handles network failure, timeout, 401 (logout/refresh), and empty results.

## 5. Quality
- Touch targets at least 48dp, content descriptions on icons/images, support dark theme and font scaling.
- Unit tests for ViewModels and repositories. Run them before claiming the module is done.
- No hardcoded strings: use `strings.xml`.
