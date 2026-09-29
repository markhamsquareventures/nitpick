<?php

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Artisan;
use Workbench\App\Scenarios\DemoScenario;

use function Pest\Laravel\artisan;

it('prints the workbench demo scenario as JSON', function () {
    Artisan::call('nitpick:scenarios', ['--json' => true]);

    $scenarios = json_decode(Artisan::output(), true, flags: JSON_THROW_ON_ERROR);

    expect($scenarios)->toHaveCount(1);

    expect($scenarios[0])
        ->class->toBe(DemoScenario::class)
        ->slug->toBe('demo-scenario')
        ->title->toBe('Demo scenario')
        ->personas->toBe([
            ['key' => 'arthur', 'label' => 'Arthur Admin', 'email' => 'arthur@workbench.test'],
            ['key' => 'mia', 'label' => 'Mia Member', 'email' => 'mia@workbench.test'],
            ['key' => 'vera', 'label' => 'Vera Visitor', 'email' => 'vera@workbench.test'],
        ]);

    $groups = collect($scenarios[0]['groups']);

    expect($groups->map(fn (array $group) => Arr::only($group, ['type', 'title', 'persona', 'retest']))->all())->toBe([
        ['type' => 'section', 'title' => null, 'persona' => 'arthur', 'retest' => null],
        ['type' => 'section', 'title' => null, 'persona' => 'mia', 'retest' => null],
        ['type' => 'handoff', 'title' => 'Mia hands off to a guest', 'persona' => null, 'retest' => null],
        ['type' => 'section', 'title' => null, 'persona' => 'arthur', 'retest' => 2],
    ]);

    expect($groups[0]['items'][0])->toBe([
        'key' => substr(hash('sha256', 'The start page loads'), 0, 12),
        'text' => 'The start page loads',
        'url' => '/',
        'setup' => null,
        'persona' => 'arthur',
    ]);

    expect(collect($groups[2]['items'])->pluck('persona')->all())->toBe(['mia', 'guest'])
        ->and($groups[3]['items'][0]['key'])->toBe('arthur-after-reset');
});

it('prints a table for each scenario without --json', function () {
    artisan('nitpick:scenarios')
        ->expectsOutputToContain('Demo scenario')
        ->expectsOutputToContain('arthur-after-reset')
        ->assertSuccessful();
});

it('prints an empty list when the scenario directory does not exist', function () {
    config()->set('nitpick.scenarios.path', "{$this->storagePath}/missing");

    Artisan::call('nitpick:scenarios', ['--json' => true]);

    expect(json_decode(Artisan::output(), true))->toBe([]);
});

it('writes a scenario stub that works with the API and refuses to overwrite it', function () {
    config()->set('nitpick.scenarios', [
        'path' => "{$this->storagePath}/tests/Scenarios",
        'namespace' => 'Tests\\Scenarios',
    ]);

    $path = "{$this->storagePath}/tests/Scenarios/AcmeCorpHeldInvitations.php";

    artisan('make:nitpick-scenario', ['name' => 'AcmeCorpHeldInvitations'])->assertSuccessful();

    require $path;

    $scenario = app('Tests\\Scenarios\\AcmeCorpHeldInvitations')->toArray();

    expect($scenario['slug'])->toBe('acme-corp-held-invitations')
        ->and($scenario['personas'])->toHaveCount(1)
        ->and($scenario['groups'][0]['items'])->toHaveCount(1);

    file_put_contents($path, '<?php // edited by hand');

    artisan('make:nitpick-scenario', ['name' => 'AcmeCorpHeldInvitations'])
        ->expectsOutputToContain('Scenario already exists.');

    expect(file_get_contents($path))->toBe('<?php // edited by hand');
});

it('refuses two scenarios with the same slug and names both classes', function () {
    config()->set('nitpick.scenarios', [
        'path' => __DIR__.'/../Fixtures/SlugClash',
        'namespace' => 'MarkhamSq\\Nitpick\\Tests\\Fixtures\\SlugClash',
    ]);

    artisan('nitpick:scenarios');
})->throws(LogicException::class, "The scenarios MarkhamSq\\Nitpick\\Tests\\Fixtures\\SlugClash\\First\\Invitations and MarkhamSq\\Nitpick\\Tests\\Fixtures\\SlugClash\\Second\\Invitations have the same slug 'invitations'. Rename one of the classes.");
