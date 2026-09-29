<?php

namespace MarkhamSq\Nitpick\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

/**
 * Usage: php artisan make:nitpick-scenario AcmeCorpHeldInvitations
 *
 * Writes a scenario stub to the nitpick.scenarios.path directory (default tests/Scenarios).
 * It does not overwrite a file that exists.
 */
class MakeScenarioCommand extends GeneratorCommand
{
    protected $name = 'make:nitpick-scenario';

    protected $description = 'Make a Nitpick scenario class';

    protected $type = 'Scenario';

    protected function getStub(): string
    {
        return __DIR__.'/../../stubs/nitpick-scenario.stub';
    }

    protected function rootNamespace(): string
    {
        return config('nitpick.scenarios.namespace').'\\';
    }

    protected function getPath($name): string
    {
        $relativeClass = Str::replaceFirst($this->rootNamespace(), '', $name);

        return config('nitpick.scenarios.path').'/'.str_replace('\\', '/', $relativeClass).'.php';
    }
}
