<?php

namespace Database\Seeders;

use App\Models\DealershipSetting;
use App\Models\Vehicle;
use App\Models\VehicleImage;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DealershipSetting::current()->update([
            'name' => 'AutoShowroom Tlemcen',
            'phone' => '+213 555 00 00 00',
            'whatsapp' => '+213 555 00 00 00',
            'address' => 'Route Nationale 22, Tlemcen',
            'hours' => "Sam-Jeu : 8h30-17h30\nVen : Fermé",
        ]);

        Vehicle::factory()
            ->count(10)
            ->create()
            ->each(function (Vehicle $vehicle) {
                $imageCount = fake()->numberBetween(3, 6);

                VehicleImage::factory()
                    ->count($imageCount)
                    ->create(['vehicle_id' => $vehicle->id])
                    ->each(function (VehicleImage $image, int $index) {
                        $image->update([
                            'sort_order' => $index,
                            'is_primary' => $index === 0,
                        ]);
                    });
            });
    }
}