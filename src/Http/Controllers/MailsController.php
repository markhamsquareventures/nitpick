<?php

namespace MarkhamSq\Nitpick\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use MarkhamSq\Nitpick\Models\Mail;

class MailsController
{
    public function index(): JsonResponse
    {
        $mails = Mail::query()
            ->latest('sent_at')
            ->latest('id')
            ->get(['id', 'round_id', 'to', 'subject', 'text', 'links', 'sent_at']);

        return response()->json(['data' => $mails]);
    }

    /** The mail's HTML for the panel's sandboxed iframe. The CSP sandbox stops the mail's own scripts and forms. */
    public function show(Mail $mail): Response
    {
        return response($mail->html ?? '', 200, [
            'Content-Type' => 'text/html; charset=utf-8',
            'Content-Security-Policy' => "sandbox; script-src 'none'",
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
