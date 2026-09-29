<?php

namespace MarkhamSq\Nitpick\Models;

use Illuminate\Database\Eloquent\Model;

class Mail extends Model
{
    protected $connection = 'nitpick';

    public $timestamps = false;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'links' => 'array',
            'sent_at' => 'datetime',
        ];
    }
}
