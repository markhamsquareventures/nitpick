<?php

namespace MarkhamSq\Nitpick\Listeners;

use Dom\HTMLDocument;
use Illuminate\Mail\Events\MessageSent;
use MarkhamSq\Nitpick\Models\Mail;
use MarkhamSq\Nitpick\Models\Round;
use Symfony\Component\Mime\Address;

class StoreSentMail
{
    public function handle(MessageSent $event): void
    {
        $html = $event->message->getHtmlBody();

        if (is_resource($html)) {
            $html = stream_get_contents($html);
        }

        $text = $event->message->getTextBody();

        if (is_resource($text)) {
            $text = stream_get_contents($text);
        }

        $links = [];

        if (is_string($html)) {
            $document = HTMLDocument::createFromString($html, LIBXML_NOERROR);

            foreach ($document->querySelectorAll('a[href]') as $anchor) {
                $links[] = $anchor->getAttribute('href');
            }
        }

        Mail::query()->create([
            'round_id' => Round::query()->open()->value('id'),
            'to' => implode(', ', array_map(fn (Address $address) => $address->toString(), $event->message->getTo())),
            'subject' => (string) $event->message->getSubject(),
            'html' => $html,
            'text' => $text,
            'links' => array_values(array_unique($links)),
            'sent_at' => now(),
        ]);
    }
}
