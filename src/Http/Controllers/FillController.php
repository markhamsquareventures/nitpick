<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use MarkhamSq\Nitpick\Actions\DiscoverScenarios;
use Throwable;

class FillController
{
    /**
     * Runs the fill of an item and answers the form fields that the panel must set. The Closures
     * run on each request, so a fake() value is new each time. A Closure can write to the database.
     */
    public function store(Request $request, DiscoverScenarios $discoverScenarios): JsonResponse
    {
        $request->validate([
            'scenario' => ['required', 'string'],
            'item' => ['required', 'string'],
        ]);

        $scenario = $discoverScenarios->find($request->string('scenario')->toString());

        if ($scenario === null) {
            throw ValidationException::withMessages(['scenario' => "There is no scenario with the slug {$request->input('scenario')}."]);
        }

        $item = $scenario->item($request->string('item')->toString());

        if ($item === null) {
            throw ValidationException::withMessages(['item' => "The scenario {$scenario->title()} has no item with the key {$request->input('item')}."]);
        }

        if ($item->fill === null) {
            throw ValidationException::withMessages(['item' => "The item {$item->key} of the scenario {$scenario->title()} has no fill."]);
        }

        try {
            $fill = $item->fill instanceof Closure ? ($item->fill)() : $item->fill;

            if (is_array($fill)) {
                $fill = array_map(fn ($value) => $value instanceof Closure ? $value() : $value, $fill);
            }
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => "The fill of the item {$item->key} in the scenario {$scenario->title()} failed.",
                'output' => $exception->getMessage(),
            ], 500);
        }

        if (! is_array($fill)) {
            throw ValidationException::withMessages(['item' => "The fill of the item {$item->key} in the scenario {$scenario->title()} must return an array of selector => value, but it returned ".get_debug_type($fill).'.']);
        }

        $fields = [];

        foreach ($fill as $key => $value) {
            if ($value === null) {
                continue;
            }

            $fields[] = ['key' => (string) $key, 'value' => $this->fieldValue($value, "The fill of the item {$item->key} in the scenario {$scenario->title()}, for the key {$key},")];
        }

        return response()->json(['fields' => $fields]);
    }

    /** @return string|bool|list<string> */
    private function fieldValue(mixed $value, string $subject): string|bool|array
    {
        if (is_bool($value)) {
            return $value;
        }

        if (is_scalar($value)) {
            return (string) $value;
        }

        if (is_array($value) && array_is_list($value) && array_all($value, fn ($item) => is_scalar($item))) {
            return array_map('strval', $value);
        }

        throw ValidationException::withMessages(['item' => "{$subject} gave a value that a form cannot take: ".get_debug_type($value).'. Use a string, a number, a bool, null, or a list of strings.']);
    }
}
