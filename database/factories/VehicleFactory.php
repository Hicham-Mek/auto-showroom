<?php

namespace Database\Factories;

use App\Enums\VehicleStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    public function definition(): array
    {
        // Realistic brand/model pairs for the Algerian market
        $catalog = [
            ['Renault', 'Clio'], ['Renault', 'Symbol'], ['Renault', 'Megane'],
            ['Peugeot', '208'], ['Peugeot', '301'], ['Peugeot', '3008'],
            ['Dacia', 'Logan'], ['Dacia', 'Sandero'], ['Dacia', 'Duster'],
            ['Volkswagen', 'Golf'], ['Volkswagen', 'Polo'],
            ['Hyundai', 'i10'], ['Hyundai', 'Accent'], ['Hyundai', 'Tucson'],
            ['Toyota', 'Corolla'], ['Toyota', 'Yaris'],
            ['Kia', 'Picanto'], ['Kia', 'Sportage'],
            ['Seat', 'Ibiza'],
        ];
        [$brand, $model] = fake()->randomElement($catalog);

        $featurePool = [
            'Climatisation', 'GPS', 'Toit ouvrant', 'Caméra de recul',
            'Sièges cuir', 'Vitres électriques', 'Bluetooth',
            'Régulateur de vitesse', 'ABS', 'Airbags',
        ];

        $hasPrice = fake()->boolean(85); // ~15% "Contactez-nous pour le prix"

        return [
            'brand' => $brand,
            'model' => $model,
            'year' => fake()->numberBetween(2008, 2025),
            'mileage' => fake()->numberBetween(5000, 220000),
            'body_type' => fake()->randomElement(['Berline', 'Citadine', 'SUV', 'Break', 'Utilitaire']),

            'price' => $hasPrice ? fake()->numberBetween(1200000, 6500000) : null,
            'negotiable' => fake()->boolean(80),

            'fuel_type' => fake()->randomElement(['essence', 'essence', 'diesel', 'diesel', 'gpl', 'hybride']),
            'transmission' => fake()->randomElement(['manuelle', 'manuelle', 'manuelle', 'automatique']),
            'engine_power' => fake()->randomElement(['1.2L / 75ch', '1.5L / 90ch', '1.6L / 115ch', '2.0L / 150ch']),
            'doors' => fake()->randomElement([3, 5]),
            'exterior_color' => fake()->randomElement(['Blanc', 'Noir', 'Gris', 'Bleu', 'Rouge', 'Beige']),
            'interior_color' => fake()->randomElement(['Noir', 'Beige', 'Gris', null]),

            'condition' => fake()->randomElement(['occasion', 'occasion', 'occasion', 'neuf']),
            'paint_condition' => fake()->randomElement(['Originale', 'Retouchée', 'Repeinte', null]),
            'has_accident_history' => fake()->boolean(15),
            'previous_owners' => fake()->numberBetween(1, 4),

            'carte_grise' => fake()->randomElement(['Carte grise Safia, à jour', 'Carte grise normale', null]),
            'document_notes' => fake()->optional()->sentence(),

            'description' => fake()->realText(180),
            'features' => fake()->randomElements($featurePool, fake()->numberBetween(2, 6)),

            'status' => fake()->randomElement([
                VehicleStatus::Available, VehicleStatus::Available, VehicleStatus::Available,
                VehicleStatus::Reserved, VehicleStatus::Sold, VehicleStatus::Hidden,
            ]),
        ];
    }
}