# Changelog

All notable changes to `nitpick` will be documented in this file.

## 0.4.0 - 2026-10-02

- In a round with a `retest(n)` block, the Checklist tab shows only that block. The base checks are under a **Full checklist** toggle. You can still mark them in that round. The toggle stays open or closed through a login or a reset.
- A new History tab lists the closed rounds of the scenario, with the date, the git SHA, and the pass, fail, and nit counts. Open a round to see its failed checks, its nits, and its page nits.
- The Markdown report and `nitpick:results --json` are short. They list the failed checks, the checks with nits, and the untested checks of the work. The other passed checks are a count per group (`passed`), and the base checks with no result in a retest round are one count (`base_not_tested`).
- `nitpick:results --json --full` prints every check of the round in the old shape.
- The tab bar shows only icons. Each tab has its name as its accessible name and as a tooltip.
- New `GET nitpick/rounds?scenario=` and `GET nitpick/rounds/{round}` routes feed the History tab. They exist only in the local environment.

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
