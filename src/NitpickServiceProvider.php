<?php

namespace MarkhamSq\Nitpick;

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Database\Events\ConnectionEstablished;
use Illuminate\Mail\Events\MessageSent;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use MarkhamSq\Nitpick\Actions\MigrateStore;
use MarkhamSq\Nitpick\Commands\InstallCommand;
use MarkhamSq\Nitpick\Commands\MakeScenarioCommand;
use MarkhamSq\Nitpick\Commands\ResultsCommand;
use MarkhamSq\Nitpick\Commands\ScenariosCommand;
use MarkhamSq\Nitpick\Http\Controllers\FillController;
use MarkhamSq\Nitpick\Http\Controllers\LoginController;
use MarkhamSq\Nitpick\Http\Controllers\MailsController;
use MarkhamSq\Nitpick\Http\Controllers\NitsController;
use MarkhamSq\Nitpick\Http\Controllers\PanelScriptController;
use MarkhamSq\Nitpick\Http\Controllers\QueueController;
use MarkhamSq\Nitpick\Http\Controllers\ResetController;
use MarkhamSq\Nitpick\Http\Controllers\ResultsController;
use MarkhamSq\Nitpick\Http\Controllers\RoundController;
use MarkhamSq\Nitpick\Http\Controllers\RoundsController;
use MarkhamSq\Nitpick\Http\Controllers\ScenariosController;
use MarkhamSq\Nitpick\Http\Controllers\UserController;
use MarkhamSq\Nitpick\Http\Controllers\UsersController;
use MarkhamSq\Nitpick\Http\Middleware\EnsureLocalRequest;
use MarkhamSq\Nitpick\Http\Middleware\InjectPanel;
use MarkhamSq\Nitpick\Listeners\StoreSentMail;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class NitpickServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('nitpick')
            ->hasConfigFile()
            ->hasCommands([
                InstallCommand::class,
                MakeScenarioCommand::class,
                ResultsCommand::class,
                ScenariosCommand::class,
            ]);
    }

    public function packageBooted(): void
    {
        if (config('database.connections.nitpick') === null) {
            config()->set('database.connections.nitpick', [
                'driver' => 'sqlite',
                'database' => storage_path('nitpick/nitpick.sqlite'),
                'prefix' => '',
                'foreign_key_constraints' => true,
            ]);
        }

        if (! LocalGate::allowsEnvironment()) {
            return;
        }

        Event::listen(function (ConnectionEstablished $event) {
            if ($event->connectionName === 'nitpick') {
                app(MigrateStore::class)();
            }
        });

        Event::listen(MessageSent::class, StoreSentMail::class);

        /*
         * The JSON API for the panel. Each route takes the standard Laravel CSRF pair (the
         * XSRF-TOKEN cookie and an X-XSRF-TOKEN header) and needs "Accept: application/json",
         * so that a validation error is a 422 with {message, errors}, not a redirect.
         *
         * POST nitpick/login      {email} or {scenario: slug, persona: key}; persona "guest" logs out
         *                           -> {user: {id, email} or null, redirect}; 422 for an email with no user.
         *                           redirect is the path to open next: the persona's home, or nitpick.home
         * GET  nitpick/users      ?search=part of an email or name -> {data: [{email, name}]}, 10 at most
         * POST nitpick/reset      same body as login; runs nitpick.reset_command, then the setUp()
         *                           of the named scenario (none for an email), then logs in
         *                           -> {user, redirect, output}; 500 {message, output} if the command or setUp()
         *                           fails; 422 if setUp() did not make the persona's user
         * POST nitpick/fill       {scenario: slug, item: key}; runs the fill of the item, and its Closures,
         *                           on each request -> {fields: [{key: selector, value}]} in declaration order.
         *                           value is a string, a bool, or a list of strings; a null value is left out.
         *                           422 for an unknown scenario or item, an item with no fill, or a value
         *                           of a type that a form cannot take; 500 {message, output} if a Closure throws
         * GET  nitpick/mails      -> {data: [{id, round_id, to, subject, text, links, sent_at}]}, newest first
         * GET  nitpick/mails/{id} -> the mail's HTML, with a CSP sandbox header
         * GET  nitpick/queue      -> {size}, the jobs on the default queue connection
         * POST nitpick/queue      runs queue:work --stop-when-empty -> {exit_code, output, size}
         * GET  nitpick/scenarios  -> {data: [...]}, each scenario in the nitpick:scenarios --json shape
         * GET  nitpick/user       -> {user: {id, email, name}} or {user: null}, the current login
         *
         * Rounds. {round} is a round id, {itemKey} an item key. Each write answers {round}, where
         * round is the nitpick:results --json shape (see ResultsCommand). A write to a closed round is a
         * 409 {message}. An item key that is not in the round's checklist is a 422.
         *
         * GET    nitpick/round                     -> {round: {...} or null, next_numbers: {slug: n}},
         *                                               the open round (at most one in the app)
         * POST   nitpick/rounds                    {scenario: slug} -> 201 {round}; 409 while a round is open
         * PATCH  nitpick/rounds/{round}            {status: "closed"} -> {round, reports: [paths]};
         *                                               records the git state, then runs the exporters
         * PUT    nitpick/rounds/{round}/results/{itemKey}  {status: "pass" or "fail"} -> {round}
         * DELETE nitpick/rounds/{round}/results/{itemKey}  -> {round}; the item is untested again
         * POST   nitpick/rounds/{round}/nits       {item_key (null for a page nit), body, url}
         *                                               -> 201 {round}; the server keeps the path and
         *                                               query of url and records the persona of the login
         * DELETE nitpick/rounds/{round}/nits/{nit} -> {round}
         */
        Route::middleware([EnsureLocalRequest::class, 'web'])
            ->withoutMiddleware(InjectPanel::class)
            ->prefix('nitpick')
            ->name('nitpick.')
            ->group(function () {
                Route::get('scenarios', [ScenariosController::class, 'index'])->name('scenarios.index');
                Route::get('user', [UserController::class, 'show'])->name('user.show');
                Route::post('login', [LoginController::class, 'store'])->name('login.store');
                Route::get('users', [UsersController::class, 'index'])->name('users.index');
                Route::apiResource('fill', FillController::class)->only('store');
                Route::post('reset', [ResetController::class, 'store'])->name('reset.store');
                Route::get('mails', [MailsController::class, 'index'])->name('mails.index');
                Route::get('mails/{mail}', [MailsController::class, 'show'])->name('mails.show');
                Route::get('queue', [QueueController::class, 'show'])->name('queue.show');
                Route::post('queue', [QueueController::class, 'store'])->name('queue.store');
                Route::get('round', [RoundController::class, 'show'])->name('round.show');
                Route::apiResource('rounds', RoundsController::class)->only(['store', 'update']);
                Route::apiResource('rounds.results', ResultsController::class)
                    ->only(['update', 'destroy'])
                    ->parameters(['results' => 'itemKey']);
                Route::apiResource('rounds.nits', NitsController::class)->only(['store', 'destroy'])->scoped();
            });

        // The panel's script has no session and no cookies, so it is outside the web group.
        Route::get('nitpick/panel.js', [PanelScriptController::class, 'show'])
            ->middleware(EnsureLocalRequest::class)
            ->name('nitpick.panel-script');

        // The Kernel method, not Router::pushMiddlewareToGroup(): the Kernel copies its own
        // group list to the router each time a group changes, which drops a router-only entry.
        $this->app->make(Kernel::class)->appendMiddlewareToGroup('web', InjectPanel::class);

        // An app that published config/login-link.php keeps its own values.
        if (file_exists(config_path('login-link.php'))) {
            return;
        }

        config()->set([
            'login-link.allowed_hosts' => [parse_url((string) config('app.url'), PHP_URL_HOST)],
            'login-link.automatically_create_missing_users' => false,
        ]);
    }
}
