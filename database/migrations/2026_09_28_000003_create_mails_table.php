<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'nitpick';

    public function up(): void
    {
        Schema::create('mails', function (Blueprint $table) {
            $table->id();
            $table->foreignId('round_id')->nullable()->constrained()->nullOnDelete();
            $table->text('to');
            $table->text('subject');
            $table->longText('html')->nullable();
            $table->longText('text')->nullable();
            $table->json('links');
            $table->timestamp('sent_at')->useCurrent();
        });
    }
};
