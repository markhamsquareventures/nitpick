<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use MarkhamSq\Nitpick\Actions\DiscoverScenarios;
use MarkhamSq\Nitpick\Scenario;
use Spatie\LoginLink\Exceptions\DidNotFindUserToLogIn;
use Spatie\LoginLink\Http\Controllers\LoginLinkController;
use Spatie\LoginLink\Http\Requests\LoginLinkRequest;

/**
 * Extends the login-link controller (its documented extension point) so that the login keeps
 * the login-link environment and host checks, but answers JSON and gives a 422, not a 500,
 * for an email with no user.
 */
class LoginController extends LoginLinkController
{
    public function store(LoginLinkRequest $request, DiscoverScenarios $discoverScenarios): JsonResponse
    {
        $scenario = $this->requestedScenario($request, $discoverScenarios);

        return $this->logIn($request, $this->personaEmail($request, $scenario));
    }

    /** Validates the request and returns the scenario that it names, or null when it names only an email. */
    protected function requestedScenario(LoginLinkRequest $request, DiscoverScenarios $discoverScenarios): ?Scenario
    {
        $request->validate([
            'email' => ['required_without:persona', 'nullable', 'email'],
            'persona' => ['required_without:email', 'nullable', 'string'],
            'scenario' => ['required_with:persona', 'nullable', 'string'],
        ]);

        if ($request->filled('email')) {
            return null;
        }

        $scenario = $discoverScenarios->find($request->string('scenario')->toString());

        if ($scenario === null) {
            throw ValidationException::withMessages(['scenario' => "There is no scenario with the slug {$request->input('scenario')}."]);
        }

        if ($request->input('persona') === 'guest') {
            return $scenario;
        }

        if (! array_key_exists($request->input('persona'), $scenario->personas())) {
            throw ValidationException::withMessages(['persona' => "The scenario {$scenario->title()} has no persona {$request->input('persona')}."]);
        }

        return $scenario;
    }

    /** Returns the email that the request names, or null for the guest persona. */
    protected function personaEmail(LoginLinkRequest $request, ?Scenario $scenario): ?string
    {
        if ($scenario === null) {
            return $request->string('email')->toString();
        }

        if ($request->input('persona') === 'guest') {
            return null;
        }

        return $scenario->personas()[$request->input('persona')]['email'];
    }

    protected function logIn(LoginLinkRequest $request, ?string $email): JsonResponse
    {
        if ($email === null) {
            Auth::guard($request->guard)->logout();

            return response()->json(['user' => null]);
        }

        $this->ensureAllowedEnvironment();

        $this->ensureAllowedHost($request);

        $request->replace(['email' => $email, 'guard' => $request->guard]);

        try {
            $user = $this->getAuthenticatable($request);
        } catch (DidNotFindUserToLogIn) {
            throw ValidationException::withMessages(['email' => "There is no user with the email {$email}."]);
        }

        $this->performLogin($request->guard, $user);

        return response()->json(['user' => ['id' => $user->getAuthIdentifier(), 'email' => $email]]);
    }
}
