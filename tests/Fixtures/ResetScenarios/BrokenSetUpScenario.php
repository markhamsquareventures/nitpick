<?php

namespace MarkhamSq\Nitpick\Tests\Fixtures\ResetScenarios;

use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Scenario;
use RuntimeException;

class BrokenSetUpScenario extends Scenario
{
    public function setUp(): void
    {
        throw new RuntimeException('The Acme Corp factory is broken.');
    }

    public function personas(): array
    {
        return ['arthur' => ['label' => 'Arthur Admin', 'email' => 'arthur@workbench.test']];
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return $checklist;
    }
}
