<?php

use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail as MailFacade;
use MarkhamSq\Nitpick\Models\Mail;
use MarkhamSq\Nitpick\Tests\Fixtures\InvitationMail;

use function Pest\Laravel\get;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\withoutMiddleware;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->appConfig = ['mail.default' => 'array', 'queue.default' => 'database'];
    $this->reloadApplication();
    withoutMiddleware(PreventRequestForgery::class);
});

it('stores a sent mail with its links and no open round', function () {
    MailFacade::to('ursula@example.test')->send(new InvitationMail);

    $mail = Mail::query()->sole();

    expect($mail->to)->toBe('ursula@example.test')
        ->and($mail->subject)->toBe('You are invited to Acme Corp')
        ->and($mail->html)->toContain('Hi Ursula.')
        ->and($mail->links)->toBe(['https://app.test/invitations/abc', 'https://app.test/help'])
        ->and($mail->round_id)->toBeNull()
        ->and($mail->sent_at)->not->toBeNull();
});

it('stores a sent mail with the open round', function () {
    $closedRoundId = DB::connection('nitpick')->table('rounds')->insertGetId(['scenario' => 'DemoScenario', 'number' => 1, 'status' => 'closed', 'tester' => 'Nick']);
    $openRoundId = DB::connection('nitpick')->table('rounds')->insertGetId(['scenario' => 'DemoScenario', 'number' => 2, 'tester' => 'Nick']);

    MailFacade::to('ursula@example.test')->send(new InvitationMail);

    expect(Mail::query()->sole()->round_id)->toBe($openRoundId)->not->toBe($closedRoundId);
});

it('stores a queued mail only after the queue route works the queue', function () {
    MailFacade::to('ursula@example.test')->queue(new InvitationMail);

    expect(Mail::query()->count())->toBe(0);

    getJson('/nitpick/queue')->assertOk()->assertExactJson(['size' => 1]);

    postJson('/nitpick/queue')
        ->assertOk()
        ->assertJsonPath('exit_code', 0)
        ->assertJsonPath('size', 0);

    expect(Mail::query()->sole()->subject)->toBe('You are invited to Acme Corp');

    getJson('/nitpick/queue')->assertExactJson(['size' => 0]);
});

it('lists the mails newest first without their HTML', function () {
    MailFacade::to('first@example.test')->send(new InvitationMail);
    MailFacade::to('second@example.test')->send(new InvitationMail);

    getJson('/nitpick/mails')
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0.to', 'second@example.test')
        ->assertJsonPath('data.1.to', 'first@example.test')
        ->assertJsonPath('data.0.links', ['https://app.test/invitations/abc', 'https://app.test/help'])
        ->assertJsonMissingPath('data.0.html');
});

it('serves the mail HTML with headers that stop its scripts', function () {
    MailFacade::to('ursula@example.test')->send(new InvitationMail);

    get('/nitpick/mails/'.Mail::query()->sole()->id)
        ->assertOk()
        ->assertSee('Hi Ursula.', false)
        ->assertHeader('Content-Type', 'text/html; charset=utf-8')
        ->assertHeader('Content-Security-Policy', "sandbox; script-src 'none'")
        ->assertHeader('X-Content-Type-Options', 'nosniff');
});

it('answers 404 for a mail that does not exist', function () {
    get('/nitpick/mails/999')->assertNotFound();
});
