<?php

use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Testing\TestResponse;
use MarkhamSq\Nitpick\Tests\Fixtures\FillScenarios\FillScenario;

use function Pest\Laravel\postJson;
use function Pest\Laravel\withoutMiddleware;

beforeEach(function () {
    withoutMiddleware(PreventRequestForgery::class);

    config()->set('nitpick.scenarios', ['path' => __DIR__.'/../Fixtures/FillScenarios', 'namespace' => 'MarkhamSq\\Nitpick\\Tests\\Fixtures\\FillScenarios']);

    FillScenario::$runs = 0;
});

function fill(string $item, string $scenario = 'fill-scenario'): TestResponse
{
    return postJson('/nitpick/fill', ['scenario' => $scenario, 'item' => $item]);
}

it('answers a static fill in declaration order, with scalars as strings and bool and list values kept', function () {
    fill('static')
        ->assertOk()
        ->assertExactJson(['fields' => [
            ['key' => '#name', 'value' => 'Ada'],
            ['key' => '#age', 'value' => '36'],
            ['key' => '#clear', 'value' => ''],
            ['key' => '#terms', 'value' => true],
            ['key' => '#newsletter', 'value' => false],
            ['key' => '#roles', 'value' => ['admin', 'editor']],
        ]]);
});

it('runs a closure value and drops a key whose value is null', function () {
    fill('per-value')
        ->assertOk()
        ->assertExactJson(['fields' => [
            ['key' => '#first', 'value' => 'fixed'],
            ['key' => '#counter', 'value' => 'run 1'],
        ]]);
});

it('runs a closure that returns the whole fill', function () {
    fill('whole')
        ->assertOk()
        ->assertExactJson(['fields' => [['key' => '#counter', 'value' => 'run 1']]]);
});

it('runs the closures again on each request', function (string $item) {
    $first = collect(fill($item)->json('fields'))->firstWhere('key', '#counter')['value'];
    $second = collect(fill($item)->json('fields'))->firstWhere('key', '#counter')['value'];

    expect($first)->toBe('run 1')
        ->and($second)->toBe('run 2');
})->with(['per-value', 'whole']);

it('fills an item of a handoff', function () {
    fill('handoff')
        ->assertOk()
        ->assertExactJson(['fields' => [['key' => '#email', 'value' => 'guest@example.test']]]);
});

it('answers 422 for a missing body', function () {
    postJson('/nitpick/fill', [])->assertUnprocessable()->assertJsonValidationErrors(['scenario', 'item']);
});

it('answers 422 for an unknown scenario', function () {
    fill('static', 'missing')
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['scenario' => 'There is no scenario with the slug missing.']);
});

it('answers 422 for an unknown item', function () {
    fill('missing')
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['item' => 'The scenario Fill scenario has no item with the key missing.']);
});

it('answers 422 for an item with no fill', function () {
    fill('plain')
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['item' => 'The item plain of the scenario Fill scenario has no fill.']);
});

it('answers 422 and names the scenario, the item and the key for a value that a form cannot take', function (string $item, string $key, string $type) {
    fill($item)
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['item' => "The fill of the item {$item} in the scenario Fill scenario, for the key {$key}, gave a value that a form cannot take: {$type}."]);
})->with([
    'object' => ['object', '#name', 'stdClass'],
    'nested list' => ['nested', '#roles', 'array'],
    'keyed array' => ['keyed', '#roles', 'array'],
]);

it('answers 422 for a whole closure that does not return an array', function () {
    fill('not-array')
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['item' => 'The fill of the item not-array in the scenario Fill scenario must return an array of selector => value, but it returned string.']);
});

it('reports a closure that throws and answers 500 with the message and the output', function (string $item, string $output) {
    $reported = [];

    app(ExceptionHandler::class)->reportable(function (Throwable $exception) use (&$reported) {
        $reported[] = $exception->getMessage();
    });

    fill($item)
        ->assertInternalServerError()
        ->assertExactJson([
            'message' => "The fill of the item {$item} in the scenario Fill scenario failed.",
            'output' => $output,
        ]);

    expect($reported)->toBe([$output]);
})->with([
    'value closure' => ['throws', 'The factory is broken.'],
    'whole closure' => ['throws-whole', 'The whole fill is broken.'],
]);

it('shows the fill keys of each item in nitpick:scenarios --json, with no values', function () {
    Artisan::call('nitpick:scenarios', ['--json' => true]);

    $items = collect(json_decode(Artisan::output(), true, flags: JSON_THROW_ON_ERROR)[0]['groups'])
        ->flatMap(fn (array $group) => $group['items'])
        ->pluck('fill', 'key');

    expect($items['static'])->toBe(['#name', '#age', '#clear', '#terms', '#newsletter', '#skip', '#roles'])
        ->and($items['per-value'])->toBe(['#first', '#counter', '#skipped'])
        ->and($items['whole'])->toBe([])
        ->and($items['plain'])->toBeNull()
        ->and($items['handoff'])->toBe(['#email']);
});
