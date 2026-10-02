<?php

use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use MarkhamSq\Nitpick\Enums\RoundStatus;
use MarkhamSq\Nitpick\Models\Nit;
use MarkhamSq\Nitpick\Models\Result;
use MarkhamSq\Nitpick\Models\Round;
use Workbench\App\Models\User;
use Workbench\App\Scenarios\DemoScenario;

use function Orchestra\Testbench\workbench_path;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\json;
use function Pest\Laravel\patchJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\putJson;
use function Pest\Laravel\travelTo;
use function Pest\Laravel\withoutMiddleware;

beforeEach(function () {
    withoutMiddleware(PreventRequestForgery::class);

    config()->set('nitpick.scenarios', [
        'path' => __DIR__.'/../Fixtures/RoundScenarios',
        'namespace' => 'MarkhamSq\\Nitpick\\Tests\\Fixtures\\RoundScenarios',
    ]);

    // The report goes to base_path(), so each test has its own app directory, outside any git repo.
    File::ensureDirectoryExists("{$this->storagePath}/app");
    app()->setBasePath("{$this->storagePath}/app");
});

function startRound(string $scenario = 'acme-corp-held-invitations'): Round
{
    postJson('/nitpick/rounds', ['scenario' => $scenario])->assertCreated();

    return Round::query()->open()->sole();
}

function useWorkbenchScenarios(): void
{
    config()->set('nitpick.scenarios', ['path' => workbench_path('app/Scenarios'), 'namespace' => 'Workbench\\App\\Scenarios']);
}

function closeRound(Round $round): void
{
    patchJson("/nitpick/rounds/{$round->id}", ['status' => 'closed'])->assertOk();
}

it('starts round 1 of a scenario and shows it as the open round', function () {
    travelTo(Carbon::parse('2026-10-03 14:02:11'));

    getJson('/nitpick/round')->assertExactJson(['round' => null, 'next_numbers' => []]);

    postJson('/nitpick/rounds', ['scenario' => 'acme-corp-held-invitations'])
        ->assertCreated()
        ->assertJsonPath('round.round.number', 1)
        ->assertJsonPath('round.round.status', 'open')
        ->assertJsonPath('round.round.opened_at', '2026-10-03T14:02:11+00:00')
        ->assertJsonPath('round.round.tester', fn (string $tester) => $tester !== '');

    getJson('/nitpick/round')
        ->assertOk()
        ->assertJsonPath('round.round.scenario', 'acme-corp-held-invitations')
        ->assertJsonPath('round.round.title', 'Acme Corp held invitations')
        ->assertJsonPath('round.groups.0.items.0.status', 'untested')
        ->assertJsonPath('next_numbers', ['acme-corp-held-invitations' => 2]);
});

it('refuses a second open round, also for another scenario', function () {
    startRound();

    useWorkbenchScenarios();

    postJson('/nitpick/rounds', ['scenario' => 'demo-scenario'])
        ->assertConflict()
        ->assertJsonPath('message', 'Round 1 of acme-corp-held-invitations is open. Close it before you start a round.');

    expect(Round::query()->count())->toBe(1);
});

it('refuses a scenario that does not exist', function () {
    postJson('/nitpick/rounds', ['scenario' => 'missing'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['scenario' => 'There is no scenario with the slug missing.']);
});

it('gives each new round of a scenario the next number', function () {
    closeRound(startRound());
    closeRound(startRound());

    expect(startRound()->number)->toBe(3);

    getJson('/nitpick/round')->assertJsonPath('next_numbers', ['acme-corp-held-invitations' => 4]);
});

it('closes the round with its closed time and writes the report', function () {
    $round = startRound();

    travelTo(Carbon::parse('2026-10-03 15:40:52'));

    patchJson("/nitpick/rounds/{$round->id}", ['status' => 'closed'])
        ->assertOk()
        ->assertJsonPath('round.round.status', 'closed')
        ->assertJsonPath('round.round.closed_at', '2026-10-03T15:40:52+00:00')
        ->assertJsonPath('reports', ['docs/qa/acme-corp-held-invitations/round-1.md']);

    expect($round->refresh())
        ->status->toBe(RoundStatus::Closed)
        ->closed_at->toDateTimeString()->toBe('2026-10-03 15:40:52')
        ->and(base_path('docs/qa/acme-corp-held-invitations/round-1.md'))->toBeFile();

    getJson('/nitpick/round')->assertJsonPath('round', null);
});

it('accepts only closed as the new status of a round', function () {
    $round = startRound();

    patchJson("/nitpick/rounds/{$round->id}", ['status' => 'open'])->assertUnprocessable();

    expect($round->refresh()->status)->toBe(RoundStatus::Open);
});

it('sets an item to pass, then to fail, then unsets it', function () {
    $round = startRound();

    putJson("/nitpick/rounds/{$round->id}/results/listed", ['status' => 'pass'])
        ->assertOk()
        ->assertJsonPath('round.groups.0.items.0.status', 'pass');

    putJson("/nitpick/rounds/{$round->id}/results/listed", ['status' => 'fail'])
        ->assertOk()
        ->assertJsonPath('round.groups.0.items.0.status', 'fail');

    expect(Result::query()->sole()->status->value)->toBe('fail');

    deleteJson("/nitpick/rounds/{$round->id}/results/listed")
        ->assertOk()
        ->assertJsonPath('round.groups.0.items.0.status', 'untested');

    expect(Result::query()->count())->toBe(0);
});

it('refuses a status that is not pass or fail', function () {
    $round = startRound();

    putJson("/nitpick/rounds/{$round->id}/results/listed", ['status' => 'untested'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('status');
});

it('shows the retest(n) groups only in round n and refuses results for the items of other rounds', function () {
    $round = startRound();

    getJson('/nitpick/round')->assertJsonPath('round.groups.*.retest', [null, null]);

    putJson("/nitpick/rounds/{$round->id}/results/ursula-toast", ['status' => 'pass'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['item_key' => 'The checklist of round 1 has no item with the key ursula-toast.']);

    closeRound($round);
    $round = startRound();

    getJson('/nitpick/round')->assertJsonPath('round.groups.*.retest', [null, null, 2]);

    putJson("/nitpick/rounds/{$round->id}/results/ursula-toast", ['status' => 'pass'])->assertOk();
    putJson("/nitpick/rounds/{$round->id}/results/round-three", ['status' => 'pass'])->assertUnprocessable();
});

it('records the persona of the login and the path of the page on a nit', function (?string $email, string $persona) {
    $round = startRound();

    if ($email !== null) {
        actingAs(new User(['email' => $email]));
    }

    postJson("/nitpick/rounds/{$round->id}/nits", [
        'item_key' => 'ursula-send',
        'body' => ' Toast said "Invitation queued." ',
        'url' => 'http://127.0.0.1:8765/teams/acme-corp/members?tab=held#row-3',
        'persona' => 'typed by the tester',
    ])
        ->assertCreated()
        ->assertJsonPath('round.groups.0.items.1.nits.0.body', 'Toast said "Invitation queued."');

    expect(Nit::query()->sole())
        ->round_id->toBe($round->id)
        ->item_key->toBe('ursula-send')
        ->url->toBe('/teams/acme-corp/members?tab=held')
        ->persona->toBe($persona);
})->with([
    'a persona of the scenario' => ['admin@acmecorp.test', 'arthur'],
    'a user that is not a persona' => ['someone@example.test', 'someone@example.test'],
    'no login' => [null, 'guest'],
]);

it('adds a page nit with no item', function () {
    $round = startRound();

    actingAs(new User(['email' => 'admin@acmecorp.test']));

    postJson("/nitpick/rounds/{$round->id}/nits", ['item_key' => null, 'body' => 'Sidebar logo is 2px off', 'url' => 'http://127.0.0.1:8765/home'])
        ->assertCreated()
        ->assertJsonPath('round.page_nits.0.body', 'Sidebar logo is 2px off')
        ->assertJsonPath('round.page_nits.0.url', '/home')
        ->assertJsonPath('round.page_nits.0.persona', 'arthur');
});

it('refuses a nit on an item that is not in the round', function () {
    $round = startRound();

    postJson("/nitpick/rounds/{$round->id}/nits", ['item_key' => 'ursula-toast', 'body' => 'A nit', 'url' => '/home'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('item_key');

    expect(Nit::query()->count())->toBe(0);
});

it('deletes a nit of the round, but not a nit of another round', function () {
    $round = startRound();
    $nit = $round->nits()->create(['item_key' => null, 'body' => 'A nit', 'url' => '/home', 'persona' => 'guest']);

    deleteJson("/nitpick/rounds/{$round->id}/nits/{$nit->id}")
        ->assertOk()
        ->assertJsonPath('round.page_nits', []);

    closeRound($round);
    $otherRound = startRound();
    $otherNit = $round->nits()->create(['item_key' => null, 'body' => 'An old nit', 'url' => '/home', 'persona' => 'guest']);

    deleteJson("/nitpick/rounds/{$otherRound->id}/nits/{$otherNit->id}")->assertNotFound();

    expect(Nit::query()->count())->toBe(1);
});

it('refuses each write to a closed round', function (string $method, string $path, array $body) {
    $round = startRound();
    $round->results()->create(['item_key' => 'listed', 'status' => 'pass']);
    $nit = $round->nits()->create(['item_key' => null, 'body' => 'A nit', 'url' => '/home', 'persona' => 'guest']);
    closeRound($round);

    $path = str_replace(['{round}', '{nit}'], [$round->id, $nit->id], $path);

    json($method, $path, $body)
        ->assertConflict()
        ->assertJsonPath('message', 'Round 1 of acme-corp-held-invitations is closed. A closed round does not change.');

    expect(Result::query()->sole()->status->value)->toBe('pass')
        ->and(Nit::query()->count())->toBe(1);
})->with([
    'set a result' => ['PUT', '/nitpick/rounds/{round}/results/listed', ['status' => 'fail']],
    'unset a result' => ['DELETE', '/nitpick/rounds/{round}/results/listed', []],
    'add a nit' => ['POST', '/nitpick/rounds/{round}/nits', ['item_key' => null, 'body' => 'Late', 'url' => '/home']],
    'delete a nit' => ['DELETE', '/nitpick/rounds/{round}/nits/{nit}', []],
    'close again' => ['PATCH', '/nitpick/rounds/{round}', ['status' => 'closed']],
]);

it('shows a result and an item nit whose key is not in the checklist as orphaned', function () {
    $round = startRound();
    $round->results()->create(['item_key' => 'old-check', 'status' => 'fail']);
    $round->results()->create(['item_key' => 'listed', 'status' => 'pass']);
    $round->nits()->create(['item_key' => 'gone-item', 'body' => 'An old nit', 'url' => '/home', 'persona' => 'arthur']);

    getJson('/nitpick/round')
        ->assertJsonPath('round.orphaned.results', [['item_key' => 'old-check', 'status' => 'fail']])
        ->assertJsonPath('round.orphaned.nits.0.item_key', 'gone-item')
        ->assertJsonPath('round.page_nits', [])
        ->assertJsonPath('round.groups.0.items.0.status', 'pass');

    deleteJson("/nitpick/rounds/{$round->id}/results/old-check")
        ->assertOk()
        ->assertJsonPath('round.orphaned.results', []);
});

it('keeps the open round and its results through a reset', function () {
    useWorkbenchScenarios();
    $round = startRound('demo-scenario');
    $startPageKey = app(DemoScenario::class)->toArray()['groups'][0]['items'][0]['key'];

    putJson("/nitpick/rounds/{$round->id}/results/{$startPageKey}", ['status' => 'pass'])->assertOk();

    postJson('/nitpick/reset', ['scenario' => 'demo-scenario', 'persona' => 'arthur'])->assertOk();

    getJson('/nitpick/round')
        ->assertJsonPath('round.round.id', $round->id)
        ->assertJsonPath('round.round.status', 'open')
        ->assertJsonPath('round.groups.0.items.0.status', 'pass');
});

it('lists the closed rounds of a scenario, newest first, with their counts and report', function () {
    $first = startRound();
    putJson("/nitpick/rounds/{$first->id}/results/listed", ['status' => 'pass'])->assertOk();
    putJson("/nitpick/rounds/{$first->id}/results/ursula-send", ['status' => 'fail'])->assertOk();
    postJson("/nitpick/rounds/{$first->id}/nits", ['item_key' => 'ursula-send', 'body' => 'Wrong toast', 'url' => 'http://127.0.0.1/members'])->assertCreated();
    closeRound($first);

    $second = startRound();
    closeRound($second);
    File::delete(base_path('docs/qa/acme-corp-held-invitations/round-2.md'));

    startRound();

    getJson('/nitpick/rounds?scenario=acme-corp-held-invitations')
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0', fn (array $round) => $round['number'] === 2 && $round['report'] === null)
        ->assertJsonPath('data.1.number', 1)
        ->assertJsonPath('data.1.passed', 1)
        ->assertJsonPath('data.1.failed', 1)
        ->assertJsonPath('data.1.nits', 1)
        ->assertJsonPath('data.1.report', 'docs/qa/acme-corp-held-invitations/round-1.md');

    getJson('/nitpick/rounds?scenario=demo-scenario')->assertExactJson(['data' => []]);
    getJson('/nitpick/rounds')->assertUnprocessable();
});

it('shows one round in the short shape', function () {
    Round::query()->create(['scenario' => 'acme-corp-held-invitations', 'number' => 1, 'status' => 'closed', 'tester' => 'Nick', 'opened_at' => now(), 'closed_at' => now()]);
    $round = startRound();
    putJson("/nitpick/rounds/{$round->id}/results/ursula-toast", ['status' => 'pass'])->assertOk();
    putJson("/nitpick/rounds/{$round->id}/results/ursula-send", ['status' => 'fail'])->assertOk();
    closeRound($round);

    getJson("/nitpick/rounds/{$round->id}")
        ->assertOk()
        ->assertJsonPath('round.round.number', 2)
        ->assertJsonPath('round.groups.0.items.0.key', 'ursula-send')
        ->assertJsonPath('round.groups.1.retest', 2)
        ->assertJsonPath('round.groups.1.passed', 1)
        ->assertJsonPath('round.base_not_tested', 4);
});
