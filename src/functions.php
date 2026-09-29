<?php

namespace MarkhamSq\Nitpick;

use Illuminate\Contracts\Auth\Authenticatable;
use LogicException;

/**
 * Runs the setup of the scenario and returns its personas as users for actingAs().
 * The function is namespaced, so it does not clash with an app's own scenario() function.
 * Import it in a Pest test with: use function MarkhamSq\Nitpick\scenario;
 *
 * @param  class-string<Scenario>  $scenarioClass
 * @return array<string, Authenticatable>
 */
function scenario(string $scenarioClass): array
{
    $scenario = app($scenarioClass);

    $users = $scenario->setUpPersonas();

    foreach ($users as $key => $user) {
        if ($user === null) {
            $email = $scenario->personas()[$key]['email'];

            throw new LogicException("The scenario {$scenarioClass} declares the persona '{$key}' with the email {$email}, but setUp() did not make a user with that email.");
        }
    }

    return $users;
}
