<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use MarkhamSq\Nitpick\Actions\BuildRoundResults;
use MarkhamSq\Nitpick\Actions\DiscoverScenarios;
use MarkhamSq\Nitpick\Models\Nit;
use MarkhamSq\Nitpick\Models\Round;

class NitsController
{
    /**
     * Adds a nit to an item, or a page nit when item_key is null. The panel sends the URL of the
     * page. The server keeps its path and query, and records the persona from the current login.
     */
    public function store(Request $request, Round $round, DiscoverScenarios $discoverScenarios, BuildRoundResults $buildRoundResults): JsonResponse
    {
        $round->ensureOpen();

        $request->validate([
            'item_key' => ['nullable', 'string', Rule::in($buildRoundResults->itemKeys($round))],
            'body' => ['required', 'string', 'max:2000'],
            'url' => ['required', 'string', 'max:2000'],
        ], [
            'item_key.in' => "The checklist of round {$round->number} has no item with this key.",
        ]);

        $url = parse_url($request->string('url')->toString()) ?: [];
        $path = $url['path'] ?? '/';

        if (isset($url['query'])) {
            $path .= "?{$url['query']}";
        }

        $email = $request->user()?->email;
        $persona = 'guest';

        if ($email !== null) {
            $personas = $discoverScenarios->find($round->scenario)?->personas() ?? [];
            $persona = collect($personas)->search(fn (array $persona) => $persona['email'] === $email) ?: $email;
        }

        $round->nits()->create([
            'item_key' => $request->input('item_key'),
            'body' => trim($request->string('body')->toString()),
            'url' => $path,
            'persona' => $persona,
        ]);

        return response()->json(['round' => $buildRoundResults($round)], 201);
    }

    public function destroy(Round $round, Nit $nit, BuildRoundResults $buildRoundResults): JsonResponse
    {
        $round->ensureOpen();

        $nit->delete();

        return response()->json(['round' => $buildRoundResults($round)]);
    }
}
