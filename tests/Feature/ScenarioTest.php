<?php

use Illuminate\Support\Arr;
use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Handoff;
use MarkhamSq\Nitpick\Item;
use MarkhamSq\Nitpick\Section;
use MarkhamSq\Nitpick\Tests\Fixtures\AcmeCorpHeldInvitations;
use MarkhamSq\Nitpick\Tests\Fixtures\LooseScenario;

it('groups the plan example into sections, handoff steps, and retest blocks in checklist order', function () {
    $scenario = (new AcmeCorpHeldInvitations)->toArray();

    expect($scenario)
        ->class->toBe(AcmeCorpHeldInvitations::class)
        ->slug->toBe('acme-corp-held-invitations')
        ->title->toBe('Acme Corp held invitations')
        ->personas->toBe([
            ['key' => 'arthur', 'label' => 'Arthur Admin', 'email' => 'admin@acmecorp.test'],
            ['key' => 'andy', 'label' => 'Andy Admin', 'email' => 'andy@acmecorp.test'],
        ]);

    $groups = collect($scenario['groups']);

    expect($groups->map(fn (array $group) => Arr::only($group, ['type', 'title', 'persona', 'retest']))->all())->toBe([
        ['type' => 'section', 'title' => null, 'persona' => 'arthur', 'retest' => null],
        ['type' => 'handoff', 'title' => 'Invited admin registers', 'persona' => null, 'retest' => null],
        ['type' => 'section', 'title' => null, 'persona' => 'arthur', 'retest' => 2],
    ]);

    expect($groups[0]['items'][1])->toMatchArray([
        'text' => 'Per-row Send on Ursula: toast "Invitation sent.", the row turns Pending',
        'url' => '/teams/acme-corp/members',
        'setup' => 'Ursula is Not sent',
        'persona' => 'arthur',
    ]);

    expect(collect($groups[1]['items'])->map(fn (array $item) => Arr::only($item, ['text', 'persona']))->all())->toBe([
        ['text' => 'Add member with a fresh address, role team admin', 'persona' => 'andy'],
        ['text' => 'Open the invitation link from the mail pane', 'persona' => 'guest'],
    ]);

    expect($groups[2]['items'][0]['key'])->toBe('ursula-send');
});

it('derives the title and the slug from the class name when title() is not overridden', function () {
    expect((new LooseScenario(fn (Checklist $checklist) => $checklist))->toArray())
        ->title->toBe('Loose scenario')
        ->slug->toBe('loose-scenario');
});

it('gives the same text the same key on every run and machine, and lets key: override it', function () {
    expect(new Item('arthur', 'Acme Corp is listed'))->key->toBe('7670b7c4fb40')
        ->and(new Item('andy', "  Acme Corp\n    is  listed "))->key->toBe('7670b7c4fb40')
        ->and(new Item('arthur', 'Acme Corp is listed.'))->key->not->toBe('7670b7c4fb40')
        ->and(new Item('arthur', 'Acme Corp is listed', key: 'listed'))->key->toBe('listed');
});

it('rejects two items with the same key and names the scenario and the key', function (Closure $build, string $key) {
    expect(fn () => (new LooseScenario($build))->toArray())->toThrow(
        LogicException::class,
        'The scenario '.LooseScenario::class." has two items with the key '{$key}'",
    );
})->with([
    'same text in a section and a retest' => [
        fn (Checklist $checklist) => $checklist
            ->as('arthur', fn (Section $section) => $section->check('The toast reads "Sent."'))
            ->retest(2, fn (Checklist $retest) => $retest
                ->as('arthur', fn (Section $section) => $section->check('The toast reads "Sent."'))),
        substr(hash('sha256', 'The toast reads "Sent."'), 0, 12),
    ],
    'same key: on a check and a handoff step' => [
        fn (Checklist $checklist) => $checklist
            ->as('arthur', fn (Section $section) => $section->check('The toast reads "Sent."', key: 'toast'))
            ->handoff('Guest opens the link', fn (Handoff $handoff) => $handoff
                ->step('guest', 'Open the link', key: 'toast')),
        'toast',
    ],
]);

it('rejects a persona that personas() does not declare and names the scenario and the persona', function (Closure $build) {
    expect(fn () => (new LooseScenario($build))->toArray())->toThrow(
        LogicException::class,
        'The scenario '.LooseScenario::class." uses the persona 'bob', but personas() does not declare it.",
    );
})->with([
    'in a section' => [fn (Checklist $checklist) => $checklist
        ->as('bob', fn (Section $section) => $section->check('The page loads'))],
    'in a step' => [fn (Checklist $checklist) => $checklist
        ->handoff('Bob registers', fn (Handoff $handoff) => $handoff->step('bob', 'Register'))],
    'in switchTo()' => [fn (Checklist $checklist) => $checklist
        ->handoff('Bob registers', fn (Handoff $handoff) => $handoff->switchTo('bob'))],
    'in a retest block' => [fn (Checklist $checklist) => $checklist
        ->retest(2, fn (Checklist $retest) => $retest
            ->as('bob', fn (Section $section) => $section->check('The page loads')))],
]);

it('accepts guest as a persona with no login', function () {
    $scenario = new LooseScenario(fn (Checklist $checklist) => $checklist
        ->as('guest', fn (Section $section) => $section->check('The login page loads', url: 'login')));

    expect($scenario->toArray()['groups'][0]['items'][0]['persona'])->toBe('guest');
});

it('rejects a switchTo() that the next step does not follow', function () {
    $scenario = new LooseScenario(fn (Checklist $checklist) => $checklist
        ->handoff('Guest registers', fn (Handoff $handoff) => $handoff
            ->switchTo('guest')
            ->step('arthur', 'Open the invitation link')));

    expect(fn () => $scenario->toArray())->toThrow(
        LogicException::class,
        "has switchTo('guest') in the handoff \"Guest registers\", but the next step is for 'arthur'.",
    );
});

it('rejects a retest block inside a retest block', function () {
    $scenario = new LooseScenario(fn (Checklist $checklist) => $checklist
        ->retest(2, fn (Checklist $retest) => $retest
            ->retest(3, fn (Checklist $inner) => $inner
                ->as('arthur', fn (Section $section) => $section->check('The page loads')))));

    expect(fn () => $scenario->toArray())->toThrow(LogicException::class, 'A retest(2) block cannot hold another retest() block.');
});
