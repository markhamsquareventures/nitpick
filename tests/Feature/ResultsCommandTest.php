<?php

use Illuminate\Support\Facades\Artisan;
use MarkhamSq\Nitpick\Actions\DiscoverScenarios;
use MarkhamSq\Nitpick\Models\Round;

use function Pest\Laravel\artisan;

beforeEach(function () {
    config()->set('nitpick.scenarios', [
        'path' => __DIR__.'/../Fixtures/RoundScenarios',
        'namespace' => 'MarkhamSq\\Nitpick\\Tests\\Fixtures\\RoundScenarios',
    ]);

    $first = Round::query()->create([
        'scenario' => 'acme-corp-held-invitations',
        'number' => 1,
        'status' => 'closed',
        'tester' => 'Nick',
        'opened_at' => '2026-10-01 09:00:00',
        'closed_at' => '2026-10-01 10:00:00',
        'git_sha' => 'a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0',
        'git_dirty' => false,
    ]);
    $first->results()->create(['item_key' => 'ursula-send', 'status' => 'fail']);
    $first->nits()->create(['item_key' => 'ursula-send', 'body' => 'Toast said "Invitation queued."', 'url' => '/members', 'persona' => 'arthur', 'created_at' => '2026-10-01 09:30:00']);
    $first->nits()->create(['item_key' => null, 'body' => 'Sidebar logo is 2px off', 'url' => '/home', 'persona' => 'arthur', 'created_at' => '2026-10-01 09:40:00']);
    $first->results()->create(['item_key' => 'old-check', 'status' => 'pass']);

    $second = Round::query()->create(['scenario' => 'acme-corp-held-invitations', 'number' => 2, 'tester' => 'Nick', 'opened_at' => '2026-10-03 14:00:00']);
    $second->results()->create(['item_key' => 'ursula-toast', 'status' => 'pass']);
});

function resultsJson(array $options): array
{
    expect(Artisan::call('nitpick:results', ['scenario' => 'acme-corp-held-invitations', '--json' => true, ...$options]))->toBe(0);

    return json_decode(Artisan::output(), true, flags: JSON_THROW_ON_ERROR);
}

it('prints only the work of a retest round as JSON, and counts the rest', function () {
    Round::query()->where('number', 2)->sole()->results()->create(['item_key' => 'listed', 'status' => 'fail']);

    $results = resultsJson([]);

    expect($results['round'])->toMatchArray(['number' => 2, 'status' => 'open', 'closed_at' => null, 'git_sha' => null])
        ->and($results['groups'])->toHaveCount(2)
        ->and($results['groups'][0])->toMatchArray(['retest' => null, 'passed' => 0])
        ->and(collect($results['groups'][0]['items'])->pluck('key')->all())->toBe(['listed'])
        ->and($results['groups'][1])->toMatchArray(['retest' => 2, 'items' => [], 'passed' => 1])
        ->and($results['base_not_tested'])->toBe(4);
});

it('keeps an untested retest item and a passed item with nits', function () {
    $round = Round::query()->where('number', 2)->sole();
    $round->results()->delete();
    $round->results()->create(['item_key' => 'listed', 'status' => 'pass']);
    $round->nits()->create(['item_key' => 'listed', 'body' => 'Alert flickers', 'url' => '/home', 'persona' => 'arthur']);

    $results = resultsJson([]);

    expect(collect($results['groups'])->map(fn (array $group) => [$group['retest'], collect($group['items'])->pluck('key')->all(), $group['passed']])->all())
        ->toBe([[null, ['listed'], 0], [2, ['ursula-toast'], 0]])
        ->and($results['base_not_tested'])->toBe(4);
});

it('treats every group as the work in a round with no retest block', function () {
    Round::query()->where('number', 2)->sole()->update(['number' => 4]);

    $results = resultsJson([]);

    expect(collect($results['groups'])->pluck('retest')->all())->toBe([null, null])
        ->and(collect($results['groups'])->pluck('items')->flatten(1)->pluck('status')->unique()->all())->toBe(['untested'])
        ->and($results['base_not_tested'])->toBe(0);
});

it('prints every item with --full', function () {
    $results = resultsJson(['--full' => true]);

    expect(collect($results['groups'])->pluck('retest')->all())->toBe([null, null, 2])
        ->and($results['groups'][0]['items'][0])->toMatchArray(['key' => 'listed', 'status' => 'untested'])
        ->and($results['groups'][2]['items'][0])->toMatchArray(['key' => 'ursula-toast', 'status' => 'pass', 'nits' => []])
        ->and($results)->not->toHaveKey('base_not_tested')
        ->and($results['groups'][0])->not->toHaveKey('passed');
});

it('prints a round by number with its failures, nits, page nits, and orphans', function () {
    $results = resultsJson(['--round' => '1']);

    expect($results['round'])->toBe([
        'id' => Round::query()->where('number', 1)->value('id'),
        'scenario' => 'acme-corp-held-invitations',
        'title' => 'Acme Corp held invitations',
        'number' => 1,
        'status' => 'closed',
        'tester' => 'Nick',
        'opened_at' => '2026-10-01T09:00:00+00:00',
        'closed_at' => '2026-10-01T10:00:00+00:00',
        'git_sha' => 'a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0',
        'git_dirty' => false,
    ]);

    $scenarioItem = app(DiscoverScenarios::class)->find('acme-corp-held-invitations')->toArray()['groups'][0]['items'][1];

    expect($results['groups'][0]['items'][1])->toBe([
        ...$scenarioItem,
        'status' => 'fail',
        'nits' => [[
            'id' => 1,
            'item_key' => 'ursula-send',
            'body' => 'Toast said "Invitation queued."',
            'url' => '/members',
            'persona' => 'arthur',
            'created_at' => '2026-10-01T09:30:00+00:00',
        ]],
    ]);

    expect(collect($results['groups'])->pluck('retest')->all())->toBe([null, null])
        ->and($results['page_nits'])->toHaveCount(1)
        ->and($results['page_nits'][0]['body'])->toBe('Sidebar logo is 2px off')
        ->and($results['orphaned'])->toBe(['results' => [['item_key' => 'old-check', 'status' => 'pass']], 'nits' => []]);
});

it('prints the markdown report without --json', function () {
    expect(Artisan::call('nitpick:results', ['scenario' => 'acme-corp-held-invitations', '--round' => '1']))->toBe(0)
        ->and(Artisan::output())->toStartWith("# Acme Corp held invitations, round 1\nClosed 2026-10-01 at a1b2c3d by Nick\n")
        ->toContain("- [ ] **Fail** Per-row Send on Ursula: toast \"Invitation sent.\", the row turns Pending\n  - Toast said \"Invitation queued.\" (`/members`)\n")
        ->toContain("## Page nits\n- Sidebar logo is 2px off (`/home`, as arthur)\n")
        ->toContain("## Orphaned\n- [x] `old-check`\n");

    Artisan::call('nitpick:results', ['scenario' => 'acme-corp-held-invitations']);

    expect(Artisan::output())->toContain("Open since 2026-10-03 by Nick\n");
});

it('fails for a round that does not exist', function (array $options, string $message) {
    artisan('nitpick:results', ['scenario' => 'acme-corp-held-invitations', ...$options])
        ->expectsOutputToContain($message)
        ->assertFailed();
})->with([
    'a number with no round' => [['--round' => '9'], 'The scenario acme-corp-held-invitations has no round 9.'],
    'a round option that is not a number' => [['--round' => 'first'], 'The --round option takes "latest" or a round number.'],
]);

it('fails for a scenario with no rounds', function () {
    artisan('nitpick:results', ['scenario' => 'demo-scenario'])
        ->expectsOutputToContain('The scenario demo-scenario has no rounds.')
        ->assertFailed();
});
