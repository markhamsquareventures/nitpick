<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use MarkhamSq\Nitpick\Enums\ResultStatus;

return new class extends Migration
{
    protected $connection = 'nitpick';

    public function up(): void
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('round_id')->constrained()->cascadeOnDelete();
            $table->string('item_key');
            $table->enum('status', array_column(ResultStatus::cases(), 'value'));
            $table->timestamp('updated_at')->useCurrent();

            $table->unique(['round_id', 'item_key']);
        });
    }
};
