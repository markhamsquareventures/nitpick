<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;

use function Pest\Laravel\artisan;
use function Pest\Laravel\get;

$packageTables = ['rounds', 'results', 'nits', 'mails'];

function insertRound(): void
{
    DB::connection('nitpick')->table('rounds')->insert([
        'scenario' => 'AcmeCorpHeldInvitations',
        'number' => 1,
        'tester' => 'Nick',
    ]);
}

it('makes the store the first time a gated request needs it', function () use ($packageTables) {
    Route::get('/store-probe', fn () => DB::connection('nitpick')->table('rounds')->count());

    expect(storage_path('nitpick/nitpick.sqlite'))->not->toBeFile();

    get('/store-probe')->assertOk()->assertSee('0');

    expect(storage_path('nitpick/nitpick.sqlite'))->toBeFile();

    foreach ($packageTables as $table) {
        expect(Schema::connection('nitpick')->hasTable($table))->toBeTrue();
    }
});

it('keeps the package tables and their rows when the app runs migrate:fresh', function () use ($packageTables) {
    insertRound();

    artisan('migrate:fresh')->assertSuccessful();

    expect(DB::connection('nitpick')->table('rounds')->count())->toBe(1);

    foreach ($packageTables as $table) {
        expect(Schema::hasTable($table))->toBeFalse();
    }
});

it('makes the store with nitpick:install', function (string $environment) use ($packageTables) {
    $this->appEnvironment = $environment;
    $this->reloadApplication();

    artisan('nitpick:install')->assertSuccessful();

    expect(storage_path('nitpick/nitpick.sqlite'))->toBeFile();

    foreach ($packageTables as $table) {
        expect(Schema::connection('nitpick')->hasTable($table))->toBeTrue();
    }
})->with(['local', 'production']);

it('keeps the rows when nitpick:install runs again', function () {
    artisan('nitpick:install')->assertSuccessful();
    insertRound();

    artisan('nitpick:install')->assertSuccessful();

    expect(DB::connection('nitpick')->table('rounds')->count())->toBe(1);
});

it('uses the nitpick connection that the app defines', function () {
    $appDatabase = "{$this->storagePath}/app-defined/nitpick.sqlite";

    $this->appConfig = ['database.connections.nitpick' => [
        'driver' => 'sqlite',
        'database' => $appDatabase,
        'prefix' => '',
        'foreign_key_constraints' => true,
    ]];
    $this->reloadApplication();

    artisan('nitpick:install')->assertSuccessful();

    expect($appDatabase)->toBeFile()
        ->and(storage_path('nitpick/nitpick.sqlite'))->not->toBeFile();
});
