<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('Public/About');
    }

    public function sitemap()
    {
        $vehicles = \App\Models\Vehicle::notHidden()->latest()->get();
        return response()->view('sitemap', [
            'vehicles' => $vehicles
        ])->header('Content-Type', 'text/xml');
    }
}
