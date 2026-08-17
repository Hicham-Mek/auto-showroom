<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleImageFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Placeholder images for local dev only — real uploads replace this in Milestone 6
            'path' => 'https://picsum.photos/seed/' . fake()->uuid() . '/800/600',
            'sort_order' => 0,
            'is_primary' => false,
        ];
    }
}