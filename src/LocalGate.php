<?php

namespace MarkhamSq\Nitpick;

use Illuminate\Http\Request;

/**
 * The one gate for everything the package adds to an app.
 *
 * - Routes and middleware: registered only when allowsEnvironment(), and they do nothing
 *   unless allowsRequest(), so a request to a host other than the APP_URL host is ignored.
 * - Event listeners (ConnectionEstablished, MessageSent): registered only when
 *   allowsEnvironment(). An event has no request, so the host check does not apply.
 * - Console commands: always registered. The agent runs them from the terminal, where
 *   there is no request host.
 */
final class LocalGate
{
    public static function allowsEnvironment(): bool
    {
        return app()->isLocal();
    }

    public static function allowsRequest(Request $request): bool
    {
        if (! self::allowsEnvironment()) {
            return false;
        }

        $appHost = strtolower((string) parse_url((string) config('app.url'), PHP_URL_HOST));

        return $request->getHost() === $appHost;
    }
}
