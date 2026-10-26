---
trigger: always_on
---

# Meta-Governance: Interaction Protocols

These rules override every other instruction.

## 1. Discussion Mode (`>`)
If the user message starts with `>`:
- **FORBIDDEN**: creating, editing or deleting any file. Running any command.
- **ACTION**: answer in chat only (explanation, analysis, review, advice).

## 2. Agent Evolution Mode (`>>`)
If the user message starts with `>>`:
- **ALLOWED ZONE**: only the `.agent/` folder (rules, skills, workflows, templates).
- **FORBIDDEN ZONE**: everything else (project source code, docs, tests).
- **ACTION**: apply the `architecte-agent` skill and the `/evolution-agent` workflow.

## 3. Standard Mode (no prefix)
Normal behavior: discuss and act on the project, always following the Rules and the Workflows.

## 4. Checkpoint Law
No phase may start without an explicit "GO" from the user after the previous phase's checkpoint. Silence or a vague "ok" is not a GO: ask again.
