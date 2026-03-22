---
title: "Artifact Builder — Concept Session"
date: "2026-03-10"
category: session
project: artifacts
trust: active
review-by: "2026-06-10"
tags: ["artifact-builder", "claude", "workflow", "session-archive"]
---

# Artifact Builder — Concept Session
*March 2026 · Two Birds*

## Session Purpose

Working session to design the Artifact Builder workflow — a system for converting raw Claude conversation outputs into structured, vaulted documents with consistent frontmatter and trust decay tracking.

---

## Problem Statement

Long Claude conversations produce valuable outputs (strategies, decisions, frameworks, code plans) that get lost when the context window fills or the browser session closes. No system exists to:
1. Capture the output in a structured way
2. Tag it with project context and trust metadata
3. Route it to the correct vault category
4. Make it searchable alongside other artifacts

---

## The Option B Trigger System

**Decided:** Add "Archive This Session" as a User Preference trigger phrase across all Claude projects.

When a user types "Archive This Session" at the end of a conversation, Claude produces a structured artifact with:

```markdown
---
title: "[Descriptive title derived from session content]"
date: "[today's date]"
category: [session|strategy|research|decision]
project: [project-id]
trust: active
review-by: "[date 90 days from today]"
tags: [3–5 relevant tags]
---

# [Title]
*[Date] · Two Birds*

## Summary
[2–3 sentence overview]

## Key Decisions
[Bulleted list of decisions made]

## Key Outputs
[Bulleted list of documents, code, or frameworks produced]

## Open Questions
[Anything unresolved at session end]

## Next Steps
[Concrete next actions]
```

This is a session preference, not a technical dependency. It works in any Claude project without code changes.

---

## Vault Routing Logic (Draft)

| Content Type | Vault Category | Review Cadence |
|---|---|---|
| Strategic analysis | strategy | 6 months |
| Claude session output | session | 3 months |
| Market/competitive research | research | 3 months |
| Architecture decision | decision | never (permanent) |
| Sprint output | session | 3 months |

---

## Future Tool Concept

A lightweight CLI or browser extension that:
1. Accepts pasted Claude output
2. Auto-detects category from content
3. Adds frontmatter (prompts for missing fields)
4. Writes to correct `/vault/[category]/` directory
5. Updates `vault-index.json`
6. Offers git commit with standard message

**Status:** Deferred. Manual workflow (paste + write) is sufficient until volume exceeds ~5 artifacts/week.

---

## Open Questions

- Should session artifacts be split by project or kept in one `/sessions/` directory?
  - Current answer: one directory, differentiated by `project:` frontmatter field
- How granular should trust decay be for sessions vs. permanent decisions?
  - Current answer: sessions decay at 90 days, decisions never decay

---

## Next Steps

- [ ] Activate Option B trigger across all active Claude projects (done 2026-03-10)
- [ ] Test workflow with first real session output
- [ ] After 10 artifacts, review routing logic and frontmatter schema for gaps
