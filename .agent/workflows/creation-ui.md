---
description: Sub-workflow of Phase 3. Build standalone previewable components in the ui-kit.
---

# Workflow: Creation UI

## Prerequisite
Validated wireframes and manifest.

## Steps
1. **Layouts**: base page layouts (header, footer, empty content slot).
2. **Components**: atoms, then molecules, then organisms, each as a standalone preview file. Use realistic mock data. Include Alpine behavior where specified.
3. **Gallery**: update `frontend/ui-kit/index.html` with every new component.
4. **Manifest**: set the new components to `built`.

## Checkpoint
Ask for a visual design review through the gallery. Per component the user answers GO or change requests. Only after GO does the manifest status become `validated`.
