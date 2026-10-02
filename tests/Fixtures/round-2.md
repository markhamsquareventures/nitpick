# Acme Corp held invitations, round 2
Closed 2026-10-03 at a1b2c3d (dirty) by Nick

## As Arthur Admin (admin@acmecorp.test)
- [ ] **Fail** Per-row Send on Ursula: toast "Invitation sent.", the row turns Pending
  - Toast said "Invitation queued." (`/teams/acme-corp/members`)

1 check passed.

## Handoff: Invited admin registers
1 check passed.

## Retest 2, as Arthur Admin (admin@acmecorp.test)
1 check passed.

## Not tested
2 checks of the base checklist had no result in this round. `nitpick:results acme-corp-held-invitations --round=2 --json --full` lists them.

## Page nits
- Sidebar logo is 2px off (`/home`, as arthur)

## Orphaned
- [ ] `gone-item` *(untested)*
  - The old button was blue (`/home`)
- [x] `old-check`
