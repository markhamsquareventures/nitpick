<?php

namespace MarkhamSq\Nitpick\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response as IlluminateResponse;
use MarkhamSq\Nitpick\LocalGate;
use Symfony\Component\HttpFoundation\Response;

/**
 * Puts the panel's script tag before the last </body> of a full HTML page. The same method as
 * Debugbar: fruitcake/laravel-debugbar, LaravelDebugbar.php, injectDebugbar().
 */
class InjectPanel
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (! $this->isFullPage($request, $response)) {
            return $response;
        }

        $content = (string) $response->getContent();
        $position = strripos($content, '</body>');

        if ($position === false) {
            return $response;
        }

        $version = hash_file('xxh128', dirname(__DIR__, 3).'/dist/panel.js');
        $source = e(route('nitpick.panel-script', ['id' => $version]));

        $response->setContent(substr_replace($content, "<script src=\"{$source}\" defer></script>", $position, 0));
        $response->headers->remove('Content-Length');

        return $response;
    }

    private function isFullPage(Request $request, Response $response): bool
    {
        if (! LocalGate::allowsRequest($request)) {
            return false;
        }

        if ($request->ajax()) {
            return false;
        }

        if ($request->hasHeader('X-Inertia')) {
            return false;
        }

        if ($request->hasHeader('X-Livewire')) {
            return false;
        }

        if ($request->expectsJson()) {
            return false;
        }

        // A JSON, redirect, streamed or file response is not an Illuminate\Http\Response.
        if (! $response instanceof IlluminateResponse) {
            return false;
        }

        if (str_contains((string) $response->headers->get('Content-Disposition'), 'attachment')) {
            return false;
        }

        return str_starts_with((string) $response->headers->get('Content-Type'), 'text/html');
    }
}
