<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use MarkhamSq\Nitpick\Models\Nit;
use MarkhamSq\Nitpick\Models\Result;
use MarkhamSq\Nitpick\Models\Round;
use Pest\Browser\Api\PendingAwaitablePage;
use Workbench\Database\Seeders\DatabaseSeeder;

use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

// The login-link host check reads APP_URL at boot. The browser server runs on 127.0.0.1.
beforeEach(function () {
    $this->appConfig = ['app.url' => 'http://127.0.0.1'];
    $this->reloadApplication();
    seed(DatabaseSeeder::class);
});

/** A JavaScript expression that finds an element in the panel's shadow root. */
function inPanel(string $selector): string
{
    return "document.querySelector('nitpick-panel').shadowRoot.querySelector('{$selector}')";
}

function itemKey(string $text): string
{
    return substr(hash('sha256', $text), 0, 12);
}

/** The status box of the item with this text. */
function box(string $text): string
{
    return "li.item:has(.check-text:text-is(\"{$text}\")) .box";
}

/** The row of the item with this text. */
function row(string $text): string
{
    return "li.item:has(.check-text:text-is(\"{$text}\"))";
}

/**
 * Counts the panel's requests that have no answer yet in window.qaInFlight. A request whose
 * path holds $slowPath waits $delay ms before it goes to the server, and window.qaSent keeps
 * the method of each request to that path.
 */
function trackRequests(PendingAwaitablePage $page, string $slowPath = '', int $delay = 0): void
{
    $page->script(<<<JS
        (() => {
            const original = window.fetch;
            let slowCount = 0;
            window.qaInFlight = 0;
            window.qaSent = [];
            window.fetch = async (input, init = {}) => {
                window.qaInFlight++;

                try {
                    if ('{$slowPath}' !== '' && String(input).includes('{$slowPath}')) {
                        window.qaSent.push(init.method ?? 'GET');

                        if (slowCount++ === 0) {
                            await new Promise((resolve) => setTimeout(resolve, {$delay}));
                        }
                    }

                    return await original(input, init);
                } finally {
                    window.qaInFlight--;
                }
            };
        })()
        JS);
}

/** Waits until each request of the panel has its answer. */
function settle(PendingAwaitablePage $page): void
{
    $page->script(<<<'JS'
        new Promise((resolve) => {
            const check = () => (window.qaInFlight === 0 ? setTimeout(() => resolve(true), 50) : setTimeout(check, 20));
            check();
        })
        JS);
}

it('logs in from a section, starts a round, and saves a nit inline after two clicks give Fail', function () {
    $page = visit('/');
    $item = 'The panel shows Mia Member as the current persona';

    $page->assertSeeIn('#current-user', 'guest')
        ->click('.pill')
        ->assertVisible('#qa-card')
        ->assertScript("document.querySelectorAll('nitpick-panel').length", 1)
        ->assertScript("document.querySelector('nitpick-panel').parentElement === document.documentElement")
        ->assertDisabled(box($item))
        ->assertAttribute(box($item), 'title', 'Start a round to record results and nits')
        ->click('[data-focus-key="login:1:mia"]')
        ->waitForText('mia@workbench.test')
        ->assertSeeIn('#current-user', 'mia@workbench.test')
        ->assertQueryStringHas('landing', 'mia')
        ->assertVisible('#qa-card')
        ->assertSeeIn('[data-focus-key="login:1:mia"]', 'Current')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        ->assertEnabled(box($item))
        ->click(box($item))
        ->click(box($item))
        ->assertAttribute(box($item), 'aria-label', "{$item}, failed, press to clear")
        ->assertAriaAttribute(row($item).' .item-toggle', 'expanded', 'true')
        ->assertScript("document.querySelector('nitpick-panel').shadowRoot.activeElement.placeholder", 'Add a nit…')
        ->type(row($item).' .nit-field input', 'The pill wraps at 320px')
        ->keys(row($item).' .nit-field input', 'Enter')
        ->waitForText('The pill wraps at 320px')
        ->assertSeeIn(row($item).' .nit-path', '/')
        ->assertDontSeeIn(row($item).' .nit', 'Mia Member')
        ->assertSeeIn(row($item).' .nit-count', '1 nit')
        ->assertValue(row($item).' .nit-field input', '')
        ->assertScript(inPanel('dialog').' === null')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-inline-nit');

    $round = Round::query()->open()->sole();

    expect($round->scenario)->toBe('demo-scenario')
        ->and(Result::query()->sole())
        ->item_key->toBe(itemKey($item))
        ->status->value->toBe('fail')
        ->and(Nit::query()->sole())
        ->round_id->toBe($round->id)
        ->item_key->toBe(itemKey($item))
        ->body->toBe('The pill wraps at 320px')
        ->url->toBe('/?landing=mia')
        ->persona->toBe('mia');
});

it('deletes a nit through the inline two-step confirm', function () {
    $page = visit('/');
    $item = 'The panel shows Mia Member as the current persona';

    $page->click('.pill')
        ->click('[data-focus-key="login:1:mia"]')
        ->waitForText('mia@workbench.test')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        ->click(box($item))
        ->click(box($item))
        ->type(row($item).' .nit-field input', 'The pill wraps at 320px')
        ->keys(row($item).' .nit-field input', 'Enter')
        ->waitForText('The pill wraps at 320px')
        ->assertCount(row($item).' .nit', 1)
        ->click(row($item).' .nit .icon-button')
        ->assertSee('Delete this nit?')
        ->assertVisible(row($item).' .nit .confirm')
        ->screenshot(filename: 'panel-nit-confirm')
        ->click(row($item).' .nit .confirm >> text=Cancel')
        ->assertDontSee('Delete this nit?')
        ->assertCount(row($item).' .nit', 1)
        ->click(row($item).' .nit .icon-button')
        ->click(row($item).' .nit .confirm .danger')
        ->assertNotPresent(row($item).' .nit-count')
        ->assertNoJavaScriptErrors();

    expect(Nit::query()->count())->toBe(0);
});

it('adds a page nit from the pinned composer', function () {
    $page = visit('/');

    $page->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        ->type('.composer-input', 'The footer links are 2px off the grid')
        ->keys('.composer-input', 'Enter')
        ->waitForText('The footer links are 2px off the grid')
        ->assertSeeIn('.panel-card .nit-path', '/')
        ->assertDontSeeIn('.panel-card .nit', 'Guest')
        ->assertValue('.composer-input', '')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-page-nit');

    expect(Nit::query()->sole())
        ->item_key->toBeNull()
        ->body->toBe('The footer links are 2px off the grid')
        ->persona->toBe('guest');
});

it('cycles a box open, pass, fail, open with a click, and with Space', function () {
    $page = visit('/');
    $item = 'The start page loads';

    $page->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        ->assertAttribute(box($item), 'aria-label', "{$item}, not tested, press to mark passed")
        ->assertAttribute(row($item).' .goto', 'aria-label', 'Go to /');

    trackRequests($page);

    $page->click(box($item))
        ->assertAttribute(box($item), 'aria-label', "{$item}, passed, press to mark failed")
        ->assertAriaAttribute(row($item).' .item-toggle', 'expanded', 'false');
    settle($page);

    expect(Result::query()->sole()->status->value)->toBe('pass');

    $page->click(box($item))
        ->assertAttribute(box($item), 'aria-label', "{$item}, failed, press to clear")
        ->assertAriaAttribute(row($item).' .item-toggle', 'expanded', 'true')
        ->assertScript("document.querySelector('nitpick-panel').shadowRoot.activeElement.placeholder", 'Add a nit…');
    settle($page);

    expect(Result::query()->sole()->status->value)->toBe('fail');

    $page->click(box($item))
        ->assertAttribute(box($item), 'aria-label', "{$item}, not tested, press to mark passed")
        ->assertAriaAttribute(row($item).' .item-toggle', 'expanded', 'false');
    settle($page);

    expect(Result::query()->count())->toBe(0);

    $page->keys(box($item), 'Space')
        ->assertAttribute(box($item), 'aria-label', "{$item}, passed, press to mark failed")
        ->keys(box($item), 'Space')
        ->assertAttribute(box($item), 'aria-label', "{$item}, failed, press to clear");
    settle($page);

    expect(Result::query()->sole()->status->value)->toBe('fail');

    $page->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-cycle');
});

it('keeps the last of three fast clicks in the box and in the store when the first write is slow', function () {
    $page = visit('/');
    $item = 'The start page loads';

    $page->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open');

    // The first write waits 800 ms before it goes to the server. Without the write queue, the
    // server gets it last, its answer comes last, and the box and the store end on "pass".
    trackRequests($page, '/results/', 800);

    $page->click(box($item))
        ->click(box($item))
        ->click(box($item))
        ->assertAttribute(box($item), 'aria-label', "{$item}, not tested, press to mark passed");
    settle($page);

    $page->assertAttribute(box($item), 'aria-label', "{$item}, not tested, press to mark passed")
        ->assertScript('window.qaSent.at(-1)', 'DELETE');

    expect(Result::query()->count())->toBe(0);

    $page->refresh()
        ->waitForText('Round 1 · open')
        ->assertAttribute(box($item), 'aria-label', "{$item}, not tested, press to mark passed")
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-fast-clicks');

    expect(Result::query()->count())->toBe(0);
});

it('opens the details area of a passed row from its text and shows the nit count', function () {
    $page = visit('/');
    $item = 'The start page loads';

    $page->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        ->click(box($item))
        ->assertAttribute(box($item), 'aria-label', "{$item}, passed, press to mark failed")
        ->assertAriaAttribute(row($item).' .item-toggle', 'expanded', 'false')
        ->assertNotPresent(row($item).' .nit-count')
        ->click(row($item).' .item-toggle')
        ->assertAriaAttribute(row($item).' .item-toggle', 'expanded', 'true')
        ->assertVisible(row($item).' .nit-field input')
        ->type(row($item).' .nit-field input', 'The heading is 2px low')
        ->keys(row($item).' .nit-field input', 'Enter')
        ->waitForText('The heading is 2px low')
        ->assertSeeIn(row($item).' .nit-count', '1 nit')
        ->assertAttribute(box($item), 'aria-label', "{$item}, passed, press to mark failed")
        ->click(row($item).' .item-toggle')
        ->assertAriaAttribute(row($item).' .item-toggle', 'expanded', 'false')
        ->assertSeeIn(row($item).' .nit-count', '1 nit')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-details-passed');

    expect(Result::query()->sole()->status->value)->toBe('pass')
        ->and(Nit::query()->sole()->item_key)->toBe(itemKey($item));
});

it('keeps the tab and the scroll position of the card across a login reload', function () {
    $page = visit('/');

    // The compact checklist fits a tall window, so a short window makes the card scroll.
    $page->resize(1280, 480)
        ->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        // The card still moves while its entry animation runs. Playwright's click then sees an
        // unstable button and scrolls it again, so the scroll waits until the card stands still.
        ->assertScript(inPanel('#qa-card').".getAnimations({ subtree: true }).every((animation) => animation.playState !== 'running')")
        ->script(inPanel('[data-focus-key="login:1:mia"]').".scrollIntoView({ block: 'center' })");

    $scrollTop = $page->script(inPanel('.scroller').'.scrollTop');

    expect($scrollTop)->toBeGreaterThan(100);

    $page->click('[data-focus-key="login:1:mia"]')
        ->waitForText('mia@workbench.test')
        ->assertVisible('#qa-card')
        ->assertAriaAttribute('#qa-tab-checklist', 'selected', 'true')
        ->assertScript(inPanel('.scroller').'.scrollTop', $scrollTop)
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-scroll-kept');
});

it('does not throw when a scroll event arrives after a tab switch unmounts the scroller', function () {
    $page = visit('/');

    $page->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open');

    // One script call, so the scroll and the tab switch land in the same tick. The browser
    // queues the "scroll" event for later; by the time it fires, the checklist's Scroller
    // has already unmounted.
    $page->script(<<<'JS'
        (() => {
            const root = document.querySelector('nitpick-panel').shadowRoot;
            root.querySelector('.scroller').scrollTop = 500;
            root.querySelector('#qa-tab-mail').click();
        })()
        JS);

    $page->waitForText('Run queue')
        ->wait(0.5)
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-scroll-after-unmount');
});

it('closes the card with Escape from the pill and gives the pill the focus', function () {
    $page = visit('/');

    $page->click('.pill')
        ->assertVisible('#qa-card')
        ->assertAttribute('.pill', 'aria-label', 'Close Nitpick')
        ->keys('.pill', 'Escape')
        ->assertNotPresent('#qa-card')
        ->assertScript("document.querySelector('nitpick-panel').shadowRoot.activeElement.classList.contains('pill')")
        ->assertSeeIn('.pill', 'Guest')
        ->assertNoJavaScriptErrors();
});

it('shows a passed, a failed, and an untested row, then the failed row open with two nits, for the design screenshots', function () {
    $page = visit('/');
    $passItem = 'The start page loads';
    $failItem = 'The panel shows Arthur Admin as the current persona';
    $untestedItem = 'The panel shows Mia Member as the current persona';

    $page->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        ->click(box($passItem))
        ->assertAttribute(box($passItem), 'aria-label', "{$passItem}, passed, press to mark failed")
        ->click(box($failItem))
        ->click(box($failItem))
        ->assertAttribute(box($failItem), 'aria-label', "{$failItem}, failed, press to clear")
        ->type(row($failItem).' .nit-field input', 'The persona name wraps under the avatar at 320px')
        ->keys(row($failItem).' .nit-field input', 'Enter')
        ->waitForText('The persona name wraps under the avatar at 320px')
        ->type(row($failItem).' .nit-field input', 'Log in button has no busy state')
        ->keys(row($failItem).' .nit-field input', 'Enter')
        ->waitForText('Log in button has no busy state')
        ->assertSeeIn(row($failItem).' .nit-count', '2 nits')
        ->assertCount(row($failItem).' .nit', 2)
        ->click(row($failItem).' .item-toggle')
        ->assertAriaAttribute(row($failItem).' .item-toggle', 'expanded', 'false')
        ->assertAttribute(box($untestedItem), 'aria-label', "{$untestedItem}, not tested, press to mark passed")
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: '../../../docs/design/screens/02-card-checklist-round-open')
        ->click(row($failItem).' .item-toggle')
        ->assertAriaAttribute(row($failItem).' .item-toggle', 'expanded', 'true')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: '../../../docs/design/screens/03-item-failed-two-nits');

    expect(Result::query()->count())->toBe(2);
});

it('keeps the full focus ring visible on the pinned page-nit field, above the list fade', function () {
    $page = visit('/');

    $page->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        ->click('.composer-input')
        ->assertScript("document.querySelector('nitpick-panel').shadowRoot.activeElement.classList.contains('composer-input')")
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-composer-focus-ring');
});

it('shows only the retest in round 2, keeps the full checklist open across a login, and lists round 1 in History', function () {
    $failed = 'The panel shows Arthur Admin as the current persona';
    $first = Round::query()->create([
        'scenario' => 'demo-scenario',
        'number' => 1,
        'status' => 'closed',
        'tester' => 'Nick',
        'opened_at' => '2026-10-01 09:00:00',
        'closed_at' => '2026-10-01 10:00:00',
        'git_sha' => 'a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0',
        'git_dirty' => false,
    ]);
    $first->results()->create(['item_key' => itemKey('The start page loads'), 'status' => 'pass']);
    $first->results()->create(['item_key' => itemKey($failed), 'status' => 'fail']);
    $first->nits()->create(['item_key' => itemKey($failed), 'body' => 'The pill shows guest', 'url' => '/', 'persona' => 'arthur']);

    $retest = 'The panel still shows Arthur Admin after a reset';
    $base = 'The panel shows Mia Member as the current persona';

    $page = visit('/');

    $page->click('.pill')
        ->waitForText('Round 2 · not started')
        ->assertSeeIn('.retest', 'Retest 2')
        ->assertVisible(box($retest))
        ->assertMissing(box($base))
        ->assertSeeIn('.full-toggle', '9 checks')
        ->assertAriaAttribute('.full-toggle', 'expanded', 'false')
        ->click('Start round')
        ->waitForText('Round 2 · open')
        ->click(box($retest))
        ->click('.full-toggle')
        ->assertAriaAttribute('.full-toggle', 'expanded', 'true')
        ->assertVisible(box($base))
        ->assertEnabled(box($base))
        ->click(box($base))
        ->click('[data-focus-key="login:1:mia"]')
        ->waitForText('mia@workbench.test')
        ->assertAriaAttribute('.full-toggle', 'expanded', 'true')
        ->assertSeeIn('[data-focus-key="login:1:mia"]', 'Current')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-retest-full-checklist');

    expect(Result::query()->where('round_id', '!=', $first->id)->pluck('status', 'item_key')->map->value->all())
        ->toBe(['arthur-after-reset' => 'pass', itemKey($base) => 'pass']);

    $page->click('#qa-tab-history')
        ->waitForText('Round 1')
        ->assertSeeIn('.row-meta', 'a1b2c3d · 1 passed · 1 failed · 1 nit')
        ->click('.row')
        ->waitForText('The pill shows guest')
        ->assertSeeIn('.panel-card', 'Closed')
        ->assertSee($failed)
        ->assertSeeIn('.history-passed', '1 passed')
        // Round 1 has no retest block, so its untested checks are the work and stay in the list.
        ->assertSee('The start page loads with no login')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-history-round')
        ->click('All rounds')
        // A round that closes while the History tab is open shows in the list at once.
        ->click('.card-header .button')
        ->click('.confirm .primary')
        ->waitForText('Round 3 · not started')
        ->waitForText('Round 2')
        ->assertCount('.row', 2)
        ->assertNoJavaScriptErrors();
});
