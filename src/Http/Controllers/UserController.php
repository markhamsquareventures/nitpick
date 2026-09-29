<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController
{
    /** The user of the app's current login, for the panel's pill. */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user === null) {
            return response()->json(['user' => null]);
        }

        return response()->json(['user' => [
            'id' => $user->getAuthIdentifier(),
            'email' => $user->email,
            'name' => $user->name,
        ]]);
    }
}
