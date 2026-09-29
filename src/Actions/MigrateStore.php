<?php

namespace MarkhamSq\Nitpick\Actions;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class MigrateStore
{
    public function __invoke(): void
    {
        $connection = config('database.connections.nitpick');

        if ($connection['driver'] === 'sqlite') {
            if ($connection['database'] !== ':memory:') {
                File::ensureDirectoryExists(dirname($connection['database']));
            }
        }

        // --path keeps the package migrations out of the app's migrator, so the app's
        // migrate:fresh never runs them. --database puts the migrations table in the
        // package store. With --force, migrate creates a missing SQLite file itself.
        Artisan::call('migrate', [
            '--database' => 'nitpick',
            '--path' => realpath(__DIR__.'/../../database/migrations'),
            '--realpath' => true,
            '--force' => true,
        ]);
    }
}
