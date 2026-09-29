<?php

use Illuminate\Support\Facades\Mail as MailFacade;
use Illuminate\Support\Facades\Route;
use MarkhamSq\Nitpick\Models\Mail;
use MarkhamSq\Nitpick\Tests\Fixtures\InvitationMail;

use function Pest\Laravel\get;

beforeEach(function () {
    $this->appConfig = ['app.url' => 'http://qa-app.test:8765', 'mail.default' => 'array'];
    $this->reloadApplication();
});

it('puts one script tag before the last </body> of a full HTML page', function () {
    Route::middleware('web')->get('/two-bodies', fn () => '<html><body><template></body></template><p>Page</p></body></html>');

    $content = get('http://qa-app.test/two-bodies')->assertOk()->getContent();

    expect(substr_count($content, '<script'))->toBe(1)
        ->and($content)->toMatch('#<p>Page</p><script src="http://qa-app.test/nitpick/panel\.js\?id=[0-9a-f]{32}" defer></script></body></html>$#');
});

it('serves the built bundle at the URL of the script tag', function () {
    $content = get('http://qa-app.test/')->getContent();

    preg_match('#<script src="([^"]+)"#', $content, $matches);

    get(html_entity_decode($matches[1]))
        ->assertOk()
        ->assertHeader('Content-Type', 'text/javascript; charset=utf-8')
        ->assertHeader('Cache-Control', 'immutable, max-age=31536000, public')
        ->assertHeader('X-Content-Type-Options', 'nosniff')
        ->assertStreamedContent(file_get_contents(dirname(__DIR__, 2).'/dist/panel.js'));
});

it('does not put the script into a response that is not a full HTML page', function (Closure $defineRoute, array $headers) {
    Route::middleware('web')->get('/probe', $defineRoute);

    $response = get('http://qa-app.test/probe', $headers);

    expect($response->baseResponse->getStatusCode())->toBeLessThan(400)
        ->and((string) $response->baseResponse->getContent())->not->toContain('nitpick/panel.js');
})->with([
    'XHR' => [fn () => '<body></body>', ['X-Requested-With' => 'XMLHttpRequest']],
    'Inertia' => [fn () => '<body></body>', ['X-Inertia' => 'true']],
    'Livewire' => [fn () => '<body></body>', ['X-Livewire' => '1']],
    'JSON request' => [fn () => '<body></body>', ['Accept' => 'application/json']],
    'JSON response' => [fn () => response()->json(['html' => '<body></body>'], 200, [], JSON_UNESCAPED_SLASHES), []],
    'non-HTML' => [fn () => response('<body></body>', 200, ['Content-Type' => 'text/plain']), []],
    'redirect' => [fn () => redirect('/'), []],
    'streamed' => [fn () => response()->stream(fn () => print ('<body></body>'), 200, ['Content-Type' => 'text/html']), []],
    'binary file' => [fn () => response()->file(__FILE__, ['Content-Type' => 'text/html']), []],
    'attachment' => [fn () => response('<body></body>', 200, ['Content-Disposition' => 'attachment; filename="page.html"']), []],
]);

it('does not put the script into the mail HTML of the panel', function () {
    MailFacade::to('ursula@example.test')->send(new InvitationMail);

    get('http://qa-app.test/nitpick/mails/'.Mail::query()->sole()->id)
        ->assertOk()
        ->assertDontSee('nitpick/panel.js');
});

it('does not put the script into a page for a different host', function () {
    get('http://other.test/')->assertOk()->assertDontSee('nitpick/panel.js');
});

it('does not put the script into a page outside the local environment', function () {
    $this->appEnvironment = 'production';
    $this->reloadApplication();

    get('http://qa-app.test/')->assertOk()->assertDontSee('nitpick/panel.js');
});
