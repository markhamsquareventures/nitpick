<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use MarkhamSq\Nitpick\LocalGate;

use function Pest\Laravel\get;

function defineGateProbeRoute(): void
{
    Route::get('/gate-probe', function (Request $request) {
        abort_unless(LocalGate::allowsRequest($request), 404);

        return 'open';
    });
}

beforeEach(function () {
    $this->appConfig = ['app.url' => 'http://QA-App.test:8765'];
    $this->reloadApplication();

    defineGateProbeRoute();
});

it('lets a local request to the APP_URL host through', function () {
    get('http://qa-app.test/gate-probe')
        ->assertOk()
        ->assertSee('open');
});

it('ignores a local request to a different host', function () {
    get('http://other.test/gate-probe')->assertNotFound();
});

it('ignores every request and registers no listener outside the local environment', function () {
    $this->appEnvironment = 'production';
    $this->reloadApplication();
    defineGateProbeRoute();

    get('http://qa-app.test/gate-probe')->assertNotFound();

    DB::connection('nitpick');

    expect(storage_path('nitpick/nitpick.sqlite'))->not->toBeFile();
});
