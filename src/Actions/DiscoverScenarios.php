<?php

namespace MarkhamSq\Nitpick\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use LogicException;
use MarkhamSq\Nitpick\Scenario;
use ReflectionClass;

class DiscoverScenarios
{
    /** @return Collection<int, Scenario> The scenarios in the nitpick.scenarios.path directory, sorted by class. */
    public function __invoke(): Collection
    {
        $path = config('nitpick.scenarios.path');
        $namespace = config('nitpick.scenarios.namespace');

        $scenarios = collect(File::isDirectory($path) ? File::allFiles($path) : [])
            ->map(fn ($file) => $namespace.'\\'.str_replace(['/', '.php'], ['\\', ''], $file->getRelativePathname()))
            ->filter(fn (string $class) => is_subclass_of($class, Scenario::class))
            ->reject(fn (string $class) => (new ReflectionClass($class))->isAbstract())
            ->sort()
            ->map(fn (string $class) => app($class))
            ->values();

        // The slug names the rounds and the report directory, so two scenarios must not share it.
        $scenarios->groupBy(fn (Scenario $scenario) => $scenario->slug())
            ->filter(fn (Collection $sameSlug) => $sameSlug->count() > 1)
            ->each(function (Collection $sameSlug, string $slug) {
                $classes = $sameSlug->map(fn (Scenario $scenario) => $scenario::class)->implode(' and ');

                throw new LogicException("The scenarios {$classes} have the same slug '{$slug}'. Rename one of the classes.");
            });

        return $scenarios;
    }

    public function find(string $slug): ?Scenario
    {
        return $this()->first(fn (Scenario $scenario) => $scenario->slug() === $slug);
    }
}
