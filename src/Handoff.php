<?php

namespace MarkhamSq\Nitpick;

final class Handoff
{
    /**
     * The steps in order. A string entry is a switchTo() persona. It is not an item: the
     * persona of the next step already tells the panel whom to log in as.
     *
     * @var list<Item|string>
     */
    public array $entries = [];

    public function __construct(public readonly string $title) {}

    public function step(string $persona, string $text, ?string $url = null, ?string $setup = null, ?string $key = null): self
    {
        $this->entries[] = new Item($persona, $text, $url, $setup, $key);

        return $this;
    }

    public function switchTo(string $persona): self
    {
        $this->entries[] = $persona;

        return $this;
    }
}
