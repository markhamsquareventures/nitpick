<?php

namespace MarkhamSq\Nitpick\Commands;

use Illuminate\Console\Command;
use MarkhamSq\Nitpick\Actions\BuildRoundResults;
use MarkhamSq\Nitpick\Exporters\MarkdownExporter;
use MarkhamSq\Nitpick\Models\Round;

/**
 * Usage: php artisan nitpick:results {scenario-slug} [--round=latest|{number}] [--json]
 *
 * Prints the results of one round of a scenario (default: the round with the highest number,
 * open or closed). Without --json, it prints the markdown report of the round.
 *
 * The --json output: "round" is the round metadata. "groups" is the round's checklist in the
 * nitpick:scenarios --json shape: the groups that are not in a retest() block, then the groups of
 * retest(n) for round n. Each item also has "status" (pass, fail, or untested) and "nits".
 * "page_nits" are the nits that are not on an item. "orphaned" has the results and the item
 * nits whose key is not in the round's checklist (the item was removed or its text changed).
 * Times are ISO 8601. The panel's round routes answer the same shape. An example:
 *
 * {
 *     "round": {
 *         "id": 3, "scenario": "acme-corp-held-invitations", "title": "Acme Corp held invitations",
 *         "number": 2, "status": "closed", "tester": "Nick Basile",
 *         "opened_at": "2026-10-03T14:02:11+00:00", "closed_at": "2026-10-03T15:40:52+00:00",
 *         "git_sha": "a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0", "git_dirty": true
 *     },
 *     "personas": [{"key": "arthur", "label": "Arthur Admin", "email": "admin@acmecorp.test"}],
 *     "groups": [
 *         {
 *             "type": "section", "title": null, "persona": "arthur", "retest": null,
 *             "items": [
 *                 {
 *                     "key": "5d41402abc4b", "text": "Per-row Send on Ursula", "url": "/members", "setup": null,
 *                     "persona": "arthur", "status": "fail",
 *                     "nits": [{"id": 7, "item_key": "5d41402abc4b", "body": "Toast said \"Invitation queued.\"",
 *                               "url": "/members", "persona": "arthur", "created_at": "2026-10-03T14:20:05+00:00"}]
 *                 }
 *             ]
 *         }
 *     ],
 *     "page_nits": [{"id": 8, "item_key": null, "body": "Sidebar logo is 2px off", "url": "/home", "persona": "arthur", "created_at": "..."}],
 *     "orphaned": {"results": [{"item_key": "old-check", "status": "pass"}], "nits": []}
 * }
 *
 * To check the fixes of round n in round n + 1, add ->retest(n + 1, ...) to the scenario.
 */
class ResultsCommand extends Command
{
    public $signature = 'nitpick:results
        {scenario : The scenario slug, as nitpick:scenarios prints it}
        {--round=latest : "latest" or a round number}
        {--json : Print the results as JSON}';

    public $description = 'Print the results and nits of a Nitpick round';

    public function handle(BuildRoundResults $buildRoundResults, MarkdownExporter $markdownExporter): int
    {
        $scenario = $this->argument('scenario');
        $roundOption = $this->option('round');

        $rounds = Round::query()->where('scenario', $scenario);

        if ($roundOption !== 'latest') {
            if (! ctype_digit((string) $roundOption)) {
                $this->components->error('The --round option takes "latest" or a round number.');

                return self::INVALID;
            }

            $rounds->where('number', (int) $roundOption);
        }

        $round = $rounds->orderByDesc('number')->first();

        if ($round === null) {
            $missing = $roundOption === 'latest' ? 'rounds' : "round {$roundOption}";

            $this->components->error("The scenario {$scenario} has no {$missing}. The panel's Start round button starts a round.");

            return self::FAILURE;
        }

        $results = $buildRoundResults($round);

        if ($this->option('json')) {
            $this->line(json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));

            return self::SUCCESS;
        }

        $this->line($markdownExporter->render($results));

        return self::SUCCESS;
    }
}
