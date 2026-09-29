<?php

namespace MarkhamSq\Nitpick;

final readonly class Item
{
    public string $key;

    public function __construct(
        public string $persona,
        public string $text,
        public ?string $url = null,
        public ?string $setup = null,
        ?string $key = null,
    ) {
        // Results are stored by key, so the default key must not change when the source is
        // rewrapped or indented. It hashes the text with its whitespace collapsed.
        $this->key = $key ?? substr(hash('sha256', preg_replace('/\s+/', ' ', trim($text))), 0, 12);
    }
}
