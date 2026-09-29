<?php

namespace MarkhamSq\Nitpick\Tests\Fixtures\SlugClash\Second;

use MarkhamSq\Nitpick\Checklist;
use MarkhamSq\Nitpick\Scenario;

class Invitations extends Scenario
{
    public function setUp(): void {}

    public function personas(): array
    {
        return [];
    }

    public function checklist(Checklist $checklist): Checklist
    {
        return $checklist;
    }
}
