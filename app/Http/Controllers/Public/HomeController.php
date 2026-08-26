<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $latestVehicles = Vehicle::with('images')
            ->defaultListing()
            ->latest()
            ->take(6)
            ->get()
            ->map(fn ($vehicle) => [
                'id' => $vehicle->id,
                'slug' => $vehicle->slug,
                'title' => "{$vehicle->brand} {$vehicle->model}",
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'year' => $vehicle->year,
                'mileage' => $vehicle->mileage,
                'fuel' => ucfirst($vehicle->fuel_type),
                'fuel_type' => $vehicle->fuel_type,
                'transmission' => ucfirst($vehicle->transmission),
                'price' => $vehicle->price,
                'negotiable' => $vehicle->negotiable,
                'status' => $vehicle->status->value ?? (string) $vehicle->status,
                'image' => ($img = $vehicle->images->where('is_primary', true)->first()?->path ?? $vehicle->images->first()?->path)
                    ? (str_starts_with($img, 'http') ? $img : "/storage/{$img}")
                    : null,
            ]);

        $totalVehicles = Vehicle::defaultListing()->count();
        $totalBrands = Vehicle::distinct('brand')->count('brand');

        $stats = [
            ['label' => 'Véhicules en stock', 'value' => $totalVehicles > 0 ? "{$totalVehicles}" : '0'],
            ['label' => 'Marques disponibles', 'value' => $totalBrands > 0 ? "{$totalBrands}" : '0'],
            ['label' => 'Points de contrôle', 'value' => '150+'],
            ['label' => 'Satisfaction client', 'value' => '100%'],
        ];

        return Inertia::render('Public/Home', [
            'vehicles' => $latestVehicles,
            'stats' => $stats,
        ]);
    }
}
