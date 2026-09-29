<?php

namespace MarkhamSq\Nitpick\Commands;

use Illuminate\Console\Command;
use MarkhamSq\Nitpick\Actions\DiscoverScenarios;
use MarkhamSq\Nitpick\Scenario;

/**
 * Usage: php artisan nitpick:scenarios [--json]
 *
 * Lists the scenarios in the nitpick.scenarios.path directory (default tests/Scenarios).
 * Without --json, it prints one table for each scenario.
 *
 * The --json output is a list with one object for each scenario, sorted by class. A retest(n)
 * block does not nest: each of its groups has "retest": n. A handoff step with no login has
 * "persona": "guest". An example:
 *
 * [
 *     {
 *         "class": "Tests\\Scenarios\\AcmeCorpHeldInvitations",
 *         "slug": "acme-corp-held-invitations",
 *         "title": "Acme corp held invitations",
 *         "personas": [
 *             {"key": "arthur", "label": "Arthur Admin", "email": "admin@acmecorp.test"}
 *         ],
 *         "groups": [
 *             {
 *                 "type": "section",
 *                 "title": null,
 *                 "persona": "arthur",
 *                 "retest": null,
 *                 "items": [
 *                     {"key": "7670b7c4fb40", "text": "Acme Corp is listed", "url": "/home", "setup": null, "persona": "arthur"}
 *                 ]
 *             },
 *             {
 *                 "type": "handoff",
 *                 "title": "Invited admin registers",
 *                 "persona": null,
 *                 "retest": 2,
 *                 "items": [
 *                     {"key": "open-invite", "text": "Open the invitation link", "url": null, "setup": null, "persona": "guest"}
 *                 ]
 *             }
 *         ]
 *     }
 * ]
 */
class ScenariosCommand extends Command
{
    public $signature = 'nitpick:scenarios {--json : Print the scenarios as JSON}';

    public $description = 'List the Nitpick scenarios, their personas, and their items';

    public function handle(DiscoverScenarios $discoverScenarios): int
    {
        $path = config('nitpick.scenarios.path');

        $scenarios = $discoverScenarios()->map(fn (Scenario $scenario) => $scenario->toArray());

        if ($this->option('json')) {
            $this->line($scenarios->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

            return self::SUCCESS;
        }

        if ($scenarios->isEmpty()) {
            $this->components->warn("There are no scenarios in {$path}. Make one with: php artisan make:nitpick-scenario {Name}");

            return self::SUCCESS;
        }

        foreach ($scenarios as $scenario) {
            $this->components->info("{$scenario['title']} ({$scenario['class']})");

            $rows = [];

            foreach ($scenario['groups'] as $group) {
                $groupName = $group['type'] === 'section' ? "As {$group['persona']}" : "Handoff: {$group['title']}";

                if ($group['retest'] !== null) {
                    $groupName = "Retest {$group['retest']}, {$groupName}";
                }

                foreach ($group['items'] as $item) {
                    $rows[] = [$groupName, $item['persona'], $item['key'], $item['text'], $item['url'] ?? '-'];
                }
            }

            $this->table(['Group', 'Persona', 'Key', 'Text', 'URL'], $rows);
        }

        return self::SUCCESS;
    }
}
