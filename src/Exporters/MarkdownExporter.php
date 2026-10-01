<?php

namespace MarkhamSq\Nitpick\Exporters;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;

/** Writes docs/qa/{scenario-slug}/round-{n}.md in the app. nitpick:results without --json prints the same text. */
class MarkdownExporter implements RoundExporter
{
    /** The directory of the reports, relative to the app. Git::isDirty() ignores it. */
    public const DIRECTORY = 'docs/qa';

    public function export(array $results): string
    {
        $path = self::DIRECTORY."/{$results['round']['scenario']}/round-{$results['round']['number']}.md";

        File::ensureDirectoryExists(dirname(base_path($path)));
        File::put(base_path($path), $this->render($results));

        return $path;
    }

    /** @param array<string, mixed> $results The BuildRoundResults shape. */
    public function render(array $results): string
    {
        $round = $results['round'];
        $personas = collect($results['personas'])->keyBy('key');

        $lines = ["# {$round['title']}, round {$round['number']}", $this->statusLine($round)];

        foreach ($results['groups'] as $group) {
            $lines[] = '';
            $lines[] = '## '.$this->groupHeading($group, $personas->all());

            foreach ($group['items'] as $item) {
                $text = $item['text'];

                if ($group['type'] === 'handoff') {
                    $text = ($personas[$item['persona']]['label'] ?? 'Guest').": {$text}";
                }

                $lines[] = $this->itemLine($item['status'], $text);

                foreach ($item['nits'] as $nit) {
                    $lines[] = '  - '.$this->nitText($nit, withPersona: false);
                }
            }
        }

        $lines[] = '';
        $lines[] = '## Page nits';

        if ($results['page_nits'] === []) {
            $lines[] = 'No page nits.';
        }

        foreach ($results['page_nits'] as $nit) {
            $lines[] = '- '.$this->nitText($nit, withPersona: true);
        }

        $orphaned = $this->orphanedLines($results['orphaned']);

        if ($orphaned !== []) {
            $lines = [...$lines, '', '## Orphaned', ...$orphaned];
        }

        return implode("\n", $lines)."\n";
    }

    /** @param array<string, mixed> $round */
    private function statusLine(array $round): string
    {
        if ($round['closed_at'] === null) {
            return "Open since {$this->date($round['opened_at'])} by {$round['tester']}";
        }

        if ($round['git_sha'] === null) {
            return "Closed {$this->date($round['closed_at'])} with no git commit by {$round['tester']}";
        }

        $sha = substr($round['git_sha'], 0, 7);
        $dirty = $round['git_dirty'] ? ' (dirty)' : '';

        return "Closed {$this->date($round['closed_at'])} at {$sha}{$dirty} by {$round['tester']}";
    }

    private function date(string $isoDate): string
    {
        return Carbon::parse($isoDate)->setTimezone(config('app.timezone'))->format('Y-m-d');
    }

    /**
     * @param  array<string, mixed>  $group
     * @param  array<string, array{key: string, label: string, email: string, home: ?string}>  $personas
     */
    private function groupHeading(array $group, array $personas): string
    {
        $heading = "Handoff: {$group['title']}";

        if ($group['type'] === 'section') {
            $persona = $personas[$group['persona']] ?? null;
            $heading = $persona === null ? 'As Guest' : "As {$persona['label']} ({$persona['email']})";
        }

        if ($group['retest'] === null) {
            return $heading;
        }

        return "Retest {$group['retest']}, ".lcfirst($heading);
    }

    private function itemLine(string $status, string $text): string
    {
        return match ($status) {
            'pass' => "- [x] {$text}",
            'fail' => "- [ ] **Fail** {$text}",
            default => "- [ ] {$text} *(untested)*",
        };
    }

    /** @param array<string, mixed> $nit */
    private function nitText(array $nit, bool $withPersona): string
    {
        $body = preg_replace('/\s+/', ' ', trim($nit['body']));
        $where = "`{$nit['url']}`";

        if ($withPersona) {
            $where .= ', as '.($nit['persona'] ?? 'guest');
        }

        return "{$body} ({$where})";
    }

    /**
     * One line for each orphaned key, in the item style, with the key as the text.
     *
     * @param  array{results: list<array{item_key: string, status: string}>, nits: list<array<string, mixed>>}  $orphaned
     * @return list<string>
     */
    private function orphanedLines(array $orphaned): array
    {
        $statuses = collect($orphaned['results'])->pluck('status', 'item_key');
        $nitsByKey = collect($orphaned['nits'])->groupBy('item_key');

        $lines = [];

        foreach ($statuses->keys()->merge($nitsByKey->keys())->unique()->sort() as $key) {
            $lines[] = $this->itemLine($statuses[$key] ?? 'untested', "`{$key}`");

            foreach ($nitsByKey[$key] ?? [] as $nit) {
                $lines[] = '  - '.$this->nitText($nit, withPersona: false);
            }
        }

        return $lines;
    }
}
