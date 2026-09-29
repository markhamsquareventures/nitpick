<?php

namespace MarkhamSq\Nitpick\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $round_id
 * @property ?string $item_key
 * @property string $body
 * @property string $url
 * @property ?string $persona
 * @property Carbon $created_at
 */
class Nit extends Model
{
    protected $connection = 'nitpick';

    // The table has created_at only, so Eloquent sets it and never looks for updated_at.
    const UPDATED_AT = null;

    protected $guarded = [];
}
