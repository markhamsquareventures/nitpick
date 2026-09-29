<?php

namespace MarkhamSq\Nitpick\Tests;

use Illuminate\Filesystem\Filesystem;
use MarkhamSq\Nitpick\NitpickServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;
use Spatie\LoginLink\LoginLinkServiceProvider;
use Workbench\App\Providers\WorkbenchServiceProvider;

use function Orchestra\Testbench\workbench_path;

class TestCase extends Orchestra
{
    protected string $appEnvironment = 'local';

    /** @var array<string, mixed> */
    protected array $appConfig = [];

    protected string $storagePath;

    protected function getPackageProviders($app)
    {
        return [
            LoginLinkServiceProvider::class,
            NitpickServiceProvider::class,
            WorkbenchServiceProvider::class,
        ];
    }

    protected function defineEnvironment($app)
    {
        $app['env'] = $this->appEnvironment;

        $app['config']->set($this->appConfig);

        $this->storagePath ??= sys_get_temp_dir().'/nitpick-tests/'.uniqid();

        $app->useStoragePath($this->storagePath);
    }

    /** The TestCase does not use WithWorkbench, so it loads the workbench page itself. */
    protected function defineWebRoutes($router)
    {
        require workbench_path('routes/web.php');
    }

    protected function tearDown(): void
    {
        parent::tearDown();

        (new Filesystem)->deleteDirectory($this->storagePath);
    }
}
