# Two Birds — Superman Table Command Centre

Mission control dashboard across all Two Birds projects.

## What This Is
A self-hosted, single-page command centre. No AI platform dependency.
All data stored as Markdown and JSON in Git. Hosted on GitHub Pages.

## Pages
| Page | Purpose |
|---|---|
| `index.html` | Main dashboard — projects, epics, search, status |
| `vault.html` | Browsable artifact vault with trust decay badges |
| `inbox.html` | Raw dump viewer for unprocessed LLM exports |
| `decisions.html` | Decision log — searchable, exportable |

## Data Layer
| File | Contents |
|---|---|
| `data/projects.json` | Master index of all projects and epics |
| `data/sprints.json` | Sprint history log |
| `data/vault-index.json` | Metadata manifest for all vault files |

## Vault Structure
```
vault/
  strategy/    — Strategy docs, analyses, plans
  sessions/    — Session artifacts and key outputs
  research/    — Competitive research, market data
  decisions/   — Decision log entries
```

## Adding to the Vault
1. Create a `.md` file in the appropriate `vault/` subfolder
2. Add the required frontmatter (see CLAUDE.md for schema)
3. Add an entry to `data/vault-index.json`
4. Commit

## Trust Decay
Every vault file has a `review-by` date. The dashboard automatically flags:
- 🟢 Green — current, within review window
- 🟡 Yellow — review due within 30 days
- 🔴 Red — past review date, verify before using
- 🔵 Permanent — product ideas and decisions that never decay

## Stack
- HTML / CSS / JS — static only
- [Fuse.js](https://fusejs.io/) — fuzzy search (CDN)
- [Marked.js](https://marked.js.org/) — Markdown rendering (CDN)
- GitHub Pages — deployment

## Local Development
Open any `.html` file directly in a browser, or use a simple server:
```bash
python -m http.server 8080
```

---
*Built by Two Birds · Ontario, Canada · 2026*
