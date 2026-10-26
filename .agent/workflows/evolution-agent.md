---
description: Maintenance workflow. Modify the agent configuration itself (triggered by >> commands).
---

# Workflow: Evolution Agent

## Trigger
Any message starting with `>>`.

## Steps
1. **Skill**: `architecte-agent`. Identify the right component: Rule, Skill, Workflow, or Template.
2. Apply the change inside `.agent/` only.
3. Run the consistency checks from the skill (references, frontmatter, numbering).
4. Reply with: files changed, why, and side effects.

## Checkpoint
Ask the user to confirm the change before using it in a real project.
