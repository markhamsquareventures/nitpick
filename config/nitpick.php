<?php

use MarkhamSq\Nitpick\Exporters\MarkdownExporter;

return [

    // Artisan parses this string like a shell and drops a single backslash. For a seeder class,
    // escape it: 'migrate:fresh --seeder='.addslashes(SomeSeeder::class).
    'reset_command' => 'migrate:fresh --seed',

    // The path that the panel opens after a login. A persona's 'home' in personas() overrides it.
    'home' => '/',

    'scenarios' => [
        'path' => base_path('tests/Scenarios'),
        'namespace' => 'Tests\\Scenarios',
    ],

    // Each class implements MarkhamSq\Nitpick\Exporters\RoundExporter and runs when a round closes.
    'exporters' => [
        MarkdownExporter::class,
    ],

];
