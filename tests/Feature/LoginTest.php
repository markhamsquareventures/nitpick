<?php

use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Workbench\App\Models\User;
use Workbench\Database\Seeders\DatabaseSeeder;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertAuthenticatedAs;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\seed;
use function Pest\Laravel\withoutMiddleware;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->appConfig = ['app.url' => 'http://qa-app.local:8765'];
    $this->reloadApplication();
    withoutMiddleware(PreventRequestForgery::class);

    seed(DatabaseSeeder::class);
});

it('logs in as a persona of a scenario and answers the nitpick.home config as the redirect', function () {
    postJson('http://qa-app.local/nitpick/login', ['scenario' => 'demo-scenario', 'persona' => 'arthur'])
        ->assertOk()
        ->assertJsonPath('user.email', 'arthur@workbench.test')
        ->assertJsonPath('redirect', '/');

    assertAuthenticatedAs(User::query()->where('email', 'arthur@workbench.test')->sole());
});

it('answers the home of the persona as the redirect', function () {
    postJson('http://qa-app.local/nitpick/login', ['scenario' => 'demo-scenario', 'persona' => 'mia'])
        ->assertOk()
        ->assertJsonPath('redirect', '/?landing=mia');
});

it('answers the nitpick.home config as the redirect for a login by email and for the guest persona', function (array $body) {
    config(['nitpick.home' => '/start']);

    postJson('http://qa-app.local/nitpick/login', $body)
        ->assertOk()
        ->assertJsonPath('redirect', '/start');
})->with([
    'by email' => [['email' => 'mia@workbench.test']],
    'guest' => [['scenario' => 'demo-scenario', 'persona' => 'guest']],
]);

it('logs in as any user by email', function () {
    postJson('http://qa-app.local/nitpick/login', ['email' => 'nick@example.test'])
        ->assertOk()
        ->assertJsonPath('user.email', 'nick@example.test');

    assertAuthenticatedAs(User::query()->where('email', 'nick@example.test')->sole());
});

it('answers an email with no user with a 422, not a 500', function () {
    postJson('http://qa-app.local/nitpick/login', ['email' => 'nobody@example.test'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email' => 'There is no user with the email nobody@example.test.']);

    assertGuest();
});

it('answers an unknown scenario or persona with a 422', function (array $body, string $field) {
    postJson('http://qa-app.local/nitpick/login', $body)->assertJsonValidationErrorFor($field);

    assertGuest();
})->with([
    'unknown scenario' => [['scenario' => 'no-such-scenario', 'persona' => 'arthur'], 'scenario'],
    'unknown persona' => [['scenario' => 'demo-scenario', 'persona' => 'zelda'], 'persona'],
    'no email and no persona' => [[], 'email'],
]);

it('logs out for the guest persona', function () {
    actingAs(User::query()->where('email', 'mia@workbench.test')->sole());

    postJson('http://qa-app.local/nitpick/login', ['scenario' => 'demo-scenario', 'persona' => 'guest'])
        ->assertOk()
        ->assertJsonPath('user', null);

    assertGuest();
});

it('finds users by part of an email or a name', function (string $search, array $emails) {
    getJson('http://qa-app.local/nitpick/users?search='.urlencode($search))
        ->assertOk()
        ->assertExactJson(['data' => array_map(
            fn (string $email) => User::query()->where('email', $email)->sole()->only(['email', 'name']),
            $emails,
        )]);
})->with([
    'part of an email' => ['workbench', ['arthur@workbench.test', 'mia@workbench.test']],
    'part of a name' => ['Member', ['mia@workbench.test']],
    'no match' => ['zelda', []],
]);
