<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'nitpick';

    public function up(): void
    {
        Schema::create('nits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('round_id')->constrained()->cascadeOnDelete();
            $table->string('item_key')->nullable();
            $table->text('body');
            $table->text('url');
            $table->string('persona')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }
};
