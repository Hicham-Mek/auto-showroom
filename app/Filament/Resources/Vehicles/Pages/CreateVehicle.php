<?php

namespace App\Filament\Resources\Vehicles\Pages;

use App\Filament\Resources\Vehicles\VehicleResource;
use Filament\Resources\Pages\CreateRecord;

class CreateVehicle extends CreateRecord
{
    protected static string $resource = VehicleResource::class;

    protected function afterCreate(): void
    {
        $this->ensurePrimaryImage();
    }

    protected function ensurePrimaryImage(): void
    {
        $vehicle = $this->record;

        if ($vehicle->images()->exists() && $vehicle->images()->where('is_primary', true)->doesntExist()) {
            $vehicle->images()->first()->update(['is_primary' => true]);
        }
    }
}
