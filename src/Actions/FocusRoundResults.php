<?php

namespace MarkhamSq\Nitpick\Actions;

/**
 * Makes the BuildRoundResults shape short, for a report that an agent reads. The Markdown report,
 * nitpick:results --json without --full, and the panel's History tab use this shape.
 *
 * A round that has retest groups is a retest round: its retest groups are the work, and the base
 * groups are optional. In a round with no retest groups, all groups are the work.
 *
 * Each group keeps the items with a fail, the items with nits, and the untested items of the work.
 * "passed" counts the other passed items of the group. "base_not_tested" counts the untested
 * items with no nits in the base groups of a retest round. A group with no item to keep and no
 * passed item is removed.
 */
class FocusRoundResults
{
    /**
     * @param  array<string, mixed>  $results  The BuildRoundResults shape.
     * @return array<string, mixed>
     */
    public function __invoke(array $results): array
    {
        $isRetestRound = collect($results['groups'])->contains(fn (array $group) => $group['retest'] !== null);
        $baseNotTested = 0;
        $groups = [];

        foreach ($results['groups'] as $group) {
            $isWork = ! $isRetestRound || $group['retest'] !== null;
            $items = [];
            $passed = 0;

            foreach ($group['items'] as $item) {
                if ($item['status'] === 'fail' || $item['nits'] !== [] || ($item['status'] === 'untested' && $isWork)) {
                    $items[] = $item;

                    continue;
                }

                if ($item['status'] === 'pass') {
                    $passed++;

                    continue;
                }

                $baseNotTested++;
            }

            if ($items !== [] || $passed > 0) {
                $groups[] = [...$group, 'items' => $items, 'passed' => $passed];
            }
        }

        return [...$results, 'groups' => $groups, 'base_not_tested' => $baseNotTested];
    }
}
