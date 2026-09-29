<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use MarkhamSq\Nitpick\Actions\BuildRoundResults;
use MarkhamSq\Nitpick\Models\Round;

class RoundController
{
    /** The open round (at most one in the app), and the number that the next round of each scenario gets. */
    public function show(BuildRoundResults $buildRoundResults): JsonResponse
    {
        $round = Round::query()->open()->first();

        $nextNumbers = Round::query()
            ->selectRaw('scenario, max(number) + 1 as next_number')
            ->groupBy('scenario')
            ->toBase()
            ->pluck('next_number', 'scenario')
            ->map(fn ($number) => (int) $number);

        return response()->json([
            'round' => $round === null ? null : $buildRoundResults($round),
            'next_numbers' => (object) $nextNumbers->all(),
        ]);
    }
}
