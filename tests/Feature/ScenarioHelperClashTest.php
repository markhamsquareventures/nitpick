<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Orchestra\Testbench\Concerns\WithLaravelMigrations;
use Workbench\App\Scenarios\DemoScenario;

use function MarkhamSq\Nitpick\scenario as qaScenario;

uses(RefreshDatabase::class, WithLaravelMigrations::class);

function scenario(): string
{
    return 'the app helper';
}

it('does not clash with an app that defines its own scenario() function', function () {
    expect(scenario())->toBe('the app helper')
        ->and(qaScenario(DemoScenario::class))->toHaveKeys(['arthur', 'mia']);
});
