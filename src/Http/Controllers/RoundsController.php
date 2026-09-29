<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use MarkhamSq\Nitpick\Actions\BuildRoundResults;
use MarkhamSq\Nitpick\Actions\DiscoverScenarios;
use MarkhamSq\Nitpick\Enums\RoundStatus;
use MarkhamSq\Nitpick\Exporters\RoundExporter;
use MarkhamSq\Nitpick\Git;
use MarkhamSq\Nitpick\Models\Round;

class RoundsController
{
    /** Starts the next round of a scenario. The app has at most one open round. */
    public function store(Request $request, DiscoverScenarios $discoverScenarios, Git $git, BuildRoundResults $buildRoundResults): JsonResponse
    {
        $request->validate(['scenario' => ['required', 'string']]);

        $scenario = $discoverScenarios->find($request->string('scenario')->toString());

        if ($scenario === null) {
            throw ValidationException::withMessages(['scenario' => "There is no scenario with the slug {$request->input('scenario')}."]);
        }

        $openRound = Round::query()->open()->first();

        abort_if($openRound !== null, 409, "Round {$openRound?->number} of {$openRound?->scenario} is open. Close it before you start a round.");

        $round = Round::query()->create([
            'scenario' => $scenario->slug(),
            'number' => Round::query()->where('scenario', $scenario->slug())->max('number') + 1,
            'tester' => $git->userName() ?? get_current_user(),
            'opened_at' => now(),
        ]);

        return response()->json(['round' => $buildRoundResults($round->refresh())], 201);
    }

    /**
     * Closes the round: records the closed time and the git state of the app, then runs each
     * exporter. The round is saved only after the exporters, so a failed export leaves it open.
     */
    public function update(Request $request, Round $round, Git $git, BuildRoundResults $buildRoundResults): JsonResponse
    {
        $round->ensureOpen();

        $request->validate(['status' => ['required', Rule::in([RoundStatus::Closed->value])]]);

        $sha = $git->head();

        $round->fill([
            'status' => RoundStatus::Closed,
            'closed_at' => now(),
            'git_sha' => $sha,
            'git_dirty' => $sha === null ? null : $git->isDirty(),
        ]);

        $results = $buildRoundResults($round);

        $reports = [];

        foreach (config('nitpick.exporters') as $exporterClass) {
            /** @var RoundExporter $exporter */
            $exporter = app($exporterClass);

            $reports[] = $exporter->export($results);
        }

        $round->save();

        return response()->json(['round' => $results, 'reports' => $reports]);
    }
}
