<?php

use MarkhamSq\Nitpick\Exporters\MarkdownExporter;

return [

    // Artisan parses this string like a shell and drops a single backslash. For a seeder class,
    // escape it: 'migrate:fresh --seeder='.addslashes(SomeSeeder::class).
    'reset_command' => 'migrate:fresh --seed',

    'scenarios' => [
        'path' => base_path('tests/Scenarios'),
        'namespace' => 'Tests\\Scenarios',
    ],

    // Each class implements MarkhamSq\Nitpick\Exporters\RoundExporter and runs when a round closes.
    'exporters' => [
        MarkdownExporter::class,
    ],

];
