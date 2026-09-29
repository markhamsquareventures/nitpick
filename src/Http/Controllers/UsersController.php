<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsersController
{
    public function index(Request $request): JsonResponse
    {
        $request->validate(['search' => ['required', 'string']]);

        $search = "%{$request->string('search')}%";

        /** @var class-string<Model> $userModel */
        $userModel = config('auth.providers.'.config('auth.guards.web.provider').'.model');

        $users = $userModel::query()
            ->where(fn (Builder $query) => $query->whereLike('email', $search)->orWhereLike('name', $search))
            ->orderBy('email')
            ->limit(10)
            ->get(['email', 'name']);

        return response()->json(['data' => $users]);
    }
}
