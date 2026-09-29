<?php

namespace MarkhamSq\Nitpick;

use Closure;
use LogicException;

final class Checklist
{
    /** @var list<array{group: Section|Handoff, retest: ?int}> */
    public array $groups = [];

    /** @param Closure(Section): Section $build */
    public function as(string $persona, Closure $build): self
    {
        $this->groups[] = ['group' => $build(new Section($persona)), 'retest' => null];

        return $this;
    }

    /** @param Closure(Handoff): Handoff $build */
    public function handoff(string $title, Closure $build): self
    {
        $this->groups[] = ['group' => $build(new Handoff($title)), 'retest' => null];

        return $this;
    }

    /** @param Closure(Checklist): Checklist $build */
    public function retest(int $number, Closure $build): self
    {
        foreach ($build(new self)->groups as $group) {
            if ($group['retest'] !== null) {
                throw new LogicException("A retest({$number}) block cannot hold another retest() block.");
            }

            $this->groups[] = ['group' => $group['group'], 'retest' => $number];
        }

        return $this;
    }
}
