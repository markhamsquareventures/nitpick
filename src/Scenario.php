<?php

namespace MarkhamSq\Nitpick;

use Closure;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use LogicException;

abstract class Scenario
{
    abstract public function setUp(): void;

    /**
     * Each persona can set a home: the path that the panel opens after a login as that persona.
     *
     * @return array<string, array{label: string, email: string, home?: string}>
     */
    abstract public function personas(): array;

    abstract public function checklist(Checklist $checklist): Checklist;

    /**
     * Runs setUp() and finds the user of each persona by email. A persona is null when setUp()
     * did not make its user. The scenario() Pest helper and the panel's reset both use this.
     *
     * @return array<string, ?Authenticatable>
     */
    public function setUpPersonas(): array
    {
        $this->setUp();

        $users = [];

        foreach ($this->personas() as $key => $persona) {
            $users[$key] = Auth::guard()->getProvider()->retrieveByCredentials(['email' => $persona['email']]);
        }

        return $users;
    }

    /** The path that the panel opens after a login as the persona: its home, or the nitpick.home config. */
    public function landingPage(string $persona): string
    {
        $home = $this->personas()[$persona]['home'] ?? null;

        if ($home === null) {
            return config()->string('nitpick.home', '/');
        }

        $this->ensureHomeIsAPath($persona, $home);

        return $home;
    }

    /** Override this when the derived title loses a proper noun ("Acme corp" for "Acme Corp"). */
    public function title(): string
    {
        return Str::ucfirst(Str::lower(Str::headline(class_basename(static::class))));
    }

    /** The slug comes from the class name only, so a title edit does not move stored results. */
    public function slug(): string
    {
        return Str::kebab(class_basename(static::class));
    }

    /**
     * The shape that nitpick:scenarios --json prints for one scenario.
     *
     * @return array{
     *     class: class-string<static>,
     *     slug: string,
     *     title: string,
     *     personas: list<array{key: string, label: string, email: string, home: ?string}>,
     *     groups: list<array{
     *         type: 'section'|'handoff',
     *         title: ?string,
     *         persona: ?string,
     *         retest: ?int,
     *         items: list<array{key: string, text: string, url: ?string, setup: ?string, persona: string, fill: ?list<string>}>
     *     }>
     * }
     */
    public function toArray(): array
    {
        $textsByKey = [];
        $groups = [];

        foreach ($this->checklist(new Checklist)->groups as ['group' => $group, 'retest' => $retest]) {
            $items = [];

            if ($group instanceof Section) {
                $this->ensurePersonaIsDeclared($group->persona);

                $items = $group->items;
            }

            if ($group instanceof Handoff) {
                $switchedTo = null;

                foreach ($group->entries as $entry) {
                    if (is_string($entry)) {
                        $this->ensurePersonaIsDeclared($entry);

                        $switchedTo = $entry;

                        continue;
                    }

                    $this->ensurePersonaIsDeclared($entry->persona);

                    if ($switchedTo !== null) {
                        if ($entry->persona !== $switchedTo) {
                            throw new LogicException('The scenario '.static::class." has switchTo('{$switchedTo}') in the handoff \"{$group->title}\", but the next step is for '{$entry->persona}'.");
                        }
                    }

                    $switchedTo = null;
                    $items[] = $entry;
                }
            }

            foreach ($items as $item) {
                if (isset($textsByKey[$item->key])) {
                    throw new LogicException('The scenario '.static::class." has two items with the key '{$item->key}': \"{$textsByKey[$item->key]}\" and \"{$item->text}\". Give one of them a different key: value.");
                }

                $textsByKey[$item->key] = $item->text;
            }

            $groups[] = [
                'type' => $group instanceof Section ? 'section' : 'handoff',
                'title' => $group instanceof Handoff ? $group->title : null,
                'persona' => $group instanceof Section ? $group->persona : null,
                'retest' => $retest,
                'items' => array_map(fn (Item $item) => [
                    'key' => $item->key,
                    'text' => $item->text,
                    'url' => $item->url,
                    'setup' => $item->setup,
                    'persona' => $item->persona,
                    'fill' => $this->fillKeys($item),
                ], $items),
            ];
        }

        $personas = [];

        foreach ($this->personas() as $key => $persona) {
            $home = $persona['home'] ?? null;

            if ($home !== null) {
                $this->ensureHomeIsAPath($key, $home);
            }

            $personas[] = ['key' => $key, 'label' => $persona['label'], 'email' => $persona['email'], 'home' => $home];
        }

        return [
            'class' => static::class,
            'slug' => $this->slug(),
            'title' => $this->title(),
            'personas' => $personas,
            'groups' => $groups,
        ];
    }

    /** The item with the key, from any section or handoff, or null. */
    public function item(string $key): ?Item
    {
        foreach ($this->checklist(new Checklist)->groups as ['group' => $group]) {
            $items = $group instanceof Section ? $group->items : array_filter($group->entries, fn ($entry) => $entry instanceof Item);

            foreach ($items as $item) {
                if ($item->key === $key) {
                    return $item;
                }
            }
        }

        return null;
    }

    /** The keys of the fill, with no values. A fill that is one Closure has no known keys, so it gives an empty list. */
    private function fillKeys(Item $item): ?array
    {
        if ($item->fill === null) {
            return null;
        }

        if ($item->fill instanceof Closure) {
            return [];
        }

        return array_map('strval', array_keys($item->fill));
    }

    private function ensurePersonaIsDeclared(string $persona): void
    {
        if ($persona === 'guest') {
            return;
        }

        if (array_key_exists($persona, $this->personas())) {
            return;
        }

        throw new LogicException('The scenario '.static::class." uses the persona '{$persona}', but personas() does not declare it. Declare it in personas(), or use 'guest' for no login.");
    }

    /** A home must stay on the app, so it is a path: one leading slash, no scheme, no host. */
    private function ensureHomeIsAPath(string $persona, string $home): void
    {
        if (preg_match('#^/(?![/\\\\])#', $home) === 1) {
            return;
        }

        throw new LogicException('The scenario '.static::class." gives the persona '{$persona}' the home '{$home}', which is not a path. Use a path that starts with one slash, for example '/dashboard'.");
    }
}
