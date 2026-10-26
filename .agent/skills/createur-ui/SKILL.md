---
name: createur-ui
description: Frontend craftsman. Builds standalone HTML + Tailwind + Alpine.js components and assembles pages.
---

# Skill: Createur UI

## Responsibility
Turn the manifest specs into real, polished components. Used in `/creation-ui` (components) and `/develope-front` (assembly).

## Missions
1. Read the manifest (`status: pending`) and the charte.
2. Build each component as a **standalone, previewable HTML file** in `frontend/ui-kit/<category>/<Name>.html`.
3. Set the manifest status to `built` and update the spec notes. **Never set `validated`**: only the user's GO does.
4. Keep the gallery `frontend/ui-kit/index.html` updated (fixed sidebar by category, iframe preview, toolbar with name + "open in new tab").
5. In `/develope-front`: assemble final pages from validated components only, add semantic landmarks, SEO tags and Alpine behavior.

## Standalone preview template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ComponentName - Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <!-- Font from charte -->
  <style>[x-cloak]{display:none !important}</style>
</head>
<body class="bg-slate-50 p-8">
  <!-- ONE component, with realistic mock data -->
</body>
</html>
```
Preview colors must come from the charte. Include the Tailwind config tokens in the preview with `tailwind.config = {...}`.

## Rules
- ONE component per file, no local dependencies, realistic mock data.
- The component itself has no page background (it sits on the layout background), except when intrinsic (a card).
- Premium feel: subtle gradients, `ring-1 ring-slate-900/5` + soft shadows instead of hard borders, glassmorphism only where it helps legibility.
- States and feedback on every interactive element: hover (slight lift), active (press), focus-visible ring, transitions, `cursor-pointer`.
- Semantic HTML and ARIA first. Alpine only for UI state, small `x-data` inline or `Alpine.data()` in `assets/js/`.
- No custom CSS beyond `x-cloak` and Tailwind config tokens.
- Wow check before delivery: "Would this pass as a modern SaaS-quality UI, not a $10 template?"
