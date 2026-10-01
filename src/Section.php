<?php

namespace MarkhamSq\Nitpick;

use Closure;

final class Section
{
    /** @var list<Item> */
    public array $items = [];

    public function __construct(public readonly string $persona) {}

    public function check(string $text, ?string $url = null, ?string $setup = null, ?string $key = null, array|Closure|null $fill = null): self
    {
        $this->items[] = new Item($this->persona, $text, $url, $setup, $key, $fill);

        return $this;
    }
}
