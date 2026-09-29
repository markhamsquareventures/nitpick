<?php

namespace MarkhamSq\Nitpick\Tests\Fixtures;

use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Handoff;
use MarkhamSq\Nitpick\Scenario;
use MarkhamSq\Nitpick\Section;

class AcmeCorpHeldInvitations extends Scenario
{
    public function setUp(): void {}

    public function personas(): array
    {
        return [
            'arthur' => ['label' => 'Arthur Admin', 'email' => 'admin@acmecorp.test'],
            'andy' => ['label' => 'Andy Admin', 'email' => 'andy@acmecorp.test'],
        ];
    }

    public function title(): string
    {
        return 'Acme Corp held invitations';
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return $checklist
            ->as('arthur', fn (Section $section) => $section
                ->check('Acme Corp is listed and there is no invitation alert', url: '/home')
                ->check('Per-row Send on Ursula: toast "Invitation sent.", the row turns Pending', url: '/teams/acme-corp/members', setup: 'Ursula is Not sent'))
            ->handoff('Invited admin registers', fn (Handoff $handoff) => $handoff
                ->step('andy', 'Add member with a fresh address, role team admin')
                ->switchTo('guest')
                ->step('guest', 'Open the invitation link from the mail pane'))
            ->retest(2, fn (Checklist $retest) => $retest
                ->as('arthur', fn (Section $section) => $section
                    ->check('The toast now reads "Invitation sent."', key: 'ursula-send')));
    }
}
