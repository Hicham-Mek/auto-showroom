<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::with('images')
            ->defaultListing()
            ->latest()
            ->paginate(12)
            ->through(fn ($vehicle) => [
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

        return Inertia::render('Public/Vehicles/Vehicles', [
            'vehicles' => $vehicles
        ]);
    }

    public function show(Vehicle $vehicle)
    {
        if ($vehicle->status === \App\Enums\VehicleStatus::Hidden) {
            abort(404);
        }

        $vehicle->load('images');

        return Inertia::render('Public/Vehicles/VehichleDetails', [
            'vehicle' => $vehicle
        ]);
    }
}
