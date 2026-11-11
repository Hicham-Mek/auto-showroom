<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    @php
        $ogTitle = 'AutoShowroom - Véhicules d\'occasion';
        $ogDescription = 'Découvrez notre sélection de véhicules inspectés et garantis. Trouvez la voiture parfaite chez AutoShowroom.';
        $ogImage = asset('images/default-logo.png'); // fallback
        $ogUrl = request()->url();
        $ogType = 'website';
        $ogSiteName = 'AutoShowroom';

        if (request()->routeIs('vehicles.show')) {
            $routeParam = request()->route('vehicle');
            // Depending on implicit binding, it might be the model or a string slug
            $vehicle = $routeParam instanceof \App\Models\Vehicle
                ? $routeParam
                : \App\Models\Vehicle::notHidden()->where('slug', $routeParam)->first();
            
            if ($vehicle) {
                $ogTitle = "{$vehicle->brand} {$vehicle->model} - " . number_format($vehicle->price, 0, ',', ' ') . " DZD";
                $ogDescription = \Illuminate\Support\Str::limit($vehicle->description ?? "Découvrez cette magnifique {$vehicle->brand} {$vehicle->model} chez AutoShowroom.", 150);
                $primaryImage = $vehicle->primaryImage ?? $vehicle->images()->first();
                if ($primaryImage && $primaryImage->path) {
                    $imgPath = $primaryImage->path;
                    $ogImage = str_starts_with($imgPath, 'http')
                        ? $imgPath
                        : \Illuminate\Support\Facades\Storage::disk('s3')->url($imgPath);
                }
                $ogType = 'article';
            }
        }
    @endphp

    <meta property="og:site_name" content="{{ $ogSiteName }}">
    <meta property="og:title" content="{{ $ogTitle }}">
    <meta property="og:description" content="{{ $ogDescription }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:url" content="{{ $ogUrl }}">
    <meta property="og:type" content="{{ $ogType }}">
    <meta name="twitter:card" content="summary_large_image">
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>