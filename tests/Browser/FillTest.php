<?php

use Pest\Browser\Api\AwaitableWebpage;
use Pest\Browser\Api\PendingAwaitablePage;

// The browser server runs on 127.0.0.1, and the panel answers only the APP_URL host.
beforeEach(function () {
    config(['app.url' => 'http://127.0.0.1']);
});

const FILL_STATIC = 'The form page takes a filled form';
const FILL_PER_VALUE = 'The form page takes a new fake value on each fill';
const FILL_CLOSURE = 'The form page takes a fill that one Closure makes';
const FILL_REACT = 'The React form page keeps a filled form after a render';

/** The Fill button of the check with this text, in the panel's shadow root. */
function fillButton(string $text): string
{
    return "li.item:has(.check-text:text-is(\"{$text}\")) .fill";
}

/** The notice of the last fill of the check with this text. */
function fillNotice(string $text): string
{
    return "li.item:has(.check-text:text-is(\"{$text}\")) .fill-notice";
}

/** A JavaScript expression for the text of the fill notice of the check with this text. */
function noticeText(string $text): string
{
    $text = json_encode($text);

    return <<<JS
        [...document.querySelector('nitpick-panel').shadowRoot.querySelectorAll('li.item')]
            .find((item) => item.querySelector('.check-text').textContent === {$text})
            .querySelector('.fill-notice').textContent
        JS;
}

/** Opens the panel on a page of the workbench and presses Fill on one check. */
function pressFill(string $path, string $text): AwaitableWebpage|PendingAwaitablePage
{
    return visit($path)->click('.pill')->click(fillButton($text));
}

/** Waits until a JavaScript expression of the page is true. Playwright waits for the promise. */
function waitUntil(AwaitableWebpage|PendingAwaitablePage $page, string $expression): void
{
    $page->script(<<<JS
        new Promise((resolve, reject) => {
            const stop = Date.now() + 5000;
            const timer = setInterval(() => {
                if ({$expression}) {
                    clearInterval(timer);
                    resolve(true);
                } else if (Date.now() > stop) {
                    clearInterval(timer);
                    reject(new Error('The expression stayed false for 5 seconds.'));
                }
            }, 50);
        })
        JS);
}

/** The values of the workbench form as one JSON text, so that a test compares every field in one step. */
function formValues(): string
{
    return <<<'JS'
        (() => {
            const form = document.getElementById('form');
            const value = (selector) => form.querySelector(selector).value;
            const checked = (name) => [...form.querySelectorAll(`[name="${name}"]:checked`)].map((input) => input.value);

            return JSON.stringify({
                name: value('#name'),
                hiddenName: value('#hidden-name'),
                email: value('[name="email"]'),
                password: value('[name="password"]'),
                age: value('[name="age"]'),
                birthday: value('[name="birthday"]'),
                bio: value('[name="bio"]'),
                country: value('[name="country"]'),
                languages: [...form.querySelector('[name="languages[]"]').selectedOptions].map((option) => option.value),
                plan: checked('plan'),
                roles: checked('roles[]'),
                terms: checked('terms'),
                avatar: [value('[name="avatar"]'), form.querySelector('[name="avatar"]').files.length],
                nickname: value('#nickname'),
                firstPhone: value('#phone-first'),
                secondPhone: value('#phone-second'),
            });
        })()
        JS;
}

it('fills every field type of a plain form with the right value', function () {
    $page = pressFill('/form', FILL_STATIC)->waitForText('Filled 13 of 15 fields.');

    $page->assertScript(formValues(), json_encode([
        'name' => 'Ada Lovelace',
        'hiddenName' => '',
        'email' => 'ada@example.test',
        'password' => 'secret-pass',
        'age' => '36',
        'birthday' => '2030-01-15',
        'bio' => "First line\nSecond line",
        'country' => 'ca',
        'languages' => ['en', 'fr'],
        'plan' => ['pro'],
        'roles' => ['admin', 'viewer'],
        'terms' => ['1'],
        'avatar' => ['', 0],
        'nickname' => 'countess',
        'firstPhone' => '555-0100',
        'secondPhone' => '',
    ]))
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'fill-plain-form');
});

it('sends input and change events for each filled field, and none for a field it did not fill', function () {
    $page = pressFill('/form', FILL_STATIC)->waitForText('Filled 13 of 15 fields.');

    $events = $page->script("[...document.querySelectorAll('#events li')].map((item) => item.textContent)");

    expect($events)
        ->toContain('input name', 'change name')
        ->toContain('input email', 'change email')
        ->toContain('input password', 'change password')
        ->toContain('input age', 'change age')
        ->toContain('input birthday', 'change birthday')
        ->toContain('input bio', 'change bio')
        ->toContain('input country', 'change country')
        ->toContain('input languages[]', 'change languages[]')
        ->toContain('input plan', 'change plan')
        ->toContain('input roles[]', 'change roles[]')
        ->toContain('input terms', 'change terms')
        ->toContain('input nickname', 'change nickname')
        ->toContain('input phone', 'change phone')
        ->not->toContain('input avatar')
        ->not->toContain('change avatar')
        // Nitpick set the visible name only. The hidden one got no event.
        ->and(array_count_values($events)['input name'])->toBe(1);

    $page->assertNoJavaScriptErrors()->screenshot(filename: 'fill-plain-form-events');
});

it('shows each key and value in the notice, masks the password, and names the keys that it did not fill', function () {
    $page = pressFill('/form', FILL_STATIC)->waitForText('Filled 13 of 15 fields.');

    $notice = $page->script(noticeText(FILL_STATIC));

    expect($notice)
        ->toContain('Filled 13 of 15 fields.')
        ->toContain('Ada Lovelace')
        ->toContain('ada@example.test')
        ->toContain('countess')
        ->toContain('(masked)')
        ->not->toContain('secret-pass')
        ->toContain('coupon')
        ->toContain('avatar')
        ->toContain('Nitpick cannot fill a file input.')
        ->toContain('2 matches for')
        ->toContain('phone');

    $page->assertSeeIn(fillNotice(FILL_STATIC), 'Filled 13 of 15 fields.')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'fill-notice');
});

it('gives the Fill button the accessible name of its check', function () {
    $page = visit('/form')->click('.pill');

    $page->assertAttribute(fillButton(FILL_STATIC), 'aria-label', 'Fill the form for: '.FILL_STATIC)
        ->assertAttribute(fillButton(FILL_STATIC), 'title', 'Fill the form for: '.FILL_STATIC)
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'fill-button');
});

it('sets a new Closure value on each press of Fill', function () {
    $page = pressFill('/form', FILL_PER_VALUE)->waitForText('Filled 2 of 2 fields.');
    $first = $page->script("document.getElementById('nickname').value");

    expect($first)->not->toBe('');

    $page->click(fillButton(FILL_PER_VALUE));
    waitUntil($page, "document.getElementById('nickname').value !== ".json_encode($first));

    $second = $page->script("document.getElementById('nickname').value");

    expect($second)->not->toBe('')->not->toBe($first);

    $page->assertScript("document.querySelector('[name=\"email\"]').value", 'fixed@example.test')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'fill-closure-twice');
});

it('fills with the fields that one Closure makes', function () {
    $page = pressFill('/form', FILL_CLOSURE)->waitForText('Filled 2 of 2 fields.');

    expect($page->script("document.getElementById('name').value"))->not->toBe('')
        ->and($page->script("document.getElementById('hidden-name').value"))->toBe('')
        ->and($page->script("document.querySelector('[name=\"email\"]').value"))->toContain('@');

    $page->assertNoJavaScriptErrors()->screenshot(filename: 'fill-whole-closure');
});

it('keeps every filled value in the state of a React form after a render', function () {
    $page = pressFill('/react-form', FILL_REACT)->waitForText('Filled 4 of 5 fields.');

    $page->click('#rerender')->assertSeeIn('#renders', '1');

    $state = json_decode($page->script("document.getElementById('state').textContent"), true);

    expect($state)
        ->country->toBe('mx')
        ->subscribed->toBeTrue()
        ->tier->toBe('team')
        ->name->not->toBe('');

    // The input shows the state, so the value survived the render and React owns it.
    $page->assertScript("document.querySelector('[name=\"name\"]').value", $state['name'])
        ->assertScript("document.querySelector('[name=\"country\"]').value", 'mx')
        ->assertScript("document.querySelector('[name=\"subscribed\"]').checked", true)
        ->assertScript("document.querySelector('[name=\"tier\"]:checked').value", 'team');

    $notice = $page->script(noticeText(FILL_REACT));

    expect($notice)->toContain('coupon');

    $page->assertNoJavaScriptErrors()->screenshot(filename: 'fill-react-form');
});
