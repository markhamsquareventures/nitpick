<?php

namespace MarkhamSq\Nitpick\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use MarkhamSq\Nitpick\LocalGate;
use Symfony\Component\HttpFoundation\Response;

class EnsureLocalRequest
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless(LocalGate::allowsRequest($request), 404);

        return $next($request);
    }
}
