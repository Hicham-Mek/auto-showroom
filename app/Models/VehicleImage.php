<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class VehicleImage extends Model
{
    use HasFactory;

    protected $fillable = ['vehicle_id', 'path', 'sort_order', 'is_primary'];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
        ];
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Resolves to a usable <img src>. Handles both a real uploaded file
     * (stored path on the public disk) and a full external URL — the
     * seeder below uses placeholder URLs, since there are no real files
     * to upload yet.
     */
    protected function url(): Attribute
    {
        return Attribute::get(
            fn () => str_starts_with($this->path, 'http')
                ? $this->path
                : asset(Storage::url($this->path))
        );
    }
}