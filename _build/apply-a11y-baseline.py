#!/usr/bin/env python3
"""S-TBC-HYGIENE injector — apply a11y baseline to every HTML page
in two-birds-command-centre.

Per-page changes (idempotent — re-running leaves the file unchanged):
  - Inject `<a href="#main" class="skip-link">Skip to main content</a>`
    immediately after `<body>` if not already present.
  - Wrap the content between `</header>` and `</body>` in a `<main
    id="main">` landmark (injects `<main>` after the first `</header>`
    close tag and `</main>` immediately before the final `</body>`).

Run once:  python _build/apply-a11y-baseline.py
"""
from __future__ import annotations

import re
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
PAGES = sorted(HERE.glob("*.html"))

SKIP_LINK_HTML = '\n  <a href="#main" class="skip-link">Skip to main content</a>\n'
MAIN_OPEN  = '\n\n  <main id="main">\n'
MAIN_CLOSE = '\n  </main>\n\n'


def patch(html: str) -> tuple[str, bool]:
    """Return (patched_html, changed). Idempotent."""
    orig = html
    if 'class="skip-link"' not in html:
        html = html.replace('<body>\n', '<body>' + SKIP_LINK_HTML, 1)
    if '<main id="main"' not in html:
        # Insert after first </header>
        html = re.sub(
            r'(</header>)',
            lambda m: m.group(1) + MAIN_OPEN,
            html,
            count=1,
        )
        # Insert before final </body>
        idx = html.rfind('</body>')
        if idx != -1:
            html = html[:idx] + MAIN_CLOSE + html[idx:]
    return html, (html != orig)


def main() -> int:
    changed = 0
    skipped = 0
    for p in PAGES:
        src = p.read_text(encoding='utf-8')
        new, did_change = patch(src)
        if did_change:
            p.write_text(new, encoding='utf-8')
            changed += 1
            print(f'UPDATED: {p.name}')
        else:
            skipped += 1
            print(f'  already-ok: {p.name}')
    print(f'\nSummary: {changed} updated, {skipped} already ok, {len(PAGES)} total')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
