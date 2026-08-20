<?php

namespace App\Filament\Widgets;

use App\Models\Vehicle;
use App\Enums\VehicleStatus; // Assuming you have this Enum
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class VehicleStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Véhicules Disponibles', Vehicle::where('status', VehicleStatus::Available)->count())
                ->description('Prêts à être vendus')
                ->color('success'),

            Stat::make('Véhicules Réservés', Vehicle::where('status', VehicleStatus::Reserved)->count())
                ->description('En cours de négociation')
                ->color('warning'),

            Stat::make('Véhicules Vendus', Vehicle::where('status', VehicleStatus::Sold)->count())
                ->description('Historique des ventes')
                ->color('danger'),

            Stat::make('Véhicules Masqués', Vehicle::where('status', VehicleStatus::Hidden)->count())
                ->description('Brouillons ou retirés')
                ->color('gray'),
        ];
    }
}
