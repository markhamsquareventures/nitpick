# Changelog

All notable changes to `nitpick` will be documented in this file.

## 0.2.0 - 2026-10-01

- A persona can set a `home` in `personas()`. After a login or a reset, the panel opens that path, not the page it was on.
- A new `home` config value (default `/`) is the path for a persona with no `home`, for the guest persona, and for a login by email.
- `nitpick:scenarios` rejects a `home` that is not a path on the app.
- The login and reset endpoints return a `redirect` path. The persona list in `nitpick:scenarios --json` and `nitpick:results --json` has a `home` field.

## 0.1.0 - 2026-09-29

- First release.
- Scenario classes with personas, checklists, handoffs, and retest rounds.
- The QA panel with the Checklist, Mail, and Personas tabs.
- One-click reset and persona login.
- Rounds with a Markdown report per round and `nitpick:results --json`.
- A Laravel Boost skill for agents that write scenarios and retests.
