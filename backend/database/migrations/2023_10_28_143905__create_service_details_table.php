<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_details', function (Blueprint $table) {
            $table->id();
            $table->integer('service_id');
            $table->string('image');
            $table->string('category');
            $table->integer('price');
            $table->integer('duration');
            $table->integer('status');
            $table->foreign('service_id')->references('id')->on('service')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_details', function (Blueprint $table) {
            //
        });
    }
};
