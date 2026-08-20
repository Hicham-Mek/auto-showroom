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
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'year' => $vehicle->year,
                'mileage' => $vehicle->mileage,
                'fuel_type' => $vehicle->fuel_type,
                'transmission' => $vehicle->transmission,
                'price' => $vehicle->price,
                'negotiable' => $vehicle->negotiable,
                'status' => $vehicle->status,
                'primary_image' => $vehicle->images->where('is_primary', true)->first()?->path 
                                ?? $vehicle->images->first()?->path,
            ]);

        return Inertia::render('Public/Home', [
            'vehicles' => $latestVehicles,
        ]);
    }
}
