<?php

namespace MarkhamSq\Nitpick\Tests\Fixtures\ResetScenarios;

use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Scenario;

class MissingPersonaScenario extends Scenario
{
    public function setUp(): void {}

    public function personas(): array
    {
        return ['ursula' => ['label' => 'Ursula User', 'email' => 'ursula@workbench.test']];
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return $checklist;
    }
}
