<?php

namespace App\Filament\Resources\Vehicles\Pages;

use App\Filament\Resources\Vehicles\VehicleResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditVehicle extends EditRecord
{
    protected static string $resource = VehicleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
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
