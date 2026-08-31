<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $query = Vehicle::with('images')->defaultListing();

        // Apply Filters
        if ($request->filled('brand')) $query->where('brand', 'like', '%' . $request->brand . '%');
        if ($request->filled('min_price')) $query->where('price', '>=', $request->min_price);
        if ($request->filled('max_price')) $query->where('price', '<=', $request->max_price);
        if ($request->filled('year')) $query->where('year', '>=', $request->year);
        if ($request->filled('fuel_type')) $query->where('fuel_type', $request->fuel_type);
        if ($request->filled('transmission')) $query->where('transmission', $request->transmission);

        // Apply Sorting
        $sort = $request->input('sort', 'newest');
        if ($sort === 'price_asc') {
            $query->orderBy('price', 'asc');
        } elseif ($sort === 'price_desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest();
        }

        $vehicles = $query->paginate(12)->withQueryString()
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
                'primary_image' => ($path = $vehicle->images->where('is_primary', true)->first()?->path ?? $vehicle->images->first()?->path)
                                ? (str_starts_with($path, 'http') ? $path : \Illuminate\Support\Facades\Storage::disk('s3')->url($path))
                                : null,
            ]);

        return Inertia::render('Public/Vehicles/Vehicules', [
            'vehicles' => $vehicles,
            'filters' => $request->only(['brand', 'min_price', 'max_price', 'year', 'fuel_type', 'transmission', 'sort']),
        ]);
    }

    public function show(Vehicle $vehicle)
    {
        if ($vehicle->status === \App\Enums\VehicleStatus::Hidden) {
            abort(404);
        }

        $vehicle->load('images');

        $vehicle->images->transform(function ($image) {
            if ($image->path && !str_starts_with($image->path, 'http')) {
                $image->path = \Illuminate\Support\Facades\Storage::disk('s3')->url($image->path);
            }
            return $image;
        });

        return Inertia::render('Public/Vehicles/VehicleDetails', [
            'vehicle' => $vehicle
        ]);
    }
}
