# Two Birds Command Centre — HAL Stack Rigor Audit

> **⚠ PROGRESS UPDATE 2026-04-22** — **ALL 5** §8 Top-5 next-actions have SHIPPED. Do NOT treat §8 as an open backlog; re-audit fresh before proposing further TBCC work.
>
> | # | Action | Status |
> |---|---|---|
> | 1 | Review first axe-core CI run output | **Covered** — done within S-TBC-HYGIENE sprint (`20a166d`) |
> | 2 | Explicit `:focus-visible` styling | **Shipped** in `22781c5` (dark-theme keyboard a11y across interactive elements) |
> | 3 | Self-host Fuse.js | **Shipped** in `acc957c` (dropped jsdelivr CDN, matches other repos' sovereignty pattern) |
> | 4 | JSON schema check workflow for `data/*.json` | **Shipped** in `22781c5` (same commit as #2; all 4 data files validate clean) |
> | 5 | Per-page `<meta name="description">` | **Shipped** in `fe605d8` feat(seo) — distinct description on all 10 TBCC pages (initial S-042 header wrongly listed this as open; corrected 2026-04-22 S-043) |



**Audit date:** 2026-04-21
**Auditor:** Claude Code (Opus 4.7 · max-mode autonomous)
**Sprint:** S-TBC-HYGIENE (seventh audit-pattern pass of the day; last substantial untouched repo in the Two Birds portfolio)
**Repo state at audit:** `two-birds-command-centre` main (pre-sprint @ `810b054`); one multi-page fix commit shipped during this sprint.

---

## What this is

Internal-only multi-page operations dashboard for Two Birds Innovation. `noindex, nofollow` across every page. 10 HTML pages sharing a common header + nav + `css/main.css`:

| Page | LoC | Purpose |
|---|---|---|
| `index.html` | 93 | Project dashboard (all epics, status, search, filters) |
| `executive.html` | 589 | Executive summary — 3-level view, product scores, revenue bridge, human actions |
| `decisions.html` | 315 | Decision log (paired with portfolio/hal-stack/governance/ commit convention) |
| `human-sprint.html` | 410 | Standalone activity tracker with localStorage persistence |
| `inbox.html` | 196 | Simple inbox of triage items |
| `journey-timeline.html` | 483 | Founder journey timeline |
| `language-bank.html` | 499 | Lexicon + language patterns library |
| `prompt-library.html` | 587 | Reusable prompt collection |
| `sovereignty-dashboard.html` | 422 | Float-Free Index across 6 categories |
| `vault.html` | 192 | Private notes vault |

Shared `css/main.css`, 3 JS files (`dashboard.js`, `decay.js`, `search.js`), `data/` directory with JSON. Static; no backend.

---

## TL;DR — shipped this sprint

| Fix | Scope | Why |
|---|---|---|
| Skip-link injected as first focusable on **all 10 pages** | WCAG 2.4.1 | Was missing across every page |
| `<main id="main">` landmark wrapping post-header content on **all 10 pages** | WCAG 1.3.1 | Same |
| `.skip-link` CSS added to `css/main.css` (accent-blue on navy dark theme) | Shared style | Consistent first-focusable affordance |
| New `.github/workflows/axe-core.yml` scanning **all 10 pages** | CI | Every-push a11y scan |
| New `_build/apply-a11y-baseline.py` — idempotent injector | Re-runnable tooling | Same pattern as DCC's S-030 injector; safe for future page additions |

---

## 1. Accessibility

### Strengths (pre-existing)
- Every page already has `lang="en-CA"` (Canadian English) ✓
- Every page has `<meta name="robots" content="noindex, nofollow">` ✓
- Shared `<nav class="site-nav" aria-label="Pages">` with explicit ARIA label
- Search inputs have `aria-label` ("Search projects")
- Filter button groups have `role="group"` + `aria-label`
- Live regions present (`aria-live="polite"` on project grid)
- Stats bar has `aria-label="Summary stats"`

### Shipped this sprint
- Skip-link + `<main>` landmark added to all 10 pages via the idempotent injector (`_build/apply-a11y-baseline.py`). Future pages will need the same patch — re-running the injector handles them.

### Backlog
- **Dark-theme contrast** — the GitHub-inspired `#0d1117` + `#58a6ff` palette should pass AA for body text, but muted tokens (`--text-1: #8b949e`, `--text-2: #6e7681`) against the darkest backgrounds need axe-core verification. First CI run will report.
- **Focus-visible** — dark themes tend to lose default browser focus rings. Worth explicit `:focus-visible` styling on nav-links, filter buttons, search input. Small CSS addition.
- **Keyboard-only nav walkthrough** — manual test recommended: tab through dashboard → filters → project card. Every interactive should be reachable and visibly focused.

---

## 2. Performance

- Static HTML, single shared CSS, 3 JS files, 10 pages. Bundle size small.
- **External CDN**: `https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/...` loads on `index.html` for fuzzy search. Fuse.js is ~6 KB gzipped; cheap to self-host if sovereignty matters.
- JSON data files in `data/` are fetched at runtime. Fine at current scale.

### Backlog
- **Self-host Fuse.js** — same sovereignty pattern as the other hygiene sprints. ~15 min. Low priority on an internal tool.

---

## 3. Sovereignty

| Dep | Status |
|---|---|
| GitHub Pages | L1 swappable |
| System fonts (no external) | L4 ✓ |
| Fuse.js via jsDelivr CDN | L1; trivially self-hostable |
| GitHub API (if any at runtime) | checked `js/*.js` — dashboard reads local `data/*.json`, no runtime API |

**Verdict**: near L3/L4 already. Self-hosting Fuse.js would close the last external dep.

---

## 4. Security & privacy

- Every page is `noindex, nofollow`. Google won't index; link-preview generation is explicitly discouraged.
- `.env` gitignored.
- No PIN gate (unlike quality-dashboard). Access control assumes "unlisted URL" is sufficient — which is OK for a noindex'd internal tool but not for secrets. The content I scanned is non-secret (project names, epic statuses, prompt library, decision log metadata).

### Backlog
- Same note as quality-dashboard: if stricter access control is ever needed, GitHub OAuth with `repo` scope as a gate would be the right move. Substantial work; do only if threat model changes.

---

## 5. Code quality

- No `onclick=` inline handlers flagged across the 10 pages (scanned via grep).
- Per-page inline `<style>` blocks in executive.html and a few others — CSP-unfriendly but low priority for an internal tool.
- Shared `css/main.css` keeps layout consistent.
- JS is split across 3 clean files (`search.js`, `decay.js`, `dashboard.js`).

### Backlog
- **Consolidate per-page inline styles** into `css/main.css` (or page-specific files if too large). LOE: 30-60 min depending on volume. Low priority.

---

## 6. CI / CD

### Before this sprint
None. No workflows directory.

### After this sprint
- `axe-core.yml` — scans all 10 pages on every push, fails build on critical. Matches the pattern across DCC / Clarity / Kevin / aaron-patzalek / TBI / Career Coach / quality-dashboard.

### Backlog
- **JSON schema check** for `data/*.json` (lightweight `ajv-cli` workflow). Worth it if the dashboard starts breaking silently on malformed data. LOE: 30 min.

---

## 7. Positioning

N/A — internal tool, not revenue-adjacent.

---

## 8. Top 5 prioritised next actions

Smaller top-5 since it's internal-only:

1. **Review first axe-core CI run output** (15 min). Act on any critical findings.
2. **Explicit `:focus-visible` styling** on nav-links, filter buttons, search input (15 min). Dark-theme keyboard a11y.
3. **Self-host Fuse.js** (15 min). Closes the last external CDN dep; matches other repos' pattern.
4. **JSON schema check workflow** for `data/*.json` (30 min). Prevents silent dashboard breakage.
5. **Per-page `<meta name="description">`** (10 min). Was skipped for the 10-page shared-chrome first pass; trivial addition.

---

## 9. What this audit did NOT cover

- **Rendered-browser QA** — didn't open any page. Multi-page dark-theme behaviour, search, filters, drilldowns, and cross-page nav all unverified.
- **JS behaviour** across all 10 pages (dashboard.js, decay.js, search.js interaction).
- **Per-page content accuracy** — the dashboard's data files (project statuses, epic listings, decision log entries) were not reviewed against actual portfolio state.

---

## Confidence (overall)

85%. Seven-of-seven audit pattern repeats with tighter-than-usual scope (internal tool, no positioning / revenue considerations). The `_build/apply-a11y-baseline.py` injector is idempotent and re-runnable for future page additions; the axe-core workflow covers all 10 current pages. 15% reserved for: dark-theme contrast may surface issues the static inspection didn't catch, and per-page behaviour hasn't been rendered.

## Scrappy Pack says
Sovereignty Check — at L4 on fonts and near-L3 on dependencies (only Fuse.js CDN remains), the Command Centre is already one of the most portable surfaces in the portfolio. Good place to be; protects against the "what if GitHub goes down" failure mode for the dashboard Aaron uses daily.

LOE for Top 5: ~1.5 h bundled, or 15 min each as standalone micro-sprints.
