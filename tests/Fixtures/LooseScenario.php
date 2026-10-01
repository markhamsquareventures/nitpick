<?php

namespace MarkhamSq\Nitpick\Tests\Fixtures;

use Closure;
use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Scenario;

class LooseScenario extends Scenario
{
    /**
     * @param  Closure(Checklist): Checklist  $build
     * @param  array<string, array{label: string, email: string, home?: string}>  $personas
     */
    public function __construct(
        private Closure $build,
        private array $personas = ['arthur' => ['label' => 'Arthur Admin', 'email' => 'nobody@acmecorp.test']],
    ) {}

    public function setUp(): void {}

    public function personas(): array
    {
        return $this->personas;
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return ($this->build)($checklist);
    }
}
