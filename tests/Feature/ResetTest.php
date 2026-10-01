<?php

use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Support\Facades\DB;
use MarkhamSq\Nitpick\Models\Mail;
use Workbench\App\Models\User;

use function Pest\Laravel\assertAuthenticatedAs;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\postJson;
use function Pest\Laravel\withoutMiddleware;

beforeEach(function () {
    withoutMiddleware(PreventRequestForgery::class);

    DB::connection('nitpick')->table('rounds')->insert(['scenario' => 'DemoScenario', 'number' => 1, 'tester' => 'Nick']);

    Mail::query()->create(['to' => 'ursula@example.test', 'subject' => 'Invitation', 'links' => []]);
});

it('runs the reset command and the scenario setUp(), keeps the store, and logs in as the persona', function () {
    postJson('/nitpick/reset', ['scenario' => 'demo-scenario', 'persona' => 'vera'])
        ->assertOk()
        ->assertJsonPath('user.email', 'vera@workbench.test')
        ->assertJsonPath('output', fn (string $output) => str_contains($output, 'Seeding database'));

    assertAuthenticatedAs(User::query()->where('email', 'vera@workbench.test')->sole());

    expect(User::query()->count())->toBe(4)
        ->and(DB::connection('nitpick')->table('rounds')->count())->toBe(1)
        ->and(Mail::query()->count())->toBe(1);
});

it('answers the home of the persona as the redirect after a reset', function () {
    postJson('/nitpick/reset', ['scenario' => 'demo-scenario', 'persona' => 'mia'])
        ->assertOk()
        ->assertJsonPath('user.email', 'mia@workbench.test')
        ->assertJsonPath('redirect', '/?landing=mia');
});

it('runs only the reset command for a request that names an email', function () {
    postJson('/nitpick/reset', ['email' => 'arthur@workbench.test'])
        ->assertOk()
        ->assertJsonPath('user.email', 'arthur@workbench.test');

    expect(User::query()->where('email', 'vera@workbench.test')->exists())->toBeFalse();
});

it('stays a guest after a reset for the guest persona', function () {
    postJson('/nitpick/reset', ['scenario' => 'demo-scenario', 'persona' => 'guest'])
        ->assertOk()
        ->assertJsonPath('user', null);

    assertGuest();
});

it('answers a failed reset command with its output and does not log in', function () {
    config()->set('nitpick.reset_command', 'migrate:fresh --seeder=MissingSeeder');

    postJson('/nitpick/reset', ['email' => 'arthur@workbench.test'])
        ->assertInternalServerError()
        ->assertJsonPath('message', 'The reset command failed.')
        ->assertJsonPath('output', fn (string $output) => str_contains($output, 'MissingSeeder'));

    assertGuest();

    expect(DB::connection('nitpick')->table('rounds')->count())->toBe(1);
});

it('answers a setUp() that throws with its message and does not log in', function () {
    config()->set('nitpick.scenarios', ['path' => __DIR__.'/../Fixtures/ResetScenarios', 'namespace' => 'MarkhamSq\\Nitpick\\Tests\\Fixtures\\ResetScenarios']);

    postJson('/nitpick/reset', ['scenario' => 'broken-set-up-scenario', 'persona' => 'arthur'])
        ->assertInternalServerError()
        ->assertJsonPath('message', 'The setUp() of the scenario Broken set up scenario failed.')
        ->assertJsonPath('output', fn (string $output) => str_contains($output, 'The Acme Corp factory is broken.'));

    assertGuest();
});

it('answers a persona that setUp() did not make with a 422 that names the scenario and the persona', function () {
    config()->set('nitpick.scenarios', ['path' => __DIR__.'/../Fixtures/ResetScenarios', 'namespace' => 'MarkhamSq\\Nitpick\\Tests\\Fixtures\\ResetScenarios']);

    postJson('/nitpick/reset', ['scenario' => 'missing-persona-scenario', 'persona' => 'ursula'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['persona' => 'The setUp() of the scenario Missing persona scenario did not make a user for the persona ursula (ursula@workbench.test).']);

    assertGuest();
});
