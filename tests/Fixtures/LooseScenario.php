<?php

namespace MarkhamSq\Nitpick\Tests\Fixtures;

use Closure;
use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Scenario;

class LooseScenario extends Scenario
{
    /** @param Closure(Checklist): Checklist $build */
    public function __construct(private Closure $build) {}

    public function setUp(): void {}

    public function personas(): array
    {
        return [
            'arthur' => ['label' => 'Arthur Admin', 'email' => 'nobody@acmecorp.test'],
        ];
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return ($this->build)($checklist);
    }
}
