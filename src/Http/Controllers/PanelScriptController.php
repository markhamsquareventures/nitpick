<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PanelScriptController
{
    /** The script URL has the content hash in ?id=, so the browser can keep the file for a year. */
    public function show(): BinaryFileResponse
    {
        return response()->file(dirname(__DIR__, 3).'/dist/panel.js', [
            'Content-Type' => 'text/javascript; charset=utf-8',
            'Cache-Control' => 'public, max-age=31536000, immutable',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
