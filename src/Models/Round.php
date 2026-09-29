<?php

namespace MarkhamSq\Nitpick\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use MarkhamSq\Nitpick\Enums\RoundStatus;

/**
 * @property int $id
 * @property string $scenario
 * @property int $number
 * @property RoundStatus $status
 * @property string $tester
 * @property Carbon $opened_at
 * @property ?Carbon $closed_at
 * @property ?string $git_sha
 * @property ?bool $git_dirty
 */
class Round extends Model
{
    protected $connection = 'nitpick';

    public $timestamps = false;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'number' => 'integer',
            'status' => RoundStatus::class,
            'opened_at' => 'datetime',
            'closed_at' => 'datetime',
            'git_dirty' => 'boolean',
        ];
    }

    /** @return HasMany<Result, $this> */
    public function results(): HasMany
    {
        return $this->hasMany(Result::class);
    }

    /** @return HasMany<Nit, $this> */
    public function nits(): HasMany
    {
        return $this->hasMany(Nit::class);
    }

    /** Closed rounds do not change, so each write to a round calls this first. */
    public function ensureOpen(): void
    {
        abort_if($this->status === RoundStatus::Closed, 409, "Round {$this->number} of {$this->scenario} is closed. A closed round does not change.");
    }

    /** @param Builder<self> $query */
    #[Scope]
    protected function open(Builder $query): void
    {
        $query->where('status', RoundStatus::Open);
    }
}
