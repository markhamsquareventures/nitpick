<?php

namespace MarkhamSq\Nitpick\Exporters;

/**
 * Runs when a round closes, after the round has its closed time and git state. The exporters
 * are the classes in the nitpick.exporters config list.
 */
interface RoundExporter
{
    /**
     * @param  array<string, mixed>  $results  The BuildRoundResults shape, the same as nitpick:results --json.
     * @return string Where the export went, for the panel (for example a path relative to the app).
     */
    public function export(array $results): string;
}
