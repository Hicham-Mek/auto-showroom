<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();

            // Basic information
            $table->string('brand');
            $table->string('model');
            $table->unsignedSmallInteger('year');
            $table->unsignedInteger('mileage');
            $table->string('body_type');

            // Pricing
            $table->decimal('price', 12, 2)->nullable(); // null = "Contactez-nous pour le prix"
            $table->boolean('negotiable')->default(true);

            // Technical specifications
            $table->string('fuel_type');
            $table->string('transmission');
            $table->string('engine_power')->nullable();
            $table->unsignedTinyInteger('doors')->nullable();
            $table->string('exterior_color')->nullable();
            $table->string('interior_color')->nullable();

            // Condition
            $table->string('condition'); // 'neuf' | 'occasion'
            $table->string('paint_condition')->nullable();
            $table->boolean('has_accident_history')->nullable();
            $table->unsignedTinyInteger('previous_owners')->nullable(); // "1ère main", "2ème main", etc.
           
           
            // Documentation (free text, per the frozen decision)
            $table->string('carte_grise')->nullable();
            $table->text('document_notes')->nullable();

            // Description
            $table->text('description')->nullable();

            // Features/options — fixed checklist, stored as JSON array of strings
            $table->json('features')->nullable();

            // Publication/status
            $table->string('status')->default('available');
            $table->string('slug')->unique();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};