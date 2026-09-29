<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use MarkhamSq\Nitpick\Enums\RoundStatus;

return new class extends Migration
{
    protected $connection = 'nitpick';

    public function up(): void
    {
        Schema::create('rounds', function (Blueprint $table) {
            $table->id();
            $table->string('scenario');
            $table->unsignedInteger('number');
            $table->enum('status', array_column(RoundStatus::cases(), 'value'))->default(RoundStatus::Open->value);
            $table->string('tester');
            $table->timestamp('opened_at')->useCurrent();
            $table->timestamp('closed_at')->nullable();
            $table->string('git_sha')->nullable();
            $table->boolean('git_dirty')->nullable();

            $table->unique(['scenario', 'number']);
        });
    }
};
