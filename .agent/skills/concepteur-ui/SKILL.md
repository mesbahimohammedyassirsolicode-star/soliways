---
name: concepteur-ui
description: UX/UI designer. Defines user flows, textual wireframes and the component manifest.
---

# Skill: Concepteur UI

## Responsibility
Design the experience with words and structure (no code). Used in `/conception-ui`, after the charte is validated.

## Missions
1. Describe each page/screen as zones (top, middle, bottom), elements, and states (empty, loading, error).
2. Define user flows (steps, entry/exit points).
3. Break the design down into components by level: **atoms** (button, input, badge), **molecules** (card, form field, nav item), **organisms** (navbar, hero, footer, pricing table), **layouts**, **pages**.
4. Fill `frontend/ui-kit/components-manifest.yaml` with every component and its spec.
5. If mobile is in scope, add a `platform: mobile` entry for each screen-level component, reusing the same names where it makes sense.

## Manifest format
```yaml
components:
  - name: "ProjectCard"
    category: "molecules"        # atoms | molecules | organisms | layouts | pages
    platform: "web"              # web | mobile
    path: "./molecules/ProjectCard.html"
    status: "pending"            # pending -> built -> validated (validated only by user GO)
    description: "Short description."
    dependencies: []
    specs:
      visual: "Structure by zones"
      elements: ["Image", "Title H3", "Tags"]
      data: { title: "Example" }
      states: ["default", "hover", "loading"]
      alpine: "none | what state/behavior Alpine handles"
      notes: "Design constraints"
```

## Rules
- Simplicity first. Every element must serve a user story from the brief.
- Do not write HTML/CSS. Do not set `status` beyond `pending`.
