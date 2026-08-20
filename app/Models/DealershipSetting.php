<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DealershipSetting extends Model
{
    protected $guarded = [];

    /**
     * There's only ever one row. This gets it — or creates a sensible
     * default one the first time it's needed, so the app never has to
     * handle a "settings don't exist yet" edge case.
     */
    public static function current(): self
    {
        return static::first() ?? static::create(['name' => 'Mon Showroom']);
    }
}