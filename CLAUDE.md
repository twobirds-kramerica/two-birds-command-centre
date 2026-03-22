# CLAUDE.md — Two Birds Command Centre

## Project Identity
- Owner: Aaron (Two Birds)
- Project: Superman Table — Command Centre
- Purpose: Mission control dashboard across all Two Birds projects
- Stack: Static HTML/CSS/JS only. No frameworks, no backend, no build tools.
- Deployment: GitHub Pages (main branch, root)

## Role
Act as a Staff Engineer. Prioritise root-cause solutions over quick fixes.
Before any change, ask: "Is this the cleanest, most defensible solution?"

## Mandatory Workflow
1. Review `git log --oneline -10` before coding
2. Create or update `todo.md` with numbered tasks before multi-step work
3. Commit after each logical phase with clear messages
4. End sessions with a BUILD COMPLETE summary block

## Hard Constraints
- STATIC ONLY: No Node.js servers, npm build steps, backend APIs, or server-side logic
- All data lives in /data/*.json and /vault/**/*.md — no external databases
- Fuse.js and Marked.js loaded from CDN only (no npm)
- Dark mode is the DEFAULT — this is a personal operations tool, not a user-facing product
- Do NOT modify any other repos from within this repo

## Quality Gates (before every commit)
- [ ] No console errors introduced
- [ ] Mobile responsive (Aaron works heavily on mobile)
- [ ] Canadian English in all visible text
- [ ] Scoped strictly to what was asked — no scope creep
- [ ] JSON files remain valid (no trailing commas)
- [ ] .md files have correct frontmatter

## Data Conventions
- projects.json: master index of all projects and epics
- sprints.json: sprint history log
- vault-index.json: metadata manifest for all vault files
- Trust decay: review-by dates stored as "YYYY-MM-DD" strings in .md frontmatter

## .md Frontmatter Standard
Every vault file must start with:
```
---
title: "..."
date: "YYYY-MM-DD"
category: strategy | session | research | decision
project: project-id or "global"
trust: green | yellow | red | permanent
review-by: "YYYY-MM-DD" or "never"
tags: [tag1, tag2]
---
```

## Commit Message Format
```
git commit -m "$(cat <<'EOF'
type: short description

Longer detail if needed.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

## Session Lessons
- (Log errors, gotchas, and prevention strategies here as they occur)
