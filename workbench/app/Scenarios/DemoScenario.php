<?php

namespace Workbench\App\Scenarios;

use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Handoff;
use MarkhamSq\Nitpick\Scenario;
use MarkhamSq\Nitpick\Section;
use Workbench\App\Models\User;
use Workbench\Database\Seeders\DatabaseSeeder;

class DemoScenario extends Scenario
{
    /** Vera is made here and not in the seeder, so a reset that skips setUp() cannot log in as her. */
    public function setUp(): void
    {
        app(DatabaseSeeder::class)->run();

        User::query()->firstOrCreate(
            ['email' => 'vera@workbench.test'],
            ['name' => 'Vera Visitor', 'password' => bcrypt('password')],
        );
    }

    public function personas(): array
    {
        return [
            'arthur' => ['label' => 'Arthur Admin', 'email' => 'arthur@workbench.test'],
            'mia' => ['label' => 'Mia Member', 'email' => 'mia@workbench.test', 'home' => '/?landing=mia'],
            'vera' => ['label' => 'Vera Visitor', 'email' => 'vera@workbench.test'],
        ];
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return $checklist
            ->as('arthur', fn (Section $section) => $section
                ->check('The start page loads', url: '/')
                ->check('The panel shows Arthur Admin as the current persona', url: '/', setup: 'Log in as Arthur from the Personas tab'))
            ->as('mia', fn (Section $section) => $section
                ->check('The panel shows Mia Member as the current persona', url: '/'))
            ->handoff('Mia hands off to a guest', fn (Handoff $handoff) => $handoff
                ->step('mia', 'Note the current page')
                ->switchTo('guest')
                ->step('guest', 'The start page loads with no login', url: '/'))
            ->retest(2, fn (Checklist $retest) => $retest
                ->as('arthur', fn (Section $section) => $section
                    ->check('The panel still shows Arthur Admin after a reset', url: '/', key: 'arthur-after-reset')));
    }
}
