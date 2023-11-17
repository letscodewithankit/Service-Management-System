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
        Schema::create('appointment', function (Blueprint $table) {
            $table->id();
            $table->integer('customer_id');
            $table->integer('ser_details_id');
            $table->integer('time_id');
            $table->string('date');
            $table->integer('status');
            $table->foreign('customer_id')->references('id')->on('customer')->cascadeOnDelete();
            $table->foreign('ser_details_id')->references('id')->on('service_details')->cascadeOnDelete();
            $table->foreign('time_id')->references('id')->on('time')->cascadeOnDelete();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointment', function (Blueprint $table) {
            //
        });
    }
};
