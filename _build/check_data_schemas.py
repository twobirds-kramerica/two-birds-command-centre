#!/usr/bin/env python3
"""Static JSON validation for data/*.json files.

Each file must:
- parse as valid JSON
- match its expected top-level shape (listed in SCHEMAS below)

Runs in CI via .github/workflows/json-schema-check.yml and locally from repo root:
    python _build/check_data_schemas.py
Exits non-zero if any file fails.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

SCHEMAS: dict[str, dict] = {
    "projects.json": {
        "required_top_keys": ["lastUpdated", "projects"],
        "list_key": "projects",
        "item_required": ["id", "name", "status"],
    },
    "sprints.json": {
        "required_top_keys": ["lastUpdated", "sprints"],
        "list_key": "sprints",
        "item_required": ["id", "project", "name", "status"],
    },
    "inbox-index.json": {
        "required_top_keys": ["files"],
        "list_key": "files",
        "item_required": [],
    },
    "vault-index.json": {
        "required_top_keys": ["lastUpdated", "files"],
        "list_key": "files",
        "item_required": ["id"],
    },
}


def main() -> int:
    data_dir = Path(__file__).resolve().parent.parent / "data"
    if not data_dir.is_dir():
        print(f"FAIL: data dir not found at {data_dir}")
        return 2

    failures: list[str] = []
    seen: set[str] = set()

    for path in sorted(data_dir.glob("*.json")):
        seen.add(path.name)
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            failures.append(f"{path.name}: invalid JSON — {exc}")
            continue

        schema = SCHEMAS.get(path.name)
        if schema is None:
            print(f"OK:   {path.name} (no schema registered — syntax-only check)")
            continue

        for key in schema["required_top_keys"]:
            if key not in payload:
                failures.append(f"{path.name}: missing top-level key '{key}'")

        list_key = schema["list_key"]
        items = payload.get(list_key, None)
        if not isinstance(items, list):
            failures.append(f"{path.name}: '{list_key}' must be a list")
        else:
            for i, item in enumerate(items):
                if not isinstance(item, dict):
                    failures.append(f"{path.name}[{list_key}][{i}]: not an object")
                    continue
                for k in schema["item_required"]:
                    if k not in item:
                        failures.append(
                            f"{path.name}[{list_key}][{i}]: missing required key '{k}'"
                        )

        if not any(f.startswith(f"{path.name}:") or f.startswith(f"{path.name}[") for f in failures):
            print(f"OK:   {path.name} ({len(items)} items)")

    for name in SCHEMAS:
        if name not in seen:
            failures.append(f"{name}: expected file missing from data/")

    if failures:
        print("\nFAIL — JSON schema check:")
        for f in failures:
            print(f"  - {f}")
        return 1

    print("\nAll data/*.json files pass schema check.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
