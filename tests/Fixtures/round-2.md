# Acme Corp held invitations, round 2
Closed 2026-10-03 at a1b2c3d (dirty) by Nick

## As Arthur Admin (admin@acmecorp.test)
- [x] Acme Corp is listed and there is no invitation alert
- [ ] **Fail** Per-row Send on Ursula: toast "Invitation sent.", the row turns Pending
  - Toast said "Invitation queued." (`/teams/acme-corp/members`)
- [ ] Select Ulysses and press "Send invitations" *(untested)*

## Handoff: Invited admin registers
- [x] Andy Admin: Add member with a fresh address, role team admin
- [ ] Guest: Open the invitation link from the mail pane *(untested)*

## Retest 2, as Arthur Admin (admin@acmecorp.test)
- [x] The toast now reads "Invitation sent."

## Page nits
- Sidebar logo is 2px off (`/home`, as arthur)

## Orphaned
- [ ] `gone-item` *(untested)*
  - The old button was blue (`/home`)
- [x] `old-check`
