<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use MarkhamSq\Nitpick\Actions\DiscoverScenarios;
use MarkhamSq\Nitpick\Scenario;

class ScenariosController
{
    public function index(DiscoverScenarios $discoverScenarios): JsonResponse
    {
        return response()->json(['data' => $discoverScenarios()->map(fn (Scenario $scenario) => $scenario->toArray())]);
    }
}
