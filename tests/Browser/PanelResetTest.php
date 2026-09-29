<?php

use MarkhamSq\Nitpick\Models\Round;

// No RefreshDatabase here: the reset command runs migrate:fresh, and SQLite cannot VACUUM inside
// the transaction of RefreshDatabase. The reset makes the app tables and the users itself.
beforeEach(function () {
    $this->appConfig = ['app.url' => 'http://127.0.0.1'];
    $this->reloadApplication();
});

it('resets in two steps: Escape and Cancel go back, Confirm resets and keeps the round', function () {
    $page = visit('/');
    $activeFocusKey = "document.querySelector('nitpick-panel').shadowRoot.activeElement?.dataset.focusKey";

    $page->click('.pill')
        ->click('Start round')
        ->waitForText('Round 1 · open')
        ->click('[data-focus-key="reset:0"]')
        ->assertSee('Reset the database and log in as Arthur Admin?')
        ->assertVisible('.confirm .danger')
        ->assertScript("document.querySelector('nitpick-panel').shadowRoot.activeElement.textContent", 'Cancel')
        ->screenshot(filename: 'panel-reset-confirm')
        ->keys('.confirm', 'Escape')
        ->assertDontSee('Reset the database and log in as Arthur Admin?')
        ->assertVisible('#qa-card')
        ->assertScript($activeFocusKey, 'reset:0')
        ->click('[data-focus-key="reset:0"]')
        ->click('.confirm >> text=Cancel')
        ->assertDontSee('Reset the database and log in as Arthur Admin?')
        ->assertScript($activeFocusKey, 'reset:0')
        ->click('[data-focus-key="reset:0"]')
        ->click('.confirm .danger')
        ->waitForText('arthur@workbench.test')
        ->assertSeeIn('#current-user', 'arthur@workbench.test')
        ->assertSeeIn('.subtitle', 'Round 1 · open')
        ->assertScript($activeFocusKey, 'reset:0')
        ->assertNoJavaScriptErrors()
        ->screenshot(filename: 'panel-reset-done');

    expect(Round::query()->open()->sole()->number)->toBe(1);
});
