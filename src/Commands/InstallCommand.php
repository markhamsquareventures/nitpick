<?php

namespace MarkhamSq\Nitpick\Commands;

use Illuminate\Console\Command;
use MarkhamSq\Nitpick\Actions\MigrateStore;

/**
 * Usage: php artisan nitpick:install
 *
 * Makes the nitpick database and runs the package migrations. Safe to run again.
 */
class InstallCommand extends Command
{
    public $signature = 'nitpick:install';

    public $description = 'Make the Nitpick database and run its migrations';

    public function handle(MigrateStore $migrateStore): int
    {
        $migrateStore();

        $path = config('database.connections.nitpick.database');

        $this->components->info("The Nitpick database is ready: {$path}");

        return self::SUCCESS;
    }
}
