<?php

namespace App\Models;

use App\Enums\VehicleStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand', 'model', 'year', 'mileage', 'body_type',
        'price', 'negotiable',
        'fuel_type', 'transmission', 'engine_power', 'doors', 'exterior_color', 'interior_color',
        'condition', 'paint_condition', 'has_accident_history', 'previous_owners',
        'carte_grise', 'document_notes',
        'description', 'features',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'negotiable' => 'boolean',
            'has_accident_history' => 'boolean',
            'features' => 'array',
            'status' => VehicleStatus::class,
        ];
    }

    public function images()
    {
        return $this->hasMany(VehicleImage::class);
    }

    public function primaryImage()
    {
        return $this->hasOne(VehicleImage::class)->where('is_primary', true);
    }

    /** Pretty URLs: /vehicules/{slug} instead of /vehicules/{id} */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected static function booted(): void
    {
        static::creating(function (Vehicle $vehicle) {
            if (empty($vehicle->slug)) {
                $base = Str::slug("{$vehicle->brand}-{$vehicle->model}-{$vehicle->year}");
                $vehicle->slug = "{$base}-" . Str::lower(Str::random(6));
            }
        });
    }

    /**
     * Vehicles that should ever appear in a public listing at all.
     * Hidden vehicles never appear anywhere on the public site — no exceptions.
     */
    public function scopeNotHidden(Builder $query): Builder
    {
        return $query->where('status', '!=', VehicleStatus::Hidden->value);
    }

    /**
     * The default inventory grid: Available + Reserved only.
     * Sold vehicles are still reachable directly (see scopeNotHidden)
     * but don't clutter the default browsing list — matches the frozen
     * business rule on Sold-vehicle visibility.
     */
    public function scopeDefaultListing(Builder $query): Builder
    {
        return $query->whereIn('status', [
            VehicleStatus::Available->value,
            VehicleStatus::Reserved->value,
        ]);
    }

    /**
     * Validation rules matching Section 4 of the frozen requirements doc.
     * Single source of truth — the Filament form (Milestone 5) will reuse
     * this instead of redefining the same rules a second time.
     */
    public static function rules(): array
    {
        return [
            'brand' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:1980', 'max:' . (date('Y') + 1)],
            'mileage' => ['required', 'integer', 'min:0'],
            'body_type' => ['required', 'string', 'max:50'],

            'price' => ['nullable', 'numeric', 'min:0'],
            'negotiable' => ['boolean'],

            'fuel_type' => ['required', Rule::in(['essence', 'diesel', 'hybride', 'electrique', 'gpl'])],
            'transmission' => ['required', Rule::in(['manuelle', 'automatique'])],
            'engine_power' => ['nullable', 'string', 'max:50'],
            'doors' => ['nullable', 'integer', 'min:2', 'max:6'],
            'exterior_color' => ['nullable', 'string', 'max:50'],
            'interior_color' => ['nullable', 'string', 'max:50'],

            'condition' => ['required', Rule::in(['neuf', 'occasion'])],
            'paint_condition' => ['nullable', 'string', 'max:100'],
            'has_accident_history' => ['nullable', 'boolean'],
            'previous_owners' => ['nullable', 'integer', 'min:1', 'max:20'],

            'carte_grise' => ['nullable', 'string', 'max:255'],
            'document_notes' => ['nullable', 'string'],

            'description' => ['nullable', 'string'],
            'features' => ['nullable', 'array'],

            'status' => ['required', Rule::enum(VehicleStatus::class)],
        ];
    }
}