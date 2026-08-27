<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\VehicleController;
use App\Http\Controllers\Public\PageController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/vehicules', [VehicleController::class, 'index'])->name('vehicles.index');
Route::get('/vehicules/{vehicle:slug}', [VehicleController::class, 'show'])->name('vehicles.show');
Route::get('/a-propos', [PageController::class, 'about'])->name('about');
Route::get('/sitemap.xml', [PageController::class, 'sitemap'])->name('sitemap');
