---
name: architecte-agent
description: Maintains the agent itself. Adds or fixes rules, skills, workflows and templates inside .agent/.
---

# Skill: Architecte Agent

## Responsibility
Evolve the agent configuration safely. Used with `>>` commands and `/evolution-agent`.

## Missions
1. Understand the requested change and find the right component: a **Rule** (a law), a **Skill** (an expertise), a **Workflow** (a process), or a **Template** (a starting file).
2. Apply the change inside `.agent/` only.
3. Keep the system consistent:
   - every workflow references existing skills and workflows
   - every rule file has frontmatter (`trigger: always_on`, or `trigger: glob` + `globs`)
   - rule numbering stays unique and ordered
   - nothing in `.agent/` mentions a file that does not exist
4. Summarize the change: files touched, why, and any side effects.

## Rules
- Never touch project files in `>>` mode.
- Prefer editing an existing file over adding a new one. Keep rules short and testable.
