<?php

namespace MarkhamSq\Nitpick\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use MarkhamSq\Nitpick\Enums\ResultStatus;

/**
 * @property int $id
 * @property int $round_id
 * @property string $item_key
 * @property ResultStatus $status
 * @property Carbon $updated_at
 */
class Result extends Model
{
    protected $connection = 'nitpick';

    // The table has updated_at only, so Eloquent sets it and never looks for created_at.
    const CREATED_AT = null;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'status' => ResultStatus::class,
        ];
    }
}
