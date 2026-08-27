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
        Schema::table('vehicles', function (Blueprint $table) {
            $table->index('status');
            $table->index('brand');
            $table->index('price');
            $table->index('year');
            $table->index('fuel_type');
            $table->index('transmission');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['brand']);
            $table->dropIndex(['price']);
            $table->dropIndex(['year']);
            $table->dropIndex(['fuel_type']);
            $table->dropIndex(['transmission']);
            $table->dropIndex(['status', 'created_at']);
        });
    }
};
