<?php

namespace MarkhamSq\Nitpick;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use LogicException;

abstract class Scenario
{
    abstract public function setUp(): void;

    /** @return array<string, array{label: string, email: string}> */
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
     *     personas: list<array{key: string, label: string, email: string}>,
     *     groups: list<array{
     *         type: 'section'|'handoff',
     *         title: ?string,
     *         persona: ?string,
     *         retest: ?int,
     *         items: list<array{key: string, text: string, url: ?string, setup: ?string, persona: string}>
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
                ], $items),
            ];
        }

        $personas = [];

        foreach ($this->personas() as $key => $persona) {
            $personas[] = ['key' => $key, 'label' => $persona['label'], 'email' => $persona['email']];
        }

        return [
            'class' => static::class,
            'slug' => $this->slug(),
            'title' => $this->title(),
            'personas' => $personas,
            'groups' => $groups,
        ];
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
}
