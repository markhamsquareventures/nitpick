<?php

namespace MarkhamSq\Nitpick\Actions;

use MarkhamSq\Nitpick\Models\Nit;
use MarkhamSq\Nitpick\Models\Result;
use MarkhamSq\Nitpick\Models\Round;

/**
 * Joins a round's results and nits with the checklist of its scenario. The panel's round
 * routes, nitpick:results --json, and the exporters all use this one shape (see ResultsCommand).
 *
 * The checklist of round n is every group that is not in a retest() block, then the groups of
 * retest(n). A result or an item nit whose key is not in that checklist is orphaned.
 */
class BuildRoundResults
{
    public function __construct(private DiscoverScenarios $discoverScenarios) {}

    /** @return array{round: array<string, mixed>, personas: list<array{key: string, label: string, email: string, home: ?string}>, groups: list<array<string, mixed>>, page_nits: list<array<string, mixed>>, orphaned: array{results: list<array{item_key: string, status: string}>, nits: list<array<string, mixed>>}} */
    public function __invoke(Round $round): array
    {
        $scenario = $this->discoverScenarios->find($round->scenario);
        $checklist = $scenario?->toArray();

        $round->loadMissing(['results', 'nits']);

        $statuses = $round->results->mapWithKeys(fn (Result $result) => [$result->item_key => $result->status->value]);
        $nits = $round->nits->sortBy(['created_at', 'id'])->values();

        $groups = [];

        foreach (self::groupsOfRound($checklist['groups'] ?? [], $round->number) as $group) {
            $group['items'] = array_map(fn (array $item) => [
                ...$item,
                'status' => $statuses[$item['key']] ?? 'untested',
                'nits' => $nits->where('item_key', $item['key'])->map(self::nit(...))->values()->all(),
            ], $group['items']);

            $groups[] = $group;
        }

        $keys = collect($groups)->pluck('items')->flatten(1)->pluck('key');

        return [
            'round' => [
                'id' => $round->id,
                'scenario' => $round->scenario,
                'title' => $scenario?->title() ?? $round->scenario,
                'number' => $round->number,
                'status' => $round->status->value,
                'tester' => $round->tester,
                'opened_at' => $round->opened_at->toIso8601String(),
                'closed_at' => $round->closed_at?->toIso8601String(),
                'git_sha' => $round->git_sha,
                'git_dirty' => $round->git_dirty,
            ],
            'personas' => $checklist['personas'] ?? [],
            'groups' => $groups,
            'page_nits' => $nits->whereNull('item_key')->map(self::nit(...))->values()->all(),
            'orphaned' => [
                'results' => $round->results
                    ->reject(fn (Result $result) => $keys->contains($result->item_key))
                    ->sortBy('item_key')
                    ->map(fn (Result $result) => ['item_key' => $result->item_key, 'status' => $result->status->value])
                    ->values()
                    ->all(),
                'nits' => $nits
                    ->whereNotNull('item_key')
                    ->reject(fn (Nit $nit) => $keys->contains($nit->item_key))
                    ->map(self::nit(...))
                    ->values()
                    ->all(),
            ],
        ];
    }

    /**
     * The item keys of the round's checklist, for the checks on a new result or nit.
     *
     * @return list<string>
     */
    public function itemKeys(Round $round): array
    {
        $groups = $this->discoverScenarios->find($round->scenario)?->toArray()['groups'] ?? [];

        return collect(self::groupsOfRound($groups, $round->number))
            ->pluck('items')
            ->flatten(1)
            ->pluck('key')
            ->all();
    }

    /**
     * @param  list<array<string, mixed>>  $groups
     * @return list<array<string, mixed>>
     */
    private static function groupsOfRound(array $groups, int $number): array
    {
        return array_values(array_filter($groups, fn (array $group) => in_array($group['retest'], [null, $number], true)));
    }

    /** @return array{id: int, item_key: ?string, body: string, url: string, persona: ?string, created_at: string} */
    private static function nit(Nit $nit): array
    {
        return [
            'id' => $nit->id,
            'item_key' => $nit->item_key,
            'body' => $nit->body,
            'url' => $nit->url,
            'persona' => $nit->persona,
            'created_at' => $nit->created_at->toIso8601String(),
        ];
    }
}
