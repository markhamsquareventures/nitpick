<?php

use function Pest\Laravel\call;

$packageRoutes = [
    'login' => ['POST', 'nitpick/login'],
    'users' => ['GET', 'nitpick/users?search=a'],
    'reset' => ['POST', 'nitpick/reset'],
    'mails' => ['GET', 'nitpick/mails'],
    'mail html' => ['GET', 'nitpick/mails/1'],
    'queue size' => ['GET', 'nitpick/queue'],
    'queue work' => ['POST', 'nitpick/queue'],
    'scenarios' => ['GET', 'nitpick/scenarios'],
    'current user' => ['GET', 'nitpick/user'],
    'open round' => ['GET', 'nitpick/round'],
    'start round' => ['POST', 'nitpick/rounds'],
    'close round' => ['PATCH', 'nitpick/rounds/1'],
    'set result' => ['PUT', 'nitpick/rounds/1/results/listed'],
    'unset result' => ['DELETE', 'nitpick/rounds/1/results/listed'],
    'add nit' => ['POST', 'nitpick/rounds/1/nits'],
    'delete nit' => ['DELETE', 'nitpick/rounds/1/nits/1'],
    'panel script' => ['GET', 'nitpick/panel.js'],
];

beforeEach(function () {
    $this->appConfig = ['app.url' => 'http://qa-app.test:8765'];
    $this->reloadApplication();
});

it('answers 404 to a local request for a different host', function (string $method, string $uri) {
    call($method, "http://other.test/{$uri}")->assertNotFound();
})->with($packageRoutes);

it('registers no route outside the local environment', function (string $method, string $uri) {
    $this->appEnvironment = 'production';
    $this->reloadApplication();

    call($method, "http://qa-app.test/{$uri}")->assertNotFound();
})->with($packageRoutes);
