---
title: "DCC SEO + AEO Strategy — March 2026"
date: "2026-03-15"
category: strategy
project: dcc
trust: active
review-by: "2026-09-15"
tags: ["seo", "aeo", "structured-data", "search", "ai-visibility"]
---

# DCC SEO + AEO Strategy
*March 2026 · Two Birds*

## Context

Search is evolving. Google's AI Overviews, Perplexity, ChatGPT Search, and Claude.ai now answer questions directly — often without the user ever clicking a link. To be visible in this landscape, we need both traditional SEO (Google ranking) and AEO (Answer Engine Optimisation — being the source AI assistants cite).

Our target question: *"How do I teach my elderly parent to use their iPhone?"*

---

## Sprint 1 — AEO Foundation (Completed March 2026)

### What We Did
- Added JSON-LD structured data to all 14 pages
  - `Organization` schema on index.html
  - `FAQPage` + `Article` schemas on all 11 module pages
  - `EducationalOrganization` on resources.html
- Updated `robots.txt` to explicitly allow AI crawlers:
  - GPTBot, PerplexityBot, ClaudeBot, Google-Extended
- Rebuilt `sitemap.xml` with 26 pages and correct `lastmod` dates
- Rewrote all 14 meta descriptions as answer-formatted statements (150–160 chars)
- Fixed 81 heading hierarchy violations across module pages

### Why This Matters
AI crawlers respect `robots.txt`. Without explicit allow rules, some crawlers skip the site. The `FAQPage` schema directly feeds Google's Featured Snippets and AI Overviews — it's the highest-value schema type for our content.

---

## Sprint 2 — Glossary Deep Expansion (Completed March 2026)

### What We Did
- Expanded `digital-literacy-101.html` from 20 to 120+ bilingual terms
- Added Fuse.js fuzzy search with "Did You Mean" suggestions
- Added EN/FR language toggle
- Added search analytics (localStorage + Google Analytics events)
- Added admin dashboard at `?admin=true` — top search terms and zero-result gaps
- Added `FAQPage` schema with 15 Q&As on the glossary page
- Updated sitemap.xml

### Why the Glossary Is High-Value AEO Content
- Each term definition is a potential AI answer snippet
- Bilingual content (EN/FR) doubles discoverability
- `DefinedTerm` schema markup signals term authority to crawlers
- Search analytics reveal what users actually want to know — informs future content

---

## Monitoring Plan

### Free Tools (In Use)
- Google Search Console — impressions, clicks, average position
- Bing Webmaster Tools — secondary search engine coverage
- Perplexity.ai manual queries — check if DCC appears as a cited source
- ChatGPT Search manual queries — same

### Paid Tools (At Launch)
- **Otterly AI** ($49/month) — structured AI visibility monitoring, tracks when the site is cited in AI responses
- Trigger: first institutional partnership or 500+ users

### Review Cadence
- Monthly: check Search Console for page drops or crawl errors
- Quarterly: audit meta descriptions, check if FAQ answers need updating
- At 6 months: measure if schema additions resulted in Featured Snippet appearances

---

## Deferred Phase 3 — Cross-Linking

Add glossary links from module body text to individual glossary entries. For example:
- Module 2 mentions "phishing" → link to `digital-literacy-101.html#term-phishing`
- Module 3 mentions "two-factor authentication" → link to `#term-2fa`

This creates internal link equity and improves AI's ability to connect the module content to the glossary authority. Deferred until module content audit confirms which terms are mentioned.

---

## Key Decisions Recorded

| Decision | Rationale |
|---|---|
| Use `FAQPage` schema on modules | Highest AI Overviews surface rate of any schema type |
| Allow all AI crawlers in robots.txt | Default block stance costs visibility with no benefit |
| Otterly AI deferred to launch | Free manual checks sufficient during development |
| Glossary = AEO priority page | Most likely to be cited as a definition source |
