# Changelog

All notable changes to `nitpick` will be documented in this file.

## 0.3.0 - 2026-10-01

- A check or a handoff step can have a `fill:` argument. Its Fill button fills the form on the current page with fixed values or with Closures such as `fake()`. It never submits the form.
- A key in `fill:` is a field `name`, an `id`, or a CSS selector. A value can be a string, a number, a bool, `null`, or a list.
- After a fill, the row shows what the panel filled, the keys that it did not find, and the values that a field did not take.
- `nitpick:scenarios --json` gives each item a `fill` field.
- A new `nitpick/fill` route runs the fill of an item. It exists only in the local environment.

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
