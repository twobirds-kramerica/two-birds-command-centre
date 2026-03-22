---
title: "Decision Log — March 2026"
date: "2026-03-01"
category: decision
project: global
trust: permanent
review-by: "never"
tags: ["decisions", "architecture", "product", "strategy", "global"]
---

# Two Birds — Decision Log
*March 2026 · Permanent Record*

---

## 2026-03-01 — No data monetisation — trust cost too high for senior audience

**Project:** Digital Confidence Centre

Seniors are a particularly trust-sensitive demographic. The reputational cost of any data commerce far outweighs potential revenue at this stage. Privacy is a core brand promise. Any future monetisation must be transparent, opt-in, and unrelated to user behaviour data.

---

## 2026-03-01 — Adult child is primary marketing channel, not the senior

**Project:** Digital Confidence Centre

Seniors rarely self-discover digital literacy tools. The adult child (age 40–60) is the acquisition trigger — they find the product, set it up, and encourage use. All marketing copy should address the adult child first. The senior is the user, but the adult child is the buyer/referrer.

---

## 2026-03-01 — B2B white-label licensing is the highest-ceiling revenue model

**Project:** Digital Confidence Centre

Selling platform access to libraries, community centres, health networks, and care homes scales faster than individual user revenue. Unit economics are better (one contract = many users). Deferred until 500+ users validates the product for institutional sales conversations.

---

## 2026-03-01 — Non-profit / for-profit fork deferred until 500+ users

**Project:** Digital Confidence Centre

The legal and structural cost of setting up a non-profit is not justified until there is evidence of user demand. Legal fees, governance overhead, and constraints on revenue usage are premature at the current stage. Revisit at 500 active users.

---

## 2026-03-01 — Static architecture maintained — no backend until SaaS phase

**Project:** Global

GitHub Pages + Cloudflare meets all current needs at zero cost. Introducing a backend creates hosting costs, security surface, and operational overhead with no user-facing benefit until the SaaS licensing phase. All products remain static HTML/CSS/JS until a paid licensing model is proven.

---

## 2026-03-10 — Option B archive trigger added to User Preferences globally

**Project:** Artifact Builder

The trigger phrase system ("Archive This Session") for creating structured artifacts from Claude conversations is active across all projects as a session preference, not a technical dependency. Produces YAML-frontmatted documents ready for vault routing without any code changes.

---

## 2026-03-15 — AEO tools: start free, add Otterly AI at launch

**Project:** Digital Confidence Centre

Free tools (Perplexity manual queries, ChatGPT Search self-check, Google Search Console) are sufficient to validate AI visibility during development. Otterly AI ($49/month) adds structured, automated monitoring at launch milestone. Not justified before first institutional partnership or 500+ users.

---

## 2026-03-22 — Command Centre built as internal operations tool, not shipped product

**Project:** Command Centre

The personal operations dashboard (this repo) is an internal tool for Aaron's use only. It is deployed on GitHub Pages for convenience but is `noindex, nofollow`. No public-facing marketing, no onboarding, no feature requests from external users. Simplicity and speed over polish.
