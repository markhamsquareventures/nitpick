<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Validation\ValidationException;
use MarkhamSq\Nitpick\Actions\DiscoverScenarios;
use Spatie\LoginLink\Http\Requests\LoginLinkRequest;
use Throwable;

class ResetController extends LoginController
{
    /** Runs nitpick.reset_command, then the setUp() of the scenario that the request names, then logs in. */
    public function store(LoginLinkRequest $request, DiscoverScenarios $discoverScenarios): JsonResponse
    {
        $scenario = $this->requestedScenario($request, $discoverScenarios);

        try {
            $exitCode = Artisan::call(config('nitpick.reset_command'));
        } catch (Throwable $exception) {
            report($exception);

            return $this->failure('The reset command failed.', Artisan::output()."\n".$exception->getMessage());
        }

        $output = trim(Artisan::output());

        if ($exitCode !== 0) {
            return $this->failure('The reset command failed.', $output);
        }

        if ($scenario !== null) {
            try {
                $users = $scenario->setUpPersonas();
            } catch (Throwable $exception) {
                report($exception);

                return $this->failure("The setUp() of the scenario {$scenario->title()} failed.", "{$output}\n{$exception->getMessage()}");
            }

            $persona = $request->input('persona');

            if ($persona !== 'guest') {
                if ($users[$persona] === null) {
                    throw ValidationException::withMessages(['persona' => "The setUp() of the scenario {$scenario->title()} did not make a user for the persona {$persona} ({$scenario->personas()[$persona]['email']})."]);
                }
            }
        }

        $response = $this->logIn($request, $this->personaEmail($request, $scenario), $this->landingPage($request, $scenario));

        return $response->setData([...$response->getData(true), 'output' => $output]);
    }

    protected function failure(string $message, string $output): JsonResponse
    {
        return response()->json(['message' => $message, 'output' => trim($output)], 500);
    }
}
