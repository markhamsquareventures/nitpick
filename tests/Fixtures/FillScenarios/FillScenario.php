<?php

namespace MarkhamSq\Nitpick\Tests\Fixtures\FillScenarios;

use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Handoff;
use MarkhamSq\Nitpick\Scenario;
use MarkhamSq\Nitpick\Section;
use RuntimeException;
use stdClass;

class FillScenario extends Scenario
{
    public static int $runs = 0;

    public function setUp(): void {}

    public function personas(): array
    {
        return ['arthur' => ['label' => 'Arthur Admin', 'email' => 'arthur@workbench.test']];
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return $checklist
            ->as('arthur', fn (Section $section) => $section
                ->check('Static fill', key: 'static', fill: [
                    '#name' => 'Ada',
                    '#age' => 36,
                    '#clear' => '',
                    '#terms' => true,
                    '#newsletter' => false,
                    '#skip' => null,
                    '#roles' => ['admin', 'editor'],
                ])
                ->check('Per-value closure', key: 'per-value', fill: [
                    '#first' => 'fixed',
                    '#counter' => fn () => 'run '.++self::$runs,
                    '#skipped' => fn () => null,
                ])
                ->check('Whole closure', key: 'whole', fill: fn () => ['#counter' => 'run '.++self::$runs])
                ->check('Throwing closure', key: 'throws', fill: ['#name' => fn () => throw new RuntimeException('The factory is broken.')])
                ->check('Throwing whole closure', key: 'throws-whole', fill: fn () => throw new RuntimeException('The whole fill is broken.'))
                ->check('Object value', key: 'object', fill: ['#name' => new stdClass])
                ->check('Nested list', key: 'nested', fill: ['#roles' => [['admin']]])
                ->check('Keyed array', key: 'keyed', fill: ['#roles' => ['a' => 'admin']])
                ->check('Closure that gives a string', key: 'not-array', fill: fn () => 'oops')
                ->check('No fill', key: 'plain'))
            ->handoff('Guest step', fn (Handoff $handoff) => $handoff
                ->step('guest', 'Fill in a handoff', key: 'handoff', fill: ['#email' => 'guest@example.test']));
    }
}
