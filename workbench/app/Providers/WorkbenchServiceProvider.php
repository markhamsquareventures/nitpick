<?php

namespace Workbench\App\Providers;

use Illuminate\Support\ServiceProvider;
use Workbench\Database\Seeders\DatabaseSeeder;

use function Orchestra\Testbench\default_migration_path;
use function Orchestra\Testbench\workbench_path;

class WorkbenchServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        config()->set('nitpick.scenarios', [
            'path' => workbench_path('app/Scenarios'),
            'namespace' => 'Workbench\\App\\Scenarios',
        ]);

        // Artisan parses the command string like a shell, so each backslash needs an escape.
        config()->set('nitpick.reset_command', 'migrate:fresh --seeder='.addslashes(DatabaseSeeder::class));
    }

    public function boot(): void
    {
        // `testbench serve` does not load Testbench's default migrations (users, sessions,
        // cache, jobs); only the `testbench` console commands do. Without this, the panel's
        // in-request reset drops those tables and does not make them again.
        $this->loadMigrationsFrom(default_migration_path());
    }
}
