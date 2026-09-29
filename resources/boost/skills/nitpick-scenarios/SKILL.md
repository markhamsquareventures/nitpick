---
name: nitpick-scenarios
description: 'ACTIVATE when the user works with Nitpick scenarios for manual QA: writing a scenario class, reading nitpick:results output, adding a retest() block, or checking scenario output with nitpick:scenarios. Activate when the user mentions Nitpick, a QA scenario, nitpick:scenarios, nitpick:results, retest, the QA panel, or references MarkhamSq\Nitpick, Scenario, Checklist, Section, or Handoff. Do NOT activate for the panel UI itself (the Preact card, the pill) or mail capture; this skill covers the scenario API and the Artisan commands.'
license: MIT
metadata:
  author: markhamsq
---

# Nitpick Scenarios

Nitpick is a package for manual QA of a Laravel app. A scenario is one PHP class that lists checks for a person to run by hand in the app's own panel. This skill covers four tasks: write a scenario from a diff, read the results of a round, add a retest block for the failures and nits of the last round, and check the work.

## Write a scenario from a diff

1. Find the scenario directory and namespace in `config('nitpick.scenarios')`. The default is `tests/Scenarios` and `Tests\Scenarios`.
2. Make the class:

   ```bash
   php artisan make:nitpick-scenario AcmeCorpHeldInvitations
   ```

   This command writes a stub to the scenario directory. It does not overwrite a file that exists.
3. Fill in the three methods. An example:

```php
use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Handoff;
use MarkhamSq\Nitpick\Scenario;
use MarkhamSq\Nitpick\Section;

class AcmeCorpHeldInvitations extends Scenario
{
    public function setUp(): void
    {
        // Seeders and factories that make the state this scenario needs.
    }

    public function personas(): array
    {
        return [
            'arthur' => ['label' => 'Arthur Admin', 'email' => 'admin@acmecorp.test'],
        ];
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return $checklist
            ->as('arthur', fn (Section $section) => $section
                ->check('Acme Corp is listed and there is no invitation alert', url: '/home')
                ->check('Per-row Send on Ursula: toast "Invitation sent."', url: '/teams/acme-corp/members', setup: 'Ursula is Not sent'))
            ->handoff('Invited admin registers', fn (Handoff $handoff) => $handoff
                ->step('arthur', 'Add member with a fresh address')
                ->switchTo('guest')
                ->step('guest', 'Open the invitation link from the mail pane'));
    }
}
```

### setUp()

- `setUp()` runs after the app's own reset seeder, on every reset the panel runs. Use `firstOrCreate()` for a row the seeder can have already made. `create()` alone fails on the second reset.
- `setUp()` must make a user for every persona in `personas()`. The `scenario()` Pest helper throws for any persona with no matching user. The panel's reset checks only the persona named in the request.

### personas()

Each key names a persona. Each value has a `label` and an `email`. The package finds the user by that email after `setUp()` runs.

### checklist()

Write one check for each thing the diff changed, or each thing the diff could break. Keep a scenario to checks only. Do not put build decisions, migrations, or feature logic in it, beyond what `setUp()` needs to create test data.

- `$checklist->as('persona', fn (Section $section) => ...)` groups checks under one persona. `$section->check($text, url: null, setup: null, key: null)` adds one check. `$text` names the behavior to check. `$url` is the path to open in the browser, for example `/home`. `$setup` is a one-line note on the state the check needs, for example `'Ursula is Not sent'`; it does not set that state, `setUp()` does.
- `$checklist->handoff('title', fn (Handoff $handoff) => ...)` holds an ordered sequence across personas, such as an invite-and-register flow. `$handoff->step('persona', $text, url: null, setup: null, key: null)` adds one step. `$handoff->switchTo('persona')` logs the tester in as a persona before the next step. A `switchTo()` call must be followed by a `step()` for that same persona.
- `guest` is a valid persona name in a section or a step. It means no login.
- `$checklist->retest($number, fn (Checklist $retest) => ...)` holds the checks for one retest round. See "Add a retest block" below. A `retest()` block cannot hold another `retest()` block.

An item's key is the first 12 hex characters of the SHA-256 hash of its text (trimmed, with runs of whitespace collapsed to one space), or the `key:` argument when given. Two items in one scenario must not share a key; `nitpick:scenarios` throws when they do. Changing the text of an existing check changes its key and orphans its old results, so give a check a `key:` when its text is likely to change later.

Two scenario classes with the same basename conflict: the slug (the class basename in kebab case) names the rounds and the report directory, so `nitpick:scenarios` throws when two scenarios share one.

## Read the results of a round

```bash
php artisan nitpick:results {scenario-slug} --round=latest --json
```

`{scenario-slug}` is the `slug` field from `nitpick:scenarios --json`, for example `acme-corp-held-invitations`. `--round=latest` reads the newest round, open or closed. A round number, for example `--round=2`, reads that specific round.

The JSON has these top-level keys:

- `round`: `number`, `status` (`open` or `closed`), `tester`, `opened_at`, `closed_at`, `git_sha`, `git_dirty`.
- `groups`: the scenario's checklist, in section and handoff order. Each item in a group carries `status` (`pass`, `fail`, or `untested`) and `nits` (a list of `{id, item_key, body, url, persona, created_at}`).
- `page_nits`: nits with no `item_key`. A page nit is not attached to one item.
- `orphaned`: `results` and `nits` whose `item_key` is no longer in the checklist. This happens when a check's text changes with no `key:`, or when a scenario removes a check.

Read every `fail` item's `text` and its `nits`, and read every entry in `page_nits`. These are what the retest block must cover.

## Add a retest block

1. Read `round.number` from the `nitpick:results --json` output above. The retest block's number is `round.number + 1`.
2. Add one `->retest($number, fn (Checklist $retest) => ...)` to the end of the scenario's `checklist()` chain. When the scenario already has a `retest($number)` block for that same number, add the new checks inside that block instead of a second one; `Checklist::retest()` accepts more than one call with the same number.
3. Inside it, group checks by persona with `->as()`, the same as a normal section. Write one check for each failure and each nit that describes the fix, not the original failure. Example, for a fail on "Per-row Send on Ursula: toast reads Invitation sent." with a nit "Toast said Invitation queued.", after a round 2 read:

   ```php
   ->retest(3, fn (Checklist $retest) => $retest
       ->as('arthur', fn (Section $section) => $section
           ->check('Per-row Send on Ursula: toast reads "Invitation sent."', url: '/teams/acme-corp/members', key: 'ursula-send-toast')))
   ```

4. Give every new check a `key:` that does not repeat one already in the scenario. Do not reuse the exact text of the failed item; that text already has a key in the scenario, and a duplicate key makes `nitpick:scenarios` throw. Write new text that describes the fix, or set the check's own `key:`.

A round checks the base groups (every group outside a `retest()` block) plus the groups of `retest(n)` for its own number `n`. This is why the new block must carry the next round's number, not the one just read.

## Check the work

```bash
php artisan nitpick:scenarios --json
```

A clean exit confirms two things: every key in the scenario is unique, and every persona the checklist uses is declared in `personas()`. `nitpick:scenarios` throws a `LogicException` naming the scenario and the conflict when either check fails. Read the new `retest` group in the output and confirm it carries the right number.

Then write or run a Pest test that uses the scenario:

```php
use function MarkhamSq\Nitpick\scenario;
use function Pest\Laravel\actingAs;

it('lets Arthur send an invitation', function () {
    $personas = scenario(AcmeCorpHeldInvitations::class);

    actingAs($personas['arthur'])->get('/teams/acme-corp/members')->assertOk();
});
```

`use function MarkhamSq\Nitpick\scenario;` imports the namespaced helper. `scenario()` runs `setUp()` and returns the persona users for `actingAs()`. It throws a `LogicException` naming the scenario, the persona, and the email when `setUp()` did not make a user for a declared persona.
