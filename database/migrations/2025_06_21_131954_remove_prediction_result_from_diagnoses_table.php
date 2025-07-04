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
        Schema::table('diagnoses', function (Blueprint $table) {
            $table->dropColumn('prediction_result');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('diagnoses', function (Blueprint $table) {
            $table->boolean('prediction_result')->default(0);
        });
    }
};
