<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Tests\Fixtures\LooseScenario;
use Orchestra\Testbench\Concerns\WithLaravelMigrations;
use Workbench\App\Scenarios\DemoScenario;

use function MarkhamSq\Nitpick\scenario;
use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class, WithLaravelMigrations::class);

it('runs the setup and returns the personas as users for actingAs()', function () {
    Route::get('/whoami', fn () => auth()->user()->email);

    $personas = scenario(DemoScenario::class);

    expect(array_keys($personas))->toBe(['arthur', 'mia', 'vera']);

    actingAs($personas['arthur'])->get('/whoami')->assertSee('arthur@workbench.test');
    actingAs($personas['mia'])->get('/whoami')->assertSee('mia@workbench.test');
    actingAs($personas['vera'])->get('/whoami')->assertSee('vera@workbench.test');
});

it('names the persona and the email when the setup did not make that user', function () {
    app()->bind(LooseScenario::class, fn () => new LooseScenario(fn (Checklist $checklist) => $checklist));

    expect(fn () => scenario(LooseScenario::class))->toThrow(
        LogicException::class,
        "declares the persona 'arthur' with the email nobody@acmecorp.test, but setUp() did not make a user with that email.",
    );
});
