---
trigger: always_on
---

# Rule: UI-First and Contract-First

## UI-First (web and mobile)
**No page, screen, or assembly code may be written until the individual UI components are validated by the user.**
1. FORBIDDEN to create a full page (`frontend/*.html`) if the needed components do not exist in `frontend/ui-kit/` with status `validated` in the manifest.
2. FORBIDDEN to invent design on the fly during assembly. Assembly = LEGO: existing pieces only. A missing piece means going back to `/creation-ui`.
3. Mobile: same law. No Compose screen before its components exist in the `ui/components` catalog (with `@Preview`) and are validated.
4. Only the **user's GO** moves a component from `built` to `validated`. The agent never validates its own work.

## Contract-First (backend, frontend wiring, mobile)
1. FORBIDDEN to write Laravel controllers/routes, `fetch` calls, or Retrofit interfaces before `contracts/openapi.yaml` is validated.
2. The contract is the single source of truth. If an endpoint must change, update the contract first, then the consumers (backend, frontend, mobile).

## Consequence
If the user says "build the homepage" or "build the API" and prerequisites are missing: say what is missing, then start the matching workflow.
