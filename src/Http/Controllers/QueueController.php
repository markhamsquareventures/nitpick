<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Queue;

class QueueController
{
    public function show(): JsonResponse
    {
        return response()->json(['size' => Queue::size()]);
    }

    /**
     * Works the default queue in the request, so that a queued mail is sent and stored.
     * --sleep=0 stops the worker at once on an empty queue; the default sleeps 3 seconds first.
     */
    public function store(): JsonResponse
    {
        $exitCode = Artisan::call('queue:work', [
            '--stop-when-empty' => true,
            '--max-time' => 30,
            '--sleep' => 0,
        ]);

        return response()->json([
            'exit_code' => $exitCode,
            'output' => trim(Artisan::output()),
            'size' => Queue::size(),
        ]);
    }
}
