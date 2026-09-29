<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use MarkhamSq\Nitpick\Actions\BuildRoundResults;
use MarkhamSq\Nitpick\Enums\ResultStatus;
use MarkhamSq\Nitpick\Models\Round;

class ResultsController
{
    /** Sets the item's status to pass or fail. */
    public function update(Request $request, Round $round, string $itemKey, BuildRoundResults $buildRoundResults): JsonResponse
    {
        $round->ensureOpen();

        $request->validate(['status' => ['required', Rule::enum(ResultStatus::class)]]);

        if (! in_array($itemKey, $buildRoundResults->itemKeys($round), true)) {
            throw ValidationException::withMessages(['item_key' => "The checklist of round {$round->number} has no item with the key {$itemKey}."]);
        }

        $round->results()->updateOrCreate(['item_key' => $itemKey], ['status' => $request->enum('status', ResultStatus::class)]);

        return response()->json(['round' => $buildRoundResults($round)]);
    }

    /** Removes the item's result, so the item is untested again. An orphaned result can be removed too. */
    public function destroy(Round $round, string $itemKey, BuildRoundResults $buildRoundResults): JsonResponse
    {
        $round->ensureOpen();

        $round->results()->where('item_key', $itemKey)->delete();

        return response()->json(['round' => $buildRoundResults($round)]);
    }
}
