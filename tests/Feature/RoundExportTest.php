<?php

use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Process;
use MarkhamSq\Nitpick\Models\Round;
use Workbench\App\Models\User;

use function Pest\Laravel\actingAs;
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

    $this->appPath = "{$this->storagePath}/app";
    File::ensureDirectoryExists($this->appPath);
    app()->setBasePath($this->appPath);
});

/** Starts the next round of the fixture scenario and closes it at once. Returns the report. */
function closeNextRound(): string
{
    postJson('/nitpick/rounds', ['scenario' => 'acme-corp-held-invitations'])->assertCreated();

    $round = Round::query()->open()->sole();

    $path = patchJson("/nitpick/rounds/{$round->id}", ['status' => 'closed'])->assertOk()->json('reports.0');

    return File::get(base_path($path));
}

function git(string ...$arguments): string
{
    return trim(Process::path(base_path())->run(['git', '-c', 'commit.gpgsign=false', ...$arguments])->throw()->output());
}

it('writes the report of a round in the plan format', function () {
    // Process quotes each argument of an array command, and the fake matches that command line.
    Process::fake([
        "'git' 'config' *" => 'Nick',
        "'git' 'rev-parse' *" => 'a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0',
        "'git' 'status' *" => ' M app/Http/Controllers/MembersController.php',
    ]);

    Round::query()->create(['scenario' => 'acme-corp-held-invitations', 'number' => 1, 'status' => 'closed', 'tester' => 'Nick']);

    travelTo(Carbon::parse('2026-10-03 14:02:11'));
    actingAs(new User(['email' => 'admin@acmecorp.test']));

    postJson('/nitpick/rounds', ['scenario' => 'acme-corp-held-invitations'])->assertCreated();
    $round = Round::query()->open()->sole();

    putJson("/nitpick/rounds/{$round->id}/results/listed", ['status' => 'pass'])->assertOk();
    putJson("/nitpick/rounds/{$round->id}/results/ursula-send", ['status' => 'fail'])->assertOk();
    putJson("/nitpick/rounds/{$round->id}/results/add-member", ['status' => 'pass'])->assertOk();
    putJson("/nitpick/rounds/{$round->id}/results/ursula-toast", ['status' => 'pass'])->assertOk();
    postJson("/nitpick/rounds/{$round->id}/nits", ['item_key' => 'ursula-send', 'body' => 'Toast said "Invitation queued."', 'url' => 'http://127.0.0.1/teams/acme-corp/members'])->assertCreated();
    postJson("/nitpick/rounds/{$round->id}/nits", ['item_key' => null, 'body' => 'Sidebar logo is 2px off', 'url' => 'http://127.0.0.1/home'])->assertCreated();

    $round->results()->create(['item_key' => 'old-check', 'status' => 'pass']);
    $round->nits()->create(['item_key' => 'gone-item', 'body' => 'The old button was blue', 'url' => '/home', 'persona' => 'arthur']);

    travelTo(Carbon::parse('2026-10-03 15:40:52'));

    patchJson("/nitpick/rounds/{$round->id}", ['status' => 'closed'])
        ->assertOk()
        ->assertJsonPath('reports', ['docs/qa/acme-corp-held-invitations/round-2.md']);

    expect(File::get(base_path('docs/qa/acme-corp-held-invitations/round-2.md')))
        ->toBe(File::get(__DIR__.'/../Fixtures/round-2.md'));

    expect($round->refresh())
        ->tester->toBe('Nick')
        ->git_sha->toBe('a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0')
        ->git_dirty->toBeTrue();

    Process::assertRan(fn ($process) => $process->command === ['git', 'status', '--porcelain', '--', '.', ':(exclude)docs/qa']
        && $process->path === base_path());
});

it('closes a round in an app that is not a git repo', function () {
    travelTo(Carbon::parse('2026-10-03 15:40:52'));

    expect(Process::path($this->appPath)->run(['git', 'rev-parse', '--git-dir'])->failed())->toBeTrue();

    $report = closeNextRound();
    $round = Round::query()->sole();

    expect($round)
        ->git_sha->toBeNull()
        ->git_dirty->toBeNull()
        ->and(explode("\n", $report)[1])->toBe("Closed 2026-10-03 with no git commit by {$round->tester}");
});

it('records the git SHA, the dirty flag, and the git user of the app repo', function () {
    git('init', '--quiet');
    git('config', 'user.name', 'Test Tester');
    git('config', 'user.email', 'tester@example.test');
    File::put(base_path('app.php'), "<?php\n");
    git('add', 'app.php');
    git('commit', '--quiet', '-m', 'First commit');

    $head = git('rev-parse', 'HEAD');

    $firstReport = closeNextRound();

    expect(Round::query()->where('number', 1)->sole())
        ->tester->toBe('Test Tester')
        ->git_sha->toBe($head)
        ->git_dirty->toBeFalse()
        ->and(explode("\n", $firstReport)[1])->toEndWith('at '.substr($head, 0, 7).' by Test Tester');

    // The uncommitted report of round 1 is in docs/qa, so it does not make round 2 dirty.
    closeNextRound();

    expect(Round::query()->where('number', 2)->sole()->git_dirty)->toBeFalse();

    File::put(base_path('app.php'), "<?php // changed\n");

    $thirdReport = closeNextRound();

    expect(Round::query()->where('number', 3)->sole()->git_dirty)->toBeTrue()
        ->and(explode("\n", $thirdReport)[1])->toEndWith('at '.substr($head, 0, 7).' (dirty) by Test Tester');
});
