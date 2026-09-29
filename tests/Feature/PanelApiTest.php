<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Workbench\App\Models\User;
use Workbench\Database\Seeders\DatabaseSeeder;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

it('lists the scenarios in the same shape as nitpick:scenarios --json', function () {
    Artisan::call('nitpick:scenarios', ['--json' => true]);

    getJson('/nitpick/scenarios')
        ->assertOk()
        ->assertExactJson(['data' => json_decode(Artisan::output(), true)])
        ->assertJsonPath('data.0.slug', 'demo-scenario');
});

it('answers the current login for the pill', function () {
    seed(DatabaseSeeder::class);

    getJson('/nitpick/user')->assertOk()->assertExactJson(['user' => null]);

    $mia = User::query()->where('email', 'mia@workbench.test')->sole();
    actingAs($mia);

    getJson('/nitpick/user')
        ->assertOk()
        ->assertExactJson(['user' => ['id' => $mia->id, 'email' => 'mia@workbench.test', 'name' => 'Mia Member']]);
});
