<?php

namespace MarkhamSq\Nitpick\Tests\Fixtures;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class InvitationMail extends Mailable
{
    public function envelope(): Envelope
    {
        return new Envelope(subject: 'You are invited to Acme Corp');
    }

    public function content(): Content
    {
        return new Content(htmlString: '<p>Hi Ursula.</p><a href="https://app.test/invitations/abc">Accept</a> <a href="https://app.test/help">Help</a> <a href="https://app.test/invitations/abc">Accept again</a><script>alert(1)</script>');
    }
}
